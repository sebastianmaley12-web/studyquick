import { dueMathsKeys, dueQuizKeys } from './progressStats'
import type { ProgressState } from './progressStore'
import type { MathsTopic } from './content/maths'

function makeProgress(overrides: Partial<ProgressState> = {}): ProgressState {
  return { v: 1, quiz: {}, trivia: {}, notes: {}, maths: {}, review: {}, sessions: {}, ...overrides }
}

describe('dueQuizKeys', () => {
  const topic = { id: 's1', quizCount: 3, triviaCount: 0, practiceCount: 0 }

  it('excludes items not yet due and items never answered', () => {
    const progress = makeProgress({
      quiz: {
        's1-quiz#0': { pick: 'a', ok: true },
        's1-quiz#1': { pick: 'b', ok: false },
        // s1-quiz#2 never answered
      },
      review: {
        's1-quiz#0': { box: 0, dueAt: Date.now() + 1_000_000 },
        's1-quiz#1': { box: 0, dueAt: Date.now() + 1_000_000 },
      },
    })
    expect(dueQuizKeys(progress, topic)).toEqual([])
  })

  it('includes an answered item once its due date has passed', () => {
    const progress = makeProgress({
      quiz: { 's1-quiz#0': { pick: 'a', ok: true } },
      review: { 's1-quiz#0': { box: 0, dueAt: Date.now() - 1_000 } },
    })
    expect(dueQuizKeys(progress, topic)).toEqual(['s1-quiz#0'])
  })
})

describe('dueMathsKeys', () => {
  const topic: MathsTopic = {
    code: 'MS-TEST',
    name: 'Test Topic',
    strand: 'Algebra',
    year: 12,
    blurb: '',
    formulae: [],
    dotpoints: [],
    slug: 'test',
    questions: [
      { id: 'q1', type: 'num', q: '', ans: 1, tol: 0.1, unit: '', prefix: '', marks: 1, sol: '' },
      { id: 'q2', type: 'num', q: '', ans: 1, tol: 0.1, unit: '', prefix: '', marks: 1, sol: '' },
    ],
  }

  it('only includes answered questions whose review is due', () => {
    const progress = makeProgress({
      maths: { 'test#q1': { v: 1, ok: true } },
      review: { 'test#q1': { box: 0, dueAt: Date.now() + 1_000_000 } },
    })
    expect(dueMathsKeys(progress, topic)).toEqual([])
  })

  it('includes an answered question once its due date has passed', () => {
    const progress = makeProgress({
      maths: { 'test#q1': { v: 1, ok: true } },
      review: { 'test#q1': { box: 0, dueAt: Date.now() - 1_000 } },
    })
    expect(dueMathsKeys(progress, topic)).toEqual(['test#q1'])
  })
})
