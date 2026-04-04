import { NextRequest, NextResponse } from "next/server";
import { authenticateApiKey } from "@/lib/api/auth";
import { createDb } from "@/lib/db";
import { submissions } from "@/lib/db/schema";
import { eq, and } from "drizzle-orm";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const authResult = await authenticateApiKey(request);
  if (!authResult) {
    return NextResponse.json(
      { error: "Invalid or missing API key" },
      { status: 401, headers: corsHeaders() }
    );
  }

  if (authResult.keyType !== "live") {
    return NextResponse.json(
      { error: "API key type not authorized for this endpoint" },
      { status: 403, headers: corsHeaders() }
    );
  }

  const { id } = await params;
  const db = createDb();

  const [submission] = await db
    .select()
    .from(submissions)
    .where(
      and(
        eq(submissions.id, id),
        eq(submissions.organizationId, authResult.organizationId)
      )
    )
    .limit(1);

  if (!submission) {
    return NextResponse.json(
      { error: "Submission not found" },
      { status: 404, headers: corsHeaders() }
    );
  }

  return NextResponse.json(
    {
      id: submission.id,
      schema_id: submission.schemaId,
      raw_input: submission.rawInput,
      raw_input_type: submission.rawInputType,
      extracted_data: submission.extractedData,
      extras: submission.extras,
      missing_required: submission.missingRequired,
      status: submission.status,
      overall_confidence: submission.overallConfidence,
      warnings: submission.warnings,
      metadata: submission.metadata,
      created_at: submission.createdAt.toISOString(),
      updated_at: submission.updatedAt.toISOString(),
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
