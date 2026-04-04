import { NextRequest } from "next/server";
import { createDb } from "@/lib/db";
import { apiKeys, organizations } from "@/lib/db/schema";
import { eq, and } from "drizzle-orm";
import { createHash } from "crypto";

export type ApiKeyType = "pub" | "live";

export type AuthResult = {
  organizationId: string;
  keyType: ApiKeyType;
  keyId: string;
} | null;

function hashKey(key: string): string {
  return createHash("sha256").update(key).digest("hex");
}

export async function authenticateApiKey(
  request: NextRequest
): Promise<AuthResult> {
  // Check header first, then query param
  const authHeader = request.headers.get("authorization");
  const apiKey = authHeader?.startsWith("Bearer ")
    ? authHeader.slice(7)
    : request.nextUrl.searchParams.get("api_key");

  if (!apiKey) return null;

  // Validate key format
  const pubMatch = apiKey.match(/^iq_pub_/);
  const liveMatch = apiKey.match(/^iq_live_/);

  if (!pubMatch && !liveMatch) return null;

  const keyType: ApiKeyType = pubMatch ? "pub" : "live";
  const keyHash = hashKey(apiKey);

  const db = createDb();
  const [key] = await db
    .select()
    .from(apiKeys)
    .where(
      and(
        eq(apiKeys.keyHash, keyHash),
        eq(apiKeys.isRevoked, false)
      )
    )
    .limit(1);

  if (!key) return null;

  // Check expiry
  if (key.expiresAt && key.expiresAt < new Date()) return null;

  // Update last used
  await db
    .update(apiKeys)
    .set({ lastUsedAt: new Date() })
    .where(eq(apiKeys.id, key.id));

  return {
    organizationId: key.organizationId,
    keyType,
    keyId: key.id,
  };
}

export async function checkUsageLimit(
  organizationId: string
): Promise<{ allowed: boolean; used: number; limit: number }> {
  const db = createDb();
  const [org] = await db
    .select()
    .from(organizations)
    .where(eq(organizations.id, organizationId))
    .limit(1);

  if (!org) return { allowed: false, used: 0, limit: 0 };

  const limit110 = Math.floor(org.extractionsLimit * 1.1);
  return {
    allowed: org.extractionsUsed < limit110,
    used: org.extractionsUsed,
    limit: org.extractionsLimit,
  };
}

export async function incrementUsage(organizationId: string): Promise<void> {
  const db = createDb();
  const [org] = await db
    .select()
    .from(organizations)
    .where(eq(organizations.id, organizationId))
    .limit(1);

  if (org) {
    await db
      .update(organizations)
      .set({ extractionsUsed: org.extractionsUsed + 1 })
      .where(eq(organizations.id, organizationId));
  }
}

export function generateApiKey(type: ApiKeyType): {
  key: string;
  hash: string;
  prefix: string;
} {
  const chars =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let random = "";
  for (let i = 0; i < 32; i++) {
    random += chars[Math.floor(Math.random() * chars.length)];
  }

  const prefix = `iq_${type}_`;
  const key = prefix + random;
  const hash = hashKey(key);

  return { key, hash, prefix };
}
