import { useState } from 'react'
import type { HistoryQuizQuestion } from '../../lib/content/modernHistory'
import { progressStore, useProgress } from '../../lib/progressStore'
import { quizKey } from '../../lib/keys'
import { QuizQuestion } from './QuizQuestion'

type Filter = 'all' | 'wrong' | 'none'

export function QuizPanel({
  topicId,
  questions,
}: {
  topicId: string
  questions: HistoryQuizQuestion[]
}) {
  const [filter, setFilter] = useState<Filter>('all')
  const progress = useProgress()
  const qids = questions.map((_, i) => quizKey(topicId, i))

  let right = 0
  let answered = 0
  let wrong = 0
  for (const qid of qids) {
    const s = progress.quiz[qid]
    if (s) {
      answered++
      if (s.ok) right++
      else wrong++
    }
  }

  const visible = questions
    .map((q, i) => ({ q, i }))
    .filter(({ i }) => {
      const s = progress.quiz[qids[i]]
      return filter === 'all' || (filter === 'wrong' && s && !s.ok) || (filter === 'none' && !s)
    })

  function retryIncorrect() {
    progressStore.retryIncorrectQuiz(qids)
    setFilter('none')
  }

  function resetTopic() {
    if (!confirm('Clear all saved answers for this quiz?')) return
    progressStore.resetQuizTopic(qids)
    setFilter('all')
  }

  return (
    <>
      <div className="quiz-toolbar">
        <span className="quiz-score">
          Score: {right} correct / {answered} answered (of {questions.length})
        </span>
      </div>
      <div className="tool">
        <button
          type="button"
          className={`btn ${filter === 'all' ? 'on' : ''}`}
          onClick={() => setFilter('all')}
        >
          All questions
        </button>
        <button
          type="button"
          className={`btn ${filter === 'wrong' ? 'on' : ''}`}
          onClick={() => setFilter('wrong')}
        >
          Review incorrect <span className="n">{wrong}</span>
        </button>
        <button
          type="button"
          className={`btn ${filter === 'none' ? 'on' : ''}`}
          onClick={() => setFilter('none')}
        >
          Unanswered <span className="n">{questions.length - answered}</span>
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
            ? 'No incorrect answers to review — nice work.'
            : 'Nothing unanswered here. Every question in this topic has been attempted.'}
        </div>
      ) : (
        <div className="quiz-list">
          {visible.map(({ q, i }) => (
            <QuizQuestion key={i} topicId={topicId} index={i} question={q} />
          ))}
        </div>
      )}
    </>
  )
}
