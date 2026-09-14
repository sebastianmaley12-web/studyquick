import { useMemo, useState } from 'react'
import {
  lookupById,
  TECHNIQUE_CATEGORY_LABELS,
  type EnglishTechnique,
  type TechniqueCategory,
} from '../../lib/content/english'
import { englishConfidenceKey } from '../../lib/keys'
import { ConfidenceTag } from '../english/ConfidenceTag'
import type { EvidenceQuote } from '../../lib/content/paper1'

/** The full Paper 1 Language Technique Bank — searchable/filterable, and
 * richer than the per-text TechniqueTable: how to recognise it, the common
 * student mistake, and (where one has been verified) a real evidence-bank
 * example rather than only a generic one. */
export function Paper1TechniqueBank({
  techniques,
  evidence,
}: {
  techniques: EnglishTechnique[]
  evidence: EvidenceQuote[]
}) {
  const [search, setSearch] = useState('')
  const [categoryFilter, setCategoryFilter] = useState<TechniqueCategory | 'all'>('all')
  const [expanded, setExpanded] = useState<string | null>(null)

  const categories = useMemo(() => [...new Set(techniques.map((t) => t.category))], [techniques])

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase()
    return techniques.filter((t) => {
      if (categoryFilter !== 'all' && t.category !== categoryFilter) return false
      if (q && !t.name.toLowerCase().includes(q) && !t.definitionHtml.toLowerCase().includes(q)) return false
      return true
    })
  }, [techniques, search, categoryFilter])

  return (
    <div className="q-technique-table">
      <div className="q-filter-bar">
        <input
          type="search"
          className="q-filter-search"
          placeholder="Search techniques…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <select value={categoryFilter} onChange={(e) => setCategoryFilter(e.target.value as TechniqueCategory | 'all')}>
          <option value="all">All categories</option>
          {categories.map((c) => (
            <option key={c} value={c}>
              {TECHNIQUE_CATEGORY_LABELS[c]}
            </option>
          ))}
        </select>
        <span className="q-quote-count">{filtered.length} of {techniques.length} techniques</span>
      </div>

      <div className="q-technique-list">
        {filtered.map((t) => {
          const example = t.exampleQuoteId ? lookupById(evidence, t.exampleQuoteId) : undefined
          const confused = t.confusedWithIds.map((id) => lookupById(techniques, id)).filter((x): x is EnglishTechnique => !!x)
          const isOpen = expanded === t.id
          return (
            <div key={t.id} className={['q-technique-row', isOpen && 'open'].filter(Boolean).join(' ')}>
              <button type="button" className="q-technique-head" onClick={() => setExpanded(isOpen ? null : t.id)}>
                <span className="q-technique-name">{t.name}</span>
                <span className="q-technique-cat">{TECHNIQUE_CATEGORY_LABELS[t.category]}</span>
                <span className="q-technique-caret">{isOpen ? '−' : '+'}</span>
              </button>
              {isOpen && (
                <div className="q-technique-body">
                  <p><b>Definition:</b> <span dangerouslySetInnerHTML={{ __html: t.definitionHtml }} /></p>
                  {t.howToRecogniseHtml && (
                    <p><b>How to recognise it:</b> <span dangerouslySetInnerHTML={{ __html: t.howToRecogniseHtml }} /></p>
                  )}
                  <p><b>Typical effect:</b> <span dangerouslySetInnerHTML={{ __html: t.effectHtml }} /></p>
                  <p><b>Why an author might use it:</b> <span dangerouslySetInnerHTML={{ __html: t.whyAuthorsUseItHtml }} /></p>

                  {example ? (
                    <blockquote className="q-technique-example">
                      &ldquo;{example.text}&rdquo;
                      <cite>{example.location}{example.speaker ? ` — ${example.speaker}` : ''}</cite>
                    </blockquote>
                  ) : t.genericExampleHtml ? (
                    <div className="q-technique-generic-example" dangerouslySetInnerHTML={{ __html: t.genericExampleHtml }} />
                  ) : null}

                  <p className="q-technique-language"><b>Analytical language:</b> {t.analyticalLanguage.join(' · ')}</p>

                  {t.commonMistakeHtml && (
                    <div className="q-technique-mistake">
                      <b>Common mistake:</b> <span dangerouslySetInnerHTML={{ __html: t.commonMistakeHtml }} />
                    </div>
                  )}

                  {confused.length > 0 && (
                    <p className="q-technique-confused">
                      <b>Often confused with:</b> {confused.map((c) => c.name).join(', ')}
                    </p>
                  )}

                  <ConfidenceTag tagKey={englishConfidenceKey('nineteen-eighty-four', 'paper1-technique', t.id)} />
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
