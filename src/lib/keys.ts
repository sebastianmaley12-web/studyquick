/**
 * Per-item progress-store key schemes, copied exactly from the original app so
 * existing localStorage data (and the schema itself) stays compatible. These
 * are NOT derived from any stable content id for quiz/trivia/notes — they're
 * the DOM-order index within a topic's quiz/trivia/practice panel, which is
 * why callers must pass the same index the content JSON already preserves.
 */
export function quizKey(topicId: string, index: number) {
  return `${topicId}-quiz#${index}`
}

export function triviaKey(topicId: string, index: number) {
  return `${topicId}-trivia#${index}`
}

/** One answer-box per rendered card — an "options" (essay-pair) question
 * contributes one index per option, not one for the whole pair, matching the
 * original's `$$('.card, .opt-card', panel)` selection exactly. */
export function practiceNoteKey(topicId: string, index: number) {
  return `${topicId}-practice#${index}`
}

export function mathsKey(slug: string, questionId: string) {
  return `${slug}#${questionId}`
}
