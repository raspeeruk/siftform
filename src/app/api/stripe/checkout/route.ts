import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { createDb } from "@/lib/db";
import { organizations } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { stripe, PlanId } from "@/lib/stripe";

export async function POST(request: NextRequest) {
  const session = await auth();
  const orgId = (session as any)?.organizationId;
  if (!orgId || !session?.user?.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { plan } = await request.json();
  if (!["starter", "growth", "scale"].includes(plan)) {
    return NextResponse.json({ error: "Invalid plan" }, { status: 400 });
  }

  const db = createDb();
  const [org] = await db
    .select()
    .from(organizations)
    .where(eq(organizations.id, orgId))
    .limit(1);

  if (!org) {
    return NextResponse.json({ error: "Org not found" }, { status: 404 });
  }

  // Create or get Stripe customer
  let customerId = org.stripeCustomerId;
  if (!customerId) {
    const customer = await stripe.customers.create({
      email: session.user.email,
      metadata: { organization_id: orgId },
    });
    customerId = customer.id;
    await db
      .update(organizations)
      .set({ stripeCustomerId: customerId })
      .where(eq(organizations.id, orgId));
  }

  // Look up or create price
  const priceId = await getOrCreatePrice(plan as PlanId);

  const checkoutSession = await stripe.checkout.sessions.create({
    customer: customerId,
    mode: "subscription",
    line_items: [{ price: priceId, quantity: 1 }],
    success_url: `${process.env.AUTH_URL || "https://siftforms.com"}/dashboard/billing?success=true`,
    cancel_url: `${process.env.AUTH_URL || "https://siftforms.com"}/dashboard/billing`,
    metadata: { organization_id: orgId, plan },
  });

  return NextResponse.json({ url: checkoutSession.url });
}

async function getOrCreatePrice(plan: PlanId): Promise<string> {
  const { PLANS } = await import("@/lib/stripe");
  const planConfig = PLANS[plan];

  // Search for existing price
  const prices = await stripe.prices.list({
    lookup_keys: [`sift_${plan}`],
    active: true,
    limit: 1,
  });

  if (prices.data.length > 0) return prices.data[0].id;

  // Create product + price
  const product = await stripe.products.create({
    name: `Sift ${planConfig.name}`,
    metadata: { plan },
  });

  const price = await stripe.prices.create({
    product: product.id,
    unit_amount: planConfig.price,
    currency: "usd",
    recurring: { interval: "month" },
    lookup_key: `sift_${plan}`,
  });

  return price.id;
}
