import Stripe from "stripe";

let _stripe: Stripe | null = null;

export function getStripe(): Stripe {
  if (!_stripe) {
    _stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
      apiVersion: "2025-04-30.basil",
    });
  }
  return _stripe;
}

// Backwards compat: lazy proxy
export const stripe = new Proxy({} as Stripe, {
  get(_target, prop) {
    return (getStripe() as any)[prop];
  },
});

export const PLANS = {
  free: {
    name: "Free",
    price: 0,
    extractions: 50,
    schemas: 1,
    webhooks: 0,
    apiAccess: false,
  },
  starter: {
    name: "Starter",
    price: 2900,
    extractions: 500,
    schemas: 3,
    webhooks: 1,
    apiAccess: false,
  },
  growth: {
    name: "Growth",
    price: 7900,
    extractions: 2000,
    schemas: -1,
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
