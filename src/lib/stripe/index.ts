import Stripe from "stripe";

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2025-04-30.basil",
});

export const PLANS = {
  starter: {
    name: "Starter",
    price: 2900, // cents
    extractions: 500,
    schemas: 1,
    webhooks: 1,
    apiAccess: false,
  },
  growth: {
    name: "Growth",
    price: 7900,
    extractions: 2000,
    schemas: -1, // unlimited
    webhooks: 5,
    apiAccess: true,
  },
  scale: {
    name: "Scale",
    price: 19900,
    extractions: 10000,
    schemas: -1,
    webhooks: -1,
    apiAccess: true,
  },
} as const;

export type PlanId = keyof typeof PLANS;
