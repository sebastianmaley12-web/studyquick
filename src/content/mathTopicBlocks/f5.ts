/**
 * MS-F5 Annuities — block entries (topic slug "f5"). See mathBlocks.ts for
 * the schema. f5q7-q9 build on the same loan and share a consolidated
 * repayment-schedule table in f5q9's solution.
 */
import type { MathBlockEntry } from '../../lib/content/mathBlocks'

export const F5_ENTRIES: Record<string, MathBlockEntry> = {
  f5q1: {
    blocks: [
      {
        kind: 'paragraph',
        html: 'Find the future value of an annuity of $2000 paid at the end of each year for 10 years, earning 5% p.a. compounded annually.',
      },
      { kind: 'equation', latex: 'FV = PMT \\times \\dfrac{(1 + r)^{n} - 1}{r}' },
    ],
    solutionBlocks: [
      { kind: 'equation', latex: 'FV = 2000 \\times \\dfrac{1.05^{10} - 1}{0.05}' },
      { kind: 'equation', latex: 'FV = 2000 \\times 12.577893 \\approx \\$25{,}155.79' },
    ],
  },

  f5q2: {
    blocks: [
      {
        kind: 'paragraph',
        html: '$350 is deposited at the end of each month for 5 years into an account earning 6% p.a. compounded monthly. Find the final balance.',
      },
      { kind: 'equation', latex: 'FV = PMT \\times \\dfrac{(1 + r)^{n} - 1}{r}' },
    ],
    solutionBlocks: [
      { kind: 'equation', latex: 'r = \\dfrac{0.06}{12} = 0.005, \\qquad n = 5 \\times 12 = 60' },
      { kind: 'equation', latex: 'FV = 350 \\times \\dfrac{1.005^{60} - 1}{0.005}' },
      { kind: 'equation', latex: 'FV = 350 \\times 69.770031 \\approx \\$24{,}419.51' },
    ],
  },

  f5q3: {
    blocks: [{ kind: 'paragraph', html: 'For the annuity in the previous question, find the total interest earned.' }],
    solutionBlocks: [
      { kind: 'equation', latex: '\\text{contributions} = 350 \\times 60 = \\$21{,}000.00' },
      { kind: 'equation', latex: '\\text{interest} = \\$24{,}419.51 - \\$21{,}000.00 = \\$3{,}419.51' },
    ],
  },

  f5q4: {
    blocks: [
      {
        kind: 'paragraph',
        html: 'A loan is repaid with 240 monthly payments of $1500 at 0.4% per month. Find the amount borrowed (the present value), to the nearest dollar.',
      },
      { kind: 'equation', latex: 'PV = PMT \\times \\dfrac{(1 + r)^{n} - 1}{r(1 + r)^{n}}' },
    ],
    solutionBlocks: [
      { kind: 'equation', latex: 'PV = 1500 \\times \\dfrac{1.004^{240} - 1}{0.004 \\times 1.004^{240}}' },
      { kind: 'equation', latex: 'PV = 1500 \\times 154.0933 \\approx \\$231{,}140' },
    ],
  },

  f5q5: {
    blocks: [
      {
        kind: 'paragraph',
        html: 'A worker contributes $4500 at the end of each year to superannuation earning 6.5% p.a. Find the balance after 30 years, to the nearest dollar.',
      },
      { kind: 'equation', latex: 'FV = PMT \\times \\dfrac{(1 + r)^{n} - 1}{r}' },
    ],
    solutionBlocks: [
      { kind: 'equation', latex: 'FV = 4500 \\times \\dfrac{1.065^{30} - 1}{0.065}' },
      { kind: 'equation', latex: 'FV = 4500 \\times 86.3749 \\approx \\$388{,}687' },
    ],
  },

  f5q6: {
    blocks: [
      {
        kind: 'paragraph',
        html: 'An annuity is modelled by <em>A</em><sub><em>n</em>+1</sub> = <em>A</em><sub><em>n</em></sub> &times; 1.004 + 500, with <em>A</em><sub>1</sub> = 500. Find <em>A</em><sub>3</sub>, correct to 2 decimal places.',
      },
      { kind: 'equation', latex: 'A_{n+1} = A_{n} \\times 1.004 + 500' },
    ],
    solutionBlocks: [
      { kind: 'equation', latex: 'A_{2} = 500 \\times 1.004 + 500 = \\$1{,}002.00' },
      { kind: 'equation', latex: 'A_{3} = 1002.00 \\times 1.004 + 500 \\approx \\$1{,}506.01' },
    ],
  },

  f5q7: {
    blocks: [
      {
        kind: 'paragraph',
        html: 'A loan balance is $245 000 and the monthly interest rate is 0.45%. Find the interest charged for the month.',
      },
      { kind: 'equation', latex: '\\text{interest} = \\text{balance} \\times \\text{rate}' },
    ],
    solutionBlocks: [{ kind: 'equation', latex: '245{,}000 \\times 0.0045 = \\$1{,}102.50' }],
  },

  f5q8: {
    blocks: [
      {
        kind: 'paragraph',
        html: 'For that loan (balance $245 000, monthly interest $1102.50), the monthly repayment is $1900. Find the amount by which the principal is reduced this month.',
      },
      { kind: 'equation', latex: '\\text{principal reduction} = \\text{repayment} - \\text{interest}' },
    ],
    solutionBlocks: [{ kind: 'equation', latex: '\\$1900 - \\$1{,}102.50 = \\$797.50' }],
  },

  f5q9: {
    blocks: [{ kind: 'paragraph', html: 'For that loan, find the balance owing after the repayment is made.' }],
    solutionBlocks: [
      { kind: 'equation', latex: '\\$245{,}000 - \\$797.50 = \\$244{,}202.50' },
      {
        kind: 'table',
        data: {
          caption: 'This month of the loan schedule',
          headers: ['Opening balance', 'Interest', 'Repayment', 'Principal reduction', 'Closing balance'],
          rows: [['$245,000.00', '$1,102.50', '$1,900.00', '$797.50', '$244,202.50']],
        },
      },
    ],
  },

  f5q10: {
    blocks: [
      {
        kind: 'paragraph',
        html: 'A table gives the monthly repayment on a loan as $6.65 per $1000 borrowed. Find the monthly repayment on a $250 000 loan.',
      },
    ],
    solutionBlocks: [
      { kind: 'equation', latex: '\\dfrac{250{,}000}{1000} = 250\\ \\text{lots of \\$1000}' },
      { kind: 'equation', latex: '250 \\times \\$6.65 = \\$1{,}662.50' },
    ],
  },

  f5q11: {
    blocks: [
      {
        kind: 'paragraph',
        html: 'Two people save into identical annuities, but one contributes twice as much each period. Compared with the first, the second person&rsquo;s final balance will be:',
      },
    ],
    solutionBlocks: [
      {
        kind: 'paragraph',
        html: 'The future value formula is directly proportional to the payment amount, so doubling PMT doubles FV exactly — no more, no less.',
      },
      { kind: 'equation', latex: 'FV = PMT \\times \\dfrac{(1 + r)^{n} - 1}{r}' },
    ],
  },

  f5q12: {
    blocks: [
      {
        kind: 'paragraph',
        html: 'Contributions are made quarterly for 12 years. How many periods <em>n</em> are used in the annuity formula?',
      },
    ],
    solutionBlocks: [
      { kind: 'paragraph', html: 'Quarterly means 4 periods per year.' },
      { kind: 'equation', latex: 'n = 4 \\times 12 = 48' },
    ],
  },
}
