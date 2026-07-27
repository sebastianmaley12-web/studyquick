import { isDue, nextReview, REVIEW_INTERVALS_DAYS } from './spacedRepetition'

const DAY = 24 * 60 * 60 * 1000

describe('nextReview', () => {
  it('starts a never-seen item at box 0, due after the first interval', () => {
    const r = nextReview(undefined, true, 1000)
    expect(r.box).toBe(0)
    expect(r.dueAt).toBe(1000 + REVIEW_INTERVALS_DAYS[0] * DAY)
  })

  it('advances one box per correct answer', () => {
    let r = nextReview(undefined, true, 0)
    r = nextReview(r, true, 0)
    r = nextReview(r, true, 0)
    expect(r.box).toBe(2)
    expect(r.dueAt).toBe(REVIEW_INTERVALS_DAYS[2] * DAY)
  })

  it('caps at the last interval instead of growing forever', () => {
    let r: ReturnType<typeof nextReview> | undefined
    for (let i = 0; i < 20; i++) r = nextReview(r, true, 0)
    expect(r!.box).toBe(REVIEW_INTERVALS_DAYS.length - 1)
  })

  it('drops straight back to box 0 on a wrong answer, regardless of prior box', () => {
    let r = nextReview(undefined, true, 0)
    r = nextReview(r, true, 0)
    r = nextReview(r, true, 0)
    expect(r.box).toBeGreaterThan(0)
    r = nextReview(r, false, 5000)
    expect(r.box).toBe(0)
    expect(r.dueAt).toBe(5000 + REVIEW_INTERVALS_DAYS[0] * DAY)
  })
})

describe('isDue', () => {
  it('is false for an item with no review record', () => {
    expect(isDue(undefined, 1000)).toBe(false)
  })

  it('is false before the due date and true at/after it', () => {
    const review = { box: 0, dueAt: 1000 }
    expect(isDue(review, 999)).toBe(false)
    expect(isDue(review, 1000)).toBe(true)
    expect(isDue(review, 1001)).toBe(true)
  })
})
