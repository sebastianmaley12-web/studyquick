import type { ProgressState } from './progressStore'
import type { EnglishText, EssayQuestion } from './content/english'
import { quizKey, englishNoteKey } from './keys'
import { buildQuoteTechniqueQuiz } from './content/englishQuiz'
import { MODULE_C } from '../content/english/module-c-craft-of-writing'
import {
  buildIdentifyQuestions,
  buildIdentifyEffectQuestions,
  buildTechniqueToEffectQuestions,
  buildQuoteToAnalysisQuestions,
  paper1QuestionKey,
} from './content/paper1'
import { PAPER_ONE_TECHNIQUES } from '../content/english/paper1-technique-bank'
import { PAPER_ONE_EVIDENCE } from '../content/english/paper1-evidence-bank'

/**
 * English's progress structure is genuinely different from every other
 * subject's flat topic/quiz/trivia/practice shape — there's no single
 * "topic list" to reduce over. These helpers compute real progress
 * (never hardcoded counts) against English's actual content: a per-text
 * quote/technique quiz, short-answer + essay practice notes, Module C's
 * writing stimuli, and the module-level Paper 1 question pools.
 */

export interface EnglishTextStats {
  quizTotal: number
  quizRight: number
  practiceTotal: number
  practiceDone: number
  score: number
  max: number
}

function essayNoteDone(progress: ProgressState, textId: string, q: EssayQuestion): boolean {
  const kind = q.type === 'thesis' ? 'essay-thesis' : 'essay-full'
  return !!progress.notes[englishNoteKey(textId, kind, q.id)]?.trim()
}

/** `comparativeQuestions` covers Module A's module-level "textual
 * conversation" essays, which aren't part of either individual text's own
 * `essayQuestions` array but are still real practice for that text. */
export function englishTextStats(
  progress: ProgressState,
  text: EnglishText,
  comparativeQuestions: EssayQuestion[] = [],
): EnglishTextStats {
  const quizTopicId = `${text.id}-quote-test`
  const quizQuestions = buildQuoteTechniqueQuiz(text)
  let quizRight = 0
  for (let i = 0; i < quizQuestions.length; i++) {
    if (progress.quiz[quizKey(quizTopicId, i)]?.ok) quizRight++
  }

  let practiceDone = 0
  for (const q of text.shortAnswerQuestions) {
    if (progress.notes[englishNoteKey(text.id, 'short-answer', q.id)]?.trim()) practiceDone++
  }
  for (const q of [...text.essayQuestions, ...comparativeQuestions]) {
    if (essayNoteDone(progress, text.id, q)) practiceDone++
  }
  const practiceTotal = text.shortAnswerQuestions.length + text.essayQuestions.length + comparativeQuestions.length

  return {
    quizTotal: quizQuestions.length,
    quizRight,
    practiceTotal,
    practiceDone,
    score: quizRight + practiceDone,
    max: quizQuestions.length + practiceTotal,
  }
}

export interface SimpleStats {
  done: number
  total: number
}

/** Module C has no quote/technique bank — its "practice" is a written piece
 * per stimulus, tracked by the same note-based mechanism as everything
 * else's short-answer/essay practice. */
export function moduleCStats(progress: ProgressState): SimpleStats {
  let done = 0
  for (const s of MODULE_C.stimuli) {
    if (progress.notes[englishNoteKey('module-c', `stimulus-${s.mode}`, s.id)]?.trim()) done++
  }
  return { done, total: MODULE_C.stimuli.length }
}

/** Paper 1 is a module-level resource shared across every text, not scoped
 * to one — mirrors the exact question pools Dashboard.tsx's subjectOverall
 * already builds for the 'english-advanced' overall percentage, so the two
 * numbers never disagree. */
export function paper1Stats(progress: ProgressState): SimpleStats {
  const evidence = PAPER_ONE_EVIDENCE
  const bank = PAPER_ONE_TECHNIQUES
  const questions = [
    ...buildIdentifyQuestions(evidence, bank),
    ...buildIdentifyEffectQuestions(evidence, bank),
    ...buildTechniqueToEffectQuestions(evidence, bank),
    ...buildQuoteToAnalysisQuestions(evidence, bank),
  ]
  const done = questions.filter((q) => progress.quiz[paper1QuestionKey(q.id)] !== undefined).length
  return { done, total: questions.length }
}
