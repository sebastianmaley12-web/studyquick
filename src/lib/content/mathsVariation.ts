import { randomInt } from '../seededRandom'

/**
 * Additive numeric-variation layer for a small number of existing Maths
 * questions (matched by id against topics.json) — NOT a rewrite of the
 * maths database. Each entry regenerates the question's numbers from a
 * seeded random source (see seededRandom.ts) and recomputes the real
 * answer with plain arithmetic — no AI, so no risk of an incorrect
 * "correct" answer. Any question with no entry here renders exactly as
 * before, from the static topics.json values.
 *
 * Deliberately scoped to MathsQuestion.tsx only (not the KaTeX workspace) —
 * kept as a separate, orthogonal enhancement so the two new systems don't
 * compound into one component.
 */

export interface MathsVariationResult {
  questionHtml: string
  answer: number
  tolerance: number
  solutionHtml: string
}

export interface MathsVariationEntry {
  generate: (random: () => number) => MathsVariationResult
}

export const MATHS_VARIATION_ENTRIES: Record<string, MathsVariationEntry> = {
  // Clark's formula: D = (weight × adult dosage) ÷ 70. Weight a multiple of
  // 7 and dosage a multiple of 10 guarantees an exact whole-number result,
  // matching the original question's clean arithmetic.
  a1q2: {
    generate: (random) => {
      const weight = randomInt(random, 2, 6) * 7
      const adultDosage = randomInt(random, 2, 10) * 50
      const answer = (weight * adultDosage) / 70
      return {
        questionHtml: `Clark's formula gives a child's dosage as <em>D</em> = (weight in kg &times; adult dosage) &divide; 70. Find the dosage for a ${weight} kg child when the adult dosage is ${adultDosage} mg.`,
        answer,
        tolerance: Math.max(answer * 0.003, 0.3),
        solutionHtml: `D = (${weight} &times; ${adultDosage}) &divide; 70 = ${weight * adultDosage} &divide; 70 = ${answer} mg`,
      }
    },
  },

  // Triangle area: A = ½bh, solve for h given A and b. b and h generated as
  // even integers so the halved coefficient and the area are both whole
  // numbers, same clean style as the original.
  a1q9: {
    generate: (random) => {
      const b = randomInt(random, 3, 10) * 2
      const h = randomInt(random, 2, 10) * 2
      const area = (b * h) / 2
      const coefficient = b / 2
      return {
        questionHtml: `The area of a triangle is <em>A</em> = &frac12;<em>bh</em>. Find <em>h</em> when <em>A</em> = ${area} cm<sup>2</sup> and <em>b</em> = ${b} cm.`,
        answer: h,
        tolerance: 0.05,
        solutionHtml: `${area} = &frac12; &times; ${b} &times; h = ${coefficient}h, so h = ${h} cm`,
      }
    },
  },
}
