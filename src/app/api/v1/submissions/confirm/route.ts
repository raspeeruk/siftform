import { NextRequest, NextResponse } from "next/server";
import { authenticateApiKey } from "@/lib/api/auth";
import { createDb } from "@/lib/db";
import { submissions } from "@/lib/db/schema";
import { eq, and } from "drizzle-orm";

export async function POST(request: NextRequest) {
  const authResult = await authenticateApiKey(request);
  if (!authResult) {
    return NextResponse.json(
      { error: "Invalid or missing API key" },
      { status: 401, headers: corsHeaders() }
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

  const { submission_id, fields } = body;

  if (!submission_id) {
    return NextResponse.json(
      { error: "Missing 'submission_id'" },
      { status: 400, headers: corsHeaders() }
    );
  }

  if (!fields || typeof fields !== "object") {
    return NextResponse.json(
      { error: "Missing or invalid 'fields' object" },
      { status: 400, headers: corsHeaders() }
    );
  }

  const db = createDb();

  const [submission] = await db
    .select()
    .from(submissions)
    .where(
      and(
        eq(submissions.id, submission_id),
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

  if (submission.status === "completed") {
    return NextResponse.json(
      { error: "Submission already completed" },
      { status: 409, headers: corsHeaders() }
    );
  }

  // Merge provided fields into extracted data
  const existingData = (submission.extractedData || {}) as Record<
    string,
    { value: unknown; confidence: number }
  >;

  for (const [key, value] of Object.entries(fields)) {
    existingData[key] = { value, confidence: 1.0 };
  }

  // Remove confirmed fields from missing required
  const missingRequired = (
    (submission.missingRequired || []) as string[]
  ).filter((f) => !(f in fields));

  const status = missingRequired.length === 0 ? "completed" : "pending";

  const [updated] = await db
    .update(submissions)
    .set({
      extractedData: existingData,
      missingRequired,
      status,
      updatedAt: new Date(),
    })
    .where(eq(submissions.id, submission_id))
    .returning();

  // Fire webhooks if now completed
  if (status === "completed") {
    fireWebhooks(authResult.organizationId, updated).catch(() => {});
  }

  return NextResponse.json(
    {
      submission_id: updated.id,
      status: updated.status,
      fields: updated.extractedData,
      missing_required: missingRequired,
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
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, Authorization",
  };
}

async function fireWebhooks(organizationId: string, submission: any) {
  const { deliverWebhooks } = await import("@/lib/api/webhooks");
  await deliverWebhooks(organizationId, "submission.created", submission);
}
