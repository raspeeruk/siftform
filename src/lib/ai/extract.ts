import Anthropic from "@anthropic-ai/sdk";
import { SchemaField } from "@/lib/db/schema";

const anthropic = new Anthropic();

export type ExtractionResult = {
  fields: Record<string, { value: unknown; confidence: number }>;
  extras: Record<string, unknown>;
  missingRequired: string[];
  overallConfidence: number;
  warnings: string[];
};

function buildSystemPrompt(): string {
  return `You are a structured data extraction engine. Your job is to extract data from unstructured text and map it to a defined schema.

RULES:
1. Only extract information that is explicitly stated or very strongly implied in the text.
2. NEVER fabricate, guess, or hallucinate data. If information isn't present, leave it null.
3. Assign a confidence score between 0 and 1 for each extracted field:
   - 0.9-1.0: Explicitly stated, unambiguous
   - 0.7-0.89: Strongly implied or paraphrased
   - 0.5-0.69: Partially stated, some inference needed
   - 0.2-0.49: Weak inference, uncertain
   - 0.0-0.19: Very uncertain, barely supported
4. Any information in the text that doesn't map to a schema field goes into the "extras" object with descriptive keys.
5. Return ONLY valid JSON. No markdown, no explanation, no preamble.
6. For "select" type fields, only use values from the provided options list.
7. For boolean fields, extract as true/false.
8. For date fields, normalize to ISO 8601 format (YYYY-MM-DD).
9. For phone fields, include country code if mentioned.
10. For email fields, extract the full email address.

CROSS-FIELD VALIDATION:
After extraction, check for consistency between fields:
- Date of birth vs age (should be consistent)
- Country vs phone number format (country code should match)
- Revenue vs employee count (should be plausible)
- Any other logical relationships between fields
Add warnings for any inconsistencies found.

RESPONSE FORMAT:
{
  "fields": {
    "field_name": { "value": "extracted value or null", "confidence": 0.95 }
  },
  "extras": {
    "descriptive_key": "unmapped information"
  },
  "missing_required": ["field_name"],
  "warnings": ["Description of any inconsistency"]
}`;
}

function buildUserPrompt(
  schemaName: string,
  schemaDescription: string | null,
  fields: SchemaField[],
  rawText: string
): string {
  const fieldDefs = fields
    .map((f) => {
      let def = `- ${f.name} (${f.type}, ${f.required ? "REQUIRED" : "optional"})`;
      if (f.label) def += ` — "${f.label}"`;
      if (f.description) def += ` — ${f.description}`;
      if (f.examples?.length) def += ` — Examples: ${f.examples.join(", ")}`;
      if (f.options?.length) def += ` — Options: ${f.options.join(", ")}`;
      if (f.validation) {
        if (f.validation.pattern) def += ` — Pattern: ${f.validation.pattern}`;
        if (f.validation.min !== undefined) def += ` — Min: ${f.validation.min}`;
        if (f.validation.max !== undefined) def += ` — Max: ${f.validation.max}`;
      }
      return def;
    })
    .join("\n");

  return `SCHEMA: ${schemaName}
${schemaDescription ? `DESCRIPTION: ${schemaDescription}` : ""}

FIELDS:
${fieldDefs}

TEXT TO EXTRACT FROM:
---
${rawText}
---

Extract all matching data from the text above and return JSON.`;
}

export async function extractFromText(
  rawText: string,
  schemaName: string,
  schemaDescription: string | null,
  fields: SchemaField[]
): Promise<ExtractionResult> {
  const response = await anthropic.messages.create({
    model: "claude-sonnet-4-20250514",
    max_tokens: 2048,
    system: buildSystemPrompt(),
    messages: [
      {
        role: "user",
        content: buildUserPrompt(schemaName, schemaDescription, fields, rawText),
      },
    ],
  });

  const text =
    response.content[0].type === "text" ? response.content[0].text : "";

  let parsed: any;
  try {
    parsed = JSON.parse(text);
  } catch {
    // Retry once with stricter instructions
    const retryResponse = await anthropic.messages.create({
      model: "claude-sonnet-4-20250514",
      max_tokens: 2048,
      system:
        buildSystemPrompt() +
        "\n\nCRITICAL: Your previous response was not valid JSON. Return ONLY a JSON object. No markdown code fences. No text before or after the JSON.",
      messages: [
        {
          role: "user",
          content: buildUserPrompt(
            schemaName,
            schemaDescription,
            fields,
            rawText
          ),
        },
      ],
    });

    const retryText =
      retryResponse.content[0].type === "text"
        ? retryResponse.content[0].text
        : "";

    parsed = JSON.parse(retryText); // Let it throw if still invalid
  }

  return postProcess(parsed, fields);
}

export function createExtractionStream(
  rawText: string,
  schemaName: string,
  schemaDescription: string | null,
  fields: SchemaField[]
) {
  return anthropic.messages.stream({
    model: "claude-sonnet-4-20250514",
    max_tokens: 2048,
    system: buildSystemPrompt(),
    messages: [
      {
        role: "user",
        content: buildUserPrompt(schemaName, schemaDescription, fields, rawText),
      },
    ],
  });
}

function postProcess(
  parsed: any,
  fields: SchemaField[]
): ExtractionResult {
  const result: ExtractionResult = {
    fields: {},
    extras: parsed.extras || {},
    missingRequired: [],
    overallConfidence: 0,
    warnings: parsed.warnings || [],
  };

  const fieldMap = new Map(fields.map((f) => [f.name, f]));
  let totalConfidence = 0;
  let fieldCount = 0;

  for (const field of fields) {
    const extracted = parsed.fields?.[field.name];

    if (!extracted || extracted.value === null || extracted.value === undefined) {
      if (field.required) {
        result.missingRequired.push(field.name);
      }
      result.fields[field.name] = { value: null, confidence: 0 };
      continue;
    }

    let { value, confidence } = extracted;

    // Type-specific validation that adjusts confidence
    switch (field.type) {
      case "email": {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (typeof value === "string" && !emailRegex.test(value)) {
          confidence = Math.min(confidence, 0.2);
          result.warnings.push(
            `${field.name}: "${value}" doesn't look like a valid email`
          );
        }
        break;
      }
      case "phone": {
        const phoneRegex = /^[\d\s\-+().]{7,20}$/;
        if (typeof value === "string" && !phoneRegex.test(value)) {
          confidence = Math.min(confidence, 0.3);
        }
        break;
      }
      case "number": {
        const num = Number(value);
        if (isNaN(num)) {
          confidence = Math.min(confidence, 0.2);
        } else {
          value = num;
          if (field.validation?.min !== undefined && num < field.validation.min) {
            confidence = Math.min(confidence, 0.4);
            result.warnings.push(
              `${field.name}: ${num} is below minimum ${field.validation.min}`
            );
          }
          if (field.validation?.max !== undefined && num > field.validation.max) {
            confidence = Math.min(confidence, 0.4);
            result.warnings.push(
              `${field.name}: ${num} is above maximum ${field.validation.max}`
            );
          }
        }
        break;
      }
      case "date": {
        // Try to normalize to ISO date
        const date = new Date(value);
        if (isNaN(date.getTime())) {
          confidence = Math.min(confidence, 0.3);
        } else {
          value = date.toISOString().split("T")[0];
        }
        break;
      }
      case "select": {
        if (field.options && !field.options.includes(value)) {
          // Check for close matches
          const lower = String(value).toLowerCase();
          const match = field.options.find(
            (o) => o.toLowerCase() === lower
          );
          if (match) {
            value = match;
          } else {
            confidence = Math.min(confidence, 0.3);
            result.warnings.push(
              `${field.name}: "${value}" is not in options [${field.options.join(", ")}]`
            );
          }
        }
        break;
      }
      case "boolean": {
        if (typeof value === "string") {
          value = ["true", "yes", "1", "y"].includes(value.toLowerCase());
        }
        value = Boolean(value);
        break;
      }
      case "url": {
        try {
          new URL(value);
        } catch {
          confidence = Math.min(confidence, 0.2);
        }
        break;
      }
    }

    // Pattern validation
    if (
      field.validation?.pattern &&
      typeof value === "string"
    ) {
      const regex = new RegExp(field.validation.pattern);
      if (!regex.test(value)) {
        confidence = Math.min(confidence, 0.3);
      }
    }

    result.fields[field.name] = { value, confidence };
    totalConfidence += confidence;
    fieldCount++;
  }

  result.overallConfidence =
    fieldCount > 0 ? totalConfidence / fieldCount : 0;

  return result;
}

type ImageMediaType = "image/jpeg" | "image/png" | "image/gif" | "image/webp";

export async function extractTextFromFile(
  base64Data: string,
  mediaType: ImageMediaType | "application/pdf"
): Promise<string> {
  const extractPrompt = "Extract ALL text from this document/image. Return the complete text content, preserving structure where possible. Return ONLY the extracted text, no commentary.";

  // PDF uses document type; images use image type
  const contentBlock =
    mediaType === "application/pdf"
      ? {
          type: "document" as const,
          source: {
            type: "base64" as const,
            media_type: "application/pdf" as const,
            data: base64Data,
          },
        }
      : {
          type: "image" as const,
          source: {
            type: "base64" as const,
            media_type: mediaType as ImageMediaType,
            data: base64Data,
          },
        };

  const response = await anthropic.messages.create({
    model: "claude-sonnet-4-20250514",
    max_tokens: 4096,
    messages: [
      {
        role: "user",
        content: [
          contentBlock,
          { type: "text", text: extractPrompt },
        ],
      },
    ],
  });

  return response.content[0].type === "text" ? response.content[0].text : "";
}
