import { useMemo, useState } from 'react'
import type { LegalEvidenceItem, LegalEvidenceType } from '../../lib/content/legal'
import { useProgress } from '../../lib/progressStore'
import { confidenceKey } from '../../lib/keys'
import { ConfidenceTag } from '../ConfidenceTag'
import { useSearchQuery, highlightHtml } from '../../context/SearchQueryContext'

type ConfidenceFilter = 'all' | 'known' | 'shaky' | 'learn'

const TYPE_LABELS: Record<LegalEvidenceType, string> = {
  case: 'Case',
  legislation: 'Legislation',
  treaty: 'Treaty',
  statistic: 'Statistic',
  example: 'Example',
}

/** Legal Studies' evidence bank (spec section 10) — real cases, legislation,
 * treaties and examples, each answering What is it? / What does it
 * demonstrate? / How can I use it in an HSC response?, filterable and
 * markable the same way English's QuoteBank is. Reads the page's own
 * committed search query (from the shared topic searchbar) in addition to
 * its own local search field, so results filter both ways. */
export function LegalEvidenceBank({ topicId, items }: { topicId: string; items: LegalEvidenceItem[] }) {
  const progress = useProgress()
  const pageQuery = useSearchQuery()
  const [search, setSearch] = useState('')
  const [typeFilter, setTypeFilter] = useState<LegalEvidenceType | 'all'>('all')
  const [confidenceFilter, setConfidenceFilter] = useState<ConfidenceFilter>('all')

  const filtered = useMemo(() => {
    const q = (search.trim() || pageQuery.trim()).toLowerCase()
    return items.filter((item) => {
      if (typeFilter !== 'all' && item.type !== typeFilter) return false
      if (confidenceFilter !== 'all') {
        const confidence = progress.trivia[confidenceKey('legal', topicId, 'evidence', item.id)]
        if (confidence !== confidenceFilter) return false
      }
      if (q) {
        const haystack = `${item.name} ${item.citation ?? ''} ${item.whatIsItHtml} ${item.whatItDemonstratesHtml}`.toLowerCase()
        if (!haystack.includes(q)) return false
      }
      return true
    })
  }, [items, search, pageQuery, typeFilter, confidenceFilter, progress, topicId])

  const typesPresent = useMemo(() => [...new Set(items.map((i) => i.type))], [items])

  return (
    <div className="q-quote-bank">
      <div className="evidence-filter-bar">
        <input
          type="search"
          placeholder="Search cases, legislation, treaties…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <select value={typeFilter} onChange={(e) => setTypeFilter(e.target.value as LegalEvidenceType | 'all')}>
          <option value="all">All types</option>
          {typesPresent.map((t) => (
            <option key={t} value={t}>
              {TYPE_LABELS[t]}
            </option>
          ))}
        </select>
        <select value={confidenceFilter} onChange={(e) => setConfidenceFilter(e.target.value as ConfidenceFilter)}>
          <option value="all">Any confidence</option>
          <option value="known">Known</option>
          <option value="shaky">Shaky</option>
          <option value="learn">Need to learn</option>
        </select>
      </div>

      <div className="evidence-count">
        {filtered.length} of {items.length} items
      </div>

      {filtered.length === 0 ? (
        <div className="emptymsg">No evidence matches these filters.</div>
      ) : (
        <div className="evidence-grid">
          {filtered.map((item) => (
            <div key={item.id} className="evidence-card" data-type={item.type}>
              <div className="evidence-card-head">
                <h4 className="evidence-name" dangerouslySetInnerHTML={{ __html: highlightHtml(item.name, pageQuery) }} />
                <span className="evidence-type-badge">{TYPE_LABELS[item.type]}</span>
              </div>
              {item.citation && <div className="evidence-citation">{item.citation}</div>}

              <div className="evidence-section">
                <div className="evidence-section-label">What is it?</div>
                <p dangerouslySetInnerHTML={{ __html: highlightHtml(item.whatIsItHtml, pageQuery) }} />
              </div>
              <div className="evidence-section">
                <div className="evidence-section-label">What does it demonstrate?</div>
                <p dangerouslySetInnerHTML={{ __html: highlightHtml(item.whatItDemonstratesHtml, pageQuery) }} />
              </div>
              <div className="evidence-section">
                <div className="evidence-section-label">How can I use it?</div>
                <p dangerouslySetInnerHTML={{ __html: highlightHtml(item.howToUseItHtml, pageQuery) }} />
              </div>

              <ConfidenceTag tagKey={confidenceKey('legal', topicId, 'evidence', item.id)} />
              <div className="evidence-source">Source: {item.source}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
