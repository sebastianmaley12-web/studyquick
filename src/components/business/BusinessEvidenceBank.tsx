import { useMemo, useState } from 'react'
import type { BusinessEvidenceItem, BusinessEvidenceType } from '../../lib/content/business'
import { useProgress } from '../../lib/progressStore'
import { confidenceKey } from '../../lib/keys'
import { ConfidenceTag } from '../ConfidenceTag'
import { useSearchQuery, highlightHtml } from '../../context/SearchQueryContext'

type ConfidenceFilter = 'all' | 'known' | 'shaky' | 'learn'

const TYPE_LABELS: Record<BusinessEvidenceType, string> = {
  'case-study': 'Case study',
  statistic: 'Statistic',
  legislation: 'Legislation',
  example: 'Example',
}

/** Business Studies' case study bank — same shape and interaction pattern
 * as Legal's and Modern History's evidence banks, adapted for real, dated
 * Australian company case studies. */
export function BusinessEvidenceBank({ topicId, items }: { topicId: string; items: BusinessEvidenceItem[] }) {
  const progress = useProgress()
  const pageQuery = useSearchQuery()
  const [search, setSearch] = useState('')
  const [typeFilter, setTypeFilter] = useState<BusinessEvidenceType | 'all'>('all')
  const [confidenceFilter, setConfidenceFilter] = useState<ConfidenceFilter>('all')

  const filtered = useMemo(() => {
    const q = (search.trim() || pageQuery.trim()).toLowerCase()
    return items.filter((item) => {
      if (typeFilter !== 'all' && item.type !== typeFilter) return false
      if (confidenceFilter !== 'all') {
        const confidence = progress.trivia[confidenceKey('business', topicId, 'evidence', item.id)]
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
          placeholder="Search companies, figures, legislation…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <select value={typeFilter} onChange={(e) => setTypeFilter(e.target.value as BusinessEvidenceType | 'all')}>
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
        <div className="emptymsg">No case studies match these filters.</div>
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
                <div className="evidence-section-label">What happened?</div>
                <p dangerouslySetInnerHTML={{ __html: highlightHtml(item.whatIsItHtml, pageQuery) }} />
              </div>
              <div className="evidence-section">
                <div className="evidence-section-label">Why does it matter?</div>
                <p dangerouslySetInnerHTML={{ __html: highlightHtml(item.whatItDemonstratesHtml, pageQuery) }} />
              </div>
              <div className="evidence-section">
                <div className="evidence-section-label">How can I use it?</div>
                <p dangerouslySetInnerHTML={{ __html: highlightHtml(item.howToUseItHtml, pageQuery) }} />
              </div>

              <ConfidenceTag tagKey={confidenceKey('business', topicId, 'evidence', item.id)} />
              <div className="evidence-source">Source: {item.source}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
