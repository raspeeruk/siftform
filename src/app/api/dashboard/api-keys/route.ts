import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { createDb } from "@/lib/db";
import { apiKeys } from "@/lib/db/schema";
import { eq, desc } from "drizzle-orm";
import { generateApiKey } from "@/lib/api/auth";

export async function GET() {
  const session = await auth();
  const orgId = (session as any)?.organizationId;
  if (!orgId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const db = createDb();
  const keys = await db
    .select({
      id: apiKeys.id,
      name: apiKeys.name,
      keyPrefix: apiKeys.keyPrefix,
      type: apiKeys.type,
      lastUsedAt: apiKeys.lastUsedAt,
      isRevoked: apiKeys.isRevoked,
      createdAt: apiKeys.createdAt,
    })
    .from(apiKeys)
    .where(eq(apiKeys.organizationId, orgId))
    .orderBy(desc(apiKeys.createdAt));

  return NextResponse.json(keys);
}

export async function POST(request: NextRequest) {
  const session = await auth();
  const orgId = (session as any)?.organizationId;
  if (!orgId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await request.json();
  const { name, type } = body;

  if (!name || !type || !["pub", "live"].includes(type)) {
    return NextResponse.json(
      { error: "Name and type (pub/live) required" },
      { status: 400 }
    );
  }

  const { key, hash, prefix } = generateApiKey(type);

  const db = createDb();
  const [created] = await db
    .insert(apiKeys)
    .values({
      organizationId: orgId,
      name,
      keyHash: hash,
      keyPrefix: prefix,
      type,
    })
    .returning();

  // Return the full key ONCE — it won't be shown again
  return NextResponse.json(
    {
      id: created.id,
      name: created.name,
      key, // Only returned on creation
      type: created.type,
      createdAt: created.createdAt,
    },
    { status: 201 }
  );
}

export async function DELETE(request: NextRequest) {
  const session = await auth();
  const orgId = (session as any)?.organizationId;
  if (!orgId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { searchParams } = request.nextUrl;
  const id = searchParams.get("id");
  if (!id) return NextResponse.json({ error: "Key ID required" }, { status: 400 });

  const db = createDb();
  await db
    .update(apiKeys)
    .set({ isRevoked: true })
    .where(eq(apiKeys.id, id));

  return NextResponse.json({ ok: true });
}
