import { useMemo, useState } from 'react'
import {
  lookupById,
  TECHNIQUE_CATEGORY_LABELS,
  type EnglishText,
  type TechniqueCategory,
} from '../../lib/content/english'
import { englishConfidenceKey } from '../../lib/keys'
import { ConfidenceTag } from '../ConfidenceTag'

/** Filterable technique reference table (spec section 6) — each row links
 * to a real example quote from the text rather than a generic dictionary
 * definition. */
export function TechniqueTable({ text }: { text: EnglishText }) {
  const [categoryFilter, setCategoryFilter] = useState<TechniqueCategory | 'all'>('all')
  const [expanded, setExpanded] = useState<string | null>(null)

  const filtered = useMemo(
    () => text.techniques.filter((t) => categoryFilter === 'all' || t.category === categoryFilter),
    [text, categoryFilter],
  )

  const categories = useMemo(
    () => [...new Set(text.techniques.map((t) => t.category))],
    [text],
  )

  return (
    <div className="q-technique-table">
      <div className="q-filter-bar">
        <select
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value as TechniqueCategory | 'all')}
        >
          <option value="all">All categories</option>
          {categories.map((c) => (
            <option key={c} value={c}>
              {TECHNIQUE_CATEGORY_LABELS[c]}
            </option>
          ))}
        </select>
        <span className="q-quote-count">{filtered.length} techniques</span>
      </div>

      <div className="q-technique-list">
        {filtered.map((t) => {
          const example = t.exampleQuoteId ? lookupById(text.quotes, t.exampleQuoteId) : undefined
          const isOpen = expanded === t.id
          return (
            <div key={t.id} className={['q-technique-row', isOpen && 'open'].filter(Boolean).join(' ')}>
              <button
                type="button"
                className="q-technique-head"
                onClick={() => setExpanded(isOpen ? null : t.id)}
              >
                <span className="q-technique-name">{t.name}</span>
                <span className="q-technique-cat">{TECHNIQUE_CATEGORY_LABELS[t.category]}</span>
                <span className="q-technique-caret">{isOpen ? '−' : '+'}</span>
              </button>
              {isOpen && (
                <div className="q-technique-body">
                  <p>
                    <b>Definition:</b> <span dangerouslySetInnerHTML={{ __html: t.definitionHtml }} />
                  </p>
                  <p>
                    <b>Effect on the reader:</b>{' '}
                    <span dangerouslySetInnerHTML={{ __html: t.effectHtml }} />
                  </p>
                  <p>
                    <b>Why Orwell uses it:</b>{' '}
                    <span dangerouslySetInnerHTML={{ __html: t.whyAuthorsUseItHtml }} />
                  </p>
                  {example && (
                    <blockquote className="q-technique-example">
                      &ldquo;{example.textHtml}&rdquo;
                      <cite>{example.location}</cite>
                    </blockquote>
                  )}
                  <p className="q-technique-language">
                    <b>Analytical language:</b> {t.analyticalLanguage.join(' · ')}
                  </p>
                  <ConfidenceTag tagKey={englishConfidenceKey(text.id, 'technique', t.id)} />
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
