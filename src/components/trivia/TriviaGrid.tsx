import { useState } from 'react'
import type { HistoryTriviaCard } from '../../lib/content'
import { useProgress } from '../../lib/progressStore'
import { triviaKey } from '../../lib/keys'
import { TriviaCard } from './TriviaCard'

type Filter = 'all' | 'shaky'

export function TriviaGrid({ topicId, cards }: { topicId: string; cards: HistoryTriviaCard[] }) {
  const progress = useProgress()
  const [filter, setFilter] = useState<Filter>('all')
  // cards already rated start revealed, matching the original's initial-render behavior
  const [revealed, setRevealed] = useState<Set<number>>(() => {
    const initial = new Set<number>()
    cards.forEach((_, i) => {
      if (progress.trivia[triviaKey(topicId, i)]) initial.add(i)
    })
    return initial
  })

  const shakyCount = cards.filter(
    (_, i) => progress.trivia[triviaKey(topicId, i)] === 'shaky',
  ).length

  function toggle(i: number) {
    setRevealed((prev) => {
      const next = new Set(prev)
      if (next.has(i)) next.delete(i)
      else next.add(i)
      return next
    })
  }

  return (
    <>
      <div className="trivia-toolbar">
        <span className="trivia-count">
          {cards.length} quick-fire questions &middot; tap a card to reveal the answer
        </span>
        <div className="trivia-actions">
          <button
            type="button"
            className={`btn ${filter === 'all' ? 'on' : ''}`}
            onClick={() => setFilter('all')}
          >
            All cards
          </button>
          <button
            type="button"
            className={`btn ${filter === 'shaky' ? 'on' : ''}`}
            onClick={() => setFilter('shaky')}
          >
            Shaky only <span className="n">{shakyCount}</span>
          </button>
          <button
            type="button"
            className="trivia-reveal-all"
            onClick={() => setRevealed(new Set(cards.map((_, i) => i)))}
          >
            Reveal all
          </button>
          <button type="button" className="trivia-hide-all" onClick={() => setRevealed(new Set())}>
            Hide all
          </button>
        </div>
      </div>
      <div className="trivia-grid">
        {cards.map((card, i) => {
          if (filter === 'shaky' && progress.trivia[triviaKey(topicId, i)] !== 'shaky') return null
          return (
            <TriviaCard
              key={i}
              tid={triviaKey(topicId, i)}
              card={card}
              revealed={revealed.has(i)}
              onToggle={() => toggle(i)}
            />
          )
        })}
      </div>
    </>
  )
}
