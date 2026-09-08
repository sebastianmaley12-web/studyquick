/** Display-only — the actual charged amount comes from whatever Stripe Price
 * STRIPE_PRICE_ID (a server env var, see api/create-checkout-session.ts)
 * points to. Keep this in sync with that Price by hand; nothing reads it
 * back from Stripe at build time. */
export const SUBSCRIPTION_PRICE_LABEL = '$9.99/month'
