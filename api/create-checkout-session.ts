import type { VercelRequest, VercelResponse } from '@vercel/node'
import { getStripe, getSupabaseAdmin, getAppUrl, getBearerUser } from './_lib/util'

/** Starts a Stripe Checkout session for the signed-in user's subscription.
 * Called by src/pages/Account.tsx, which redirects the browser to the
 * returned `url`. Requires STRIPE_SECRET_KEY and STRIPE_PRICE_ID (a
 * recurring Price id from the Stripe dashboard) to be set. */
export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' })
    return
  }

  const priceId = process.env.STRIPE_PRICE_ID
  if (!priceId) {
    res.status(500).json({ error: 'Subscriptions are not configured yet.' })
    return
  }

  const user = await getBearerUser(req)
  if (!user || !user.email) {
    res.status(401).json({ error: 'Sign in required.' })
    return
  }

  try {
    const stripe = getStripe()
    const supabaseAdmin = getSupabaseAdmin()
    const appUrl = getAppUrl(req)

    const { data: row } = await supabaseAdmin
      .from('subscriptions')
      .select('stripe_customer_id')
      .eq('user_id', user.id)
      .single()

    let customerId = row?.stripe_customer_id as string | null | undefined
    if (!customerId) {
      const customer = await stripe.customers.create({
        email: user.email,
        metadata: { supabase_user_id: user.id },
      })
      customerId = customer.id
      await supabaseAdmin
        .from('subscriptions')
        .update({ stripe_customer_id: customerId })
        .eq('user_id', user.id)
    }

    const session = await stripe.checkout.sessions.create({
      mode: 'subscription',
      customer: customerId,
      client_reference_id: user.id,
      line_items: [{ price: priceId, quantity: 1 }],
      success_url: `${appUrl}/account?checkout=success`,
      cancel_url: `${appUrl}/account?checkout=cancelled`,
      subscription_data: { metadata: { supabase_user_id: user.id } },
    })

    res.status(200).json({ url: session.url })
  } catch (err) {
    console.error('create-checkout-session failed', err)
    res.status(500).json({ error: 'Could not start checkout.' })
  }
}
