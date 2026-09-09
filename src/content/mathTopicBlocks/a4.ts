/**
 * MS-A4 Types of Relationships — block entries (topic slug "a4"). a4q4,
 * a4q5, a4q6 reuse the same projectile model h = 20t - 5t^2 from
 * topics.json (restated per-question rather than as a shared diagram,
 * since the graph renderer only draws straight line segments, not a
 * parabola). a4q12 (two intersecting lines) gets a `graph` block since it
 * is genuinely a coordinate-geometry picture.
 */
import type { MathBlockEntry } from '../../lib/content/mathBlocks'

export const A4_ENTRIES: Record<string, MathBlockEntry> = {
  a4q1: {
    blocks: [
      {
        kind: 'paragraph',
        html: 'Solve simultaneously: 3<em>x</em> + 2<em>y</em> = 19 and <em>x</em> &minus; <em>y</em> = 3. Give the value of <em>x</em>.',
      },
    ],
    steps: [{ label: 'Rearrange the second equation', latex: 'x = y + 3' }],
    solutionBlocks: [
      { kind: 'equation', latex: '3(y + 3) + 2y = 19' },
      { kind: 'equation', latex: '5y + 9 = 19 \\implies y = 2' },
      { kind: 'equation', latex: 'x = 2 + 3 = 5' },
    ],
  },

  a4q2: {
    blocks: [
      {
        kind: 'paragraph',
        html: 'A business has costs <em>C</em> = 500 + 12<em>n</em> and revenue <em>R</em> = 22<em>n</em> dollars for <em>n</em> items. Find the break-even number of items.',
      },
    ],
    solutionBlocks: [
      { kind: 'equation', latex: '500 + 12n = 22n' },
      { kind: 'equation', latex: '500 = 10n \\implies n = 50\\ \\text{items}' },
    ],
  },

  a4q3: {
    blocks: [
      {
        kind: 'paragraph',
        html: 'Three coffees and two muffins cost $21.50. Five coffees and two muffins cost $30.50. Find the price of one muffin.',
      },
    ],
    steps: [{ label: 'Subtract the equations', latex: '2\\ \\text{coffees} = \\$9.00' }],
    solutionBlocks: [
      { kind: 'equation', latex: '\\text{coffee} = \\$4.50' },
      { kind: 'equation', latex: '3(4.50) + 2m = 21.50 \\implies 2m = 8.00' },
      { kind: 'equation', latex: 'm = \\$4.00' },
    ],
  },

  a4q4: {
    blocks: [
      {
        kind: 'paragraph',
        html: 'A ball&rsquo;s height is <em>h</em> = 20<em>t</em> &minus; 5<em>t</em><sup>2</sup> metres after <em>t</em> seconds. Find its height after 1.5 seconds.',
      },
      { kind: 'equation', latex: 'h = 20t - 5t^2' },
    ],
    solutionBlocks: [
      { kind: 'equation', latex: 'h = 20(1.5) - 5(1.5)^2' },
      { kind: 'equation', latex: '= 30 - 11.25 = 18.75\\ \\text{m}' },
    ],
  },

  a4q5: {
    blocks: [
      {
        kind: 'paragraph',
        html: 'For <em>h</em> = 20<em>t</em> &minus; 5<em>t</em><sup>2</sup>, find the positive time at which the ball returns to the ground (<em>h</em> = 0).',
      },
    ],
    solutionBlocks: [
      { kind: 'equation', latex: '20t - 5t^2 = 0' },
      { kind: 'equation', latex: '5t(4 - t) = 0' },
      { kind: 'paragraph', html: 'This gives t = 0 (launch) or t = 4 seconds.' },
    ],
  },

  a4q6: {
    blocks: [
      {
        kind: 'paragraph',
        html: 'For <em>h</em> = 20<em>t</em> &minus; 5<em>t</em><sup>2</sup>, find the maximum height reached.',
      },
    ],
    solutionBlocks: [
      {
        kind: 'paragraph',
        html: 'By symmetry the maximum is halfway between the zeros t = 0 and t = 4, so at t = 2.',
      },
      { kind: 'equation', latex: 'h = 40 - 20 = 20\\ \\text{m}' },
    ],
  },

  a4q7: {
    blocks: [
      {
        kind: 'paragraph',
        html: 'A population is modelled by <em>A</em> = 5000(1.06)<sup><em>t</em></sup>, where <em>t</em> is in years. Find the population after 8 years, to the nearest whole number.',
      },
      { kind: 'equation', latex: 'A = 5000(1.06)^t' },
    ],
    solutionBlocks: [
      { kind: 'equation', latex: 'A = 5000 \\times 1.06^8 = 5000 \\times 1.59385' },
      { kind: 'equation', latex: '\\approx 7969' },
    ],
  },

  a4q8: {
    blocks: [
      {
        kind: 'paragraph',
        html: 'A drug has a half-life of 6 hours. If a patient is given 80 mg, how much remains after 18 hours?',
      },
    ],
    solutionBlocks: [
      { kind: 'paragraph', html: '18 hours is 3 half-lives, so the amount halves 3 times.' },
      { kind: 'equation', latex: '80 \\rightarrow 40 \\rightarrow 20 \\rightarrow 10\\ \\text{mg}' },
    ],
  },

  a4q9: {
    blocks: [
      {
        kind: 'paragraph',
        html: '<em>y</em> varies inversely with <em>x</em>, and <em>y</em> = 8 when <em>x</em> = 15. Find <em>y</em> when <em>x</em> = 24.',
      },
      { kind: 'equation', latex: 'y = \\frac{k}{x}' },
    ],
    steps: [{ label: 'Find k', latex: 'k = 8 \\times 15 = 120' }],
    solutionBlocks: [{ kind: 'equation', latex: 'y = 120 \\div 24 = 5' }],
  },

  a4q10: {
    blocks: [
      { kind: 'paragraph', html: 'What is the shape of the graph of <em>y</em> = <em>k</em>&divide;<em>x</em> for <em>k</em> &gt; 0 and <em>x</em> &gt; 0?' },
    ],
    solutionBlocks: [
      {
        kind: 'paragraph',
        html: 'y = k&divide;x is a hyperbola. As x increases y decreases towards zero without ever reaching it, and as x approaches zero y grows without bound.',
      },
    ],
  },

  a4q11: {
    blocks: [
      {
        kind: 'paragraph',
        html: '<em>y</em> varies directly with <em>x</em><sup>2</sup>, and <em>y</em> = 54 when <em>x</em> = 3. Find <em>y</em> when <em>x</em> = 5.',
      },
      { kind: 'equation', latex: 'y = kx^2' },
    ],
    steps: [{ label: 'Find k', latex: '54 = 9k \\implies k = 6' }],
    solutionBlocks: [{ kind: 'equation', latex: 'y = 6 \\times 25 = 150' }],
  },

  a4q12: {
    blocks: [
      {
        kind: 'paragraph',
        html: 'The lines <em>y</em> = 2<em>x</em> + 1 and <em>y</em> = &minus;<em>x</em> + 10 intersect. Find the <em>y</em>-coordinate of the point of intersection.',
      },
      {
        kind: 'graph',
        data: {
          xRange: [-1, 7],
          yRange: [-2, 16],
          lines: [
            { from: [-1, -1], to: [7, 15] },
            { from: [-1, 11], to: [7, 3] },
          ],
          points: [{ x: 3, y: 7, label: '(3, 7)' }],
        },
      },
    ],
    solutionBlocks: [
      { kind: 'equation', latex: '2x + 1 = -x + 10' },
      { kind: 'equation', latex: '3x = 9 \\implies x = 3' },
      { kind: 'equation', latex: 'y = 2(3) + 1 = 7' },
    ],
  },

  a4q13: {
    blocks: [{ kind: 'paragraph', html: 'A quantity halves every fixed period of time. Which model describes it?' }],
    solutionBlocks: [
      {
        kind: 'paragraph',
        html: 'Repeated multiplication by the same factor (here &frac12;) each period is exponential decay: y = a(0.5)<sup>x</sup>.',
      },
    ],
  },
}
