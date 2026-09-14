import { useMemo, useState } from 'react'
import { lookupById, lookupManyById, type EnglishQuote, type EnglishText } from '../../lib/content/english'
import { englishConfidenceKey } from '../../lib/keys'
import { ConfidenceTag } from './ConfidenceTag'

/** Words blanked out for the "missing word" activity — curated by hand per
 * quote rather than stripped programmatically, so the blank always lands on
 * a word that's actually meaningful to recall (spec section 13). Quotes not
 * listed here simply don't appear in missing-word mode. */
const MISSING_WORD: Record<string, string> = {
  'q-opening-line': 'thirteen',
  'q-bb-watching': 'WATCHING',
  'q-war-is-peace': 'SLAVERY',
  'q-two-plus-two': 'four',
  'q-loved-big-brother': 'loved',
}

type LearningItem =
  | { mode: 'quote-to-theme'; quote: EnglishQuote; options: string[]; correct: string }
  | { mode: 'quote-to-technique'; quote: EnglishQuote; options: string[]; correct: string }
  | { mode: 'missing-word'; quote: EnglishQuote; blanked: string; answer: string }

function buildItems(text: EnglishText): LearningItem[] {
  const themeNames = text.themes.map((t) => t.name)
  const techniqueNames = text.techniques.map((t) => t.name)

  return text.quotes.map((quote, i): LearningItem => {
    const blankWord = MISSING_WORD[quote.id]
    if (blankWord && quote.textHtml.includes(blankWord)) {
      return {
        mode: 'missing-word',
        quote,
        blanked: quote.textHtml.replace(blankWord, '_____'),
        answer: blankWord,
      }
    }
    if (i % 2 === 0 && quote.themeIds.length > 0) {
      const correctTheme = lookupById(text.themes, quote.themeIds[0])!
      const others = themeNames.filter((n) => n !== correctTheme.name)
      const options = [correctTheme.name, ...others.slice(0, 2)].sort()
      return { mode: 'quote-to-theme', quote, options, correct: correctTheme.name }
    }
    const correctTechnique = lookupById(text.techniques, quote.techniqueIds[0])!
    const othersT = techniqueNames.filter((n) => n !== correctTechnique.name)
    const optionsT = [correctTechnique.name, ...othersT.slice(0, 2)].sort()
    return { mode: 'quote-to-technique', quote, options: optionsT, correct: correctTechnique.name }
  })
}

/** A dedicated quote-memorisation/revision mode (spec section 13) — separate
 * from the multiple-choice "test" (englishQuiz.ts): this is untimed,
 * self-paced flashcard-style drilling across several question formats
 * (quote→theme, quote→technique, missing word), feeding the same
 * Known/Shaky/Need-to-learn tags used everywhere else on this text. */
export function QuoteLearningMode({ text }: { text: EnglishText }) {
  const items = useMemo(() => buildItems(text), [text])
  const [index, setIndex] = useState(0)
  const [revealed, setRevealed] = useState(false)
  const [typedAnswer, setTypedAnswer] = useState('')

  const item = items[index]

  function next() {
    setRevealed(false)
    setTypedAnswer('')
    setIndex((i) => (i + 1) % items.length)
  }

  return (
    <div className="q-learning-mode">
      <div className="seq-header">
        <div>
          <div className="seq-section-label">Quote learning mode</div>
          <div className="seq-meta">
            Card {index + 1} of {items.length}
          </div>
        </div>
      </div>

      <div className="q-learning-card">
        {item.mode === 'missing-word' ? (
          <>
            <div className="q-learning-prompt">Complete the quote</div>
            <blockquote className="q-quote-text">&ldquo;{item.blanked}&rdquo;</blockquote>
            <input
              type="text"
              className="q-learning-input"
              placeholder="Type the missing word…"
              value={typedAnswer}
              onChange={(e) => setTypedAnswer(e.target.value)}
              disabled={revealed}
            />
            {!revealed && (
              <button type="button" className="btn on" onClick={() => setRevealed(true)}>
                Check answer
              </button>
            )}
            {revealed && (
              <div
                className={[
                  'q-learning-feedback',
                  typedAnswer.trim().toLowerCase() === item.answer.toLowerCase() ? 'right' : 'wrong',
                ].join(' ')}
              >
                The missing word is <b>{item.answer}</b>.
              </div>
            )}
          </>
        ) : (
          <>
            <div className="q-learning-prompt">
              {item.mode === 'quote-to-theme'
                ? 'Which theme does this quote best support?'
                : 'Which technique is demonstrated in this quote?'}
            </div>
            <blockquote className="q-quote-text">&ldquo;{item.quote.textHtml}&rdquo;</blockquote>
            <div className="q-learning-options">
              {item.options.map((opt) => (
                <button
                  key={opt}
                  type="button"
                  className={[
                    'q-learning-option',
                    revealed && opt === item.correct && 'correct',
                    revealed && opt === typedAnswer && opt !== item.correct && 'incorrect',
                  ]
                    .filter(Boolean)
                    .join(' ')}
                  disabled={revealed}
                  onClick={() => {
                    setTypedAnswer(opt)
                    setRevealed(true)
                  }}
                >
                  {opt}
                </button>
              ))}
            </div>
          </>
        )}

        {revealed && (
          <div className="q-learning-analysis">
            <b>Why:</b>{' '}
            <span
              dangerouslySetInnerHTML={{
                __html:
                  item.mode === 'missing-word'
                    ? item.quote.revealsHtml
                    : item.mode === 'quote-to-theme'
                      ? lookupManyById(text.themes, item.quote.themeIds)[0]?.explanationHtml ?? ''
                      : item.quote.authorialPurposeHtml,
              }}
            />
          </div>
        )}

        {revealed && (
          <>
            <ConfidenceTag tagKey={englishConfidenceKey(text.id, 'quote', item.quote.id)} />
            <button type="button" className="cta" onClick={next}>
              Next card <span className="arw">&rarr;</span>
            </button>
          </>
        )}
      </div>
    </div>
  )
}
