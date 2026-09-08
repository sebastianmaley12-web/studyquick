import type { VercelRequest, VercelResponse } from '@vercel/node'
import type Stripe from 'stripe'
import { getStripe, getSupabaseAdmin, readRawBody } from './_lib/util'

// Belt-and-suspenders: makes sure Vercel never pre-parses this request body,
// since Stripe's signature check needs the exact raw bytes. readRawBody()
// below is what actually guarantees this — this config is a documented
// safeguard on top of it for the Node runtime.
export const config = {
  api: { bodyParser: false },
}

/** Stripe calls this on subscription lifecycle events. Configure the
 * endpoint URL as `<your-domain>/api/stripe-webhook` in the Stripe dashboard
 * (or `stripe listen` for local testing), subscribed to at least:
 * checkout.session.completed, customer.subscription.updated,
 * customer.subscription.deleted. */
export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    res.status(405).end()
    return
  }

  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET
  const signature = req.headers['stripe-signature']
  if (!webhookSecret || typeof signature !== 'string') {
    res.status(500).json({ error: 'Webhook not configured.' })
    return
  }

  const stripe = getStripe()
  let event: Stripe.Event
  try {
    const rawBody = await readRawBody(req)
    event = stripe.webhooks.constructEvent(rawBody, signature, webhookSecret)
  } catch (err) {
    console.error('stripe-webhook signature verification failed', err)
    res.status(400).json({ error: 'Invalid signature.' })
    return
  }

  const supabaseAdmin = getSupabaseAdmin()

  try {
    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object as Stripe.Checkout.Session
        if (session.mode !== 'subscription' || !session.subscription) break
        const subscription = await stripe.subscriptions.retrieve(session.subscription as string)
        await upsertFromSubscription(subscription)
        break
      }
      case 'customer.subscription.updated':
      case 'customer.subscription.deleted': {
        const subscription = event.data.object as Stripe.Subscription
        await upsertFromSubscription(subscription)
        break
      }
      default:
        break
    }
  } catch (err) {
    console.error(`stripe-webhook failed handling ${event.type}`, err)
    res.status(500).json({ error: 'Webhook handler failed.' })
    return
  }

  res.status(200).json({ received: true })

  async function upsertFromSubscription(subscription: Stripe.Subscription) {
    const status = mapStatus(subscription.status)
    const customerId =
      typeof subscription.customer === 'string' ? subscription.customer : subscription.customer.id
    const periodEndSeconds = subscription.items.data[0]?.current_period_end
    await supabaseAdmin
      .from('subscriptions')
      .update({
        status,
        stripe_subscription_id: subscription.id,
        current_period_end: periodEndSeconds
          ? new Date(periodEndSeconds * 1000).toISOString()
          : null,
        updated_at: new Date().toISOString(),
      })
      .eq('stripe_customer_id', customerId)
  }
}

/** Stripe's statuses are finer-grained than ours — collapse to the four
 * this app actually branches on (see schema.sql's subscriptions.status
 * check constraint). `trialing` maps to 'active': that's Stripe's own
 * trial concept, distinct from this app's signup-based trial_ends_at, and
 * either way it means the subscription currently grants access. */
function mapStatus(stripeStatus: Stripe.Subscription.Status): 'active' | 'past_due' | 'canceled' {
  switch (stripeStatus) {
    case 'active':
    case 'trialing':
      return 'active'
    case 'past_due':
    case 'unpaid':
      return 'past_due'
    default:
      return 'canceled'
  }
}
