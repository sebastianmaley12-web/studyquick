import { progressStore } from './progressStore'

const KEY = 'studyquick.progress.v1'

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
    progressStore.setQuizAnswer('s1-quiz#0', 'a', true)
    vi.runAllTimers()
    const raw = JSON.parse(localStorage.getItem(KEY)!)
    expect(raw).toEqual({
      v: 1,
      quiz: { 's1-quiz#0': { pick: 'a', ok: true } },
      trivia: {},
      notes: {},
      maths: {},
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
    })
    expect(localStorage.getItem(KEY)).toBeNull()
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
})
