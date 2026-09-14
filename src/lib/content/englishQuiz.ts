import type { HistoryQuizQuestion } from './modernHistory'
import { lookupById, type EnglishText } from './english'

/**
 * Generates a multiple-choice "quote → technique" quiz straight from a
 * text's quote/technique data, in the exact shape QuizPanel/QuizTest/
 * SequentialSession already consume (HistoryQuizQuestion) — so the whole
 * sequential-test engine (randomised order, saved position, retry
 * incorrect, review, "test mode" toggle) is reused for English with zero
 * new session/grading code. This is what section 10 ("Quote Test") of the
 * spec needs, without hand-authoring quiz questions that would just
 * duplicate the quote bank.
 *
 * Deterministic (no Math.random at generation time) so the same quiz
 * exists on every render/reload; QuizQuestion itself still shuffles each
 * question's on-screen option order per mount.
 */
export function buildQuoteTechniqueQuiz(text: EnglishText): HistoryQuizQuestion[] {
  const allTechniqueNames = text.techniques.map((t) => t.name)

  return text.quotes
    .filter((quote) => quote.techniqueIds.length > 0)
    .map((quote, i) => {
      const correctTechnique = lookupById(text.techniques, quote.techniqueIds[0])
      if (!correctTechnique) return null

      // Deterministic distractor pick: rotate the starting point by the
      // quote's index so different quotes don't all show the same three
      // wrong options, without any randomness at generation time.
      const others = allTechniqueNames.filter((name) => name !== correctTechnique.name)
      const distractors = Array.from(
        { length: Math.min(3, others.length) },
        (_, k) => others[(i + k) % others.length],
      )

      const options = [correctTechnique.name, ...distractors].map((name, oi) => ({
        opt: String.fromCharCode(97 + oi), // a, b, c, d
        textHtml: name,
      }))

      const correctOpt = options.find((o) => o.textHtml === correctTechnique.name)!.opt

      const question: HistoryQuizQuestion = {
        n: i + 1,
        answer: correctOpt,
        questionHtml: `Which technique is most clearly demonstrated in this quote?<br /><span class="q-quiz-quote">&ldquo;${quote.textHtml}&rdquo;</span>`,
        options,
      }
      return question
    })
    .filter((q): q is HistoryQuizQuestion => q !== null)
}
