import type { HistoryQuizQuestion } from '../../lib/content'
import { progressStore, useQuizAnswer } from '../../lib/progressStore'
import { quizKey } from '../../lib/keys'

type QuizQuestionProps = {
  topicId: string
  index: number
  question: HistoryQuizQuestion
}

export function QuizQuestion({ topicId, index, question }: QuizQuestionProps) {
  const qid = quizKey(topicId, index)
  const answer = useQuizAnswer(qid)
  const answered = answer !== undefined

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
        <span dangerouslySetInnerHTML={{ __html: question.questionHtml }} />
      </div>
      <div className="qz-options">
        {question.options.map((opt) => {
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
              <span dangerouslySetInnerHTML={{ __html: opt.textHtml }} />
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
