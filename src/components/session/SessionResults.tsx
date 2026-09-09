/**
 * Shared completion screen for any sequential session. No predicted-mark
 * claims (per the product spec) — just what was actually answered, and
 * clear next actions. `sectionBreakdown` is optional: pass it when the
 * underlying pool has a meaningful sub-grouping (e.g. Maths dot points),
 * omit it otherwise rather than fabricating a grouping that isn't there.
 */
export function SessionResults({
  sectionLabel,
  correct,
  total,
  sectionBreakdown,
  hasIncorrect,
  onRetryIncorrect,
  onReview,
  onBackToTopic,
  onNewAttempt,
}: {
  sectionLabel: string
  correct: number
  total: number
  sectionBreakdown?: { label: string; correct: number; total: number }[]
  hasIncorrect: boolean
  onRetryIncorrect: () => void
  onReview: () => void
  onBackToTopic: () => void
  onNewAttempt: () => void
}) {
  const pct = total ? Math.round((correct / total) * 100) : 0
  const strong = sectionBreakdown?.filter((s) => s.total > 0 && s.correct / s.total >= 0.8) ?? []
  const weak = sectionBreakdown?.filter((s) => s.total > 0 && s.correct / s.total < 0.5) ?? []

  return (
    <div className="results-card">
      <div className="results-card-eyebrow">{sectionLabel} — complete</div>
      <div className="results-score-row">
        <span className="results-score-frac">
          {correct} / {total}
        </span>
        <span className="results-score-pct">{pct}%</span>
      </div>
      <div className="results-breakdown-row">
        <span className="results-tag ok">Correct: {correct}</span>
        <span className="results-tag no">Incorrect: {total - correct}</span>
      </div>

      {(strong.length > 0 || weak.length > 0) && (
        <div className="results-areas">
          {strong.length > 0 && (
            <div>
              <div className="results-areas-label ok">Strong areas</div>
              <ul>
                {strong.map((s) => (
                  <li key={s.label}>{s.label}</li>
                ))}
              </ul>
            </div>
          )}
          {weak.length > 0 && (
            <div>
              <div className="results-areas-label no">Needs revision</div>
              <ul>
                {weak.map((s) => (
                  <li key={s.label}>{s.label}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}

      <div className="results-actions">
        {hasIncorrect && (
          <button className="cta" type="button" onClick={onRetryIncorrect}>
            Retry incorrect
          </button>
        )}
        <button className="pub-btn-ghost" type="button" onClick={onReview}>
          Review answers
        </button>
        <button className="pub-btn-ghost" type="button" onClick={onNewAttempt}>
          Start new attempt
        </button>
        <button className="text-link" type="button" onClick={onBackToTopic}>
          Back to topic
        </button>
      </div>
    </div>
  )
}
