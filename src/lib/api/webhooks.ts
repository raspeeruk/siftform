import { createHmac } from "crypto";
import { createDb } from "@/lib/db";
import { webhooks, webhookDeliveries } from "@/lib/db/schema";
import { eq, and } from "drizzle-orm";

const RETRY_DELAYS = [0, 30_000, 120_000, 600_000, 3_600_000]; // 0s, 30s, 2min, 10min, 1hr
const MAX_CONSECUTIVE_FAILURES = 10;

function signPayload(payload: string, secret: string): string {
  return createHmac("sha256", secret).update(payload).digest("hex");
}

export async function deliverWebhooks(
  organizationId: string,
  event: string,
  data: any
) {
  const db = createDb();

  const activeWebhooks = await db
    .select()
    .from(webhooks)
    .where(
      and(
        eq(webhooks.organizationId, organizationId),
        eq(webhooks.isActive, true)
      )
    );

  for (const webhook of activeWebhooks) {
    const events = (webhook.events || []) as string[];
    if (!events.includes(event)) continue;

    const payload = JSON.stringify({
      event,
      data,
      timestamp: new Date().toISOString(),
      webhook_id: webhook.id,
    });

    deliverSingle(webhook, payload, event, data.id).catch(console.error);
  }
}

async function deliverSingle(
  webhook: any,
  payload: string,
  event: string,
  submissionId?: string,
  attempt: number = 1
) {
  const db = createDb();
  const signature = signPayload(payload, webhook.secret);

  let statusCode: number | null = null;
  let responseBody: string | null = null;

  try {
    const response = await fetch(webhook.url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Sift-Signature": signature,
        "X-Sift-Event": event,
      },
      body: payload,
      signal: AbortSignal.timeout(10_000),
    });

    statusCode = response.status;
    responseBody = await response.text().catch(() => null);

    if (response.ok) {
      // Success — reset failure counter
      await db
        .update(webhooks)
        .set({
          consecutiveFailures: 0,
          lastDeliveredAt: new Date(),
          updatedAt: new Date(),
        })
        .where(eq(webhooks.id, webhook.id));
    } else {
      throw new Error(`HTTP ${statusCode}`);
    }
  } catch (error) {
    // Increment failure counter
    const newFailures = (webhook.consecutiveFailures || 0) + 1;

    await db
      .update(webhooks)
      .set({
        consecutiveFailures: newFailures,
        isActive: newFailures < MAX_CONSECUTIVE_FAILURES,
        updatedAt: new Date(),
      })
      .where(eq(webhooks.id, webhook.id));

    // Schedule retry
    if (attempt < RETRY_DELAYS.length) {
      const delay = RETRY_DELAYS[attempt];
      if (delay > 0) {
        setTimeout(() => {
          deliverSingle(
            { ...webhook, consecutiveFailures: newFailures },
            payload,
            event,
            submissionId,
            attempt + 1
          ).catch(console.error);
        }, delay);
      }
    }
  }

  // Log delivery
  await db.insert(webhookDeliveries).values({
    webhookId: webhook.id,
    submissionId: submissionId || null,
    event,
    payload: JSON.parse(payload),
    statusCode,
    responseBody,
    attempt,
    deliveredAt: statusCode ? new Date() : null,
  });
}
