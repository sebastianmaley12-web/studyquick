/**
 * MS-F4 Investments and Loans — block entries (topic slug "f4"). See
 * mathBlocks.ts for the schema.
 */
import type { MathBlockEntry } from '../../lib/content/mathBlocks'

export const F4_ENTRIES: Record<string, MathBlockEntry> = {
  f4q1: {
    blocks: [
      { kind: 'paragraph', html: 'Find the simple interest earned on $7200 invested at 5.2% p.a. for 4 years.' },
      { kind: 'equation', latex: 'I = Prn' },
    ],
    solutionBlocks: [
      { kind: 'equation', latex: 'I = 7200 \\times 0.052 \\times 4' },
      { kind: 'equation', latex: 'I = \\$1{,}497.60' },
    ],
  },

  f4q2: {
    blocks: [
      {
        kind: 'paragraph',
        html: 'Find the future value of $12 000 invested at 4.8% p.a. compounded annually for 6 years.',
      },
      { kind: 'equation', latex: 'FV = PV(1 + r)^{n}' },
    ],
    solutionBlocks: [
      { kind: 'equation', latex: 'FV = 12{,}000 \\times 1.048^{6}' },
      { kind: 'equation', latex: 'FV = 12{,}000 \\times 1.324853 \\approx \\$15{,}898.24' },
    ],
  },

  f4q3: {
    blocks: [
      {
        kind: 'paragraph',
        html: 'Find the future value of $8500 invested at 6% p.a. compounded monthly for 3 years.',
      },
      { kind: 'equation', latex: 'FV = PV(1 + r)^{n}' },
    ],
    solutionBlocks: [
      {
        kind: 'paragraph',
        html: 'Monthly compounding: the annual rate and the number of years must both be converted to monthly terms.',
      },
      { kind: 'equation', latex: 'r = \\dfrac{0.06}{12} = 0.005, \\qquad n = 3 \\times 12 = 36' },
      { kind: 'equation', latex: 'FV = 8500 \\times 1.005^{36} \\approx \\$10{,}171.78' },
    ],
  },

  f4q4: {
    blocks: [{ kind: 'paragraph', html: 'For the investment in the previous question, find the interest earned.' }],
    solutionBlocks: [
      { kind: 'equation', latex: '\\text{interest} = FV - PV = \\$10{,}171.78 - \\$8500 = \\$1{,}671.78' },
    ],
  },

  f4q5: {
    blocks: [
      {
        kind: 'paragraph',
        html: 'A machine bought for $42 000 depreciates by $4200 each year (straight-line). Find its value after 5 years.',
      },
      { kind: 'equation', latex: 'S = V_{0} - Dn' },
    ],
    solutionBlocks: [
      { kind: 'equation', latex: 'S = 42{,}000 - 4200 \\times 5 = 42{,}000 - 21{,}000' },
      { kind: 'equation', latex: 'S = \\$21{,}000.00' },
    ],
  },

  f4q6: {
    blocks: [
      {
        kind: 'paragraph',
        html: 'A machine bought for $42 000 depreciates by 18% p.a. using the declining-balance method. Find its value after 5 years.',
      },
      { kind: 'equation', latex: 'S = V_{0}(1 - r)^{n}' },
    ],
    solutionBlocks: [
      { kind: 'equation', latex: 'S = 42{,}000 \\times 0.82^{5} = 42{,}000 \\times 0.37074' },
      { kind: 'equation', latex: 'S \\approx \\$15{,}571.07' },
      {
        kind: 'table',
        data: {
          caption: 'Declining-balance depreciation, year by year',
          headers: ['End of year', 'Value ($)'],
          rows: [
            ['1', '34,440.00'],
            ['2', '28,240.80'],
            ['3', '23,157.46'],
            ['4', '18,989.11'],
            ['5', '15,571.07'],
          ],
        },
      },
    ],
  },

  f4q7: {
    blocks: [
      {
        kind: 'paragraph',
        html: 'An item costs $85 today. With inflation at 3.2% p.a., find its expected cost in 6 years.',
      },
      { kind: 'paragraph', html: 'Inflation compounds the same way as interest — apply the compound growth formula.' },
    ],
    solutionBlocks: [
      { kind: 'equation', latex: '\\text{cost} = 85 \\times 1.032^{6} = 85 \\times 1.208031' },
      { kind: 'equation', latex: '\\text{cost} \\approx \\$102.68' },
    ],
  },

  f4q8: {
    blocks: [
      {
        kind: 'paragraph',
        html: 'An investor owns 1200 shares paying a dividend of 42 cents per share. Find the total dividend.',
      },
    ],
    solutionBlocks: [{ kind: 'equation', latex: '1200 \\times \\$0.42 = \\$504.00' }],
  },

  f4q9: {
    blocks: [
      {
        kind: 'paragraph',
        html: 'A share priced at $8.75 pays a dividend of 42 cents. Find the dividend yield as a percentage, correct to 2 decimal places.',
      },
      { kind: 'equation', latex: '\\text{yield} = \\dfrac{\\text{dividend per share}}{\\text{market price}} \\times 100' },
    ],
    solutionBlocks: [
      { kind: 'equation', latex: '\\text{yield} = \\dfrac{0.42}{8.75} \\times 100 = 4.8\\%' },
    ],
  },

  f4q10: {
    blocks: [
      {
        kind: 'paragraph',
        html: 'A credit card charges 19.99% p.a. simple interest, calculated daily. Find the interest on a $1850 balance carried for 23 days, correct to the nearest cent.',
      },
      { kind: 'equation', latex: 'I = P \\times r \\times \\dfrac{\\text{days}}{365}' },
    ],
    solutionBlocks: [
      { kind: 'equation', latex: 'I = 1850 \\times 0.1999 \\times \\dfrac{23}{365}' },
      { kind: 'equation', latex: 'I \\approx \\$23.30' },
    ],
  },

  f4q11: {
    blocks: [
      {
        kind: 'paragraph',
        html: 'A $320 000 home loan is repaid at $1842 per month for 25 years. Find the total interest paid.',
      },
    ],
    solutionBlocks: [
      { kind: 'equation', latex: '\\text{total repaid} = 1842 \\times 12 \\times 25 = \\$552{,}600.00' },
      { kind: 'equation', latex: '\\text{interest} = \\$552{,}600.00 - \\$320{,}000 = \\$232{,}600.00' },
    ],
  },

  f4q12: {
    blocks: [
      {
        kind: 'paragraph',
        html: 'Two investments of $10 000 both earn 6% p.a. for 5 years, one at simple interest and one compounded annually. Which is worth more, and why?',
      },
    ],
    solutionBlocks: [
      {
        kind: 'paragraph',
        html: 'Simple interest pays 6% of the original $10 000 every year. Compound interest pays 6% of a balance that keeps growing, so it always finishes ahead over more than one period — it earns interest on previously earned interest.',
      },
    ],
  },

  f4q13: {
    blocks: [
      { kind: 'paragraph', html: 'A property worth $285 000 appreciates at 4.5% p.a. Find its value after 3 years.' },
      { kind: 'equation', latex: 'FV = PV(1 + r)^{n}' },
    ],
    solutionBlocks: [
      { kind: 'equation', latex: '\\text{value} = 285{,}000 \\times 1.045^{3} = 285{,}000 \\times 1.141166' },
      { kind: 'equation', latex: '\\text{value} \\approx \\$325{,}232.35' },
    ],
  },
}
