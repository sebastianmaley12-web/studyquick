import type { MouseEvent } from 'react'
import type { HistoryTriviaCard } from '../../lib/content'
import { progressStore, useTriviaConfidence } from '../../lib/progressStore'

type TriviaCardProps = {
  tid: string
  card: HistoryTriviaCard
  revealed: boolean
  onToggle: () => void
}

export function TriviaCard({ tid, card, revealed, onToggle }: TriviaCardProps) {
  const confidence = useTriviaConfidence(tid)

  function rate(value: 'known' | 'shaky', e: MouseEvent) {
    e.stopPropagation()
    progressStore.toggleTriviaConfidence(tid, value)
  }

  return (
    <div
      className={[
        'trivia-card',
        revealed && 'revealed',
        confidence === 'known' && 'mark-known',
        confidence === 'shaky' && 'mark-shaky',
      ]
        .filter(Boolean)
        .join(' ')}
      tabIndex={0}
      role="button"
      onClick={onToggle}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault()
          onToggle()
        }
      }}
    >
      <div className="tq">
        <span className="tn">{card.n}</span>
        <span dangerouslySetInnerHTML={{ __html: card.questionHtml }} />
      </div>
      <div className="hint">Tap to reveal</div>
      <div className="ta" dangerouslySetInnerHTML={{ __html: card.answerHtml }} />
      {revealed && (
        <div className="tconf">
          <button
            type="button"
            className={confidence === 'known' ? 'on-known' : ''}
            onClick={(e) => rate('known', e)}
          >
            Got it
          </button>
          <button
            type="button"
            className={confidence === 'shaky' ? 'on-shaky' : ''}
            onClick={(e) => rate('shaky', e)}
          >
            Still shaky
          </button>
        </div>
      )}
    </div>
  )
}
