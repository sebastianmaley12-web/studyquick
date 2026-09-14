import topicMeta from '../../content/legal/topic-meta.json'
import crime from '../../content/legal/crime.json'
import humanrights from '../../content/legal/humanrights.json'
import environment from '../../content/legal/environment.json'
import worldorder from '../../content/legal/worldorder.json'

/* Hand-written for the same reason as the other content modules: each topic
 * JSON infers its own literal type from its actual content, so the four
 * files aren't structurally assignable to each other without a shared,
 * deliberately loose interface. */
interface LegalBox {
  kind: string
  label: string
  bodyHtml: string
}
interface LegalQuestionCard {
  format: 'card'
  accent: string | null
  qtype: string
  badge: string
  questionHtml: string
  planHtml: string
}
type LegalQuestion = LegalQuestionCard
interface LegalPracticeGroup {
  bank: string | null
  number: string | null
  title: string | null
  questions: LegalQuestion[]
}

export type LegalEvidenceType = 'case' | 'legislation' | 'treaty' | 'statistic' | 'example'

/** The "evidence bank" spec section 10 asks for: real cases, legislation,
 * treaties, statistics and contemporary examples a student can drop
 * straight into an HSC response, each answering What is it? / What does it
 * demonstrate? / How can I use it? — not just a name to recognise. Every
 * entry's `source` field records exactly where it was verified from (a
 * real HSC trial paper, or already-verified content elsewhere in this
 * project) so a fabricated citation can never slip in unnoticed. Global
 * Environmental Protection has no case/legislation content in either trial
 * paper checked for this pass — its 5 items come from content already
 * verified in this file's own summary section, not padded with invented
 * ones; expand it only from a real source, never to "match" other topics'
 * counts. */
export interface LegalEvidenceItem {
  id: string
  type: LegalEvidenceType
  /** Exact case citation / legislation title / treaty name, as it would
   * appear in a real HSC response — not paraphrased. */
  name: string
  /** Short context — jurisdiction, year, court, or parties, as applicable. */
  citation: string | null
  whatIsItHtml: string
  whatItDemonstratesHtml: string
  howToUseItHtml: string
  relatedTags: string[]
  /** Where this was verified from, e.g. a specific real past paper — never
   * left blank, so every item's provenance is auditable. */
  source: string
}

export interface LegalTopicData {
  id: string
  meta: {
    title: string
    range: string
    boxes: LegalBox[]
  }
  summary: {
    note: string
    groups: { title: string; points: string[] }[]
  }
  evidence: LegalEvidenceItem[]
  practice: {
    notes: { bank: string | null; variant: string | null; html: string }[]
    sources: { bank: string | null; tag: string; bodyHtml: string }[]
    groups: LegalPracticeGroup[]
  }
  trivia: LegalTriviaCard[]
  quiz: LegalQuizQuestion[]
}

export interface LegalTriviaCard {
  n: number
  questionHtml: string
  answerHtml: string
}

export interface LegalQuizQuestion {
  n: number
  answer: string
  questionHtml: string
  options: { opt: string; textHtml: string }[]
}

export const LEGAL_TOPIC_DATA: Record<string, LegalTopicData> = {
  crime: crime as LegalTopicData,
  humanrights: humanrights as LegalTopicData,
  environment: environment as LegalTopicData,
  worldorder: worldorder as LegalTopicData,
}

export const LEGAL_TOPIC_IDS = ['crime', 'humanrights', 'environment', 'worldorder'] as const
export type LegalTopicId = (typeof LEGAL_TOPIC_IDS)[number]

function countPracticeQuestions(data: LegalTopicData) {
  return data.practice.groups.reduce((sum, g) => sum + g.questions.length, 0)
}

function countSummaryPoints(data: LegalTopicData) {
  return data.summary.groups.reduce((sum, g) => sum + g.points.length, 0)
}

export const legalTopics = LEGAL_TOPIC_IDS.map((id) => {
  const data = LEGAL_TOPIC_DATA[id]
  const meta = (topicMeta as Record<string, { short: string; years: string }>)[id]
  return {
    id,
    short: meta.short,
    years: meta.years,
    title: data.meta.title,
    range: data.meta.range,
    boxes: data.meta.boxes,
    practiceCount: countPracticeQuestions(data),
    triviaCount: data.trivia.length,
    quizCount: data.quiz.length,
    summaryPointCount: countSummaryPoints(data),
    evidenceCount: data.evidence.length,
  }
})

export const legalTotals = legalTopics.reduce(
  (totals, t) => ({
    practice: totals.practice + t.practiceCount,
    trivia: totals.trivia + t.triviaCount,
    quiz: totals.quiz + t.quizCount,
    summaryPoints: totals.summaryPoints + t.summaryPointCount,
    evidence: totals.evidence + t.evidenceCount,
  }),
  { practice: 0, trivia: 0, quiz: 0, summaryPoints: 0, evidence: 0 },
)

export const LEGAL_RESOURCES = ['summary', 'evidence', 'practice', 'trivia', 'quiz'] as const
export type LegalResource = (typeof LEGAL_RESOURCES)[number]

export const LEGAL_RESOURCE_LABELS: Record<LegalResource, string> = {
  summary: 'Syllabus Summary',
  evidence: 'Evidence Bank',
  practice: 'Practice Questions',
  trivia: 'Quick Trivia',
  quiz: 'Multiple Choice Quiz',
}
