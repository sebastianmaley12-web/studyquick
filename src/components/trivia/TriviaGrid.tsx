import { useEffect, useState } from 'react'
import type { HistoryTriviaCard } from '../../lib/content/modernHistory'
import { useProgress } from '../../lib/progressStore'
import { triviaKey } from '../../lib/keys'
import { onRevealRequest } from '../../lib/searchRevealBus'
import { TriviaCard } from './TriviaCard'
import { TriviaTest } from './TriviaTest'

type Filter = 'all' | 'shaky'

export function TriviaGrid({
  subject,
  topicId,
  cards,
}: {
  subject: string
  topicId: string
  cards: HistoryTriviaCard[]
}) {
  const progress = useProgress()
  const [filter, setFilter] = useState<Filter>('all')
  const [testMode, setTestMode] = useState(false)
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

  // lets a search-result jump reveal a not-yet-revealed card (see searchRevealBus)
  useEffect(() => {
    return onRevealRequest((tid) => {
      const match = tid.match(/^(.+)-trivia#(\d+)$/)
      if (match && match[1] === topicId) {
        const i = Number(match[2])
        setRevealed((prev) => new Set(prev).add(i))
      }
    })
  }, [topicId])

  if (testMode) {
    return (
      <TriviaTest
        subject={subject}
        topicId={topicId}
        cards={cards}
        onExit={() => setTestMode(false)}
      />
    )
  }

  return (
    <>
      <div className="trivia-toolbar">
        <span className="trivia-count">
          {cards.length} quick-fire questions &middot; tap a card to reveal the answer
        </span>
        <div className="trivia-actions">
          <button type="button" className="btn on" onClick={() => setTestMode(true)}>
            Test mode
          </button>
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
