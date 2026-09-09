/**
 * MS-A2 Linear Relationships — block entries (topic slug "a2"). a2q1/a2q3
 * approved in the Stage B prototype review, preserved verbatim. a2q9 reuses
 * the same graph-block pattern as a2q1 (a second gradient-through-two-points
 * question); the rest are formula/model questions with no genuine
 * diagram/table to show.
 */
import type { MathBlockEntry } from '../../lib/content/mathBlocks'

export const A2_ENTRIES: Record<string, MathBlockEntry> = {
  a2q1: {
    blocks: [
      { kind: 'paragraph', html: 'Find the gradient of the line through the two points shown below.' },
      {
        kind: 'graph',
        data: {
          xRange: [0, 10],
          yRange: [0, 26],
          points: [
            { x: 2, y: 5, label: '(2, 5)' },
            { x: 8, y: 23, label: '(8, 23)' },
          ],
          lines: [{ from: [0, -1], to: [10, 29] }],
        },
      },
    ],
    solutionBlocks: [{ kind: 'equation', latex: 'm = \\dfrac{23 - 5}{8 - 2} = \\dfrac{18}{6} = 3' }],
  },

  a2q2: {
    blocks: [
      { kind: 'paragraph', html: 'A line has equation below. Find y when x = 3.' },
      { kind: 'equation', latex: 'y = -4x + 7' },
    ],
    solutionBlocks: [
      { kind: 'equation', latex: 'y = -4 \\times 3 + 7 = -12 + 7' },
      { kind: 'equation', latex: 'y = -5' },
    ],
  },

  a2q3: {
    blocks: [
      {
        kind: 'paragraph',
        html: 'A plumber&rsquo;s charge for a job lasting h hours is given by the formula below. Find the charge for a 5-hour job.',
      },
      { kind: 'equation', latex: 'C = 45 + 30h' },
    ],
    solutionBlocks: [
      { kind: 'equation', latex: 'C = 45 + 30(5) = 45 + 150' },
      { kind: 'equation', latex: 'C = \\$195.00' },
    ],
  },

  a2q4: {
    blocks: [
      {
        kind: 'paragraph',
        html: "For the plumber&rsquo;s charge C = 45 + 30h, what does the gradient of 30 represent?",
      },
    ],
    solutionBlocks: [
      {
        kind: 'paragraph',
        html: 'The gradient is the rate of change of C with respect to h &mdash; the cost per extra hour, i.e. $30 per hour. The 45 is the fixed call-out fee.',
      },
    ],
  },

  a2q5: {
    blocks: [
      { kind: 'paragraph', html: 'Find the x-intercept of the line below.' },
      { kind: 'equation', latex: 'y = 2x - 9' },
    ],
    solutionBlocks: [
      { kind: 'paragraph', html: 'At the x-intercept, y = 0:' },
      { kind: 'equation', latex: '2x - 9 = 0' },
      { kind: 'equation', latex: 'x = 4.5' },
    ],
  },

  a2q6: {
    blocks: [
      {
        kind: 'paragraph',
        html: 'y varies directly with x, and y = 45 when x = 12. Find y when x = 20.',
      },
    ],
    solutionBlocks: [
      { kind: 'equation', latex: 'y = kx \\quad\\Rightarrow\\quad 45 = 12k \\quad\\Rightarrow\\quad k = 3.75' },
      { kind: 'equation', latex: 'y = 3.75 \\times 20 = 75' },
    ],
  },

  a2q7: {
    blocks: [
      { kind: 'paragraph', html: 'On a certain day 1 AUD buys 0.63 USD. Convert 480 AUD to USD.' },
    ],
    solutionBlocks: [{ kind: 'equation', latex: '\\text{USD} = 480 \\times 0.63 = 302.40' }],
  },

  a2q8: {
    blocks: [{ kind: 'paragraph', html: 'Which point lies on the line below?' }, { kind: 'equation', latex: 'y = 3x - 1' }],
    solutionBlocks: [
      { kind: 'paragraph', html: 'Substituting x = 4:' },
      { kind: 'equation', latex: 'y = 3 \\times 4 - 1 = 11' },
      { kind: 'paragraph', html: 'So (4, 11) lies on the line.' },
    ],
  },

  a2q9: {
    blocks: [
      { kind: 'paragraph', html: 'Find the gradient of the line through the two points shown below.' },
      {
        kind: 'graph',
        data: {
          xRange: [-6, 8],
          yRange: [-8, 12],
          points: [
            { x: -3, y: 8, label: '(-3, 8)' },
            { x: 5, y: -4, label: '(5, -4)' },
          ],
          lines: [{ from: [-6, 12.5], to: [8, -8.5] }],
        },
      },
    ],
    solutionBlocks: [
      { kind: 'equation', latex: 'm = \\dfrac{-4 - 8}{5 - (-3)} = \\dfrac{-12}{8}' },
      { kind: 'equation', latex: 'm = -1.5' },
    ],
  },

  a2q10: {
    blocks: [
      {
        kind: 'paragraph',
        html: 'A phone plan costs the amount shown below, where t is the number of call minutes. How many minutes were used in a month costing $43?',
      },
      { kind: 'equation', latex: 'C = 25 + 0.15t' },
    ],
    solutionBlocks: [
      { kind: 'equation', latex: '43 = 25 + 0.15t' },
      { kind: 'equation', latex: '0.15t = 18' },
      { kind: 'equation', latex: 't = 120\\ \\text{minutes}' },
    ],
  },

  a2q11: {
    blocks: [
      {
        kind: 'paragraph',
        html: 'In the model C = 25 + 0.15t, what does the y-intercept of 25 represent?',
      },
    ],
    solutionBlocks: [
      {
        kind: 'paragraph',
        html: 'The y-intercept is the value of C when t = 0 &mdash; the cost before any calls are made, i.e. the fixed monthly fee of $25.',
      },
    ],
  },

  a2q12: {
    blocks: [
      { kind: 'paragraph', html: 'Temperature converts using the formula below. Convert 24&deg;C to &deg;F.' },
      { kind: 'equation', latex: 'F = 1.8C + 32' },
    ],
    solutionBlocks: [
      { kind: 'equation', latex: 'F = 1.8 \\times 24 + 32 = 43.2 + 32' },
      { kind: 'equation', latex: 'F = 75.2^{\\circ}\\text{F}' },
    ],
  },
}
