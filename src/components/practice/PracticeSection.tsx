import type { ModernHistoryTopicData } from '../../lib/content'
import { progressStore } from '../../lib/progressStore'
import { practiceNoteKey } from '../../lib/keys'
import { ExamTimer } from './ExamTimer'
import { PracticeCard } from './PracticeCard'
import { PracticeOptionPair } from './PracticeOptionPair'

type Practice = ModernHistoryTopicData['practice']

/** Assigns the flattened answer-box index as it walks the content, matching
 * the original's `$$('.card, .opt-card', panel)` order exactly: a 'card'
 * question consumes one index, an 'options' (essay-pair) question consumes
 * one index per option, not one for the whole pair. */
function renderGroup(topicId: string, group: Practice['groups'][number], nextIndex: () => number) {
  return (
    <div key={`${group.bank}-${group.number}-${group.title}`}>
      {group.number !== null && (
        <div className="subgroup-title">
          <span className="n">{group.number}</span> {group.title}
        </div>
      )}
      {group.questions.map((q, qi) =>
        q.format === 'card' ? (
          <PracticeCard
            key={qi}
            noteKey={practiceNoteKey(topicId, nextIndex())}
            accent={q.accent}
            qtype={q.qtype}
            badge={q.badge}
            questionHtml={q.questionHtml}
            planHtml={q.planHtml}
          />
        ) : (
          <PracticeOptionPair
            key={qi}
            setTitle={q.setTitle}
            options={q.options.map((opt) => ({
              noteKey: practiceNoteKey(topicId, nextIndex()),
              label: opt.label,
              questionHtml: opt.questionHtml,
              planHtml: opt.planHtml,
            }))}
          />
        ),
      )}
    </div>
  )
}

export function PracticeSection({ topicId, practice }: { topicId: string; practice: Practice }) {
  const banks = [...new Set(practice.groups.map((g) => g.bank))]
  let index = 0
  const nextIndex = () => index++

  function clearAnswers() {
    if (!confirm('Delete every written answer saved for this topic?')) return
    progressStore.clearNotesForTopic(`${topicId}-practice`)
  }

  return (
    <>
      <div className="tool">
        <ExamTimer minutes={45} />
        <span className="spacer" />
        <button type="button" className="btn danger" onClick={clearAnswers}>
          Clear my written answers
        </button>
      </div>

      {practice.notes
        .filter((n) => n.bank === null)
        .map((n, i) => (
          <div
            key={i}
            className={`note-box ${n.variant ?? ''}`}
            dangerouslySetInnerHTML={{ __html: n.html }}
          />
        ))}

      {banks.map((bank) => (
        <div key={bank ?? 'null'}>
          {bank !== null && <div className="group-title">{bank}</div>}

          {practice.notes
            .filter((n) => n.bank === bank && bank !== null)
            .map((n, i) => (
              <div
                key={i}
                className={`note-box ${n.variant ?? ''}`}
                dangerouslySetInnerHTML={{ __html: n.html }}
              />
            ))}

          {practice.sources
            .filter((s) => s.bank === bank)
            .map((source, i) => (
              <div key={i} className="source">
                <div className="stag">{source.tag}</div>
                {source.bodyHtml.split('\n').map((paragraph, pi) => (
                  <p key={pi} dangerouslySetInnerHTML={{ __html: paragraph }} />
                ))}
              </div>
            ))}

          {practice.groups
            .filter((g) => g.bank === bank)
            .map((group) => renderGroup(topicId, group, nextIndex))}
        </div>
      ))}
    </>
  )
}
