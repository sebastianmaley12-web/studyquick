/**
 * MS-F1 Money Matters — block entries (topic slug "f1"). See mathBlocks.ts
 * for the schema. No question here describes a diagram/table/graph — every
 * entry is paragraph + equation blocks.
 */
import type { MathBlockEntry } from '../../lib/content/mathBlocks'

export const F1_ENTRIES: Record<string, MathBlockEntry> = {
  f1q1: {
    blocks: [
      {
        kind: 'paragraph',
        html: 'Mia earns $28.40 per hour. In one week she works 38 normal hours, 4 hours at time-and-a-half and 3 hours at double time. Find her gross weekly pay.',
      },
    ],
    steps: [
      { label: 'Normal hours', latex: '38 \\times 28.40 = 1079.20' },
      { label: 'Time-and-a-half hours', latex: '4 \\times 1.5 \\times 28.40 = 170.40' },
      { label: 'Double-time hours', latex: '3 \\times 2 \\times 28.40 = 170.40' },
    ],
    solutionBlocks: [
      { kind: 'equation', latex: '1079.20 + 170.40 + 170.40 = 1420.00' },
      { kind: 'equation', latex: '\\text{Gross weekly pay} = \\$1420.00' },
    ],
  },

  f1q2: {
    blocks: [
      {
        kind: 'paragraph',
        html: 'A salesperson is paid 3.5% commission. Find the commission on sales of $486 000.',
      },
    ],
    solutionBlocks: [
      { kind: 'equation', latex: '0.035 \\times 486\\,000 = \\$17\\,010.00' },
    ],
  },

  f1q3: {
    blocks: [
      {
        kind: 'paragraph',
        html: 'An annual salary of $92 040 is paid fortnightly. Find the gross fortnightly pay.',
      },
    ],
    solutionBlocks: [
      { kind: 'paragraph', html: 'There are 26 fortnights in a year.' },
      { kind: 'equation', latex: '92\\,040 \\div 26 = \\$3540.00' },
    ],
  },

  f1q4: {
    blocks: [
      {
        kind: 'paragraph',
        html: 'Gross weekly pay is $1420.00. Deductions are $312.40 tax and $14.60 union fees. Find the net pay.',
      },
    ],
    solutionBlocks: [
      { kind: 'equation', latex: '1420.00 - 312.40 - 14.60 = \\$1093.00' },
    ],
  },

  f1q5: {
    blocks: [
      {
        kind: 'paragraph',
        html: 'A tax table states: for taxable income $45 001&ndash;$120 000, tax = $5092 plus 32.5c for each $1 over $45 000. Find the tax payable on a taxable income of $68 500.',
      },
    ],
    steps: [
      { label: 'Find the excess over $45 000', latex: '68\\,500 - 45\\,000 = 23\\,500' },
    ],
    solutionBlocks: [
      { kind: 'equation', latex: '5092 + 0.325 \\times 23\\,500' },
      { kind: 'equation', latex: '= 5092 + 7637.50 = \\$12\\,729.50' },
    ],
  },

  f1q6: {
    blocks: [
      {
        kind: 'paragraph',
        html: 'The Medicare levy is 2% of taxable income. Find the levy on a taxable income of $68 500.',
      },
    ],
    solutionBlocks: [{ kind: 'equation', latex: '0.02 \\times 68\\,500 = \\$1370.00' }],
  },

  f1q7: {
    blocks: [
      {
        kind: 'paragraph',
        html: 'A television costs $847 including 10% GST. Find the amount of GST included in the price.',
      },
    ],
    solutionBlocks: [
      {
        kind: 'paragraph',
        html: 'The price is 110% of the pre-GST price, so the GST component is the price divided by 11.',
      },
      { kind: 'equation', latex: '847 \\div 11 = \\$77.00' },
    ],
  },

  f1q8: {
    blocks: [
      { kind: 'paragraph', html: 'A lounge marked $1260 is discounted by 35%. Find the sale price.' },
    ],
    solutionBlocks: [
      { kind: 'paragraph', html: 'The sale price is 65% of the marked price.' },
      { kind: 'equation', latex: '0.65 \\times 1260 = \\$819.00' },
    ],
  },

  f1q9: {
    blocks: [
      { kind: 'paragraph', html: 'Find the simple interest on $4800 invested at 6.4% p.a. for 30 months.' },
      { kind: 'equation', latex: 'I = Prn' },
    ],
    steps: [{ label: 'Convert 30 months to years', latex: '30 \\div 12 = 2.5\\ \\text{years}' }],
    solutionBlocks: [
      { kind: 'equation', latex: 'I = 4800 \\times 0.064 \\times 2.5 = \\$768.00' },
    ],
  },

  f1q10: {
    blocks: [
      {
        kind: 'paragraph',
        html: 'Weekly income is $1250. Weekly expenses are rent $420, food $185, transport $96, savings $240 and other $131. Find the weekly surplus.',
      },
    ],
    solutionBlocks: [
      { kind: 'equation', latex: '420 + 185 + 96 + 240 + 131 = 1072.00' },
      { kind: 'equation', latex: '1250 - 1072.00 = \\$178.00' },
    ],
  },

  f1q11: {
    blocks: [
      {
        kind: 'paragraph',
        html: 'Juice is sold as 1.25 L for $3.45 or 2 L for $5.20. Find the unit price (per litre) of the better buy, correct to the nearest cent.',
      },
    ],
    solutionBlocks: [
      { kind: 'equation', latex: '3.45 \\div 1.25 = \\$2.76/\\text{L}' },
      { kind: 'equation', latex: '5.20 \\div 2 = \\$2.60/\\text{L}' },
      {
        kind: 'paragraph',
        html: 'The 2 L bottle is the better buy at $2.60 per litre.',
      },
    ],
  },

  f1q12: {
    blocks: [
      { kind: 'paragraph', html: 'A pieceworker is paid $1.85 for each unit assembled. Find the pay for 145 units.' },
    ],
    solutionBlocks: [{ kind: 'equation', latex: '145 \\times 1.85 = \\$268.25' }],
  },
}
