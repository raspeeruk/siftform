import { NextRequest, NextResponse } from "next/server";
import { authenticateApiKey, checkUsageLimit, incrementUsage } from "@/lib/api/auth";
import { createDb } from "@/lib/db";
import { schemas, submissions } from "@/lib/db/schema";
import { eq, and } from "drizzle-orm";
import { extractFromText } from "@/lib/ai/extract";

export async function POST(request: NextRequest) {
  const authResult = await authenticateApiKey(request);
  if (!authResult) {
    return NextResponse.json(
      { error: "Invalid or missing API key" },
      { status: 401, headers: corsHeaders() }
    );
  }

  // Check usage
  const usage = await checkUsageLimit(authResult.organizationId);
  if (!usage.allowed) {
    return NextResponse.json(
      {
        error: "Extraction limit reached",
        used: usage.used,
        limit: usage.limit,
        upgrade_url: "https://siftform.com/dashboard/billing",
      },
      { status: 429, headers: corsHeaders() }
    );
  }

  let body: any;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { error: "Invalid JSON body" },
      { status: 400, headers: corsHeaders() }
    );
  }

  const { text, schema_id } = body;

  if (!text || typeof text !== "string") {
    return NextResponse.json(
      { error: "Missing or invalid 'text' field" },
      { status: 400, headers: corsHeaders() }
    );
  }

  if (!schema_id) {
    return NextResponse.json(
      { error: "Missing 'schema_id' field" },
      { status: 400, headers: corsHeaders() }
    );
  }

  const db = createDb();

  // Load schema
  const [schema] = await db
    .select()
    .from(schemas)
    .where(
      and(
        eq(schemas.id, schema_id),
        eq(schemas.organizationId, authResult.organizationId),
        eq(schemas.isActive, true)
      )
    )
    .limit(1);

  if (!schema) {
    return NextResponse.json(
      { error: "Schema not found" },
      { status: 404, headers: corsHeaders() }
    );
  }

  try {
    const result = await extractFromText(
      text,
      schema.name,
      schema.description,
      schema.fields
    );

    // Increment usage
    await incrementUsage(authResult.organizationId);

    // If no missing required fields, create submission immediately
    const status =
      result.missingRequired.length === 0 ? "completed" : "pending";

    const [submission] = await db
      .insert(submissions)
      .values({
        organizationId: authResult.organizationId,
        schemaId: schema_id,
        rawInput: text,
        rawInputType: "text",
        extractedData: result.fields,
        extras: result.extras,
        missingRequired: result.missingRequired,
        status,
        overallConfidence: result.overallConfidence,
        warnings: result.warnings,
      })
      .returning();

    // Fire webhooks asynchronously if completed
    if (status === "completed") {
      fireWebhooks(authResult.organizationId, submission).catch(() => {});
    }

    return NextResponse.json(
      {
        submission_id: submission.id,
        status,
        fields: result.fields,
        extras: result.extras,
        missing_required: result.missingRequired,
        overall_confidence: result.overallConfidence,
        warnings: result.warnings,
      },
      { status: 200, headers: corsHeaders() }
    );
  } catch (error) {
    console.error("Extraction error:", error);
    return NextResponse.json(
      { error: "Extraction failed" },
      { status: 500, headers: corsHeaders() }
    );
  }
}

export async function OPTIONS() {
  return new Response(null, { status: 204, headers: corsHeaders() });
}

function corsHeaders(): HeadersInit {
  return {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, Authorization",
  };
}

async function fireWebhooks(organizationId: string, submission: any) {
  const { deliverWebhooks } = await import("@/lib/api/webhooks");
  await deliverWebhooks(organizationId, "submission.created", submission);
}
