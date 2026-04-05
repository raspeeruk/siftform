import { NextRequest, NextResponse } from "next/server";
import { stripe, PLANS, PlanId } from "@/lib/stripe";
import { createDb } from "@/lib/db";
import { organizations, subscriptions } from "@/lib/db/schema";
import { eq } from "drizzle-orm";

export async function POST(request: NextRequest) {
  const body = await request.text();
  const sig = request.headers.get("stripe-signature");

  if (!sig) {
    return NextResponse.json({ error: "Missing signature" }, { status: 400 });
  }

  let event;
  try {
    event = stripe.webhooks.constructEvent(
      body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch {
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  const db = createDb();

  switch (event.type) {
    case "checkout.session.completed": {
      const session = event.data.object as any;
      const orgId = session.metadata?.organization_id;
      const plan = (session.metadata?.plan || "starter") as PlanId;

      if (orgId && session.subscription) {
        const sub = (await stripe.subscriptions.retrieve(
          session.subscription as string
        )) as any;

        await db
          .update(organizations)
          .set({
            plan,
            extractionsLimit: PLANS[plan].extractions,
            extractionsUsed: 0,
            billingPeriodStart: new Date(sub.current_period_start * 1000),
            billingPeriodEnd: new Date(sub.current_period_end * 1000),
          })
          .where(eq(organizations.id, orgId));

        await db.insert(subscriptions).values({
          organizationId: orgId,
          stripeSubscriptionId: sub.id,
          stripePriceId: sub.items.data[0]?.price.id,
          status: sub.status,
          currentPeriodStart: new Date(sub.current_period_start * 1000),
          currentPeriodEnd: new Date(sub.current_period_end * 1000),
        });
      }
      break;
    }

    case "invoice.paid": {
      const invoice = event.data.object as any;
      if (invoice.subscription) {
        const sub = (await stripe.subscriptions.retrieve(
          invoice.subscription as string
        )) as any;
        const orgId = sub.metadata?.organization_id;

        if (orgId) {
          await db
            .update(organizations)
            .set({
              extractionsUsed: 0,
              billingPeriodStart: new Date(sub.current_period_start * 1000),
              billingPeriodEnd: new Date(sub.current_period_end * 1000),
            })
            .where(eq(organizations.id, orgId));
        }
      }
      break;
    }

    case "customer.subscription.updated": {
      const sub = event.data.object as any;
      await db
        .update(subscriptions)
        .set({
          status: sub.status,
          currentPeriodStart: new Date(sub.current_period_start * 1000),
          currentPeriodEnd: new Date(sub.current_period_end * 1000),
          cancelAtPeriodEnd: sub.cancel_at_period_end,
          updatedAt: new Date(),
        })
        .where(eq(subscriptions.stripeSubscriptionId, sub.id));
      break;
    }

    case "customer.subscription.deleted": {
      const sub = event.data.object as any;
      const orgCustomerId = sub.customer as string;

      const [org] = await db
        .select()
        .from(organizations)
        .where(eq(organizations.stripeCustomerId, orgCustomerId))
        .limit(1);

      if (org) {
        await db
          .update(organizations)
          .set({
            plan: "free",
            extractionsLimit: PLANS.free.extractions,
          })
          .where(eq(organizations.id, org.id));
      }

      await db
        .update(subscriptions)
        .set({ status: "canceled", updatedAt: new Date() })
        .where(eq(subscriptions.stripeSubscriptionId, sub.id));
      break;
    }
  }

  return NextResponse.json({ received: true });
}
