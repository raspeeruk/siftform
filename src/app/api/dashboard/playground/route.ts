import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { createDb } from "@/lib/db";
import { schemas } from "@/lib/db/schema";
import { eq, and } from "drizzle-orm";
import { extractFromText } from "@/lib/ai/extract";

export async function POST(request: NextRequest) {
  const session = await auth();
  const orgId = (session as any)?.organizationId;
  if (!orgId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await request.json();
  const { text, schema_id } = body;

  if (!text || !schema_id) {
    return NextResponse.json(
      { error: "Text and schema_id required" },
      { status: 400 }
    );
  }

  const db = createDb();
  const [schema] = await db
    .select()
    .from(schemas)
    .where(
      and(
        eq(schemas.id, schema_id),
        eq(schemas.organizationId, orgId)
      )
    )
    .limit(1);

  if (!schema) {
    return NextResponse.json({ error: "Schema not found" }, { status: 404 });
  }

  try {
    const result = await extractFromText(
      text,
      schema.name,
      schema.description,
      schema.fields
    );

    // Playground does NOT create a submission or count toward usage
    return NextResponse.json({
      fields: result.fields,
      extras: result.extras,
      missing_required: result.missingRequired,
      overall_confidence: result.overallConfidence,
      warnings: result.warnings,
    });
  } catch (error) {
    console.error("Playground extraction error:", error);
    return NextResponse.json(
      { error: "Extraction failed" },
      { status: 500 }
    );
  }
}
