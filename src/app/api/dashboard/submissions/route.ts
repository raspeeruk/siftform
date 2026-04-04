import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { createDb } from "@/lib/db";
import { submissions } from "@/lib/db/schema";
import { eq, desc } from "drizzle-orm";

export async function GET() {
  const session = await auth();
  const orgId = (session as any)?.organizationId;
  if (!orgId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const db = createDb();
  const results = await db
    .select()
    .from(submissions)
    .where(eq(submissions.organizationId, orgId))
    .orderBy(desc(submissions.createdAt))
    .limit(100);

  return NextResponse.json(results);
}
