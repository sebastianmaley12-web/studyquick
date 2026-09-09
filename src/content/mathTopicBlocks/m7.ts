/**
 * MS-M7 Rates and Ratios — block entries (topic slug "m7"). See
 * mathBlocks.ts for the schema.
 */
import type { MathBlockEntry } from '../../lib/content/mathBlocks'

export const M7_ENTRIES: Record<string, MathBlockEntry> = {
  m7q1: {
    blocks: [
      {
        kind: 'paragraph',
        html: 'A car travels 315 km at an average speed of 90 km/h. Find the time taken, in hours.',
      },
      { kind: 'equation', latex: '\\text{time} = \\dfrac{\\text{distance}}{\\text{speed}}' },
    ],
    solutionBlocks: [{ kind: 'equation', latex: '\\text{time} = \\dfrac{315}{90} = 3.5\\ \\text{hours}' }],
  },

  m7q2: {
    blocks: [
      {
        kind: 'paragraph',
        html: 'A car uses 8.4 L/100 km. Find the cost of fuel for a 560 km trip when petrol is $1.95 per litre.',
      },
      { kind: 'equation', latex: '\\text{litres} = \\dfrac{\\text{rate}}{100} \\times \\text{distance}' },
    ],
    solutionBlocks: [
      { kind: 'equation', latex: '\\text{fuel used} = \\dfrac{8.4}{100} \\times 560 = 47.04\\ \\text{L}' },
      { kind: 'equation', latex: '\\text{cost} = 47.04 \\times \\$1.95 = \\$91.73' },
    ],
  },

  m7q3: {
    blocks: [{ kind: 'paragraph', html: 'Convert 72 km/h to metres per second.' }],
    solutionBlocks: [
      { kind: 'paragraph', html: 'Multiply by 1000 to convert km to m, then divide by 3600 to convert hours to seconds.' },
      { kind: 'equation', latex: '72 \\times \\dfrac{1000}{3600} = 20\\ \\text{m/s}' },
    ],
  },

  m7q4: {
    blocks: [
      {
        kind: 'paragraph',
        html: 'A patient is to receive 900 mL of fluid over 6 hours. Find the required flow rate in mL/h.',
      },
    ],
    solutionBlocks: [{ kind: 'equation', latex: '\\text{rate} = \\dfrac{900}{6} = 150\\ \\text{mL/h}' }],
  },

  m7q5: {
    blocks: [
      {
        kind: 'paragraph',
        html: 'For males, BAC = (10<em>N</em> &minus; 7.5<em>H</em>) &divide; (6.8<em>M</em>), where <em>N</em> is standard drinks, <em>H</em> is hours and <em>M</em> is mass in kg. Find the BAC of an 82 kg man after 6 standard drinks over 3 hours, correct to 4 decimal places.',
      },
      { kind: 'equation', latex: '\\text{BAC} = \\dfrac{10N - 7.5H}{6.8M}' },
    ],
    solutionBlocks: [
      { kind: 'equation', latex: '\\text{BAC} = \\dfrac{10(6) - 7.5(3)}{6.8(82)} = \\dfrac{60 - 22.5}{557.6} = \\dfrac{37.5}{557.6}' },
      { kind: 'equation', latex: '\\text{BAC} \\approx 0.0673' },
    ],
  },

  m7q6: {
    blocks: [
      {
        kind: 'paragraph',
        html: 'Using the BAC from the previous question (0.0673), find the time (in hours) for the BAC to fall to zero, given it drops by 0.015 per hour. Answer correct to 2 decimal places.',
      },
    ],
    solutionBlocks: [
      { kind: 'equation', latex: '\\text{time} = \\dfrac{\\text{BAC}}{0.015} = \\dfrac{0.0673}{0.015}' },
      { kind: 'equation', latex: '\\text{time} \\approx 4.48\\ \\text{hours}' },
      {
        kind: 'paragraph',
        html: 'Carrying the unrounded BAC through the calculation gives 4.48 hours; using the rounded 0.0673 gives 4.49 &mdash; both are accepted.',
      },
    ],
  },

  m7q7: {
    blocks: [
      {
        kind: 'paragraph',
        html: 'A household uses 2400 kWh in a quarter. Electricity costs 28.6 cents per kWh. Find the cost.',
      },
    ],
    solutionBlocks: [{ kind: 'equation', latex: '2400 \\times \\$0.286 = \\$686.40' }],
  },

  m7q8: {
    blocks: [{ kind: 'paragraph', html: '$4200 is divided in the ratio 3 : 4 : 5. Find the largest share.' }],
    solutionBlocks: [
      { kind: 'paragraph', html: 'The ratio has 3 + 4 + 5 = 12 parts in total.' },
      { kind: 'equation', latex: '\\text{one part} = \\dfrac{\\$4200}{12} = \\$350' },
      { kind: 'equation', latex: '\\text{largest share} = 5 \\times \\$350 = \\$1{,}750.00' },
    ],
  },

  m7q9: {
    blocks: [
      {
        kind: 'paragraph',
        html: 'On a plan drawn to a scale of 1 : 200, a wall measures 8.5 cm. Find the actual length in metres.',
      },
    ],
    solutionBlocks: [
      { kind: 'equation', latex: '8.5 \\times 200 = 1700\\ \\text{cm}' },
      { kind: 'equation', latex: '1700\\ \\text{cm} = 17\\ \\text{m}' },
    ],
  },

  m7q10: {
    blocks: [
      {
        kind: 'paragraph',
        html: 'A map has a scale of 1 : 25 000. A paddock covers 6 cm<sup>2</sup> on the map. Find its actual area in square metres.',
      },
      { kind: 'paragraph', html: 'Areas scale by the <em>square</em> of the linear scale factor.' },
    ],
    solutionBlocks: [
      { kind: 'equation', latex: '6 \\times 25{,}000^{2} = 3{,}750{,}000{,}000\\ \\text{cm}^{2}' },
      { kind: 'equation', latex: '3{,}750{,}000{,}000 \\div 10{,}000 = 375{,}000\\ \\text{m}^{2}' },
    ],
  },

  m7q11: {
    blocks: [
      {
        kind: 'paragraph',
        html: 'A city of 5.4 million people covers 12 368 km<sup>2</sup>. Find its population density in people per km<sup>2</sup>, correct to 2 decimal places.',
      },
    ],
    solutionBlocks: [
      { kind: 'equation', latex: '\\text{density} = \\dfrac{5{,}400{,}000}{12{,}368}' },
      { kind: 'equation', latex: '\\text{density} \\approx 436.61\\ \\text{people/km}^{2}' },
    ],
  },

  m7q12: {
    blocks: [
      {
        kind: 'paragraph',
        html: 'A cordial is mixed with water in the ratio 1 : 4. If 250 mL of cordial is used, find the total volume of the drink in mL.',
      },
    ],
    solutionBlocks: [
      { kind: 'paragraph', html: '1 part cordial to 4 parts water is 5 parts in total. One part = 250 mL.' },
      { kind: 'equation', latex: '5 \\times 250 = 1{,}250\\ \\text{mL}' },
    ],
  },

  m7q13: {
    blocks: [{ kind: 'paragraph', html: 'A printer produces 420 pages in 3.5 minutes. Find its rate in pages per minute.' }],
    solutionBlocks: [{ kind: 'equation', latex: '\\dfrac{420}{3.5} = 120\\ \\text{pages/min}' }],
  },
}
