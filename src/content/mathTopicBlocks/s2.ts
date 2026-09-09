/**
 * MS-S2 Relative Frequency and Probability — block entries (topic slug
 * "s2"). Several questions (s2q1, s2q2, s2q5, s2q6, s2q7) reuse the same
 * "bag of 5 red, 8 blue, 7 green counters" scenario from topics.json; no
 * diagram/table is warranted for a counter bag, so each entry restates the
 * scenario in its own paragraph rather than fabricating a shared visual.
 */
import type { MathBlockEntry } from '../../lib/content/mathBlocks'

export const S2_ENTRIES: Record<string, MathBlockEntry> = {
  s2q1: {
    blocks: [
      {
        kind: 'paragraph',
        html: 'A bag holds 5 red, 8 blue and 7 green counters. One counter is drawn at random. Find P(red) as a decimal.',
      },
    ],
    solutionBlocks: [
      { kind: 'equation', latex: '\\text{Total} = 5 + 8 + 7 = 20' },
      { kind: 'equation', latex: 'P(\\text{red}) = 5 \\div 20 = 0.25' },
    ],
  },

  s2q2: {
    blocks: [
      {
        kind: 'paragraph',
        html: 'For the same bag (5 red, 8 blue, 7 green), find P(not red) as a decimal.',
      },
    ],
    solutionBlocks: [{ kind: 'equation', latex: 'P(\\text{not red}) = 1 - 0.25 = 0.75' }],
  },

  s2q3: {
    blocks: [
      {
        kind: 'paragraph',
        html: 'The relative frequency of a machine producing a faulty item is 0.15. How many faults are expected in 240 items?',
      },
    ],
    solutionBlocks: [{ kind: 'equation', latex: '0.15 \\times 240 = 36\\ \\text{items}' }],
  },

  s2q4: {
    blocks: [
      {
        kind: 'paragraph',
        html: 'In a group of 60 people, 27 own a pet. One person is chosen at random. Find P(owns a pet) as a decimal, correct to 2 decimal places.',
      },
    ],
    solutionBlocks: [{ kind: 'equation', latex: '27 \\div 60 = 0.45' }],
  },

  s2q5: {
    blocks: [
      {
        kind: 'paragraph',
        html: 'From the bag of 20 counters (5 red, 8 blue, 7 green), two counters are drawn <em>with</em> replacement. Find P(both red) as a decimal.',
      },
    ],
    solutionBlocks: [
      { kind: 'paragraph', html: 'The draws are independent, each with P(red) = 0.25.' },
      { kind: 'equation', latex: '0.25 \\times 0.25 = 0.0625' },
    ],
  },

  s2q6: {
    blocks: [
      {
        kind: 'paragraph',
        html: 'From the bag of 20 counters (5 red, 8 blue, 7 green), two counters are drawn <em>without</em> replacement. Find P(both red), correct to 4 decimal places.',
      },
    ],
    solutionBlocks: [
      { kind: 'equation', latex: '\\frac{5}{20} \\times \\frac{4}{19} = \\frac{20}{380} = 0.0526' },
    ],
  },

  s2q7: {
    blocks: [
      {
        kind: 'paragraph',
        html: 'Three counters are drawn with replacement from the bag (P(red) = 0.25 each time). Find P(at least one red), correct to 4 decimal places.',
      },
    ],
    steps: [{ label: 'P(no reds in 3 draws)', latex: '0.75^3 = 0.421875' }],
    solutionBlocks: [{ kind: 'equation', latex: '1 - 0.421875 = 0.5781' }],
  },

  s2q8: {
    blocks: [
      {
        kind: 'paragraph',
        html: 'A game costs $3 to play and pays $10 with probability 0.2, otherwise nothing. Find the expected gain or loss per game (a loss is negative).',
      },
    ],
    solutionBlocks: [
      { kind: 'equation', latex: '\\text{Expected winnings} = 0.2 \\times 10 = \\$2.00' },
      { kind: 'equation', latex: '2 - 3 = -\\$1.00' },
      { kind: 'paragraph', html: 'An expected loss of $1.00 per game.' },
    ],
  },

  s2q9: {
    blocks: [{ kind: 'paragraph', html: 'Two fair dice are rolled. Find P(sum = 7), correct to 4 decimal places.' }],
    solutionBlocks: [
      {
        kind: 'paragraph',
        html: 'There are 36 equally likely outcomes and 6 give a sum of 7: (1,6) (2,5) (3,4) (4,3) (5,2) (6,1).',
      },
      { kind: 'equation', latex: '6 \\div 36 = 0.1667' },
    ],
  },

  s2q10: {
    blocks: [
      {
        kind: 'paragraph',
        html: 'Events A and B are mutually exclusive with P(A) = 0.35 and P(B) = 0.28. Find P(A or B).',
      },
    ],
    solutionBlocks: [{ kind: 'equation', latex: 'P(A \\text{ or } B) = 0.35 + 0.28 = 0.63' }],
  },

  s2q11: {
    blocks: [
      {
        kind: 'paragraph',
        html: 'A student passes English with probability 0.7 and, independently, maths with probability 0.6. Find P(passes both).',
      },
    ],
    solutionBlocks: [{ kind: 'equation', latex: '0.7 \\times 0.6 = 0.42' }],
  },

  s2q12: {
    blocks: [
      {
        kind: 'paragraph',
        html: 'A coin is tossed 8 times and lands heads every time. What is the probability the next toss is a head?',
      },
    ],
    solutionBlocks: [
      {
        kind: 'paragraph',
        html: 'Coin tosses are independent — the coin has no memory of earlier results. The probability stays 0.5.',
      },
    ],
  },
}
