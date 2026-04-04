import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { createDb } from "@/lib/db";
import { webhooks, webhookDeliveries } from "@/lib/db/schema";
import { eq, desc } from "drizzle-orm";
import { randomBytes } from "crypto";

export async function GET() {
  const session = await auth();
  const orgId = (session as any)?.organizationId;
  if (!orgId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const db = createDb();
  const results = await db
    .select()
    .from(webhooks)
    .where(eq(webhooks.organizationId, orgId))
    .orderBy(desc(webhooks.createdAt));

  return NextResponse.json(results);
}

export async function POST(request: NextRequest) {
  const session = await auth();
  const orgId = (session as any)?.organizationId;
  if (!orgId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await request.json();
  const { url, events } = body;

  if (!url) {
    return NextResponse.json({ error: "URL is required" }, { status: 400 });
  }

  try {
    new URL(url);
  } catch {
    return NextResponse.json({ error: "Invalid URL" }, { status: 400 });
  }

  const secret = randomBytes(32).toString("hex");

  const db = createDb();
  const [webhook] = await db
    .insert(webhooks)
    .values({
      organizationId: orgId,
      url,
      secret,
      events: events || ["submission.created"],
    })
    .returning();

  return NextResponse.json(
    { ...webhook, secret }, // Show secret once
    { status: 201 }
  );
}

export async function DELETE(request: NextRequest) {
  const session = await auth();
  const orgId = (session as any)?.organizationId;
  if (!orgId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { searchParams } = request.nextUrl;
  const id = searchParams.get("id");
  if (!id) return NextResponse.json({ error: "ID required" }, { status: 400 });

  const db = createDb();
  await db.delete(webhooks).where(eq(webhooks.id, id));

  return NextResponse.json({ ok: true });
}
