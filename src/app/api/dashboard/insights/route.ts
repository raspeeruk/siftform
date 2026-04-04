import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { createDb } from "@/lib/db";
import { submissions, schemas, organizations } from "@/lib/db/schema";
import { eq, desc, count, avg, sql } from "drizzle-orm";

export async function GET() {
  const session = await auth();
  const orgId = (session as any)?.organizationId;
  if (!orgId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const db = createDb();

  // Total submissions
  const [totalResult] = await db
    .select({ count: count() })
    .from(submissions)
    .where(eq(submissions.organizationId, orgId));

  // Average confidence
  const [avgResult] = await db
    .select({ avg: avg(submissions.overallConfidence) })
    .from(submissions)
    .where(eq(submissions.organizationId, orgId));

  // Per-schema breakdown
  const schemaBreakdown = await db
    .select({
      schemaId: submissions.schemaId,
      schemaName: schemas.name,
      count: count(),
      avgConfidence: avg(submissions.overallConfidence),
    })
    .from(submissions)
    .innerJoin(schemas, eq(submissions.schemaId, schemas.id))
    .where(eq(submissions.organizationId, orgId))
    .groupBy(submissions.schemaId, schemas.name);

  // Status breakdown
  const statusBreakdown = await db
    .select({
      status: submissions.status,
      count: count(),
    })
    .from(submissions)
    .where(eq(submissions.organizationId, orgId))
    .groupBy(submissions.status);

  // Recent 7 days daily counts
  const dailyCounts = await db
    .select({
      date: sql<string>`DATE(${submissions.createdAt})`,
      count: count(),
    })
    .from(submissions)
    .where(eq(submissions.organizationId, orgId))
    .groupBy(sql`DATE(${submissions.createdAt})`)
    .orderBy(desc(sql`DATE(${submissions.createdAt})`))
    .limit(7);

  // Usage info
  const [org] = await db
    .select()
    .from(organizations)
    .where(eq(organizations.id, orgId))
    .limit(1);

  return NextResponse.json({
    total: totalResult?.count || 0,
    averageConfidence: avgResult?.avg ? Number(avgResult.avg) : 0,
    schemaBreakdown,
    statusBreakdown,
    dailyCounts: dailyCounts.reverse(),
    usage: org
      ? {
          used: org.extractionsUsed,
          limit: org.extractionsLimit,
          plan: org.plan,
        }
      : null,
  });
}
