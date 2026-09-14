import type { McQuestion } from '../../lib/content/paper1'
import { computeTechniqueWeaknesses, weakTechniques } from '../../lib/content/paper1'
import { useProgress } from '../../lib/progressStore'
import type { EnglishTechnique } from '../../lib/content/english'

/** Adaptive revision (spec section 16): technique ids the student is
 * genuinely struggling with (answered at least twice, under 60%) each get
 * a "Revise: X" card with one click into a mini practice session filtered
 * to just that technique's questions — and a "Retry missed questions"
 * card covering every wrong answer across every practice mode so far. */
export function Paper1Revision({
  allQuestions,
  bank,
  onPractise,
}: {
  allQuestions: McQuestion[]
  bank: EnglishTechnique[]
  onPractise: (pool: McQuestion[], sessionKeySuffix: string, label: string) => void
}) {
  const progress = useProgress()
  const techniqueStats = computeTechniqueWeaknesses(allQuestions, progress.quiz, bank)
  const weak = weakTechniques(techniqueStats)

  const missed = allQuestions.filter((q) => progress.quiz[`paper1-${q.id}`]?.ok === false)

  return (
    <div className="q-p1-revision">
      <div className="q-chapter-subhead">Revise weak techniques</div>
      {weak.length === 0 ? (
        <div className="emptymsg">
          No techniques are flagged as weak yet — answer at least two questions for a technique below 60%
          accuracy to see it recommended here.
        </div>
      ) : (
        <div className="q-p1-revise-grid">
          {weak.map((w) => {
            const pool = allQuestions.filter((q) => q.quote.techniqueIds.includes(w.id))
            return (
              <div key={w.id} className="q-p1-revise-card">
                <div className="q-p1-revise-title">Revise: {w.label}</div>
                <div className="q-p1-revise-stat">
                  {w.correct}/{w.total} correct so far ({Math.round(w.accuracy * 100)}%)
                </div>
                <button
                  type="button"
                  className="cta"
                  onClick={() => onPractise(pool, `revise-${w.id}`, `Revise: ${w.label}`)}
                >
                  Practise this technique <span className="arw">&rarr;</span>
                </button>
              </div>
            )
          })}
        </div>
      )}

      <div className="q-chapter-subhead">Review missed questions</div>
      {missed.length === 0 ? (
        <div className="emptymsg">Nothing missed yet — incorrect answers across every practice mode will collect here.</div>
      ) : (
        <div className="q-p1-revise-card">
          <div className="q-p1-revise-title">{missed.length} missed question{missed.length === 1 ? '' : 's'}</div>
          <button
            type="button"
            className="cta"
            onClick={() => onPractise(missed, 'missed-questions', 'Review missed questions')}
          >
            Review now <span className="arw">&rarr;</span>
          </button>
        </div>
      )}

      <div className="q-chapter-subhead">Review difficult quotes</div>
      <p className="q-p1-revision-note">
        Quotes you've tagged <b>Shaky</b> or <b>Need to learn</b> in the Technique Bank or open-response
        practice stay tagged there — open the Technique Bank and filter by technique to revisit them.
      </p>
    </div>
  )
}
