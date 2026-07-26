import topicMeta from '../../content/modern-history/topic-meta.json'
import s1 from '../../content/modern-history/s1.json'
import s2 from '../../content/modern-history/s2.json'
import s3 from '../../content/modern-history/s3.json'
import s4 from '../../content/modern-history/s4.json'

/* Hand-written rather than `typeof s1`: each topic JSON infers its own literal
 * type from its actual content (e.g. an empty array becomes `never[]` in one
 * file but not another), so the four files aren't structurally assignable to
 * each other without a shared, deliberately loose interface. */
interface HistoryBox {
  kind: string
  label: string
  bodyHtml: string
}
interface HistoryQuestionCard {
  format: 'card'
  accent: string | null
  qtype: string
  badge: string
  questionHtml: string
  planHtml: string
}
interface HistoryQuestionOption {
  label: string
  questionHtml: string
  planHtml: string
}
interface HistoryQuestionOptions {
  format: 'options'
  setTitle: string | null
  options: HistoryQuestionOption[]
}
type HistoryQuestion = HistoryQuestionCard | HistoryQuestionOptions
interface HistoryPracticeGroup {
  bank: string | null
  number: string | null
  title: string | null
  questions: HistoryQuestion[]
}

export interface ModernHistoryTopicData {
  id: string
  meta: {
    title: string
    range: string
    boxes: HistoryBox[]
  }
  summary: {
    note: string
    groups: { title: string; points: string[] }[]
  }
  practice: {
    notes: { bank: string | null; variant: string | null; html: string }[]
    sources: { bank: string | null; tag: string; bodyHtml: string }[]
    groups: HistoryPracticeGroup[]
  }
  trivia: HistoryTriviaCard[]
  quiz: HistoryQuizQuestion[]
}

export interface HistoryTriviaCard {
  n: number
  questionHtml: string
  answerHtml: string
}

export interface HistoryQuizQuestion {
  n: number
  answer: string
  questionHtml: string
  options: { opt: string; textHtml: string }[]
}

export const MODERN_HISTORY_TOPIC_DATA: Record<string, ModernHistoryTopicData> = {
  s1: s1 as ModernHistoryTopicData,
  s2: s2 as ModernHistoryTopicData,
  s3: s3 as ModernHistoryTopicData,
  s4: s4 as ModernHistoryTopicData,
}

export const MODERN_HISTORY_TOPIC_IDS = ['s1', 's2', 's3', 's4'] as const
export type ModernHistoryTopicId = (typeof MODERN_HISTORY_TOPIC_IDS)[number]

function countPracticeQuestions(data: ModernHistoryTopicData) {
  return data.practice.groups.reduce((sum, g) => sum + g.questions.length, 0)
}

function countSummaryPoints(data: ModernHistoryTopicData) {
  return data.summary.groups.reduce((sum, g) => sum + g.points.length, 0)
}

export const modernHistoryTopics = MODERN_HISTORY_TOPIC_IDS.map((id) => {
  const data = MODERN_HISTORY_TOPIC_DATA[id]
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
  }
})

export const modernHistoryTotals = modernHistoryTopics.reduce(
  (totals, t) => ({
    practice: totals.practice + t.practiceCount,
    trivia: totals.trivia + t.triviaCount,
    quiz: totals.quiz + t.quizCount,
    summaryPoints: totals.summaryPoints + t.summaryPointCount,
  }),
  { practice: 0, trivia: 0, quiz: 0, summaryPoints: 0 },
)

export const MODERN_HISTORY_RESOURCES = ['summary', 'practice', 'trivia', 'quiz'] as const
export type ModernHistoryResource = (typeof MODERN_HISTORY_RESOURCES)[number]

export const MODERN_HISTORY_RESOURCE_LABELS: Record<ModernHistoryResource, string> = {
  summary: 'Syllabus Summary',
  practice: 'Practice Questions',
  trivia: 'Quick Trivia',
  quiz: 'Multiple Choice Quiz',
}

export const TOPIC_ROMAN: Record<ModernHistoryTopicId, string> = {
  s1: 'I',
  s2: 'II',
  s3: 'III',
  s4: 'IV',
}
