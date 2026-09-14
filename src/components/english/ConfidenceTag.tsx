import { progressStore, useTriviaConfidence, type TriviaConfidence } from '../../lib/progressStore'

const OPTIONS: { value: TriviaConfidence; label: string }[] = [
  { value: 'known', label: 'Known' },
  { value: 'shaky', label: 'Shaky' },
  { value: 'learn', label: 'Need to learn' },
]

/** The Known / Shaky / Need-to-learn tag used on every quote, technique and
 * theme card — one small reusable control instead of re-implementing the
 * three-state toggle per content type. Persists via the same trivia
 * confidence slice every other subject's flashcards already use. */
export function ConfidenceTag({ tagKey }: { tagKey: string }) {
  const confidence = useTriviaConfidence(tagKey)

  return (
    <div className="q-confidence" role="group" aria-label="Your confidence with this">
      {OPTIONS.map((opt) => (
        <button
          key={opt.value}
          type="button"
          className={['q-confidence-btn', opt.value, confidence === opt.value && 'on']
            .filter(Boolean)
            .join(' ')}
          onClick={() => progressStore.toggleTriviaConfidence(tagKey, opt.value)}
        >
          {opt.label}
        </button>
      ))}
    </div>
  )
}
