import topicMeta from '../../content/business/topic-meta.json'
import operations from '../../content/business/operations.json'
import marketing from '../../content/business/marketing.json'
import finance from '../../content/business/finance.json'
import hr from '../../content/business/hr.json'

/* Hand-written for the same reason as the other content modules: each topic
 * JSON infers its own literal type from its actual content, so the four
 * files aren't structurally assignable to each other without a shared,
 * deliberately loose interface. */
interface BusinessBox {
  kind: string
  label: string
  bodyHtml: string
}
interface BusinessQuestionCard {
  format: 'card'
  accent: string | null
  qtype: string
  badge: string
  questionHtml: string
  planHtml: string
}
type BusinessQuestion = BusinessQuestionCard
interface BusinessPracticeGroup {
  bank: string | null
  number: string | null
  title: string | null
  questions: BusinessQuestion[]
}

export type BusinessEvidenceType = 'case-study' | 'statistic' | 'legislation' | 'example'

/** Same evidence-bank pattern as Legal/Modern History, adapted for
 * Business: real, dated Australian company case studies rather than
 * cases/historians. Sourced from case-study documents the user had
 * already compiled for their own study (see each topic's `evidence`
 * entries' `source` field) — never invented, and every figure is dated
 * because business/regulatory figures move. */
export interface BusinessEvidenceItem {
  id: string
  type: BusinessEvidenceType
  name: string
  citation: string | null
  whatIsItHtml: string
  whatItDemonstratesHtml: string
  howToUseItHtml: string
  relatedTags: string[]
  source: string
}

export interface BusinessTopicData {
  id: string
  meta: {
    title: string
    range: string
    boxes: BusinessBox[]
  }
  summary: {
    note: string
    groups: { title: string; points: string[] }[]
  }
  evidence: BusinessEvidenceItem[]
  practice: {
    notes: { bank: string | null; variant: string | null; html: string }[]
    sources: { bank: string | null; tag: string; bodyHtml: string }[]
    groups: BusinessPracticeGroup[]
  }
  trivia: BusinessTriviaCard[]
  quiz: BusinessQuizQuestion[]
}

export interface BusinessTriviaCard {
  n: number
  questionHtml: string
  answerHtml: string
}

export interface BusinessQuizQuestion {
  n: number
  answer: string
  questionHtml: string
  options: { opt: string; textHtml: string }[]
}

export const BUSINESS_TOPIC_DATA: Record<string, BusinessTopicData> = {
  operations: operations as BusinessTopicData,
  marketing: marketing as BusinessTopicData,
  finance: finance as BusinessTopicData,
  hr: hr as BusinessTopicData,
}

export const BUSINESS_TOPIC_IDS = ['operations', 'marketing', 'finance', 'hr'] as const
export type BusinessTopicId = (typeof BUSINESS_TOPIC_IDS)[number]

function countPracticeQuestions(data: BusinessTopicData) {
  return data.practice.groups.reduce((sum, g) => sum + g.questions.length, 0)
}

function countSummaryPoints(data: BusinessTopicData) {
  return data.summary.groups.reduce((sum, g) => sum + g.points.length, 0)
}

export const businessTopics = BUSINESS_TOPIC_IDS.map((id) => {
  const data = BUSINESS_TOPIC_DATA[id]
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

export const businessTotals = businessTopics.reduce(
  (totals, t) => ({
    practice: totals.practice + t.practiceCount,
    trivia: totals.trivia + t.triviaCount,
    quiz: totals.quiz + t.quizCount,
    summaryPoints: totals.summaryPoints + t.summaryPointCount,
    evidence: totals.evidence + t.evidenceCount,
  }),
  { practice: 0, trivia: 0, quiz: 0, summaryPoints: 0, evidence: 0 },
)

export const BUSINESS_RESOURCES = ['summary', 'evidence', 'practice', 'trivia', 'quiz'] as const
export type BusinessResource = (typeof BUSINESS_RESOURCES)[number]

export const BUSINESS_RESOURCE_LABELS: Record<BusinessResource, string> = {
  summary: 'Syllabus Summary',
  evidence: 'Case Study Bank',
  practice: 'Practice Questions',
  trivia: 'Quick Trivia',
  quiz: 'Multiple Choice Quiz',
}
