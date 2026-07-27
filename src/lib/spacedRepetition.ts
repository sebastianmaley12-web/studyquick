/**
 * A simple Leitner-style spaced-repetition schedule: each item has a "box"
 * (0-5) and a due date. A correct/known answer moves it up a box (longer
 * interval before it's due again); anything else drops it back to box 0
 * (due again tomorrow). Deliberately simple rather than a full SM-2
 * implementation — this app doesn't need ease-factor tuning, just "resurface
 * things you got wrong sooner than things you've nailed repeatedly."
 */

export interface ReviewState {
  box: number
  dueAt: number
}

const ONE_DAY_MS = 24 * 60 * 60 * 1000

export const REVIEW_INTERVALS_DAYS = [1, 2, 4, 8, 16, 32]

export function nextReview(
  previous: ReviewState | undefined,
  correct: boolean,
  now: number = Date.now(),
): ReviewState {
  const box = correct
    ? Math.min((previous?.box ?? -1) + 1, REVIEW_INTERVALS_DAYS.length - 1)
    : 0
  return { box, dueAt: now + REVIEW_INTERVALS_DAYS[box] * ONE_DAY_MS }
}

export function isDue(review: ReviewState | undefined, now: number = Date.now()): boolean {
  return review !== undefined && review.dueAt <= now
}
