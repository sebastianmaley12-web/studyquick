import type { McQuestion, WeaknessEntry } from '../../lib/content/paper1'
import { computeSkillWeaknesses, computeTechniqueWeaknesses } from '../../lib/content/paper1'
import { useProgress } from '../../lib/progressStore'
import type { EnglishTechnique } from '../../lib/content/english'

function bucket(entry: WeaknessEntry): 'strong' | 'shaky' | 'weak' {
  if (entry.total === 0) return 'shaky'
  if (entry.accuracy >= 0.8) return 'strong'
  if (entry.accuracy >= 0.5) return 'shaky'
  return 'weak'
}

function WeaknessList({ title, entries }: { title: string; entries: WeaknessEntry[] }) {
  if (entries.length === 0) return null
  return (
    <div className="q-p1-weakness-group">
      <div className="q-chapter-subhead">{title}</div>
      <ul className="q-p1-weakness-list">
        {entries.map((e) => (
          <li key={e.id} className={`q-p1-weakness-item ${bucket(e)}`}>
            <span>{e.label}</span>
            <span className="q-p1-weakness-stat">
              {e.correct}/{e.total} &middot; {Math.round(e.accuracy * 100)}%
            </span>
          </li>
        ))}
      </ul>
    </div>
  )
}

/** Progress breakdown (spec section 15): by technique, by skill, and an
 * overall text-level completion figure — all derived from progressStore's
 * existing `quiz` slice, nothing new to persist. */
export function Paper1Progress({
  allQuestions,
  bank,
}: {
  allQuestions: McQuestion[]
  bank: EnglishTechnique[]
}) {
  const progress = useProgress()
  const techniqueStats = computeTechniqueWeaknesses(allQuestions, progress.quiz, bank)
  const skillStats = computeSkillWeaknesses(allQuestions, progress.quiz)

  const strong = techniqueStats.filter((t) => bucket(t) === 'strong')
  const shaky = techniqueStats.filter((t) => bucket(t) === 'shaky')
  const weak = techniqueStats.filter((t) => bucket(t) === 'weak')

  const answeredCount = allQuestions.filter((q) => progress.quiz[`paper1-${q.id}`] !== undefined).length
  const pct = allQuestions.length ? Math.round((answeredCount / allQuestions.length) * 100) : 0

  return (
    <div className="q-p1-progress">
      <div className="q-p1-progress-header">
        <div className="q-p1-progress-stat">
          <div className="n">{pct}%</div>
          <div className="l">Nineteen Eighty-Four question bank attempted</div>
        </div>
        <div className="q-p1-progress-stat">
          <div className="n">{answeredCount}</div>
          <div className="l">of {allQuestions.length} questions answered</div>
        </div>
      </div>

      {techniqueStats.length === 0 ? (
        <div className="emptymsg">Answer some practice questions to start seeing your technique breakdown.</div>
      ) : (
        <>
          <WeaknessList title="Strongest techniques" entries={strong} />
          <WeaknessList title="Shaky techniques" entries={shaky} />
          <WeaknessList title="Weakest techniques" entries={weak} />
        </>
      )}

      <WeaknessList title="Skill breakdown" entries={skillStats} />
    </div>
  )
}
