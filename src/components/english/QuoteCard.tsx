import { lookupById, lookupManyById, type EnglishQuote, type EnglishText } from '../../lib/content/english'
import { englishConfidenceKey } from '../../lib/keys'
import { ConfidenceTag } from './ConfidenceTag'

/**
 * A single quote, revealed progressively (spec section 18): the quote
 * itself is always visible, but technique / what-it-reveals / authorial
 * purpose / essay-argument each sit behind their own <details> so a student
 * revising isn't handed the full analysis at once.
 */
export function QuoteCard({ text, quote }: { text: EnglishText; quote: EnglishQuote }) {
  const themes = lookupManyById(text.themes, quote.themeIds)
  const techniques = lookupManyById(text.techniques, quote.techniqueIds)
  const characters = lookupManyById(text.characters, quote.characterIds)
  const section = quote.sectionId ? lookupById(text.sections, quote.sectionId) : undefined

  return (
    <article className="q-quote-card">
      <blockquote className="q-quote-text">&ldquo;{quote.textHtml}&rdquo;</blockquote>
      <div className="q-quote-meta">
        {quote.speaker && <span className="q-quote-speaker">{quote.speaker}</span>}
        <span className="q-quote-location">{section?.label ?? quote.location}</span>
      </div>

      <div className="q-quote-tags">
        {themes.map((t) => (
          <span key={t.id} className="q-tag theme">
            {t.name}
          </span>
        ))}
        {techniques.map((t) => (
          <span key={t.id} className="q-tag technique">
            {t.name}
          </span>
        ))}
        {characters.map((c) => (
          <span key={c.id} className="q-tag character">
            {c.name}
          </span>
        ))}
      </div>

      <details className="q-reveal">
        <summary>Context</summary>
        <p dangerouslySetInnerHTML={{ __html: quote.contextHtml }} />
      </details>
      <details className="q-reveal">
        <summary>What it reveals</summary>
        <p dangerouslySetInnerHTML={{ __html: quote.revealsHtml }} />
      </details>
      <details className="q-reveal">
        <summary>Authorial purpose</summary>
        <p dangerouslySetInnerHTML={{ __html: quote.authorialPurposeHtml }} />
      </details>
      <details className="q-reveal">
        <summary>How I could use this in an essay</summary>
        <p dangerouslySetInnerHTML={{ __html: quote.argumentHtml }} />
      </details>

      <ConfidenceTag tagKey={englishConfidenceKey(text.id, 'quote', quote.id)} />
    </article>
  )
}
