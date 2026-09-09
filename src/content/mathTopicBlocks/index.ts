/**
 * Merges every topic's block entries into one lookup, keyed by topic slug
 * (matching src/content/maths/topics.json's `slug`). Each topic file is
 * independently editable (and independently authorable — this is what let
 * the full-question migration be parallelised across topics without file
 * conflicts) without touching this index beyond adding the one import/spread
 * line for a brand new topic.
 */
import type { MathBlockEntry } from '../../lib/content/mathBlocks'
import { A1_ENTRIES } from './a1'
import { A2_ENTRIES } from './a2'
import { A4_ENTRIES } from './a4'
import { F1_ENTRIES } from './f1'
import { F4_ENTRIES } from './f4'
import { F5_ENTRIES } from './f5'
import { M1_ENTRIES } from './m1'
import { M2_ENTRIES } from './m2'
import { M6_ENTRIES } from './m6'
import { M7_ENTRIES } from './m7'
import { N2_ENTRIES } from './n2'
import { N3_ENTRIES } from './n3'
import { S1_ENTRIES } from './s1'
import { S2_ENTRIES } from './s2'
import { S4_ENTRIES } from './s4'
import { S5_ENTRIES } from './s5'

export const MATH_BLOCK_ENTRIES_BY_TOPIC: Record<string, Record<string, MathBlockEntry>> = {
  a1: A1_ENTRIES,
  a2: A2_ENTRIES,
  a4: A4_ENTRIES,
  f1: F1_ENTRIES,
  f4: F4_ENTRIES,
  f5: F5_ENTRIES,
  m1: M1_ENTRIES,
  m2: M2_ENTRIES,
  m6: M6_ENTRIES,
  m7: M7_ENTRIES,
  n2: N2_ENTRIES,
  n3: N3_ENTRIES,
  s1: S1_ENTRIES,
  s2: S2_ENTRIES,
  s4: S4_ENTRIES,
  s5: S5_ENTRIES,
}

export function getMathBlockEntry(topicSlug: string, questionId: string): MathBlockEntry | undefined {
  return MATH_BLOCK_ENTRIES_BY_TOPIC[topicSlug]?.[questionId]
}
