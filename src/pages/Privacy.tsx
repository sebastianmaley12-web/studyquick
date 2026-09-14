/**
 * Privacy Policy. Data categories described here are drawn directly from
 * the actual schema (src/lib/supabase/schema.sql) and AuthContext/Onboarding
 * flow, not a generic template — keep this in sync if the schema changes.
 * PLACEHOLDER fields need the operator's actual details before publishing.
 */
const PLACEHOLDER = {
  entityName: '[Your business or legal name]',
  contactEmail: '[your contact email]',
}

export function Privacy() {
  return (
    <div className="legal-page">
      <span className="mkt-eyebrow">Legal</span>
      <h1>Privacy Policy</h1>
      <p className="legal-updated">Last updated: [date you publish this]</p>
      <p className="legal-draft-notice">
        <b>Draft — not final.</b> The business name and contact details below are placeholders and
        haven't been filled in yet. Don't rely on this page as StudyQuick's actual privacy policy
        until it's been finalised and this notice is removed.
      </p>

      <p>
        This explains what StudyQuick collects, why, and how it's stored. StudyQuick is operated
        by {PLACEHOLDER.entityName}.
      </p>

      <h2>What we collect</h2>
      <p>When you create an account, we collect:</p>
      <ul>
        <li>Your email address and password (used for sign-in, via Supabase Auth).</li>
        <li>
          Your onboarding answers — display name, year (11 or 12), the subjects you're studying,
          your focus subject, and your stated improvement goal, study style and biggest challenge.
          These personalise what the app shows you; they aren't shared or sold.
        </li>
        <li>
          Your study activity — quiz and trivia answers, saved notes, maths results, and spaced-
          review scheduling — so your progress follows you across devices once you're signed in.
        </li>
        <li>
          Subscription status and billing reference IDs (from Stripe) — not your card details,
          which Stripe collects and stores directly and we never see.
        </li>
      </ul>

      <h2>What we don't collect</h2>
      <p>
        We don't collect your card number or other payment details — that goes straight to Stripe.
        If you're not signed in, nothing you do in the app leaves your device; progress is saved
        only in your browser's local storage.
      </p>

      <h2>How it's stored</h2>
      <p>
        Account and progress data is stored in Supabase (a hosted Postgres database), protected by
        row-level security so you can only ever read or write your own data. Payment processing is
        handled by Stripe under its own privacy policy.
      </p>

      <h2>How it's used</h2>
      <p>
        We use your data to run the Service: authenticating you, syncing your progress, tailoring
        what's shown based on your onboarding answers, and managing your subscription. We don't
        sell your data, and we don't share it with third parties except the service providers
        above (Supabase, Stripe) who need it to make the Service work.
      </p>

      <h2>Your choices</h2>
      <p>
        You can reset all locally-saved progress at any time from the app's footer. To delete your
        account and associated data entirely, contact {PLACEHOLDER.contactEmail}.
      </p>

      <h2>Children's privacy</h2>
      <p>
        StudyQuick is built for students studying towards the HSC, many of whom are under 18. We
        only collect what's described above, and only what's needed to run the Service. If you're
        a parent or guardian with questions about your child's account, contact us at{' '}
        {PLACEHOLDER.contactEmail}.
      </p>

      <h2>Changes</h2>
      <p>
        If we make a material change to this policy, we'll make reasonable efforts to let you know
        before it takes effect.
      </p>

      <h2>Contact</h2>
      <p>Questions about this policy: {PLACEHOLDER.contactEmail}</p>
    </div>
  )
}
