/**
 * English Advanced content schema.
 *
 * Deliberately a different shape to the other subjects' content libs
 * (legal.ts, modernHistory.ts etc.) rather than a copy-paste of their
 * interfaces: English's unit of study is a *text* (with sections, characters,
 * themes, quotes and techniques as richly cross-referenced sub-entities), not
 * a flat list of syllabus dot points. See MEMORY / the English Advanced audit
 * for why this needed its own architecture.
 *
 * IDs (not array position) are the join key everywhere — a quote references
 * `themeIds`/`techniqueIds`/`characterIds`, a theme references `quoteIds`,
 * and so on — so content can be filtered and cross-linked without duplicating
 * prose. `lookup*` helpers below resolve those ids at render time.
 *
 * Prototype-only for now: one file, one text, hand-typed (not JSON) so the
 * schema itself gets type-checked while it's still being designed. Stage F
 * (full content build) is expected to split each text into its own JSON file
 * under src/content/english/ once the shape is approved — same reasoning as
 * legal/business/hms's per-topic JSON files — so every text's content can be
 * route-level code-split instead of bundled up front.
 */

export type EnglishModuleId = 'common-module' | 'module-a' | 'module-b' | 'module-c'

export type EnglishTextForm =
  | 'novel'
  | 'play'
  | 'poetry'
  | 'nonfiction'
  | 'film'
  | 'short-fiction'
  | 'speech'

export type SectionKind = 'chapter' | 'scene' | 'act' | 'poem' | 'passage'

export interface EnglishSection {
  id: string
  order: number
  kind: SectionKind
  /** e.g. "Part One, Chapter 1" — free text because conventions differ by form */
  label: string
  summaryHtml: string
  keyEvents: string[]
  ideasIntroduced: string[]
  charactersInFocus: string[]
  turningPointHtml: string | null
  quoteIds: string[]
}

export interface EnglishCharacter {
  id: string
  name: string
  roleHtml: string
  relationshipsHtml: string
  developmentHtml: string
  associatedThemeIds: string[]
  quoteIds: string[]
}

export interface EnglishTheme {
  id: string
  name: string
  explanationHtml: string
  developmentHtml: string
  keySectionIds: string[]
  associatedCharacterIds: string[]
  quoteIds: string[]
  techniqueIds: string[]
  possibleArguments: string[]
}

export interface EnglishQuote {
  id: string
  textHtml: string
  speaker: string | null
  /** Human-readable location, e.g. "Part One, Chapter 7" — always present. */
  location: string
  /** FK into `text.sections`, or null when that section doesn't have a full
   * write-up yet — a quote bank naturally outpaces chapter-by-chapter
   * summaries during content authoring, so this is deliberately optional
   * rather than forcing every quote's chapter to be fully built out. */
  sectionId: string | null
  themeIds: string[]
  techniqueIds: string[]
  characterIds: string[]
  contextHtml: string
  revealsHtml: string
  authorialPurposeHtml: string
  argumentHtml: string
}

export type TechniqueCategory =
  | 'symbolism-and-motif'
  | 'language-and-diction'
  | 'structure-and-form'
  | 'narrative-voice'
  | 'figurative-language'
  | 'sound'
  | 'imagery'
  | 'persuasive-language'
  | 'visual-and-multimodal'

export const TECHNIQUE_CATEGORY_LABELS: Record<TechniqueCategory, string> = {
  'symbolism-and-motif': 'Symbolism & motif',
  'language-and-diction': 'Language & diction',
  'structure-and-form': 'Structure & form',
  'narrative-voice': 'Narrative voice',
  'figurative-language': 'Figurative language',
  sound: 'Sound',
  imagery: 'Imagery',
  'persuasive-language': 'Persuasive language',
  'visual-and-multimodal': 'Visual & multimodal',
}

export interface EnglishTechnique {
  id: string
  name: string
  category: TechniqueCategory
  definitionHtml: string
  effectHtml: string
  whyAuthorsUseItHtml: string
  /** A real instance from a studied text, when one has been verified —
   * preferred over `genericExampleHtml` whenever both exist. */
  exampleQuoteId: string | null
  /** A text-independent illustrative example — used for techniques (mostly
   * persuasive/visual ones relevant to unseen Paper 1 texts) that don't have
   * a verified instance in a prescribed text yet. Exactly one of
   * `exampleQuoteId`/`genericExampleHtml` should be present. */
  genericExampleHtml: string | null
  analyticalLanguage: string[]
  /** How a student recognises this technique on the page, distinct from its
   * definition — the Paper 1 bank needs both (spec: "how to recognise it"),
   * existing per-text technique tables can leave this null. */
  howToRecogniseHtml: string | null
  /** The mistake students most often make with this technique — e.g.
   * confusing it with a similar device, or reaching for it too eagerly. */
  commonMistakeHtml: string | null
  /** Other technique ids students commonly confuse this with — used to
   * generate plausible (not random) multiple-choice distractors. */
  confusedWithIds: string[]
}

export interface ShortAnswerQuestion {
  id: string
  prompt: string
  qtype: 'identify' | 'explain' | 'analyse' | 'how' | 'to-what-extent'
  marks: number
  stimulusHtml: string | null
  modelAnswerHtml: string
  markingGuidanceHtml: string
  keyPoints: string[]
  relevantQuoteIds: string[]
  strongerResponseHtml: string
}

export type EssayQuestionType = 'thesis' | 'topic-sentence' | 'paragraph' | 'full-essay'

export interface EssayQuestion {
  id: string
  type: EssayQuestionType
  prompt: string
  marks: number | null
  suggestedEvidence: string[]
  modelThesisHtml: string
  modelArgumentStructureHtml: string
  modelResponseHtml: string
  planningGuidanceHtml: string
}

export interface EnglishText {
  id: string
  moduleId: EnglishModuleId
  title: string
  author: string
  form: EnglishTextForm
  publicationInfo: string
  overviewHtml: string
  majorConcernsHtml: string
  contextHtml: string
  significanceHtml: string
  sections: EnglishSection[]
  characters: EnglishCharacter[]
  themes: EnglishTheme[]
  quotes: EnglishQuote[]
  techniques: EnglishTechnique[]
  shortAnswerQuestions: ShortAnswerQuestion[]
  essayQuestions: EssayQuestion[]
}

export interface EnglishModule {
  id: EnglishModuleId
  name: string
  yearLevel: 11 | 12
  syllabusOverviewHtml: string
  textIds: string[]
}

// ---- lookup helpers (id-based joins) ---------------------------------------

export function lookupById<T extends { id: string }>(items: T[], id: string): T | undefined {
  return items.find((item) => item.id === id)
}

export function lookupManyById<T extends { id: string }>(items: T[], ids: string[]): T[] {
  return ids.map((id) => lookupById(items, id)).filter((item): item is T => item !== undefined)
}

export const ENGLISH_RESOURCES = [
  'overview',
  'chapters',
  'characters',
  'quotes',
  'techniques',
  'short-answer',
  'essay',
  'quote-learning',
  'test',
] as const
export type EnglishResource = (typeof ENGLISH_RESOURCES)[number]

export const ENGLISH_RESOURCE_LABELS: Record<EnglishResource, string> = {
  overview: 'Text Overview',
  chapters: 'Chapters',
  characters: 'Characters & Themes',
  quotes: 'Quote Bank',
  techniques: 'Technique Table',
  'short-answer': 'Short Answer',
  essay: 'Essay Practice',
  'quote-learning': 'Quote Learning',
  test: 'Quote & Technique Test',
}

export function textTotals(text: EnglishText) {
  return {
    sections: text.sections.length,
    quotes: text.quotes.length,
    techniques: text.techniques.length,
    themes: text.themes.length,
    characters: text.characters.length,
    shortAnswer: text.shortAnswerQuestions.length,
    essay: text.essayQuestions.length,
  }
}
