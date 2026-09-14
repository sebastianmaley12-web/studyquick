import { useState } from 'react'
import { lookupManyById, type EnglishText } from '../../lib/content/english'
import { QuoteCard } from './QuoteCard'

/** Chapter/section-by-section navigation (spec section 14) — one section
 * shown at a time with Previous/Next, rather than a long scroll through
 * every chapter at once. Works for any SectionKind (chapter/scene/act/
 * poem/passage), not just novels with numbered chapters. */
export function ChapterNav({ text }: { text: EnglishText }) {
  const sections = [...text.sections].sort((a, b) => a.order - b.order)
  const [index, setIndex] = useState(0)
  const section = sections[index]
  const quotes = lookupManyById(text.quotes, section.quoteIds)

  return (
    <div className="q-chapter-nav">
      <div className="q-chapter-progress">
        {sections.map((s, i) => (
          <button
            key={s.id}
            type="button"
            className={['q-chapter-dot', i === index && 'current'].filter(Boolean).join(' ')}
            title={s.label}
            onClick={() => setIndex(i)}
          />
        ))}
        <span className="q-chapter-progress-label">
          {index + 1} of {sections.length}
        </span>
      </div>

      <article className="q-chapter-body">
        <div className="q-chapter-kicker">{section.kind}</div>
        <h3>{section.label}</h3>
        <p className="q-chapter-summary" dangerouslySetInnerHTML={{ __html: section.summaryHtml }} />

        <div className="q-chapter-cols">
          <div>
            <div className="q-chapter-subhead">Key events</div>
            <ul>
              {section.keyEvents.map((e, i) => (
                <li key={i}>{e}</li>
              ))}
            </ul>
          </div>
          <div>
            <div className="q-chapter-subhead">Ideas introduced</div>
            <ul>
              {section.ideasIntroduced.map((idea, i) => (
                <li key={i}>{idea}</li>
              ))}
            </ul>
          </div>
        </div>

        {section.turningPointHtml && (
          <div className="q-chapter-turning-point">
            <b>Why it matters:</b>{' '}
            <span dangerouslySetInnerHTML={{ __html: section.turningPointHtml }} />
          </div>
        )}

        {quotes.length > 0 && (
          <>
            <div className="q-chapter-subhead">Quotes from this section</div>
            <div className="q-quote-grid">
              {quotes.map((q) => (
                <QuoteCard key={q.id} text={text} quote={q} />
              ))}
            </div>
          </>
        )}
      </article>

      <div className="q-chapter-controls">
        <button
          type="button"
          className="seq-back"
          disabled={index === 0}
          onClick={() => setIndex((i) => i - 1)}
        >
          &larr; Previous
        </button>
        <button
          type="button"
          className="cta"
          disabled={index === sections.length - 1}
          onClick={() => setIndex((i) => i + 1)}
        >
          Next <span className="arw">&rarr;</span>
        </button>
      </div>
    </div>
  )
}
