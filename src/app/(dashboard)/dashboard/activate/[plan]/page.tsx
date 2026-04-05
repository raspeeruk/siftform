import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { createDb } from "@/lib/db";
import { organizations } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { stripe, PLANS, PlanId } from "@/lib/stripe";

export default async function ActivatePage({
  params,
}: {
  params: Promise<{ plan: string }>;
}) {
  const { plan } = await params;

  // Validate plan
  if (!["starter", "growth", "scale"].includes(plan)) {
    redirect("/dashboard/billing");
  }

  const session = await auth();
  const orgId = (session as any)?.organizationId;
  if (!orgId || !session?.user?.email) {
    redirect("/login");
  }

  const db = createDb();
  const [org] = await db
    .select()
    .from(organizations)
    .where(eq(organizations.id, orgId))
    .limit(1);

  if (!org) {
    redirect("/dashboard/billing");
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
  const planConfig = PLANS[plan as PlanId];
  const prices = await stripe.prices.list({
    lookup_keys: [`sift_${plan}`],
    active: true,
    limit: 1,
  });

  let priceId: string;
  if (prices.data.length > 0) {
    priceId = prices.data[0].id;
  } else {
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
    priceId = price.id;
  }

  const baseUrl = process.env.AUTH_URL || "https://siftforms.com";
  const checkoutSession = await stripe.checkout.sessions.create({
    customer: customerId,
    mode: "subscription",
    line_items: [{ price: priceId, quantity: 1 }],
    success_url: `${baseUrl}/dashboard/billing?success=true`,
    cancel_url: `${baseUrl}/dashboard/billing`,
    metadata: { organization_id: orgId, plan },
  });

  redirect(checkoutSession.url!);
}
