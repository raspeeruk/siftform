import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { createDb } from "@/lib/db";
import { schemas } from "@/lib/db/schema";
import { eq, desc } from "drizzle-orm";

export async function GET() {
  const session = await auth();
  const orgId = (session as any)?.organizationId;
  if (!orgId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const db = createDb();
  const results = await db
    .select()
    .from(schemas)
    .where(eq(schemas.organizationId, orgId))
    .orderBy(desc(schemas.createdAt));

  return NextResponse.json(results);
}

export async function POST(request: NextRequest) {
  const session = await auth();
  const orgId = (session as any)?.organizationId;
  if (!orgId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await request.json();
  const { name, description, fields, widgetConfig } = body;

  if (!name) {
    return NextResponse.json({ error: "Name is required" }, { status: 400 });
  }

  const db = createDb();
  const [schema] = await db
    .insert(schemas)
    .values({
      organizationId: orgId,
      name,
      description: description || null,
      fields: fields || [],
      widgetConfig: widgetConfig || {},
    })
    .returning();

  return NextResponse.json(schema, { status: 201 });
}

export async function PUT(request: NextRequest) {
  const session = await auth();
  const orgId = (session as any)?.organizationId;
  if (!orgId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await request.json();
  const { id, name, description, fields, widgetConfig, isActive } = body;

  if (!id) {
    return NextResponse.json({ error: "Schema ID required" }, { status: 400 });
  }

  const db = createDb();
  const updates: any = { updatedAt: new Date() };
  if (name !== undefined) updates.name = name;
  if (description !== undefined) updates.description = description;
  if (fields !== undefined) updates.fields = fields;
  if (widgetConfig !== undefined) updates.widgetConfig = widgetConfig;
  if (isActive !== undefined) updates.isActive = isActive;

  const [updated] = await db
    .update(schemas)
    .set(updates)
    .where(eq(schemas.id, id))
    .returning();

  return NextResponse.json(updated);
}

export async function DELETE(request: NextRequest) {
  const session = await auth();
  const orgId = (session as any)?.organizationId;
  if (!orgId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { searchParams } = request.nextUrl;
  const id = searchParams.get("id");
  if (!id) return NextResponse.json({ error: "Schema ID required" }, { status: 400 });

  const db = createDb();
  await db.delete(schemas).where(eq(schemas.id, id));

  return NextResponse.json({ ok: true });
}
