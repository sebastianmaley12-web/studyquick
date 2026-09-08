import type { VercelRequest, VercelResponse } from '@vercel/node'
import { getStripe, getSupabaseAdmin, getAppUrl, getBearerUser } from './_lib/util'

/** Opens the Stripe customer billing portal for the signed-in user, so they
 * can update payment details or cancel — Stripe hosts this entirely, we
 * just need the customer id. Called by src/pages/Account.tsx. */
export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' })
    return
  }

  const user = await getBearerUser(req)
  if (!user) {
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

    const customerId = row?.stripe_customer_id as string | null | undefined
    if (!customerId) {
      res.status(400).json({ error: 'No subscription on file yet.' })
      return
    }

    const session = await stripe.billingPortal.sessions.create({
      customer: customerId,
      return_url: `${appUrl}/account`,
    })

    res.status(200).json({ url: session.url })
  } catch (err) {
    console.error('create-portal-session failed', err)
    res.status(500).json({ error: 'Could not open billing.' })
  }
}
