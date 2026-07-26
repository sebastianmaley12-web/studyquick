import mathsData from '../../content/maths/topics.json'

/* Hand-written for the same reason as the history types: tsc infers a
 * "sloppy union" from the questions array's heterogeneous num/mc literals
 * (every field present-or-undefined across both shapes) rather than a clean
 * discriminated union, so `q.type === 'num'` doesn't narrow away `undefined`
 * on tol/unit/prefix or opts. */
export interface MathsNumQuestion {
  id: string
  type: 'num'
  q: string
  ans: number
  tol: number
  unit: string
  prefix: string
  marks: number
  sol: string
}
export interface MathsMcQuestion {
  id: string
  type: 'mc'
  q: string
  opts: string[]
  ans: number
  marks: number
  sol: string
}
export type MathsQuestionData = MathsNumQuestion | MathsMcQuestion

export interface MathsTopic {
  code: string
  name: string
  strand: string
  year: number
  blurb: string
  formulae: string[]
  dotpoints: string[]
  questions: MathsQuestionData[]
  slug: string
}

const typedMathsTopics = mathsData.topics as unknown as MathsTopic[]

export const mathsTopicsBySlug: Record<string, MathsTopic> = Object.fromEntries(
  typedMathsTopics.map((t) => [t.slug, t]),
)

export const mathsYear12Topics = typedMathsTopics.filter((t) => t.year === 12)
export const mathsYear11Topics = typedMathsTopics.filter((t) => t.year === 11)

function countQuestionsByType(topics: MathsTopic[], type: string) {
  return topics.reduce((sum, t) => sum + t.questions.filter((q) => q.type === type).length, 0)
}

export const mathsTotals = {
  topics: typedMathsTopics.length,
  questions: typedMathsTopics.reduce((sum, t) => sum + t.questions.length, 0),
  numEntry: countQuestionsByType(typedMathsTopics, 'num'),
  multipleChoice: countQuestionsByType(typedMathsTopics, 'mc'),
  year12Questions: mathsYear12Topics.reduce((sum, t) => sum + t.questions.length, 0),
  year11Questions: mathsYear11Topics.reduce((sum, t) => sum + t.questions.length, 0),
}

export const MATHS_RESOURCES = ['facts', 'practice'] as const
export type MathsResource = (typeof MATHS_RESOURCES)[number]

export const MATHS_RESOURCE_LABELS: Record<MathsResource, string> = {
  facts: 'Key Facts & Formulae',
  practice: 'Practice Questions',
}
