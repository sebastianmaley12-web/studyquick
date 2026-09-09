/**
 * MS-S1 Data Analysis — block entries (topic slug "s1"). Two questions
 * (s1q3, s1q11) present genuinely tabular data and get a `table` block;
 * everything else is paragraph + equation.
 */
import type { MathBlockEntry } from '../../lib/content/mathBlocks'

export const S1_ENTRIES: Record<string, MathBlockEntry> = {
  s1q1: {
    blocks: [
      { kind: 'paragraph', html: 'The number of siblings a student has is best described as which type of data?' },
    ],
    solutionBlocks: [
      {
        kind: 'paragraph',
        html: 'It is a count, so it is numerical, and it can only take whole-number values, so it is <b>numerical discrete</b>.',
      },
    ],
  },

  s1q2: {
    blocks: [
      {
        kind: 'paragraph',
        html: 'A school of 1400 students includes 210 in Year 12. A stratified sample of 120 students is taken. How many Year 12 students should be in the sample?',
      },
    ],
    solutionBlocks: [
      { kind: 'equation', latex: '210 \\div 1400 = 0.15 = 15\\%' },
      { kind: 'equation', latex: '0.15 \\times 120 = 18\\ \\text{students}' },
    ],
  },

  s1q3: {
    blocks: [
      { kind: 'paragraph', html: 'A frequency table records scores 1&ndash;5. Find the mean, correct to 2 decimal places.' },
      {
        kind: 'table',
        data: {
          headers: ['Score', 'Frequency'],
          rows: [
            ['1', '3'],
            ['2', '7'],
            ['3', '10'],
            ['4', '6'],
            ['5', '4'],
          ],
        },
      },
    ],
    solutionBlocks: [
      { kind: 'equation', latex: '\\Sigma fx = 3 + 14 + 30 + 24 + 20 = 91' },
      { kind: 'equation', latex: '\\Sigma f = 30' },
      { kind: 'equation', latex: '\\text{Mean} = 91 \\div 30 = 3.03' },
    ],
  },

  s1q4: {
    blocks: [{ kind: 'paragraph', html: 'Find the median of 12, 15, 15, 18, 21, 24, 27, 31.' }],
    solutionBlocks: [
      {
        kind: 'paragraph',
        html: 'With 8 values the median is the average of the 4th and 5th.',
      },
      { kind: 'equation', latex: '(18 + 21) \\div 2 = 19.5' },
    ],
  },

  s1q5: {
    blocks: [{ kind: 'paragraph', html: 'Find the mode of 12, 15, 15, 18, 21, 24, 27, 31.' }],
    solutionBlocks: [
      { kind: 'paragraph', html: '15 appears twice; every other value appears once. The mode is <b>15</b>.' },
    ],
  },

  s1q6: {
    blocks: [{ kind: 'paragraph', html: 'Find the interquartile range of 4, 7, 9, 11, 14, 16, 18, 21, 25, 30.' }],
    steps: [
      { label: 'Lower quartile (median of lower half)', latex: 'Q_1 = 9' },
      { label: 'Upper quartile (median of upper half)', latex: 'Q_3 = 21' },
    ],
    solutionBlocks: [{ kind: 'equation', latex: '\\text{IQR} = 21 - 9 = 12' }],
  },

  s1q7: {
    blocks: [
      { kind: 'paragraph', html: 'A data set has Q&#8321; = 12 and Q&#8323; = 28. Find the upper fence used to identify outliers.' },
      { kind: 'equation', latex: '\\text{Upper fence} = Q_3 + 1.5 \\times \\text{IQR}' },
    ],
    solutionBlocks: [
      { kind: 'equation', latex: '\\text{IQR} = 28 - 12 = 16' },
      { kind: 'equation', latex: '28 + 1.5 \\times 16 = 52' },
    ],
  },

  s1q8: {
    blocks: [
      { kind: 'paragraph', html: 'Find the population standard deviation of 4, 7, 9, 10, 15, correct to 2 decimal places.' },
    ],
    steps: [
      { label: 'Mean', latex: '(4+7+9+10+15) \\div 5 = 9' },
      { label: 'Squared deviations', latex: '25, 4, 0, 1, 36' },
      { label: 'Variance', latex: '66 \\div 5 = 13.2' },
    ],
    solutionBlocks: [{ kind: 'equation', latex: '\\sigma = \\sqrt{13.2} = 3.63' }],
  },

  s1q9: {
    blocks: [{ kind: 'paragraph', html: 'A histogram has a long tail stretching to the right. How is the distribution described?' }],
    solutionBlocks: [
      {
        kind: 'paragraph',
        html: 'The tail points towards the higher values (the right), so the distribution is <b>positively skewed</b>. The mean is then usually greater than the median.',
      },
    ],
  },

  s1q10: {
    blocks: [
      {
        kind: 'paragraph',
        html: 'Two classes sit the same test. Class A has a box plot with median 62 and IQR 10; Class B has median 62 and IQR 22. Which statement is best supported?',
      },
    ],
    solutionBlocks: [
      {
        kind: 'paragraph',
        html: 'Equal medians mean the same typical score. The larger IQR for Class B means its middle 50% is more spread out. A box plot says nothing about how many students there are.',
      },
    ],
  },

  s1q11: {
    blocks: [
      { kind: 'paragraph', html: 'In a survey of 40 people, scores were grouped as shown. What percentage scored under 30?' },
      {
        kind: 'table',
        data: {
          headers: ['Score range', 'Frequency'],
          rows: [
            ['Under 10', '8'],
            ['10–19', '11'],
            ['20–29', '6'],
          ],
        },
      },
    ],
    solutionBlocks: [
      { kind: 'equation', latex: '8 + 11 + 6 = 25' },
      { kind: 'equation', latex: '25 \\div 40 \\times 100 = 62.5\\%' },
    ],
  },

  s1q12: {
    blocks: [
      { kind: 'paragraph', html: 'Twelve scores have a mean of 62. One score of 40 is removed. Find the mean of the remaining scores.' },
    ],
    steps: [
      { label: 'Original total', latex: '12 \\times 62 = 744' },
      { label: 'New total', latex: '744 - 40 = 704' },
    ],
    solutionBlocks: [{ kind: 'equation', latex: '704 \\div 11 = 64' }],
  },
}
