import { useMemo, useState } from 'react'
import type { CraftMode, CraftTechnique } from '../../lib/content/english'
import { englishConfidenceKey } from '../../lib/keys'
import { ConfidenceTag } from './ConfidenceTag'

const MODE_LABELS: Record<CraftMode | 'general', string> = {
  imaginative: 'Imaginative',
  discursive: 'Discursive',
  persuasive: 'Persuasive',
  general: 'All modes',
}

/** Module C's technique reference table — same expand/collapse pattern as
 * TechniqueTable, filtered by writing mode instead of a text's technique
 * category since Module C has no prescribed text to draw categories from. */
export function CraftTechniqueTable({ techniques }: { techniques: CraftTechnique[] }) {
  const [modeFilter, setModeFilter] = useState<CraftMode | 'general' | 'all'>('all')
  const [expanded, setExpanded] = useState<string | null>(null)

  const filtered = useMemo(
    () => techniques.filter((t) => modeFilter === 'all' || t.mode === modeFilter),
    [techniques, modeFilter],
  )

  return (
    <div className="q-technique-table">
      <div className="q-filter-bar">
        <select value={modeFilter} onChange={(e) => setModeFilter(e.target.value as CraftMode | 'general' | 'all')}>
          <option value="all">All modes</option>
          <option value="imaginative">Imaginative</option>
          <option value="discursive">Discursive</option>
          <option value="persuasive">Persuasive</option>
          <option value="general">General</option>
        </select>
        <span className="q-quote-count">{filtered.length} techniques</span>
      </div>

      <div className="q-technique-list">
        {filtered.map((t) => {
          const isOpen = expanded === t.id
          return (
            <div key={t.id} className={['q-technique-row', isOpen && 'open'].filter(Boolean).join(' ')}>
              <button type="button" className="q-technique-head" onClick={() => setExpanded(isOpen ? null : t.id)}>
                <span className="q-technique-name">{t.name}</span>
                <span className="q-technique-cat">{MODE_LABELS[t.mode]}</span>
                <span className="q-technique-caret">{isOpen ? '−' : '+'}</span>
              </button>
              {isOpen && (
                <div className="q-technique-body">
                  <p>
                    <b>Definition:</b> <span dangerouslySetInnerHTML={{ __html: t.definitionHtml }} />
                  </p>
                  <p>
                    <b>Effect on the reader:</b> <span dangerouslySetInnerHTML={{ __html: t.effectHtml }} />
                  </p>
                  <blockquote className="q-technique-example">
                    <span dangerouslySetInnerHTML={{ __html: t.mentorExampleHtml }} />
                  </blockquote>
                  <p>
                    <b>How to use it:</b> <span dangerouslySetInnerHTML={{ __html: t.howToUseHtml }} />
                  </p>
                  <ConfidenceTag tagKey={englishConfidenceKey('module-c', 'craft-technique', t.id)} />
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
