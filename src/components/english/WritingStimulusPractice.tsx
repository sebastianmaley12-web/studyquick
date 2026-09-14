import { useState } from 'react'
import type { CraftMode, WritingStimulus } from '../../lib/content/english'
import { AnswerBox } from '../practice/AnswerBox'
import { englishNoteKey } from '../../lib/keys'

const MODE_LABELS: Record<CraftMode, string> = {
  imaginative: 'Imaginative writing',
  discursive: 'Discursive writing',
  persuasive: 'Persuasive writing',
}

/** Module C's per-mode writing practice — draft-then-reveal, same pattern
 * as EssayPractice, plus a reflection-statement prompt (the actual HSC
 * Module C exam requires a reflection alongside the composition). */
export function WritingStimulusPractice({ mode, stimuli }: { mode: CraftMode; stimuli: WritingStimulus[] }) {
  const [index, setIndex] = useState(0)
  const pool = stimuli.filter((s) => s.mode === mode)
  const s = pool[index]

  if (!s) return <p>No stimuli for this mode yet.</p>

  return (
    <div className="q-essay-practice">
      <div className="seq-header">
        <div>
          <div className="seq-section-label">{MODE_LABELS[mode]}</div>
          <div className="seq-meta">
            Prompt {index + 1} of {pool.length}
          </div>
        </div>
      </div>

      <div className="q-sa-card">
        <p className="qtext">{s.prompt}</p>
        {s.stimulusHtml && <div dangerouslySetInnerHTML={{ __html: s.stimulusHtml }} />}

        <AnswerBox noteKey={englishNoteKey('module-c', `stimulus-${mode}`, s.id)} />

        <details className="planbox">
          <summary className="plan-summary">
            Reveal model response<span className="after-tag">— attempt first</span>
          </summary>
          <div dangerouslySetInnerHTML={{ __html: s.modelResponseHtml }} />
        </details>

        <details className="planbox">
          <summary className="plan-summary">Planning guidance</summary>
          <p dangerouslySetInnerHTML={{ __html: s.planningGuidanceHtml }} />
        </details>

        <div className="q-chapter-subhead">Reflection statement</div>
        <p dangerouslySetInnerHTML={{ __html: s.reflectionPromptHtml }} />
        <AnswerBox noteKey={englishNoteKey('module-c', `reflection-${mode}`, s.id)} />
      </div>

      <div className="q-chapter-controls">
        <button type="button" className="seq-back" disabled={index === 0} onClick={() => setIndex((i) => i - 1)}>
          &larr; Previous
        </button>
        <button
          type="button"
          className="cta"
          disabled={index === pool.length - 1}
          onClick={() => setIndex((i) => i + 1)}
        >
          Next prompt <span className="arw">&rarr;</span>
        </button>
      </div>
    </div>
  )
}
