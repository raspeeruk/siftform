import { NextRequest, NextResponse } from "next/server";
import { createDb } from "@/lib/db";
import { schemas } from "@/lib/db/schema";
import { eq, and } from "drizzle-orm";

function corsHeaders(): HeadersInit {
  return {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
    "Cache-Control": "public, max-age=60",
  };
}

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ schemaId: string }> }
) {
  const { schemaId } = await params;

  if (!schemaId) {
    return NextResponse.json(
      { error: "Missing schemaId" },
      { status: 400, headers: corsHeaders() }
    );
  }

  const db = createDb();

  const [schema] = await db
    .select({
      widgetConfig: schemas.widgetConfig,
      description: schemas.description,
    })
    .from(schemas)
    .where(and(eq(schemas.id, schemaId), eq(schemas.isActive, true)))
    .limit(1);

  if (!schema) {
    return NextResponse.json(
      { error: "Form not found" },
      { status: 404, headers: corsHeaders() }
    );
  }

  return NextResponse.json(
    {
      config: schema.widgetConfig || {},
      description: schema.description || "",
    },
    { status: 200, headers: corsHeaders() }
  );
}

export async function OPTIONS() {
  return new Response(null, { status: 204, headers: corsHeaders() });
}
