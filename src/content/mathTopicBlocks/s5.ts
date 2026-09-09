/**
 * MS-S5 The Normal Distribution — block entries, keyed by question id
 * (topic slug "s5"). z-score and empirical-rule questions; no bell-curve
 * diagram renderer exists in the schema yet, so entries use paragraph +
 * equation blocks only.
 */
import type { MathBlockEntry } from '../../lib/content/mathBlocks'

export const S5_ENTRIES: Record<string, MathBlockEntry> = {
  s5q1: {
    blocks: [
      {
        kind: 'paragraph',
        html: 'A set of marks is normally distributed with mean 64 and standard deviation 8. Find the <i>z</i>-score of a mark of 76.',
      },
    ],
    solutionBlocks: [
      { kind: 'equation', latex: 'z = \\dfrac{x - \\mu}{\\sigma} = \\dfrac{76 - 64}{8}' },
      { kind: 'equation', latex: 'z = 1.5' },
    ],
  },

  s5q2: {
    blocks: [
      {
        kind: 'paragraph',
        html: 'For the same distribution (&mu; = 64, &sigma; = 8), find the mark with a <i>z</i>-score of &minus;1.25.',
      },
    ],
    solutionBlocks: [
      { kind: 'equation', latex: 'x = \\mu + z\\sigma = 64 + (-1.25)(8)' },
      { kind: 'equation', latex: 'x = 64 - 10 = 54' },
    ],
  },

  s5q3: {
    blocks: [
      {
        kind: 'paragraph',
        html: 'In a normal distribution, what percentage of scores lie within one standard deviation of the mean?',
      },
    ],
    solutionBlocks: [
      {
        kind: 'paragraph',
        html: 'By the empirical rule, approximately 68% of scores lie between &mu; &minus; &sigma; and &mu; + &sigma;.',
      },
    ],
  },

  s5q4: {
    blocks: [
      { kind: 'paragraph', html: 'What percentage of scores lie within two standard deviations of the mean?' },
    ],
    solutionBlocks: [
      {
        kind: 'paragraph',
        html: 'By the empirical rule, approximately 95% lie between &mu; &minus; 2&sigma; and &mu; + 2&sigma;.',
      },
    ],
  },

  s5q5: {
    blocks: [
      {
        kind: 'paragraph',
        html: 'What percentage of a normal distribution lies more than one standard deviation ABOVE the mean?',
      },
    ],
    solutionBlocks: [
      {
        kind: 'paragraph',
        html: '68% lies within one standard deviation, leaving 32% split between the two tails. By symmetry each tail holds half of that.',
      },
      { kind: 'equation', latex: '32\\% \\div 2 = 16\\%' },
    ],
  },

  s5q6: {
    blocks: [
      {
        kind: 'paragraph',
        html: 'Marks are normally distributed with &mu; = 64 and &sigma; = 8. In a cohort of 600 students, how many are expected to score above 80?',
      },
    ],
    solutionBlocks: [
      { kind: 'equation', latex: 'z = \\dfrac{80 - 64}{8} = 2' },
      {
        kind: 'paragraph',
        html: 'By the empirical rule, 2.5% of scores lie above z = 2.',
      },
      { kind: 'equation', latex: '0.025 \\times 600 = 15\\ \\text{students}' },
    ],
  },

  s5q7: {
    blocks: [
      {
        kind: 'paragraph',
        html: 'Amira scored 72 in English (&mu; = 65, &sigma; = 7) and 81 in maths (&mu; = 70, &sigma; = 11). In which subject did she perform better relative to the cohort?',
      },
    ],
    solutionBlocks: [
      { kind: 'equation', latex: '\\text{English: } z = \\dfrac{72 - 65}{7} = 1.00' },
      { kind: 'equation', latex: '\\text{Maths: } z = \\dfrac{81 - 70}{11} \\approx 0.91' },
      {
        kind: 'paragraph',
        html: 'The higher z-score (English) is the stronger relative performance, despite the lower raw mark.',
      },
    ],
  },

  s5q8: {
    blocks: [{ kind: 'paragraph', html: 'What percentage of a normal distribution lies below the mean?' }],
    solutionBlocks: [
      {
        kind: 'paragraph',
        html: 'The normal distribution is symmetric about its mean, so exactly 50% lies below it.',
      },
    ],
  },

  s5q9: {
    blocks: [
      {
        kind: 'paragraph',
        html: 'For &mu; = 64 and &sigma; = 8, find the upper end of the interval containing the middle 99.7% of scores.',
      },
    ],
    solutionBlocks: [
      {
        kind: 'paragraph',
        html: 'The middle 99.7% lies within 3 standard deviations of the mean.',
      },
      { kind: 'equation', latex: '64 + 3(8) = 88' },
    ],
  },

  s5q10: {
    blocks: [{ kind: 'paragraph', html: 'A score has a <i>z</i>-score of &minus;2. What does this tell you?' }],
    solutionBlocks: [
      {
        kind: 'paragraph',
        html: 'A z-score measures distance from the mean in standard deviations. z = &minus;2 means the score sits 2 standard deviations below the mean &mdash; in the bottom 2.5%.',
      },
    ],
  },

  s5q11: {
    blocks: [
      {
        kind: 'paragraph',
        html: 'Packets have a mean mass of 500 g with standard deviation 4 g, normally distributed. What percentage of packets weigh less than 492 g?',
      },
    ],
    solutionBlocks: [
      { kind: 'equation', latex: 'z = \\dfrac{492 - 500}{4} = -2' },
      {
        kind: 'paragraph',
        html: 'Since 95% lies within 2 standard deviations, the remaining 5% is split evenly between the two tails, so 2.5% lies below z = &minus;2.',
      },
    ],
  },

  s5q12: {
    blocks: [
      {
        kind: 'paragraph',
        html: 'What percentage of a normal distribution lies between &mu; &minus; &sigma; and &mu; + 2&sigma;?',
      },
    ],
    solutionBlocks: [
      {
        kind: 'paragraph',
        html: 'From &mu; &minus; &sigma; to &mu; is 34%, and from &mu; to &mu; + 2&sigma; is 47.5%.',
      },
      { kind: 'equation', latex: '34\\% + 47.5\\% = 81.5\\%' },
    ],
  },
}
