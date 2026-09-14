import { useMemo } from 'react'
import type { McQuestion } from '../../lib/content/paper1'
import { paper1QuestionKey } from '../../lib/content/paper1'
import { progressStore, useQuizAnswer } from '../../lib/progressStore'
import { englishConfidenceKey } from '../../lib/keys'
import { shuffledIndices } from '../../lib/shuffle'
import { ConfidenceTag } from '../english/ConfidenceTag'

/**
 * One generated Paper 1 question (any MC format), rendered with the rich
 * post-answer explanation the brief calls for (spec section 13): technique
 * → how it works → effect in THIS quote → meaning → authorial purpose →
 * a worked HSC sentence — plus a short note on why each wrong option
 * doesn't fit. Deliberately a new component rather than reusing the
 * generic QuizQuestion: that component's feedback is a plain "Correct!",
 * which is the wrong shape for teaching analysis, not just recognition.
 *
 * Still plugs into the SAME progress engine QuizQuestion uses
 * (progressStore.setQuizAnswer/useQuizAnswer) — only the leaf rendering
 * differs, per the reuse-the-engine-not-the-leaf approach used throughout
 * this feature.
 */
export function Paper1QuestionCard({ question }: { question: McQuestion }) {
  const qid = paper1QuestionKey(question.id)
  const answer = useQuizAnswer(qid)
  const answered = answer !== undefined

  const options = useMemo(() => {
    const order = shuffledIndices(question.options.length)
    return order.map((i) => question.options[i])
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [question.id])

  function pick(opt: string) {
    if (answered) return
    progressStore.setQuizAnswer(qid, opt, opt === question.correctOpt)
  }

  return (
    <div
      className={['q-p1-card', answered && 'answered', answered && (answer.ok ? 'was-right' : 'was-wrong')]
        .filter(Boolean)
        .join(' ')}
    >
      <div className="q-p1-prompt" dangerouslySetInnerHTML={{ __html: question.promptHtml }} />
      <div className="q-p1-options">
        {options.map((opt) => {
          const isCorrect = opt.opt === question.correctOpt
          const isChosenWrong = answered && !answer.ok && opt.opt === answer.pick
          return (
            <button
              key={opt.opt}
              type="button"
              className={['q-p1-opt', answered && isCorrect && 'correct', isChosenWrong && 'incorrect']
                .filter(Boolean)
                .join(' ')}
              onClick={() => pick(opt.opt)}
              disabled={answered}
            >
              <b>{opt.opt.toUpperCase()}.</b> <span dangerouslySetInnerHTML={{ __html: opt.textHtml }} />
            </button>
          )
        })}
      </div>

      {answered && (
        <div className="q-p1-explanation">
          <div className={`q-p1-verdict ${answer.ok ? 'right' : 'wrong'}`}>
            {answer.ok ? 'Correct.' : 'Not quite.'}
          </div>

          <div className="q-p1-explain-row">
            <span className="q-chapter-subhead">Technique</span>
            <p>{question.explanation.techniqueName}</p>
          </div>
          <div className="q-p1-explain-row">
            <span className="q-chapter-subhead">How it works</span>
            <p dangerouslySetInnerHTML={{ __html: question.explanation.howItWorksHtml }} />
          </div>
          <div className="q-p1-explain-row">
            <span className="q-chapter-subhead">Effect in this quote</span>
            <p dangerouslySetInnerHTML={{ __html: question.explanation.effectHtml }} />
          </div>
          <div className="q-p1-explain-row">
            <span className="q-chapter-subhead">Meaning</span>
            <p dangerouslySetInnerHTML={{ __html: question.explanation.meaningHtml }} />
          </div>
          <div className="q-p1-explain-row">
            <span className="q-chapter-subhead">Authorial purpose</span>
            <p dangerouslySetInnerHTML={{ __html: question.explanation.authorialPurposeHtml }} />
          </div>
          <div className="q-p1-explain-row hsc">
            <span className="q-chapter-subhead">HSC analysis</span>
            <p dangerouslySetInnerHTML={{ __html: question.explanation.hscSentenceHtml }} />
          </div>

          {Object.keys(question.explanation.wrongOptionNotes).length > 0 && (
            <div className="q-p1-explain-row">
              <span className="q-chapter-subhead">Why the other options don't fit</span>
              <ul>
                {Object.entries(question.explanation.wrongOptionNotes).map(([name, note]) => (
                  <li key={name}>{note}</li>
                ))}
              </ul>
            </div>
          )}

          <ConfidenceTag
            tagKey={englishConfidenceKey('nineteen-eighty-four', 'paper1-technique', question.explanation.techniqueId)}
          />
        </div>
      )}
    </div>
  )
}
