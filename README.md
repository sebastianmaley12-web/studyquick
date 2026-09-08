# StudyQuick

An HSC study app covering Modern History, Mathematics Standard 2, Health & Movement Science,
Business Studies, and Legal Studies — syllabus summaries, practice questions with answer plans,
quick-fire trivia, and self-marking quizzes, plus a cross-subject progress dashboard with spaced
repetition.

Originally a single-file HTML prototype (kept at `legacy/index.html` for reference), migrated to
React + Vite + TypeScript for maintainability, mobile-first layout, and room to grow.

## Stack

- React 19 + React Router 7, Vite + TypeScript
- Vitest + Testing Library for component tests, Playwright for browser verification
- ESLint (flat config) + Prettier
- Supabase (accounts, cross-device progress sync) + Stripe (subscriptions), both optional — see
  "Publishing & monetisation" below

## Development

```
npm install
npm run dev        # dev server
npm run build      # type-check + production build
npm run lint
npm test           # vitest
npm run test:e2e   # playwright
```

## Project layout

- `src/content/` — each subject's question/summary data as structured JSON, one file per topic
- `src/lib/content/` — typed accessors over that content, split by subject so each route only
  bundles the data it needs
- `src/lib/progressStore.ts` — the localStorage-backed progress store (byte-compatible with the
  original app's `studyquick.progress.v1` schema); `src/lib/progressSync.ts` mirrors it to
  Supabase for a signed-in user
- `src/lib/supabase/` — the Supabase client (`client.ts`, inert with no env vars set) and the
  database schema (`schema.sql`)
- `src/lib/entitlement.ts` — the paywall rule: one subject free forever, everything else needs a
  signed-in trial or an active subscription
- `src/context/AuthContext.tsx` — auth session state, wraps the whole app
- `api/` — Vercel serverless functions for Stripe Checkout, the billing portal, and the
  subscription webhook; not part of the Vite build, deployed independently by Vercel
- `src/components/`, `src/pages/`, `src/hooks/` — the app itself

## Status

All five subjects are content-complete against their real NESA HSC syllabuses (not a specific
trial's restricted scope). Accounts, cross-device sync, and a 7-day-trial-then-subscription
paywall are built and wired up, but **inert until configured** — with no Supabase project, every
subject stays free and the app behaves exactly as it did before any of this existed.

## Publishing & monetisation

The product model: one subject (`FREE_SUBJECT_ID` in `src/lib/entitlement.ts`, currently Modern
History) is free forever, no account needed. Creating an account starts a 7-day trial with full
access to every subject. After the trial, an active monthly subscription is required for anything
beyond the free subject. All of this is already built — turning it on is a matter of creating two
external accounts and setting environment variables, not writing code.

### 1. Supabase (accounts + progress sync)

1. Create a project at [supabase.com](https://supabase.com) (the free tier is enough to start).
2. In the SQL editor, run `src/lib/supabase/schema.sql` once — it creates the `profiles`,
   `progress` and `subscriptions` tables, their row-level security policies, and the trigger that
   provisions a row in each on signup.
3. From Project Settings → API, copy the Project URL and the `anon` `public` key into
   `VITE_SUPABASE_URL` / `VITE_SUPABASE_ANON_KEY`, and the `service_role` key into
   `SUPABASE_SERVICE_ROLE_KEY` (server-only — never prefix this one with `VITE_`).
4. By default, Supabase requires email confirmation on signup and sends it through its own
   shared, rate-limited mailer — fine for testing, but configure custom SMTP (Project Settings →
   Auth → SMTP Settings) before real users sign up at any volume.

### 2. Stripe (subscriptions)

1. Create a Stripe account at [stripe.com](https://stripe.com) — this needs your real identity
   and bank details (Stripe is the merchant of record), so it has to be done by whoever owns the
   business, not by an AI agent.
2. Create one recurring Product/Price for the subscription (Product catalog → Add product, billing
   period monthly). Copy its Price id (`price_...`) into `STRIPE_PRICE_ID`.
3. Copy the secret key (Developers → API keys) into `STRIPE_SECRET_KEY`.
4. Add a webhook endpoint (Developers → Webhooks) pointing at
   `https://<your-domain>/api/stripe-webhook`, subscribed to at least `checkout.session.completed`,
   `customer.subscription.updated`, and `customer.subscription.deleted`. Copy its signing secret
   into `STRIPE_WEBHOOK_SECRET`.
5. Update `src/lib/pricing.ts`'s `SUBSCRIPTION_PRICE_LABEL` to match whatever the Price actually
   charges — it's a display string only, not read from Stripe.
6. Start in Stripe's test mode end-to-end (test card `4242 4242 4242 4242`) before switching to
   live keys.

### 3. Wire it up

Set every variable from `.env.example` in the Vercel project (Settings → Environment Variables),
then redeploy. Everything degrades gracefully at each step — the app runs today with none of this
set, and stays fully functional if only Supabase (no Stripe) is configured, just without a working
"Subscribe" button.
