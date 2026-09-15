import { useMemo, useState } from 'react'
import type { EnglishText } from '../../lib/content/english'
import { useProgress } from '../../lib/progressStore'
import { englishConfidenceKey } from '../../lib/keys'
import { QuoteCard } from './QuoteCard'

type ConfidenceFilter = 'all' | 'known' | 'shaky' | 'learn'

/** The searchable, filterable quote bank (spec section 5) — filter by
 * theme, technique, character or chapter, plus by the student's own
 * Known/Shaky/Need-to-learn tags, on top of free-text search. */
export function QuoteBank({ text }: { text: EnglishText }) {
  const progress = useProgress()
  const [search, setSearch] = useState('')
  const [themeFilter, setThemeFilter] = useState<string>('all')
  const [techniqueFilter, setTechniqueFilter] = useState<string>('all')
  const [characterFilter, setCharacterFilter] = useState<string>('all')
  const [confidenceFilter, setConfidenceFilter] = useState<ConfidenceFilter>('all')

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase()
    return text.quotes.filter((quote) => {
      if (themeFilter !== 'all' && !quote.themeIds.includes(themeFilter)) return false
      if (techniqueFilter !== 'all' && !quote.techniqueIds.includes(techniqueFilter)) return false
      if (characterFilter !== 'all' && !quote.characterIds.includes(characterFilter)) return false
      if (confidenceFilter !== 'all') {
        const confidence = progress.trivia[englishConfidenceKey(text.id, 'quote', quote.id)]
        if (confidence !== confidenceFilter) return false
      }
      if (q && !quote.textHtml.toLowerCase().includes(q)) return false
      return true
    })
  }, [text, search, themeFilter, techniqueFilter, characterFilter, confidenceFilter, progress])

  return (
    <div className="q-quote-bank">
      <div className="q-filter-bar">
        <input
          type="search"
          className="q-filter-search"
          aria-label="Search quotes"
          placeholder="Search quotes…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <select
          aria-label="Filter by theme"
          value={themeFilter}
          onChange={(e) => setThemeFilter(e.target.value)}
        >
          <option value="all">All themes</option>
          {text.themes.map((t) => (
            <option key={t.id} value={t.id}>
              {t.name}
            </option>
          ))}
        </select>
        <select
          aria-label="Filter by technique"
          value={techniqueFilter}
          onChange={(e) => setTechniqueFilter(e.target.value)}
        >
          <option value="all">All techniques</option>
          {text.techniques.map((t) => (
            <option key={t.id} value={t.id}>
              {t.name}
            </option>
          ))}
        </select>
        <select
          aria-label="Filter by character"
          value={characterFilter}
          onChange={(e) => setCharacterFilter(e.target.value)}
        >
          <option value="all">All characters</option>
          {text.characters.map((c) => (
            <option key={c.id} value={c.id}>
              {c.name}
            </option>
          ))}
        </select>
        <select
          aria-label="Filter by confidence"
          value={confidenceFilter}
          onChange={(e) => setConfidenceFilter(e.target.value as ConfidenceFilter)}
        >
          <option value="all">Any confidence</option>
          <option value="known">Known</option>
          <option value="shaky">Shaky</option>
          <option value="learn">Need to learn</option>
        </select>
      </div>

      <div className="q-quote-count">
        {filtered.length} of {text.quotes.length} quotes
      </div>

      {filtered.length === 0 ? (
        <div className="emptymsg">No quotes match these filters.</div>
      ) : (
        <div className="q-quote-grid">
          {filtered.map((quote) => (
            <QuoteCard key={quote.id} text={text} quote={quote} />
          ))}
        </div>
      )}
    </div>
  )
}
