import { useMemo } from 'react'
import type { HistoryQuizQuestion } from '../../lib/content/modernHistory'
import { progressStore, useQuizAnswer } from '../../lib/progressStore'
import { quizKey } from '../../lib/keys'
import { highlightHtml, useSearchQuery } from '../../context/SearchQueryContext'
import { shuffledIndices } from '../../lib/shuffle'

type QuizQuestionProps = {
  topicId: string
  index: number
  question: HistoryQuizQuestion
}

export function QuizQuestion({ topicId, index, question }: QuizQuestionProps) {
  const qid = quizKey(topicId, index)
  const answer = useQuizAnswer(qid)
  const answered = answer !== undefined
  const query = useSearchQuery()

  /* Each option carries its own letter (opt.opt), and correctness/progress
   * are keyed off that letter, not array position — so display order can
   * be shuffled freely with no effect on grading or the localStorage
   * schema. Re-shuffles when the question itself changes, stays stable
   * for the lifetime of this mount so options don't jump mid-interaction. */
  const options = useMemo(() => {
    const order = shuffledIndices(question.options.length)
    return order.map((i) => question.options[i])
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [question.n])

  function pick(opt: string) {
    if (answered) return
    const ok = opt === question.answer
    progressStore.setQuizAnswer(qid, opt, ok)
  }

  return (
    <div
      className={[
        'quiz-q',
        answered && 'answered',
        answered && (answer.ok ? 'was-right' : 'was-wrong'),
      ]
        .filter(Boolean)
        .join(' ')}
    >
      <div className="qz-question">
        <span className="tn">{question.n}.</span>{' '}
        <span dangerouslySetInnerHTML={{ __html: highlightHtml(question.questionHtml, query) }} />
      </div>
      <div className="qz-options">
        {options.map((opt) => {
          const isCorrect = opt.opt === question.answer
          const isChosenWrong = answered && !answer.ok && opt.opt === answer.pick
          return (
            <button
              key={opt.opt}
              type="button"
              className={[
                'qz-opt',
                answered && isCorrect && 'correct',
                isChosenWrong && 'incorrect',
              ]
                .filter(Boolean)
                .join(' ')}
              onClick={() => pick(opt.opt)}
              disabled={answered}
            >
              <b>{opt.opt.toUpperCase()}.</b>{' '}
              <span dangerouslySetInnerHTML={{ __html: highlightHtml(opt.textHtml, query) }} />
            </button>
          )
        })}
      </div>
      {answered && (
        <div className={`qz-feedback ${answer.ok ? 'right' : 'wrong'}`}>
          {answer.ok ? 'Correct!' : 'Not quite — the correct answer is highlighted above.'}
        </div>
      )}
    </div>
  )
}
