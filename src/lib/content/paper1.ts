import type { EnglishTechnique } from './english'
import type { QuizAnswer } from '../progressStore'

/**
 * HSC English Advanced Paper 1 — Language Techniques practice.
 *
 * Deliberately a SEPARATE dataset from the per-text quote bank
 * (english.ts's EnglishQuote/EnglishText), not a rename of it — see the
 * module doc on EvidenceQuote below for why. This file holds the question
 * *generation* logic; the actual technique/evidence/comparison/unseen data
 * lives under src/content/english/paper1-*.ts.
 *
 * Learning loop this is built around (per the brief): identify the
 * technique → explain how it works → explain its effect → connect it to
 * meaning/purpose → apply the skill to new quotes. Every generated question
 * and every explanation panel follows that same order.
 */

// ---- Evidence bank -----------------------------------------------------

/**
 * A Paper 1 practice quote. Broader and shallower-per-item than
 * EnglishQuote (no full essay-argument field, no character/section FK) but
 * covers far more of the text — the whole point is breadth, not depth, so
 * students see language from every part of the text, not just the ~13
 * quotes already curated for essay revision.
 *
 * `existingQuoteId`, when set, means this entry is the SAME underlying
 * quotation as one already in the text's core quote bank — the Paper 1
 * evidence bank references it rather than re-authoring it (spec section
 * 20: reuse, don't duplicate). Only entries with `existingQuoteId: null`
 * are genuinely new textual evidence sourced for this feature.
 */
export interface EvidenceQuote {
  id: string
  text: string
  textId: string
  /** Human-readable, e.g. "Part One, Chapter 1" — always present. */
  location: string
  /** 1/2/3 for a three-part novel — used to audit spread across the whole
   * text rather than clustering near the start. Null for a text with a
   * different structure (poetry collections, plays). */
  part: number | null
  /** Chapter number when it could be verified with confidence; null when
   * only the Part could be confirmed — never guessed (spec section 5). */
  chapter: number | null
  speaker: string | null
  techniqueIds: string[]
  themeIds: string[]
  context: string
  effect: string
  meaning: string
  authorialPurpose: string
  /** The same quotation already in the text's core EnglishQuote bank, if
   * any — see the interface doc above. */
  existingQuoteId: string | null
}

/** Groups evidence by part/chapter so a coverage audit can flag clustering
 * (spec sections 4 and 18) instead of just trusting the dataset is broad. */
export function auditEvidenceCoverage(evidence: EvidenceQuote[]) {
  const byPart = new Map<number, number>()
  for (const q of evidence) {
    if (q.part === null) continue
    byPart.set(q.part, (byPart.get(q.part) ?? 0) + 1)
  }
  const bySpeaker = new Map<string, number>()
  for (const q of evidence) {
    const key = q.speaker ?? 'Narrator'
    bySpeaker.set(key, (bySpeaker.get(key) ?? 0) + 1)
  }
  return { total: evidence.length, byPart: Object.fromEntries(byPart), bySpeaker: Object.fromEntries(bySpeaker) }
}

// ---- Question formats ---------------------------------------------------

export type Paper1Skill = 'identify' | 'effect' | 'analysis' | 'application'

interface McOption {
  opt: string
  textHtml: string
}

interface McBase {
  id: string
  skill: Paper1Skill
  quote: EvidenceQuote
  promptHtml: string
  options: McOption[]
  correctOpt: string
  /** Rendered after the student answers, regardless of correctness — the
   * heart of spec section 13: technique, how it works, effect in THIS
   * quote, meaning, authorial purpose, and a modelled HSC sentence. Also
   * carries a short note on why each wrong option doesn't fit, so getting
   * it right or wrong is equally instructive. */
  explanation: {
    techniqueId: string
    techniqueName: string
    howItWorksHtml: string
    effectHtml: string
    meaningHtml: string
    authorialPurposeHtml: string
    hscSentenceHtml: string
    wrongOptionNotes: Record<string, string>
  }
}

export type McFormat = 'identify' | 'identify-effect' | 'technique-to-effect' | 'quote-to-analysis'

export interface McQuestion extends McBase {
  format: McFormat
}

export interface OpenResponseQuestion {
  id: string
  format: 'open-response'
  skill: 'analysis'
  quote: EvidenceQuote
  promptHtml: string
  checkpoints: string[]
  modelAnalysisHtml: string
}

export interface ComparisonQuestion {
  id: string
  format: 'comparison'
  skill: 'application'
  quoteA: EvidenceQuote
  quoteB: EvidenceQuote
  promptHtml: string
  modelComparisonHtml: string
}

export interface UnseenQuestion {
  id: string
  format: 'unseen'
  skill: Paper1Skill
  promptHtml: string
  modelAnswerHtml: string
}

export interface UnseenExtract {
  id: string
  title: string
  kind: 'persuasive-speech' | 'poem' | 'visual-description'
  bodyHtml: string
  attribution: string
  questions: UnseenQuestion[]
}

export type Paper1Question = McQuestion | OpenResponseQuestion | ComparisonQuestion

/** Technique ids commonly confused with `techniqueId`, looked up from the
 * bank, filtered to ones NOT already correct for this quote, so a
 * generated multiple-choice question never (a) offers the right answer
 * twice or (b) offers something wildly implausible — spec sections 6 and 9
 * ask explicitly for "plausible alternatives", not random distractors. */
function pickDistractors(
  bank: EnglishTechnique[],
  correct: EnglishTechnique,
  excludeIds: string[],
  count: number,
): EnglishTechnique[] {
  const byId = new Map(bank.map((t) => [t.id, t]))
  const confused = correct.confusedWithIds
    .map((id) => byId.get(id))
    .filter((t): t is EnglishTechnique => !!t && !excludeIds.includes(t.id))

  const rest = bank.filter((t) => t.id !== correct.id && !excludeIds.includes(t.id) && !confused.includes(t))

  // Confused-with techniques first (genuinely plausible near-misses), then
  // fill any remaining slots deterministically from the rest of the bank.
  const picked = [...confused]
  let i = 0
  while (picked.length < count && i < rest.length) {
    picked.push(rest[i])
    i++
  }
  return picked.slice(0, count)
}

function lettered(options: EnglishTechnique[]): McOption[] {
  return options.map((t, i) => ({ opt: String.fromCharCode(97 + i), textHtml: t.name }))
}

function explanationFor(
  quote: EvidenceQuote,
  technique: EnglishTechnique,
  wrongTechniques: EnglishTechnique[],
): McBase['explanation'] {
  const wrongOptionNotes: Record<string, string> = {}
  for (const wrong of wrongTechniques) {
    wrongOptionNotes[wrong.name] =
      `Not ${wrong.name.toLowerCase()} — ${wrong.howToRecogniseHtml ?? wrong.definitionHtml} That pattern isn't what's happening in this quote.`
  }
  return {
    techniqueId: technique.id,
    techniqueName: technique.name,
    howItWorksHtml: technique.definitionHtml,
    effectHtml: quote.effect,
    meaningHtml: quote.meaning,
    authorialPurposeHtml: quote.authorialPurpose,
    hscSentenceHtml: buildHscSentence(quote),
    wrongOptionNotes,
  }
}

/** The "analytical sentence builder" output (spec section 14) — assembled
 * from the quote's own effect/meaning fields, which are already written as
 * complete, well-formed analytical sentences (see the evidence bank's
 * authoring), rather than force-fused into one sentence via a generic
 * verb-slot template. An earlier version spliced `analyticalLanguage[0]`
 * in as a verb and lowercased the whole effect string — broken whenever
 * that entry wasn't a verb phrase (e.g. paradox's "paradoxically") and
 * whenever the effect started with a proper noun (e.g. "Winston's…"),
 * which lowercasing then mangled. Presenting effect + meaning as their own
 * sentences sidesteps both problems and stays grammatically correct for
 * every technique, not just the ones whose analyticalLanguage happened to
 * fit the old template. */
export function buildHscSentence(quote: EvidenceQuote): string {
  return `${quote.effect} ${quote.meaning}`
}

function makeMc(
  format: McFormat,
  skill: Paper1Skill,
  quote: EvidenceQuote,
  technique: EnglishTechnique,
  bank: EnglishTechnique[],
  promptHtml: string,
): McQuestion {
  const distractors = pickDistractors(bank, technique, quote.techniqueIds, 3)
  const options = lettered([technique, ...distractors])
  // Deterministic shuffle: rotate by a hash of the quote id so option order
  // varies across quotes without any randomness at generation time.
  const rotate = quote.id.length % options.length
  const rotated = [...options.slice(rotate), ...options.slice(0, rotate)]
  return {
    id: `${format}-${quote.id}`,
    format,
    skill,
    quote,
    promptHtml,
    options: rotated.map((o, i) => ({ opt: String.fromCharCode(97 + i), textHtml: o.textHtml })),
    correctOpt: String.fromCharCode(97 + rotated.findIndex((o) => o.textHtml === technique.name)),
    explanation: explanationFor(quote, technique, distractors),
  }
}

export function primaryTechnique(quote: EvidenceQuote, bank: EnglishTechnique[]): EnglishTechnique | null {
  const byId = new Map(bank.map((t) => [t.id, t]))
  for (const id of quote.techniqueIds) {
    const t = byId.get(id)
    if (t) return t
  }
  return null
}

/** Format A (spec section 6): "Which technique is most prominent?" */
export function buildIdentifyQuestions(evidence: EvidenceQuote[], bank: EnglishTechnique[]): McQuestion[] {
  return evidence
    .map((quote) => {
      const technique = primaryTechnique(quote, bank)
      if (!technique) return null
      return makeMc(
        'identify',
        'identify',
        quote,
        technique,
        bank,
        `Which language technique is most prominent in this quotation?<br /><span class="q-quiz-quote">&ldquo;${quote.text}&rdquo;</span>`,
      )
    })
    .filter((q): q is McQuestion => q !== null)
}

/** Format B (spec section 7): identify AND state the effect in one go —
 * the correct option states technique + a quote-specific effect together,
 * so guessing the name alone isn't enough to get it right. */
export function buildIdentifyEffectQuestions(evidence: EvidenceQuote[], bank: EnglishTechnique[]): McQuestion[] {
  return evidence
    .map((quote): McQuestion | null => {
      const technique = primaryTechnique(quote, bank)
      if (!technique) return null
      const distractors = pickDistractors(bank, technique, quote.techniqueIds, 3)
      const correctText = `${technique.name} — ${quote.effect}`
      const wrongTexts = distractors.map((d) => `${d.name} — ${d.effectHtml.replace(/^./, (c) => c.toLowerCase())}`)
      const all = [correctText, ...wrongTexts]
      const rotate = quote.id.length % all.length
      const rotated = [...all.slice(rotate), ...all.slice(0, rotate)]
      const options = rotated.map((textHtml, i) => ({ opt: String.fromCharCode(97 + i), textHtml }))
      const correctOpt = options[rotated.indexOf(correctText)].opt
      return {
        id: `identify-effect-${quote.id}`,
        format: 'identify-effect' as const,
        skill: 'effect' as const,
        quote,
        promptHtml: `What technique is used here, and what is its effect?<br /><span class="q-quiz-quote">&ldquo;${quote.text}&rdquo;</span>`,
        options,
        correctOpt,
        explanation: explanationFor(quote, technique, distractors),
      }
    })
    .filter((q): q is McQuestion => q !== null)
}

/** Format C (spec section 8): technique is GIVEN, options are competing
 * explanations of its effect in this specific quotation — this is what
 * stops "creates imagery and engages the reader" from ever being a viable
 * answer, since the distractors are other quotes' genuinely different
 * effect statements for the same technique, not vague filler. */
export function buildTechniqueToEffectQuestions(
  evidence: EvidenceQuote[],
  bank: EnglishTechnique[],
): McQuestion[] {
  return evidence
    .map((quote): McQuestion | null => {
      const technique = primaryTechnique(quote, bank)
      if (!technique) return null
      // Other quotes that share this technique give genuinely-different,
      // genuinely-plausible-sounding (not ridiculous) wrong effects.
      const otherEffects = evidence
        .filter((q) => q.id !== quote.id && q.techniqueIds.includes(technique.id))
        .map((q) => q.effect)
      const filler = [
        'It simply makes the sentence longer and more descriptive.',
        'It creates imagery and engages the reader.',
      ]
      const distractorTexts = [...otherEffects, ...filler].slice(0, 3)
      const all = [quote.effect, ...distractorTexts]
      const rotate = quote.id.length % all.length
      const rotated = [...all.slice(rotate), ...all.slice(0, rotate)]
      const options = rotated.map((textHtml, i) => ({ opt: String.fromCharCode(97 + i), textHtml }))
      const correctOpt = options[rotated.indexOf(quote.effect)].opt
      return {
        id: `technique-to-effect-${quote.id}`,
        format: 'technique-to-effect' as const,
        skill: 'effect' as const,
        quote,
        promptHtml: `<b>${technique.name}</b> in this quotation:<br /><span class="q-quiz-quote">&ldquo;${quote.text}&rdquo;</span><br />What is the most effective explanation of its effect here specifically?`,
        options,
        correctOpt,
        explanation: explanationFor(quote, technique, []),
      }
    })
    .filter((q): q is McQuestion => q !== null)
}

/** Format D (spec section 9): full technique + evidence + effect + meaning
 * statements compete against plausible-but-incomplete ones. */
export function buildQuoteToAnalysisQuestions(evidence: EvidenceQuote[], bank: EnglishTechnique[]): McQuestion[] {
  return evidence
    .map((quote): McQuestion | null => {
      const technique = primaryTechnique(quote, bank)
      if (!technique) return null
      const correctAnalysis = `${technique.name}: this ${quote.effect.replace(/^./, (c) => c.toLowerCase())} — revealing ${quote.meaning.replace(/^./, (c) => c.toLowerCase())}`
      const distractors = pickDistractors(bank, technique, quote.techniqueIds, 2)
      const incompleteAnalyses = [
        `${technique.name}: this is used for descriptive effect.`,
        ...distractors.map((d) => `${d.name}: this ${d.effectHtml.replace(/^./, (c) => c.toLowerCase())}`),
      ].slice(0, 3)
      const all = [correctAnalysis, ...incompleteAnalyses]
      const rotate = quote.id.length % all.length
      const rotated = [...all.slice(rotate), ...all.slice(0, rotate)]
      const options = rotated.map((textHtml, i) => ({ opt: String.fromCharCode(97 + i), textHtml }))
      const correctOpt = options[rotated.indexOf(correctAnalysis)].opt
      return {
        id: `quote-to-analysis-${quote.id}`,
        format: 'quote-to-analysis' as const,
        skill: 'analysis' as const,
        quote,
        promptHtml: `Which analysis best explains how the language constructs meaning here?<br /><span class="q-quiz-quote">&ldquo;${quote.text}&rdquo;</span>`,
        options,
        correctOpt,
        explanation: explanationFor(quote, technique, distractors),
      }
    })
    .filter((q): q is McQuestion => q !== null)
}

/** Format F (spec section 11) — hand-authored comparison pairs, resolved
 * from ids so the underlying evidence quotes (and their analysis) are
 * never duplicated. Comparisons need real editorial judgment about what's
 * worth comparing, so unlike A–D these aren't generated. */
export interface ComparisonSpec {
  id: string
  quoteAId: string
  quoteBId: string
  promptHtml: string
  modelComparisonHtml: string
}

export function buildComparisonQuestions(specs: ComparisonSpec[], evidence: EvidenceQuote[]): ComparisonQuestion[] {
  const byId = new Map(evidence.map((q) => [q.id, q]))
  return specs
    .map((spec) => {
      const quoteA = byId.get(spec.quoteAId)
      const quoteB = byId.get(spec.quoteBId)
      if (!quoteA || !quoteB) return null
      return {
        id: spec.id,
        format: 'comparison' as const,
        skill: 'application' as const,
        quoteA,
        quoteB,
        promptHtml: spec.promptHtml,
        modelComparisonHtml: spec.modelComparisonHtml,
      }
    })
    .filter((q): q is ComparisonQuestion => q !== null)
}

/** Format E (spec section 10) — open response. No auto-marking; a
 * checkpoint list plus a fully-modelled analysis for self-assessment. */
export function buildOpenResponseQuestions(evidence: EvidenceQuote[], bank: EnglishTechnique[]): OpenResponseQuestion[] {
  return evidence
    .map((quote) => {
      const technique = primaryTechnique(quote, bank)
      if (!technique) return null
      return {
        id: `open-${quote.id}`,
        format: 'open-response' as const,
        skill: 'analysis' as const,
        quote,
        promptHtml: 'Identify the technique and explain its effect in 2–3 sentences.',
        checkpoints: [
          'Did you identify the technique?',
          'Did you explain how it works?',
          "Did you explain its effect in THIS quote (not a generic effect)?",
          'Did you connect it to meaning (theme, character or idea)?',
          "Did you explain why the author uses it here?",
        ],
        modelAnalysisHtml: buildHscSentence(quote),
      }
    })
    .filter((q): q is OpenResponseQuestion => q !== null)
}

// ---- Progress: by technique / by skill, and adaptive revision --------

/** The progress-store key for one generated MC question — plain strings
 * work fine with progressStore.setQuizAnswer/useQuizAnswer (quizKey() in
 * lib/keys.ts is a convention for DOM-index-based subjects, not a
 * requirement of the store itself), so Paper 1 just keys by the question's
 * own stable id. */
export function paper1QuestionKey(questionId: string) {
  return `paper1-${questionId}`
}

export interface WeaknessEntry {
  id: string
  label: string
  correct: number
  total: number
  accuracy: number
}

const SKILL_LABELS: Record<Paper1Skill, string> = {
  identify: 'Identifying techniques',
  effect: 'Explaining effects',
  analysis: 'Connecting technique to meaning',
  application: 'Applying to new evidence',
}

function toWeaknessEntries(
  byKey: Map<string, { correct: number; total: number }>,
  labelFor: (key: string) => string,
): WeaknessEntry[] {
  return [...byKey.entries()]
    .map(([id, stat]) => ({
      id,
      label: labelFor(id),
      correct: stat.correct,
      total: stat.total,
      accuracy: stat.total ? stat.correct / stat.total : 0,
    }))
    .sort((a, b) => a.accuracy - b.accuracy)
}

/** Performance grouped by technique (spec section 15) — only counts
 * questions the student has actually answered, read straight out of
 * progressStore's existing `quiz` slice. */
export function computeTechniqueWeaknesses(
  questions: McQuestion[],
  quizProgress: Record<string, QuizAnswer>,
  bank: EnglishTechnique[],
): WeaknessEntry[] {
  const byId = new Map(bank.map((t) => [t.id, t]))
  const byTechnique = new Map<string, { correct: number; total: number }>()
  for (const q of questions) {
    const technique = primaryTechnique(q.quote, bank)
    if (!technique) continue
    const answer = quizProgress[paper1QuestionKey(q.id)]
    if (!answer) continue
    const stat = byTechnique.get(technique.id) ?? { correct: 0, total: 0 }
    stat.total++
    if (answer.ok) stat.correct++
    byTechnique.set(technique.id, stat)
  }
  return toWeaknessEntries(byTechnique, (id) => byId.get(id)?.name ?? id)
}

/** Performance grouped by skill (spec section 15/23: identify vs effect vs
 * analysis vs application), not just by technique — this is what lets the
 * app say "you can name techniques but struggle to explain effects"
 * instead of only "you're weak at juxtaposition". */
export function computeSkillWeaknesses(
  questions: McQuestion[],
  quizProgress: Record<string, QuizAnswer>,
): WeaknessEntry[] {
  const bySkill = new Map<string, { correct: number; total: number }>()
  for (const q of questions) {
    const answer = quizProgress[paper1QuestionKey(q.id)]
    if (!answer) continue
    const stat = bySkill.get(q.skill) ?? { correct: 0, total: 0 }
    stat.total++
    if (answer.ok) stat.correct++
    bySkill.set(q.skill, stat)
  }
  return toWeaknessEntries(bySkill, (skill) => SKILL_LABELS[skill as Paper1Skill] ?? skill)
}

/** Weak techniques worth recommending revision for — answered at least
 * twice, and under 60% accuracy (spec section 16: "if a student
 * repeatedly gets X wrong, recommend Revise: X"). */
export function weakTechniques(techniqueStats: WeaknessEntry[]): WeaknessEntry[] {
  return techniqueStats.filter((t) => t.total >= 2 && t.accuracy < 0.6)
}

/** Builds a practice pool that over-represents currently-weak techniques
 * (spec section 17: "prioritise weak techniques where appropriate") while
 * still handing the result to the existing shuffled-session engine
 * unchanged — this only decides WHICH questions are in the pool, not how
 * their order is randomised or persisted (that's still shuffledIndices +
 * progressStore, untouched). */
export function buildAdaptivePool(all: McQuestion[], weakTechniqueIds: string[], size: number): McQuestion[] {
  if (weakTechniqueIds.length === 0) return all.slice(0, size)
  const weak = all.filter((q) => q.quote.techniqueIds.some((id) => weakTechniqueIds.includes(id)))
  const rest = all.filter((q) => !weak.includes(q))
  const targetWeakCount = Math.min(weak.length, Math.ceil(size * 0.6))
  return [...weak.slice(0, targetWeakCount), ...rest.slice(0, size - targetWeakCount)]
}
