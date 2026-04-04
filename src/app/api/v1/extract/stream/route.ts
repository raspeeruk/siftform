import { NextRequest } from "next/server";
import { authenticateApiKey, checkUsageLimit, incrementUsage } from "@/lib/api/auth";
import { createDb } from "@/lib/db";
import { schemas, submissions } from "@/lib/db/schema";
import { eq, and } from "drizzle-orm";
import Anthropic from "@anthropic-ai/sdk";
import { SchemaField } from "@/lib/db/schema";

export async function POST(request: NextRequest) {
  const authResult = await authenticateApiKey(request);
  if (!authResult) {
    return new Response(JSON.stringify({ error: "Invalid API key" }), {
      status: 401,
      headers: corsHeaders(),
    });
  }

  const usage = await checkUsageLimit(authResult.organizationId);
  if (!usage.allowed) {
    return new Response(JSON.stringify({ error: "Limit reached" }), {
      status: 429,
      headers: corsHeaders(),
    });
  }

  let body: any;
  try {
    body = await request.json();
  } catch {
    return new Response(JSON.stringify({ error: "Invalid JSON" }), {
      status: 400,
      headers: corsHeaders(),
    });
  }

  const { text, schema_id } = body;
  if (!text || !schema_id) {
    return new Response(
      JSON.stringify({ error: "Missing text or schema_id" }),
      { status: 400, headers: corsHeaders() }
    );
  }

  const db = createDb();
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
    return new Response(JSON.stringify({ error: "Schema not found" }), {
      status: 404,
      headers: corsHeaders(),
    });
  }

  // SSE stream
  const encoder = new TextEncoder();
  const stream = new ReadableStream({
    async start(controller) {
      try {
        const anthropic = new Anthropic();
        const fieldDefs = schema.fields
          .map((f: SchemaField) => {
            let def = `- ${f.name} (${f.type}, ${f.required ? "REQUIRED" : "optional"})`;
            if (f.description) def += ` — ${f.description}`;
            if (f.examples?.length)
              def += ` — Examples: ${f.examples.join(", ")}`;
            if (f.options?.length)
              def += ` — Options: ${f.options.join(", ")}`;
            return def;
          })
          .join("\n");

        const messageStream = anthropic.messages.stream({
          model: "claude-sonnet-4-20250514",
          max_tokens: 2048,
          system: `You are a structured data extraction engine. Extract data from text and map to a schema.
Return ONLY valid JSON with this structure:
{"fields":{"name":{"value":"...","confidence":0.95}},"extras":{},"missing_required":[],"warnings":[]}
Rules: Only extract stated info. Confidence 0-1. Never fabricate.`,
          messages: [
            {
              role: "user",
              content: `SCHEMA: ${schema.name}\nFIELDS:\n${fieldDefs}\n\nTEXT:\n${text}\n\nExtract and return JSON.`,
            },
          ],
        });

        let fullText = "";

        messageStream.on("text", (text) => {
          fullText += text;
          controller.enqueue(
            encoder.encode(`data: ${JSON.stringify({ type: "chunk", text })}\n\n`)
          );
        });

        await messageStream.finalMessage();

        // Parse final result
        try {
          const parsed = JSON.parse(fullText);

          await incrementUsage(authResult.organizationId);

          const missingRequired = parsed.missing_required || [];
          const status =
            missingRequired.length === 0 ? "completed" : "pending";

          const [submission] = await db
            .insert(submissions)
            .values({
              organizationId: authResult.organizationId,
              schemaId: schema_id,
              rawInput: text,
              rawInputType: "text",
              extractedData: parsed.fields || {},
              extras: parsed.extras || {},
              missingRequired,
              status,
              overallConfidence: calculateOverallConfidence(parsed.fields),
              warnings: parsed.warnings || [],
            })
            .returning();

          controller.enqueue(
            encoder.encode(
              `data: ${JSON.stringify({
                type: "complete",
                submission_id: submission.id,
                status,
                fields: parsed.fields,
                extras: parsed.extras,
                missing_required: missingRequired,
                warnings: parsed.warnings || [],
              })}\n\n`
            )
          );

          if (status === "completed") {
            const { deliverWebhooks } = await import("@/lib/api/webhooks");
            deliverWebhooks(
              authResult.organizationId,
              "submission.created",
              submission
            ).catch(() => {});
          }
        } catch {
          controller.enqueue(
            encoder.encode(
              `data: ${JSON.stringify({ type: "error", message: "Failed to parse extraction result" })}\n\n`
            )
          );
        }

        controller.close();
      } catch (error) {
        controller.enqueue(
          encoder.encode(
            `data: ${JSON.stringify({ type: "error", message: "Extraction failed" })}\n\n`
          )
        );
        controller.close();
      }
    },
  });

  return new Response(stream, {
    headers: {
      ...corsHeaders(),
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache",
      Connection: "keep-alive",
    },
  });
}

export async function OPTIONS() {
  return new Response(null, { status: 204, headers: corsHeaders() });
}

function corsHeaders(): Record<string, string> {
  return {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, Authorization",
  };
}

function calculateOverallConfidence(
  fields: Record<string, { value: unknown; confidence: number }> | undefined
): number {
  if (!fields) return 0;
  const values = Object.values(fields).filter((f) => f.value !== null);
  if (values.length === 0) return 0;
  return values.reduce((sum, f) => sum + f.confidence, 0) / values.length;
}
