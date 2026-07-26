/** Fisher-Yates shuffle of the indices 0..length-1 — used to randomise the
 * *display* order of multiple-choice options without changing what's
 * actually stored: callers map back to the original index for correctness
 * checks and progress-store writes, so existing saved answers and the
 * localStorage schema are unaffected. */
export function shuffledIndices(length: number): number[] {
  const arr = Array.from({ length }, (_, i) => i)
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[arr[i], arr[j]] = [arr[j], arr[i]]
  }
  return arr
}
