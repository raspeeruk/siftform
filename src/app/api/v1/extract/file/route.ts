import { NextRequest, NextResponse } from "next/server";
import { authenticateApiKey, checkUsageLimit, incrementUsage } from "@/lib/api/auth";
import { createDb } from "@/lib/db";
import { schemas, submissions } from "@/lib/db/schema";
import { eq, and } from "drizzle-orm";
import { extractFromText, extractTextFromFile } from "@/lib/ai/extract";

const ACCEPTED_TYPES = [
  "image/jpeg",
  "image/png",
  "image/gif",
  "image/webp",
  "application/pdf",
] as const;

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB

export async function POST(request: NextRequest) {
  const authResult = await authenticateApiKey(request);
  if (!authResult) {
    return NextResponse.json(
      { error: "Invalid or missing API key" },
      { status: 401, headers: corsHeaders() }
    );
  }

  const usage = await checkUsageLimit(authResult.organizationId);
  if (!usage.allowed) {
    return NextResponse.json(
      {
        error: "Extraction limit reached",
        used: usage.used,
        limit: usage.limit,
      },
      { status: 429, headers: corsHeaders() }
    );
  }

  const formData = await request.formData();
  const file = formData.get("file") as File | null;
  const schemaId = formData.get("schema_id") as string | null;

  if (!file) {
    return NextResponse.json(
      { error: "Missing 'file' in form data" },
      { status: 400, headers: corsHeaders() }
    );
  }

  if (!schemaId) {
    return NextResponse.json(
      { error: "Missing 'schema_id' in form data" },
      { status: 400, headers: corsHeaders() }
    );
  }

  if (file.size > MAX_FILE_SIZE) {
    return NextResponse.json(
      { error: "File too large. Maximum 10MB." },
      { status: 400, headers: corsHeaders() }
    );
  }

  const mediaType = file.type as (typeof ACCEPTED_TYPES)[number];
  if (!ACCEPTED_TYPES.includes(mediaType)) {
    return NextResponse.json(
      {
        error: `Unsupported file type: ${file.type}. Accepted: ${ACCEPTED_TYPES.join(", ")}`,
      },
      { status: 400, headers: corsHeaders() }
    );
  }

  const db = createDb();

  const [schema] = await db
    .select()
    .from(schemas)
    .where(
      and(
        eq(schemas.id, schemaId),
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
    // Step 1: Extract text from file using Vision
    const buffer = await file.arrayBuffer();
    const base64 = Buffer.from(buffer).toString("base64");

    let extractedText: string;
    try {
      extractedText = await extractTextFromFile(base64, mediaType);
    } catch {
      return NextResponse.json(
        {
          error: "Could not read file. Please type your information instead.",
        },
        { status: 422, headers: corsHeaders() }
      );
    }

    if (!extractedText.trim()) {
      return NextResponse.json(
        {
          error:
            "No text could be extracted from the file. Please type your information instead.",
        },
        { status: 422, headers: corsHeaders() }
      );
    }

    // Step 2: Extract structured data from text
    const result = await extractFromText(
      extractedText,
      schema.name,
      schema.description,
      schema.fields
    );

    await incrementUsage(authResult.organizationId);

    const status =
      result.missingRequired.length === 0 ? "completed" : "pending";

    const [submission] = await db
      .insert(submissions)
      .values({
        organizationId: authResult.organizationId,
        schemaId,
        rawInput: extractedText,
        rawInputType: "file",
        extractedData: result.fields,
        extras: result.extras,
        missingRequired: result.missingRequired,
        status,
        overallConfidence: result.overallConfidence,
        warnings: result.warnings,
      })
      .returning();

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
        extracted_text: extractedText,
      },
      { status: 200, headers: corsHeaders() }
    );
  } catch (error) {
    console.error("File extraction error:", error);
    return NextResponse.json(
      { error: "File extraction failed" },
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
