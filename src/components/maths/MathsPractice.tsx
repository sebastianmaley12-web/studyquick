import { lazy, Suspense, useState } from 'react'
import type { MathsTopic } from '../../lib/content/maths'
import { progressStore, useProgress } from '../../lib/progressStore'
import { mathsKey } from '../../lib/keys'
import { MathsQuestion } from './MathsQuestion'
import { MATHS_WORKSPACE_ENTRIES } from '../../lib/content/mathsWorkspace'

/* KaTeX is a sizeable dependency (fonts + JS), so it's only worth loading
 * for the small number of topics that actually have a workspace-enhanced
 * question — lazy rather than a static import, so the other 15 of 16 Maths
 * topics don't pay for it. */
const MathsQuestionWorkspace = lazy(() =>
  import('./MathsQuestionWorkspace').then((m) => ({ default: m.MathsQuestionWorkspace })),
)

type Filter = 'all' | 'wrong' | 'none'

/** The caller renders this with key={topic.slug} so switching topics remounts
 * it fresh — that's what resets `filter`, matching the original's "don't
 * carry a filter across topics" behavior, without an effect-based reset. */
export function MathsPractice({ topic }: { topic: MathsTopic }) {
  const [filter, setFilter] = useState<Filter>('all')
  const progress = useProgress()

  const keys = topic.questions.map((q) => mathsKey(topic.slug, q.id))
  let right = 0
  let done = 0
  for (const key of keys) {
    const s = progress.maths[key]
    if (s) {
      done++
      if (s.ok) right++
    }
  }
  const wrong = done - right

  const visible = topic.questions
    .map((q, i) => ({ q, i }))
    .filter(({ i }) => {
      const s = progress.maths[keys[i]]
      return filter === 'all' || (filter === 'wrong' && s && !s.ok) || (filter === 'none' && !s)
    })

  function retryIncorrect() {
    progressStore.retryIncorrectMaths(keys)
    setFilter('none')
  }

  function resetTopic() {
    if (!confirm(`Clear all saved answers for ${topic.code}?`)) return
    progressStore.resetMathsTopic(keys)
    setFilter('all')
  }

  return (
    <>
      <div className="tool">
        <span className="scoreline">
          <span>{right} correct</span>
          <span className="sep">/</span>
          <span>{done} attempted</span>
          <span className="sep">of</span>
          <span>{topic.questions.length}</span>
        </span>
        <button
          type="button"
          className={`btn ${filter === 'all' ? 'on' : ''}`}
          onClick={() => setFilter('all')}
        >
          All
        </button>
        <button
          type="button"
          className={`btn ${filter === 'wrong' ? 'on' : ''}`}
          onClick={() => setFilter('wrong')}
        >
          Incorrect <span className="n">{wrong}</span>
        </button>
        <button
          type="button"
          className={`btn ${filter === 'none' ? 'on' : ''}`}
          onClick={() => setFilter('none')}
        >
          Unattempted <span className="n">{topic.questions.length - done}</span>
        </button>
        <span className="spacer" />
        <button type="button" className="btn" onClick={retryIncorrect} disabled={wrong === 0}>
          Retry incorrect
        </button>
        <button type="button" className="btn danger" onClick={resetTopic}>
          Reset topic
        </button>
      </div>

      {visible.length === 0 ? (
        <div className="emptymsg">
          {filter === 'wrong'
            ? 'Nothing incorrect in this topic — everything you have attempted is right.'
            : 'You have attempted every question in this topic.'}
        </div>
      ) : (
        <div>
          {visible.map(({ q, i }) => {
            const workspaceEntry = MATHS_WORKSPACE_ENTRIES[q.id]
            return workspaceEntry ? (
              <Suspense key={q.id} fallback={null}>
                <MathsQuestionWorkspace
                  slug={topic.slug}
                  index={i}
                  question={q}
                  entry={workspaceEntry}
                />
              </Suspense>
            ) : (
              <MathsQuestion key={q.id} slug={topic.slug} index={i} question={q} />
            )
          })}
        </div>
      )}
    </>
  )
}
