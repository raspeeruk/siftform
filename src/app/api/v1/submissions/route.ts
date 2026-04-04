import { NextRequest, NextResponse } from "next/server";
import { authenticateApiKey } from "@/lib/api/auth";
import { createDb } from "@/lib/db";
import { submissions } from "@/lib/db/schema";
import { eq, and, desc, gte, lte, like } from "drizzle-orm";

export async function GET(request: NextRequest) {
  const authResult = await authenticateApiKey(request);
  if (!authResult) {
    return NextResponse.json(
      { error: "Invalid or missing API key" },
      { status: 401, headers: corsHeaders() }
    );
  }

  // Only live keys can list submissions
  if (authResult.keyType !== "live") {
    return NextResponse.json(
      { error: "API key type not authorized for this endpoint" },
      { status: 403, headers: corsHeaders() }
    );
  }

  const { searchParams } = request.nextUrl;
  const schemaId = searchParams.get("schema_id");
  const status = searchParams.get("status");
  const from = searchParams.get("from");
  const to = searchParams.get("to");
  const page = parseInt(searchParams.get("page") || "1");
  const limit = Math.min(parseInt(searchParams.get("limit") || "50"), 100);
  const offset = (page - 1) * limit;

  const db = createDb();

  const conditions = [
    eq(submissions.organizationId, authResult.organizationId),
  ];

  if (schemaId) conditions.push(eq(submissions.schemaId, schemaId));
  if (status) conditions.push(eq(submissions.status, status));
  if (from) conditions.push(gte(submissions.createdAt, new Date(from)));
  if (to) conditions.push(lte(submissions.createdAt, new Date(to)));

  const results = await db
    .select()
    .from(submissions)
    .where(and(...conditions))
    .orderBy(desc(submissions.createdAt))
    .limit(limit)
    .offset(offset);

  return NextResponse.json(
    {
      data: results.map((s) => ({
        id: s.id,
        schema_id: s.schemaId,
        raw_input: s.rawInput,
        raw_input_type: s.rawInputType,
        extracted_data: s.extractedData,
        extras: s.extras,
        missing_required: s.missingRequired,
        status: s.status,
        overall_confidence: s.overallConfidence,
        warnings: s.warnings,
        created_at: s.createdAt.toISOString(),
      })),
      page,
      limit,
    },
    { status: 200, headers: corsHeaders() }
  );
}

export async function OPTIONS() {
  return new Response(null, { status: 204, headers: corsHeaders() });
}

function corsHeaders(): HeadersInit {
  return {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, Authorization",
  };
}
