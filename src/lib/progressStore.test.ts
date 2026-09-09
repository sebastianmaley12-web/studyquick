import { progressStore } from './progressStore'
import { REVIEW_INTERVALS_DAYS } from './spacedRepetition'

const KEY = 'studyquick.progress.v1'
const DAY = 24 * 60 * 60 * 1000

describe('progressStore', () => {
  beforeEach(() => {
    vi.useFakeTimers()
    progressStore.resetAll()
    vi.runAllTimers()
  })

  afterEach(() => {
    vi.runOnlyPendingTimers()
    vi.useRealTimers()
  })

  it('persists to the original localStorage key and shape', () => {
    const now = Date.now()
    progressStore.setQuizAnswer('s1-quiz#0', 'a', true)
    vi.runAllTimers()
    const raw = JSON.parse(localStorage.getItem(KEY)!)
    expect(raw).toEqual({
      v: 1,
      quiz: { 's1-quiz#0': { pick: 'a', ok: true } },
      trivia: {},
      notes: {},
      maths: {},
      review: { 's1-quiz#0': { box: 0, dueAt: now + REVIEW_INTERVALS_DAYS[0] * DAY } },
      sessions: {},
    })
  })

  it('records a quiz answer with pick/ok field names matching the original', () => {
    progressStore.setQuizAnswer('s1-quiz#3', 'b', false)
    expect(progressStore.getSnapshot().quiz['s1-quiz#3']).toEqual({ pick: 'b', ok: false })
  })

  it('retryIncorrectQuiz only clears wrong answers, leaving correct ones', () => {
    progressStore.setQuizAnswer('s1-quiz#0', 'a', true)
    progressStore.setQuizAnswer('s1-quiz#1', 'b', false)
    progressStore.retryIncorrectQuiz(['s1-quiz#0', 's1-quiz#1'])
    expect(progressStore.getSnapshot().quiz).toEqual({ 's1-quiz#0': { pick: 'a', ok: true } })
  })

  it('resetQuizTopic clears every listed key regardless of correctness', () => {
    progressStore.setQuizAnswer('s1-quiz#0', 'a', true)
    progressStore.setQuizAnswer('s1-quiz#1', 'b', false)
    progressStore.resetQuizTopic(['s1-quiz#0', 's1-quiz#1'])
    expect(progressStore.getSnapshot().quiz).toEqual({})
  })

  it('toggleTriviaConfidence stores a plain string, and toggling the same value clears it', () => {
    progressStore.toggleTriviaConfidence('s1-trivia#0', 'known')
    expect(progressStore.getSnapshot().trivia['s1-trivia#0']).toBe('known')

    progressStore.toggleTriviaConfidence('s1-trivia#0', 'known')
    expect(progressStore.getSnapshot().trivia['s1-trivia#0']).toBeUndefined()

    progressStore.toggleTriviaConfidence('s1-trivia#0', 'shaky')
    expect(progressStore.getSnapshot().trivia['s1-trivia#0']).toBe('shaky')
  })

  it('setNote deletes the key when text is emptied, matching the original', () => {
    progressStore.setNote('s1-practice#0', 'my draft answer')
    expect(progressStore.getSnapshot().notes['s1-practice#0']).toBe('my draft answer')

    progressStore.setNote('s1-practice#0', '   ')
    expect(progressStore.getSnapshot().notes['s1-practice#0']).toBeUndefined()
  })

  it('clearNotesForTopic only clears notes for that topic prefix', () => {
    progressStore.setNote('s1-practice#0', 'a')
    progressStore.setNote('s2-practice#0', 'b')
    progressStore.clearNotesForTopic('s1-practice')
    expect(progressStore.getSnapshot().notes).toEqual({ 's2-practice#0': 'b' })
  })

  it('records maths answers with the v/ok field names matching the original', () => {
    progressStore.setMathsAnswer('f4#a1q1', 128.68, true)
    expect(progressStore.getSnapshot().maths['f4#a1q1']).toEqual({ v: 128.68, ok: true })
  })

  it('resetAll clears every slice and removes the localStorage key', () => {
    progressStore.setQuizAnswer('s1-quiz#0', 'a', true)
    progressStore.setNote('s1-practice#0', 'note')
    progressStore.resetAll()
    expect(progressStore.getSnapshot()).toEqual({
      v: 1,
      quiz: {},
      trivia: {},
      notes: {},
      maths: {},
      review: {},
      sessions: {},
    })
    expect(localStorage.getItem(KEY)).toBeNull()
  })

  it('schedules a review on a correct answer and resets it to box 0 on a wrong one', () => {
    progressStore.setQuizAnswer('s1-quiz#0', 'a', true)
    expect(progressStore.getSnapshot().review['s1-quiz#0'].box).toBe(0)

    progressStore.setQuizAnswer('s1-quiz#0', 'a', true)
    expect(progressStore.getSnapshot().review['s1-quiz#0'].box).toBe(1)

    progressStore.setQuizAnswer('s1-quiz#0', 'b', false)
    expect(progressStore.getSnapshot().review['s1-quiz#0'].box).toBe(0)
  })

  it('clears the review schedule whenever the answer it belongs to is cleared', () => {
    progressStore.setQuizAnswer('s1-quiz#0', 'a', false)
    progressStore.setMathsAnswer('f4#a1q1', 4, true)
    expect(progressStore.getSnapshot().review['s1-quiz#0']).toBeDefined()
    expect(progressStore.getSnapshot().review['f4#a1q1']).toBeDefined()

    progressStore.retryIncorrectQuiz(['s1-quiz#0'])
    expect(progressStore.getSnapshot().review['s1-quiz#0']).toBeUndefined()

    progressStore.resetMathsTopic(['f4#a1q1'])
    expect(progressStore.getSnapshot().review['f4#a1q1']).toBeUndefined()
  })

  it('notifies subscribers on every write', () => {
    const cb = vi.fn()
    const unsubscribe = progressStore.subscribe(cb)
    progressStore.setQuizAnswer('s1-quiz#0', 'a', true)
    expect(cb).toHaveBeenCalledTimes(1)
    unsubscribe()
    progressStore.setQuizAnswer('s1-quiz#1', 'b', false)
    expect(cb).toHaveBeenCalledTimes(1)
  })

  it('leaves unrelated slices referentially unchanged on a write', () => {
    progressStore.setNote('s1-practice#0', 'a')
    const triviaBefore = progressStore.getSnapshot().trivia
    progressStore.setQuizAnswer('s1-quiz#0', 'a', true)
    expect(progressStore.getSnapshot().trivia).toBe(triviaBefore)
  })

  describe('test sessions', () => {
    it('getOrStartSession only generates a new order the first time — a second call returns the same session', () => {
      const first = progressStore.getOrStartSession('maths:n2:test', () => [3, 1, 0, 2])
      expect(first).toEqual({ order: [3, 1, 0, 2], position: 0 })
      const second = progressStore.getOrStartSession('maths:n2:test', () => [0, 1, 2, 3])
      expect(second).toBe(first)
      expect(second.order).toEqual([3, 1, 0, 2])
    })

    it('advanceSession moves position forward and only marks completion once advanced past the last item', () => {
      progressStore.getOrStartSession('maths:n2:test', () => [0, 1, 2])
      progressStore.advanceSession('maths:n2:test') // viewing item 1 of 3
      expect(progressStore.getSnapshot().sessions['maths:n2:test'].position).toBe(1)
      expect(progressStore.getSnapshot().sessions['maths:n2:test'].completedAt).toBeUndefined()

      progressStore.advanceSession('maths:n2:test') // viewing item 2 of 3 (the last one)
      expect(progressStore.getSnapshot().sessions['maths:n2:test'].position).toBe(2)
      expect(progressStore.getSnapshot().sessions['maths:n2:test'].completedAt).toBeUndefined()

      progressStore.advanceSession('maths:n2:test') // answered the last item -> complete
      const session = progressStore.getSnapshot().sessions['maths:n2:test']
      expect(session.position).toBe(2)
      expect(session.completedAt).toBeDefined()
    })

    it('advanceSession never advances position past the last item', () => {
      progressStore.getOrStartSession('maths:n2:test', () => [0, 1])
      progressStore.advanceSession('maths:n2:test')
      progressStore.advanceSession('maths:n2:test')
      progressStore.advanceSession('maths:n2:test')
      expect(progressStore.getSnapshot().sessions['maths:n2:test'].position).toBe(1)
    })

    it('startNewAttempt regenerates the order and resets position, even mid-attempt', () => {
      progressStore.getOrStartSession('maths:n2:test', () => [0, 1, 2])
      progressStore.advanceSession('maths:n2:test')
      progressStore.startNewAttempt('maths:n2:test', () => [2, 0, 1])
      expect(progressStore.getSnapshot().sessions['maths:n2:test']).toEqual({
        order: [2, 0, 1],
        position: 0,
      })
    })

    it('goToSessionPosition jumps directly without touching the order', () => {
      progressStore.getOrStartSession('maths:n2:test', () => [0, 1, 2])
      progressStore.goToSessionPosition('maths:n2:test', 2)
      expect(progressStore.getSnapshot().sessions['maths:n2:test']).toEqual({
        order: [0, 1, 2],
        position: 2,
      })
    })

    it('sessions for different keys are independent', () => {
      progressStore.getOrStartSession('maths:n2:test', () => [0, 1])
      progressStore.getOrStartSession('modern-history:s1:quiz', () => [1, 0])
      progressStore.advanceSession('maths:n2:test')
      expect(progressStore.getSnapshot().sessions['maths:n2:test'].position).toBe(1)
      expect(progressStore.getSnapshot().sessions['modern-history:s1:quiz'].position).toBe(0)
    })
  })
})
