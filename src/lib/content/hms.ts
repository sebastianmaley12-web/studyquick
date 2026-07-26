import topicMeta from '../../content/hms/topic-meta.json'
import fa1 from '../../content/hms/fa1.json'
import fa2 from '../../content/hms/fa2.json'

/* Hand-written for the same reason as the history/maths content modules:
 * each topic JSON infers its own literal type from its actual content, so
 * the two files aren't structurally assignable to each other without a
 * shared, deliberately loose interface. */
interface HmsBox {
  kind: string
  label: string
  bodyHtml: string
}
interface HmsQuestionCard {
  format: 'card'
  accent: string | null
  qtype: string
  badge: string
  questionHtml: string
  planHtml: string
}
type HmsQuestion = HmsQuestionCard
interface HmsPracticeGroup {
  bank: string | null
  number: string | null
  title: string | null
  questions: HmsQuestion[]
}

export interface HmsTopicData {
  id: string
  meta: {
    title: string
    range: string
    boxes: HmsBox[]
  }
  summary: {
    note: string
    groups: { title: string; points: string[] }[]
  }
  practice: {
    notes: { bank: string | null; variant: string | null; html: string }[]
    sources: { bank: string | null; tag: string; bodyHtml: string }[]
    groups: HmsPracticeGroup[]
  }
  trivia: HmsTriviaCard[]
  quiz: HmsQuizQuestion[]
}

export interface HmsTriviaCard {
  n: number
  questionHtml: string
  answerHtml: string
}

export interface HmsQuizQuestion {
  n: number
  answer: string
  questionHtml: string
  options: { opt: string; textHtml: string }[]
}

export const HMS_TOPIC_DATA: Record<string, HmsTopicData> = {
  fa1: fa1 as HmsTopicData,
  fa2: fa2 as HmsTopicData,
}

export const HMS_TOPIC_IDS = ['fa1', 'fa2'] as const
export type HmsTopicId = (typeof HMS_TOPIC_IDS)[number]

function countPracticeQuestions(data: HmsTopicData) {
  return data.practice.groups.reduce((sum, g) => sum + g.questions.length, 0)
}

function countSummaryPoints(data: HmsTopicData) {
  return data.summary.groups.reduce((sum, g) => sum + g.points.length, 0)
}

export const hmsTopics = HMS_TOPIC_IDS.map((id) => {
  const data = HMS_TOPIC_DATA[id]
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

export const hmsTotals = hmsTopics.reduce(
  (totals, t) => ({
    practice: totals.practice + t.practiceCount,
    trivia: totals.trivia + t.triviaCount,
    quiz: totals.quiz + t.quizCount,
    summaryPoints: totals.summaryPoints + t.summaryPointCount,
  }),
  { practice: 0, trivia: 0, quiz: 0, summaryPoints: 0 },
)

export const HMS_RESOURCES = ['summary', 'practice', 'trivia', 'quiz'] as const
export type HmsResource = (typeof HMS_RESOURCES)[number]

export const HMS_RESOURCE_LABELS: Record<HmsResource, string> = {
  summary: 'Syllabus Summary',
  practice: 'Practice Questions',
  trivia: 'Quick Trivia',
  quiz: 'Multiple Choice Quiz',
}
