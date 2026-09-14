import { SUBSCRIPTION_PRICE_LABEL } from '../lib/pricing'

/**
 * Terms of Service, including billing/refund terms as a section rather than
 * a separate page — standard for a single-plan subscription product like
 * this one. Several fields are placeholders (marked in [brackets]) that
 * need the operator's actual business details before this is ready to
 * publish — see the PLACEHOLDER constants below, all gathered in one place
 * so they're easy to find and fill in.
 */
const PLACEHOLDER = {
  entityName: '[Your business or legal name]',
  contactEmail: '[your contact email]',
  jurisdiction: '[your state/territory], Australia',
}

export function Terms() {
  return (
    <div className="legal-page">
      <span className="mkt-eyebrow">Legal</span>
      <h1>Terms of Service</h1>
      <p className="legal-updated">Last updated: [date you publish this]</p>
      <p className="legal-draft-notice">
        <b>Draft — not final.</b> The business name, jurisdiction and contact details below are
        placeholders and haven't been filled in yet. Don't rely on this page as StudyQuick's actual
        terms until it's been finalised and this notice is removed.
      </p>

      <p>
        These Terms govern your use of StudyQuick (the &ldquo;Service&rdquo;), operated by{' '}
        {PLACEHOLDER.entityName} (&ldquo;we&rdquo;, &ldquo;us&rdquo;). By creating an account or
        using the Service, you agree to these Terms.
      </p>

      <h2>1. What StudyQuick is</h2>
      <p>
        StudyQuick is a self-guided HSC study tool — practice questions, quizzes, trivia and
        summaries across Modern History, Mathematics Standard 2, Health and Movement Science,
        Business Studies and Legal Studies. It is an independent study aid, not official HSC or
        NESA material, and is not affiliated with or endorsed by NESA or any school.
      </p>

      <h2>2. Accounts</h2>
      <p>
        You need an account to use the Service. You're responsible for keeping your login secure
        and for all activity under your account. You must provide accurate information when
        signing up.
      </p>
      <p>
        StudyQuick is intended for students studying towards the HSC, most of whom are under 18.
        If you are under the age required to agree to these Terms on your own in{' '}
        {PLACEHOLDER.jurisdiction}, a parent or guardian should review and agree to these Terms on
        your behalf before you subscribe.
      </p>

      <h2>3. Subscription, billing and free trial</h2>
      <p>
        New accounts get a 7-day free trial of one subject, chosen during onboarding. After the
        trial, that subject locks unless you subscribe. A StudyQuick Unlimited subscription is{' '}
        {SUBSCRIPTION_PRICE_LABEL}, billed automatically until you cancel, and unlocks every
        subject.
      </p>
      <p>
        Payments are processed by Stripe. We don't store your card details — Stripe handles that
        directly. You can cancel any time from your account; cancelling stops future billing, and
        you keep access until the end of the billing period you've already paid for.
      </p>

      <h2>4. Refunds</h2>
      <p>
        The 7-day free trial is designed to let you try StudyQuick before paying anything, so as a
        general rule we don't offer refunds for a subscription period that's already started once
        you've been charged. If you believe you were charged in error, or something's genuinely
        gone wrong on our end, contact {PLACEHOLDER.contactEmail} and we'll sort it out.
      </p>

      <h2>5. Acceptable use</h2>
      <p>
        Don't share your account, scrape or redistribute the content, or use the Service in any
        way that's unlawful or interferes with other users. We can suspend or terminate accounts
        that breach these Terms.
      </p>

      <h2>6. Content and accuracy</h2>
      <p>
        We aim for every question and answer to be accurate, but StudyQuick is a study aid, not a
        guarantee of any particular exam outcome, and content may contain errors despite our best
        efforts. Always check anything you're unsure about against the official NESA syllabus and
        your own teacher's guidance.
      </p>

      <h2>7. Changes</h2>
      <p>
        We may update these Terms or the Service from time to time. If we make a material change,
        we'll make reasonable efforts to let you know (e.g. by email or an in-app notice) before it
        takes effect.
      </p>

      <h2>8. Contact</h2>
      <p>Questions about these Terms: {PLACEHOLDER.contactEmail}</p>
    </div>
  )
}
