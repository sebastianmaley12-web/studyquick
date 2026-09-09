/**
 * MS-A1 Formulae and Equations — block entries (topic slug "a1"). a1q12
 * approved in the Stage B prototype review, preserved verbatim. All other
 * questions are plain formula substitution/equation-solving with no
 * genuine diagram/table/graph to show, so each is paragraph + equation
 * block(s) only.
 */
import type { MathBlockEntry } from '../../lib/content/mathBlocks'

export const A1_ENTRIES: Record<string, MathBlockEntry> = {
  a1q1: {
    blocks: [
      {
        kind: 'paragraph',
        html: 'The area of a circle is given by the formula below. Find the area of a circular garden bed of radius 6.4 m, correct to 2 decimal places.',
      },
      { kind: 'equation', latex: 'A = \\pi r^{2}' },
    ],
    steps: [{ label: 'Substitute the known value', latex: 'A = \\pi (6.4)^{2}' }],
    solutionBlocks: [
      { kind: 'equation', latex: 'A = \\pi \\times 6.4^{2} = \\pi \\times 40.96' },
      { kind: 'equation', latex: 'A \\approx 128.68\\ \\text{m}^{2}' },
    ],
  },

  a1q2: {
    blocks: [
      {
        kind: 'paragraph',
        html: "Clark's formula gives a child's dosage as shown below, where weight is in kg and adult dosage in mg. Find the dosage for a 28 kg child when the adult dosage is 500 mg.",
      },
      { kind: 'equation', latex: 'D = \\dfrac{\\text{weight} \\times \\text{adult dosage}}{70}' },
    ],
    solutionBlocks: [
      { kind: 'equation', latex: 'D = \\dfrac{28 \\times 500}{70} = \\dfrac{14\\,000}{70}' },
      { kind: 'equation', latex: 'D = 200\\ \\text{mg}' },
    ],
  },

  a1q3: {
    blocks: [
      { kind: 'paragraph', html: 'Solve the equation below for x.' },
      { kind: 'equation', latex: '5x - 7 = 3x + 11' },
    ],
    solutionBlocks: [
      { kind: 'equation', latex: '5x - 3x = 11 + 7' },
      { kind: 'equation', latex: '2x = 18' },
      { kind: 'equation', latex: 'x = 9' },
    ],
  },

  a1q4: {
    blocks: [
      {
        kind: 'paragraph',
        html: 'Using the formula below, find a when v = 32, u = 8 and t = 6.',
      },
      { kind: 'equation', latex: 'v = u + at' },
    ],
    solutionBlocks: [
      { kind: 'equation', latex: '32 = 8 + 6a' },
      { kind: 'equation', latex: '6a = 24' },
      { kind: 'equation', latex: 'a = 4' },
    ],
  },

  a1q5: {
    blocks: [
      { kind: 'paragraph', html: 'Solve the equation below for x.' },
      { kind: 'equation', latex: '\\dfrac{2x + 1}{3} = 5' },
    ],
    solutionBlocks: [
      { kind: 'equation', latex: '2x + 1 = 15' },
      { kind: 'equation', latex: '2x = 14' },
      { kind: 'equation', latex: 'x = 7' },
    ],
  },

  a1q6: {
    blocks: [
      {
        kind: 'paragraph',
        html: 'Body mass index is given by the formula below, with mass in kg and height in metres. Find the BMI of a person of mass 78 kg and height 1.72 m, correct to 1 decimal place.',
      },
      { kind: 'equation', latex: '\\text{BMI} = \\dfrac{m}{h^{2}}' },
    ],
    solutionBlocks: [
      { kind: 'equation', latex: '\\text{BMI} = \\dfrac{78}{1.72^{2}} = \\dfrac{78}{2.9584}' },
      { kind: 'equation', latex: '\\text{BMI} \\approx 26.4' },
    ],
  },

  a1q7: {
    blocks: [
      {
        kind: 'paragraph',
        html: 'A formula for maximum heart rate (in beats per minute) is shown below. Find the MHR of a 17-year-old.',
      },
      { kind: 'equation', latex: '\\text{MHR} = 208 - 0.7 \\times \\text{age}' },
    ],
    solutionBlocks: [
      { kind: 'equation', latex: '\\text{MHR} = 208 - 0.7 \\times 17 = 208 - 11.9' },
      { kind: 'equation', latex: '\\text{MHR} = 196.1\\ \\text{bpm}' },
    ],
  },

  a1q8: {
    blocks: [
      {
        kind: 'paragraph',
        html: 'The sum of the interior angles of a polygon (in degrees) is given by the formula below. Find the sum for a nonagon (n = 9).',
      },
      { kind: 'equation', latex: 'S = 180(n - 2)' },
    ],
    solutionBlocks: [
      { kind: 'equation', latex: 'S = 180 \\times (9 - 2) = 180 \\times 7' },
      { kind: 'equation', latex: 'S = 1260^{\\circ}' },
    ],
  },

  a1q9: {
    blocks: [
      {
        kind: 'paragraph',
        html: 'The area of a triangle is given by the formula below. Find h when A = 84 cm&sup2; and b = 14 cm.',
      },
      { kind: 'equation', latex: 'A = \\frac{1}{2}bh' },
    ],
    solutionBlocks: [
      { kind: 'equation', latex: '84 = \\frac{1}{2} \\times 14 \\times h = 7h' },
      { kind: 'equation', latex: 'h = 12\\ \\text{cm}' },
    ],
  },

  a1q10: {
    blocks: [
      {
        kind: 'paragraph',
        html: 'The area of a trapezium is given by the formula below. Find h when A = 96 m&sup2;, a = 9 m and b = 15 m.',
      },
      { kind: 'equation', latex: 'A = \\frac{1}{2}h(a + b)' },
    ],
    solutionBlocks: [
      { kind: 'equation', latex: '96 = \\frac{1}{2} \\times h \\times (9 + 15) = 12h' },
      { kind: 'equation', latex: 'h = 8\\ \\text{m}' },
    ],
  },

  a1q11: {
    blocks: [
      { kind: 'paragraph', html: 'Solve the equation below for x.' },
      { kind: 'equation', latex: '3(2x - 4) = 18' },
    ],
    solutionBlocks: [
      { kind: 'equation', latex: '6x - 12 = 18' },
      { kind: 'equation', latex: '6x = 30' },
      { kind: 'equation', latex: 'x = 5' },
    ],
  },

  a1q12: {
    blocks: [
      {
        kind: 'paragraph',
        html: 'The period of a pendulum is given by the formula below. Find T for L = 1.8 m and g = 9.8 m/s&sup2;, correct to 2 decimal places.',
      },
      { kind: 'equation', latex: 'T = 2\\pi\\sqrt{\\dfrac{L}{g}}' },
    ],
    steps: [
      { label: 'Substitute the known values', latex: 'T = 2\\pi\\sqrt{\\dfrac{1.8}{9.8}}' },
      { label: 'Evaluate the fraction inside the root', latex: 'T = 2\\pi\\sqrt{0.1837\\ldots}' },
      { label: 'Take the square root', latex: 'T = 2\\pi \\times 0.4286\\ldots' },
    ],
    solutionBlocks: [
      { kind: 'equation', latex: 'T = 2\\pi\\sqrt{\\dfrac{1.8}{9.8}} = 2\\pi \\times 0.4286\\ldots' },
      { kind: 'equation', latex: 'T \\approx 2.69\\ \\text{s}' },
    ],
  },

  a1q13: {
    blocks: [{ kind: 'paragraph', html: 'Write 45 780 correct to 2 significant figures.' }],
    solutionBlocks: [
      {
        kind: 'paragraph',
        html: 'The first two significant figures are 4 and 5. The next digit is 7, so round up:',
      },
      { kind: 'equation', latex: '45\\,780 \\approx 46\\,000' },
    ],
  },
}
