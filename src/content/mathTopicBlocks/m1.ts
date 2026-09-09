/**
 * MS-M1 Applications of Measurement — block entries (topic slug "m1").
 * m1q5/m1q11 approved in the Stage B prototype review, preserved verbatim.
 *
 * m1q4 reuses the existing composite-rect-semicircle GeometryDiagram preset
 * (width = rectangle length, height = rectangle width, since the preset's
 * semicircle radius is height/2 — matching this question's diameter-8
 * semicircle exactly). m1q8 uses a table block for the trapezoidal-rule
 * offsets. m1q7 (rectangular-prism surface area) and m1q12 (cylinder +
 * hemisphere silo) have no matching GeometryDiagram preset yet — no new
 * renderer was built for them, so they render as paragraph + equation only.
 */
import type { MathBlockEntry } from '../../lib/content/mathBlocks'

export const M1_ENTRIES: Record<string, MathBlockEntry> = {
  m1q1: {
    blocks: [
      {
        kind: 'paragraph',
        html: 'A length is measured as 14.3 cm, correct to the nearest 0.1 cm. State the absolute error.',
      },
    ],
    solutionBlocks: [
      { kind: 'paragraph', html: 'The absolute error is half the smallest unit of measurement:' },
      { kind: 'equation', latex: '\\dfrac{1}{2} \\times 0.1 = 0.05\\ \\text{cm}' },
    ],
  },

  m1q2: {
    blocks: [
      {
        kind: 'paragraph',
        html: 'A length is recorded as 24.5 cm, correct to the nearest 0.5 cm. Find the percentage error, correct to 2 decimal places.',
      },
    ],
    solutionBlocks: [
      { kind: 'equation', latex: '\\text{Absolute error} = \\dfrac{1}{2} \\times 0.5 = 0.25\\ \\text{cm}' },
      { kind: 'equation', latex: '\\text{Percentage error} = \\dfrac{0.25}{24.5} \\times 100 \\approx 1.02\\%' },
    ],
  },

  m1q3: {
    blocks: [{ kind: 'paragraph', html: 'Convert 3.5 m&sup2; to cm&sup2;.' }],
    solutionBlocks: [
      { kind: 'equation', latex: '1\\ \\text{m}^{2} = 100 \\times 100 = 10\\,000\\ \\text{cm}^{2}' },
      { kind: 'equation', latex: '3.5\\ \\text{m}^{2} = 3.5 \\times 10\\,000 = 35\\,000\\ \\text{cm}^{2}' },
    ],
  },

  m1q4: {
    blocks: [
      {
        kind: 'paragraph',
        html: 'A shape is a rectangle 12 m by 8 m with a semicircle of diameter 8 m attached to one end, as shown below. Find its total area, correct to 2 decimal places.',
      },
      {
        kind: 'geometry',
        data: {
          shape: 'composite-rect-semicircle',
          width: 12,
          height: 8,
          widthLabel: '12 m',
          heightLabel: '8 m',
        },
      },
    ],
    steps: [
      { label: 'Area of the rectangle', latex: '12 \\times 8 = 96\\ \\text{m}^{2}' },
      { label: 'Area of the semicircle (radius 4 m)', latex: '\\tfrac{1}{2}\\pi (4)^{2} \\approx 25.13\\ \\text{m}^{2}' },
    ],
    solutionBlocks: [
      { kind: 'equation', latex: '\\text{Rectangle} = 12 \\times 8 = 96\\ \\text{m}^{2}' },
      { kind: 'equation', latex: '\\text{Semicircle} = \\tfrac{1}{2}\\pi (4)^{2} \\approx 25.13\\ \\text{m}^{2}' },
      { kind: 'equation', latex: '\\text{Total} \\approx 121.13\\ \\text{m}^{2}' },
    ],
  },

  m1q5: {
    blocks: [
      {
        kind: 'paragraph',
        html: 'A cylindrical water tank has the dimensions shown below. Find its volume, correct to 3 decimal places.',
      },
      {
        kind: 'geometry',
        data: {
          shape: 'cylinder',
          radius: 0.45,
          height: 1.8,
          radiusLabel: 'r = 0.45 m',
          heightLabel: 'h = 1.8 m',
        },
      },
      { kind: 'equation', latex: 'V = \\pi r^{2} h' },
    ],
    steps: [
      { label: 'Substitute the known values', latex: 'V = \\pi (0.45)^{2} (1.8)' },
      { label: 'Square the radius', latex: 'V = \\pi \\times 0.2025 \\times 1.8' },
    ],
    solutionBlocks: [
      { kind: 'equation', latex: 'V = \\pi (0.45)^{2}(1.8) = \\pi \\times 0.2025 \\times 1.8' },
      { kind: 'equation', latex: 'V \\approx 1.145\\ \\text{m}^{3}' },
    ],
  },

  m1q6: {
    blocks: [{ kind: 'paragraph', html: 'A container has a volume of 2400 cm&sup3;. Find its capacity in litres.' }],
    solutionBlocks: [
      { kind: 'paragraph', html: '1000 cm&sup3; = 1 L, so:' },
      { kind: 'equation', latex: '2400 \\div 1000 = 2.4\\ \\text{L}' },
    ],
  },

  m1q7: {
    blocks: [
      {
        kind: 'paragraph',
        html: 'Find the surface area of a rectangular prism measuring 3 cm by 4 cm by 5 cm.',
      },
      { kind: 'equation', latex: 'SA = 2(lw + lh + wh)' },
    ],
    solutionBlocks: [
      { kind: 'equation', latex: 'SA = 2(3 \\times 4 + 3 \\times 5 + 4 \\times 5)' },
      { kind: 'equation', latex: 'SA = 2(12 + 15 + 20) = 2 \\times 47' },
      { kind: 'equation', latex: 'SA = 94\\ \\text{cm}^{2}' },
    ],
  },

  m1q8: {
    blocks: [
      {
        kind: 'paragraph',
        html: 'A block of land has the offsets shown below, taken at 4 m intervals along a 16 m baseline. Use the trapezoidal rule to estimate its area.',
      },
      {
        kind: 'table',
        data: {
          caption: 'Offsets along the baseline',
          headers: ['Distance (m)', '0', '4', '8', '12', '16'],
          rows: [['Offset (m)', '0', '5.2', '7.8', '6.4', '0']],
        },
      },
      { kind: 'equation', latex: 'A \\approx \\dfrac{h}{2}\\Big[(\\text{first} + \\text{last}) + 2(\\text{sum of the rest})\\Big]' },
    ],
    steps: [
      { label: 'Sum the interior offsets', latex: '5.2 + 7.8 + 6.4 = 19.4' },
      { label: 'Substitute into the rule', latex: 'A \\approx \\dfrac{4}{2}\\big[(0 + 0) + 2(19.4)\\big]' },
    ],
    solutionBlocks: [
      { kind: 'equation', latex: 'A \\approx \\dfrac{4}{2}\\big[(0 + 0) + 2(5.2 + 7.8 + 6.4)\\big] = 2 \\times 2 \\times 19.4' },
      { kind: 'equation', latex: 'A \\approx 77.6\\ \\text{m}^{2}' },
    ],
  },

  m1q9: {
    blocks: [
      {
        kind: 'paragraph',
        html: 'A 2.2 kW heater runs for 5.5 hours. Electricity costs 32 cents per kWh. Find the cost of running the heater.',
      },
    ],
    solutionBlocks: [
      { kind: 'equation', latex: '\\text{Energy} = 2.2 \\times 5.5 = 12.1\\ \\text{kWh}' },
      { kind: 'equation', latex: '\\text{Cost} = 12.1 \\times \\$0.32 \\approx \\$3.87' },
    ],
  },

  m1q10: {
    blocks: [
      { kind: 'paragraph', html: 'A cereal is labelled 1850 kJ per 100 g. Find the energy in a 250 g serving.' },
    ],
    solutionBlocks: [
      { kind: 'paragraph', html: '250 g is 2.5 lots of 100 g, so:' },
      { kind: 'equation', latex: '1850 \\times 2.5 = 4\\,625\\ \\text{kJ}' },
    ],
  },

  m1q11: {
    blocks: [{ kind: 'paragraph', html: 'Write 0.00042 m in scientific notation.' }],
    solutionBlocks: [
      {
        kind: 'paragraph',
        html: 'Move the decimal point 4 places right to get 4.2, so the index is &minus;4:',
      },
      { kind: 'equation', latex: '4.2 \\times 10^{-4}\\ \\text{m}' },
    ],
  },

  m1q12: {
    blocks: [
      {
        kind: 'paragraph',
        html: 'A silo is a cylinder of radius 3 m and height 10 m topped by a hemisphere of radius 3 m. Find its total volume, correct to 2 decimal places.',
      },
      { kind: 'equation', latex: 'V = \\pi r^{2} h + \\tfrac{2}{3}\\pi r^{3}' },
    ],
    steps: [
      { label: 'Volume of the cylinder', latex: '\\pi (3)^{2}(10) \\approx 282.74\\ \\text{m}^{3}' },
      { label: 'Volume of the hemisphere', latex: '\\tfrac{2}{3}\\pi (3)^{3} \\approx 56.55\\ \\text{m}^{3}' },
    ],
    solutionBlocks: [
      { kind: 'equation', latex: '\\text{Cylinder} = \\pi (3)^{2}(10) \\approx 282.74\\ \\text{m}^{3}' },
      { kind: 'equation', latex: '\\text{Hemisphere} = \\tfrac{2}{3}\\pi (3)^{3} \\approx 56.55\\ \\text{m}^{3}' },
      { kind: 'equation', latex: '\\text{Total} \\approx 339.29\\ \\text{m}^{3}' },
    ],
  },
}
