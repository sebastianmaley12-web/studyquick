/**
 * MS-M6 Non-right-angled Trigonometry — block entries (topic slug "m6").
 * Most questions now use the `triangle` GeometryDiagram preset — schematic,
 * not to scale, with unknowns shown as "?" rather than a value. m6q9
 * (ship bearings), m6q11 (two triangles sharing a survey point O) and m6q12
 * (bearing conversion, no triangle at all) don't map onto a single generic
 * triangle cleanly, so those stay paragraph + equation only.
 */
import type { MathBlockEntry } from '../../lib/content/mathBlocks'

export const M6_ENTRIES: Record<string, MathBlockEntry> = {
  m6q1: {
    blocks: [
      {
        kind: 'paragraph',
        html: 'In a right-angled triangle, the side adjacent to a 34&deg; angle is 12.5 cm. Find the opposite side, correct to 2 decimal places.',
      },
      {
        kind: 'geometry',
        data: {
          shape: 'triangle',
          rightAngleAt: 'bottomLeft',
          labels: { angleBottomRight: '34°', base: '12.5 cm', left: '?' },
        },
      },
      { kind: 'equation', latex: '\\tan 34^{\\circ} = \\dfrac{\\text{opposite}}{12.5}' },
    ],
    solutionBlocks: [
      { kind: 'equation', latex: '\\text{opposite} = 12.5 \\times \\tan 34^{\\circ}' },
      { kind: 'equation', latex: '\\text{opposite} \\approx 8.43\\ \\text{cm}' },
    ],
  },

  m6q2: {
    blocks: [
      {
        kind: 'paragraph',
        html: 'In a right-angled triangle, the side opposite angle &theta; is 7 cm and the hypotenuse is 11 cm. Find &theta;, correct to 2 decimal places.',
      },
      {
        kind: 'geometry',
        data: {
          shape: 'triangle',
          rightAngleAt: 'bottomLeft',
          labels: { angleBottomRight: 'θ = ?', left: '7 cm', right: '11 cm' },
        },
      },
      { kind: 'equation', latex: '\\sin \\theta = \\dfrac{7}{11}' },
    ],
    solutionBlocks: [
      { kind: 'equation', latex: '\\sin \\theta = 0.63636\\ldots' },
      { kind: 'equation', latex: '\\theta = \\sin^{-1}(0.63636) \\approx 39.52^{\\circ}' },
    ],
  },

  m6q3: {
    blocks: [
      {
        kind: 'paragraph',
        html: 'In triangle ABC, angle A = 48&deg;, angle B = 63&deg; and side <em>b</em> = 15 cm. Find side <em>a</em>, correct to 2 decimal places.',
      },
      {
        kind: 'geometry',
        data: {
          shape: 'triangle',
          labels: {
            bottomLeft: 'A',
            bottomRight: 'B',
            top: 'C',
            angleBottomLeft: '48°',
            angleBottomRight: '63°',
            left: 'b = 15 cm',
            right: 'a = ?',
          },
        },
      },
      { kind: 'equation', latex: '\\dfrac{a}{\\sin A} = \\dfrac{b}{\\sin B}' },
    ],
    solutionBlocks: [
      { kind: 'paragraph', html: 'Use the sine rule, since a side and its opposite angle are known.' },
      { kind: 'equation', latex: 'a = \\dfrac{15 \\times \\sin 48^{\\circ}}{\\sin 63^{\\circ}}' },
      { kind: 'equation', latex: 'a \\approx 12.51\\ \\text{cm}' },
    ],
  },

  m6q4: {
    blocks: [
      {
        kind: 'paragraph',
        html: 'In triangle ABC, <em>a</em> = 9 cm, <em>b</em> = 12 cm and angle B = 70&deg;. Find the acute angle A, correct to 2 decimal places.',
      },
      {
        kind: 'geometry',
        data: {
          shape: 'triangle',
          labels: {
            bottomLeft: 'A',
            bottomRight: 'B',
            top: 'C',
            angleBottomRight: '70°',
            angleBottomLeft: 'A = ?',
            left: 'b = 12 cm',
            right: 'a = 9 cm',
          },
        },
      },
      { kind: 'equation', latex: '\\dfrac{\\sin A}{9} = \\dfrac{\\sin 70^{\\circ}}{12}' },
    ],
    solutionBlocks: [
      { kind: 'equation', latex: '\\sin A = \\dfrac{9 \\times \\sin 70^{\\circ}}{12} \\approx 0.70477' },
      { kind: 'equation', latex: 'A \\approx 44.81^{\\circ}' },
    ],
  },

  m6q5: {
    blocks: [
      {
        kind: 'paragraph',
        html: 'For the triangle in the previous question (<em>a</em> = 9 cm, <em>b</em> = 12 cm, angle B = 70&deg;), the ambiguous case gives a second possible value for angle A. Find the obtuse value, correct to 2 decimal places.',
      },
      {
        kind: 'geometry',
        data: {
          shape: 'triangle',
          labels: {
            bottomLeft: 'A',
            bottomRight: 'B',
            top: 'C',
            angleBottomRight: '70°',
            angleBottomLeft: 'A = ?',
            left: 'b = 12 cm',
            right: 'a = 9 cm',
          },
        },
      },
    ],
    solutionBlocks: [
      {
        kind: 'paragraph',
        html: 'Since sin(180&deg; &minus; &theta;) = sin &theta;, the supplement of the acute solution is also valid.',
      },
      { kind: 'equation', latex: '180^{\\circ} - 44.81^{\\circ} = 135.19^{\\circ}' },
    ],
  },

  m6q6: {
    blocks: [
      {
        kind: 'paragraph',
        html: 'In triangle ABC, <em>a</em> = 8 cm, <em>b</em> = 11 cm and the included angle C = 52&deg;. Find side <em>c</em>, correct to 2 decimal places.',
      },
      {
        kind: 'geometry',
        data: {
          shape: 'triangle',
          labels: {
            bottomLeft: 'A',
            bottomRight: 'B',
            top: 'C',
            angleTop: '52°',
            left: 'b = 11 cm',
            right: 'a = 8 cm',
            base: 'c = ?',
          },
        },
      },
      { kind: 'equation', latex: 'c^{2} = a^{2} + b^{2} - 2ab\\cos C' },
    ],
    solutionBlocks: [
      { kind: 'paragraph', html: 'Use the cosine rule, since two sides and the included angle are known.' },
      { kind: 'equation', latex: 'c^{2} = 8^{2} + 11^{2} - 2(8)(11)\\cos 52^{\\circ}' },
      { kind: 'equation', latex: 'c^{2} = 185 - 108.36 = 76.64' },
      { kind: 'equation', latex: 'c \\approx 8.75\\ \\text{cm}' },
    ],
  },

  m6q7: {
    blocks: [
      {
        kind: 'paragraph',
        html: 'A triangle has sides 7 cm, 9 cm and 13 cm. Find the largest angle, correct to 2 decimal places.',
      },
      {
        kind: 'geometry',
        data: {
          shape: 'triangle',
          labels: { left: '7 cm', right: '9 cm', base: '13 cm', angleTop: '?' },
        },
      },
    ],
    solutionBlocks: [
      { kind: 'paragraph', html: 'The largest angle is always opposite the longest side (13 cm).' },
      { kind: 'equation', latex: '\\cos C = \\dfrac{7^{2} + 9^{2} - 13^{2}}{2 \\times 7 \\times 9} = \\dfrac{-39}{126} \\approx -0.30952' },
      { kind: 'equation', latex: 'C \\approx 108.03^{\\circ}' },
    ],
  },

  m6q8: {
    blocks: [
      {
        kind: 'paragraph',
        html: 'Find the area of a triangle with sides 14 cm and 9 cm enclosing an angle of 37&deg;, correct to 2 decimal places.',
      },
      {
        kind: 'geometry',
        data: {
          shape: 'triangle',
          labels: { left: '14 cm', right: '9 cm', angleTop: '37°' },
        },
      },
      { kind: 'equation', latex: 'A = \\tfrac{1}{2}ab\\sin C' },
    ],
    solutionBlocks: [
      { kind: 'equation', latex: 'A = \\tfrac{1}{2} \\times 14 \\times 9 \\times \\sin 37^{\\circ}' },
      { kind: 'equation', latex: 'A = 63 \\times 0.60182 \\approx 37.91\\ \\text{cm}^{2}' },
    ],
  },

  m6q9: {
    blocks: [
      {
        kind: 'paragraph',
        html: 'A ship sails 40 km on a bearing of 060&deg;, then 25 km on a bearing of 150&deg;. Find its distance from the starting point, correct to 2 decimal places.',
      },
    ],
    solutionBlocks: [
      {
        kind: 'paragraph',
        html: 'The two bearings differ by exactly 90&deg; (150&deg; &minus; 060&deg;), so the ship&rsquo;s two legs are perpendicular and Pythagoras&rsquo; theorem applies directly.',
      },
      { kind: 'equation', latex: '\\text{distance} = \\sqrt{40^{2} + 25^{2}} = \\sqrt{2225}' },
      { kind: 'equation', latex: '\\text{distance} \\approx 47.17\\ \\text{km}' },
    ],
  },

  m6q10: {
    blocks: [
      {
        kind: 'paragraph',
        html: 'A tower is 45 m tall. Find the angle of elevation of its top from a point 80 m away on level ground, correct to 2 decimal places.',
      },
      {
        kind: 'geometry',
        data: {
          shape: 'triangle',
          rightAngleAt: 'bottomLeft',
          labels: { left: '45 m', base: '80 m', angleBottomRight: 'θ = ?' },
        },
      },
      { kind: 'equation', latex: '\\tan \\theta = \\dfrac{45}{80}' },
    ],
    solutionBlocks: [
      { kind: 'equation', latex: '\\tan \\theta = 0.5625' },
      { kind: 'equation', latex: '\\theta \\approx 29.36^{\\circ}' },
    ],
  },

  m6q11: {
    blocks: [
      {
        kind: 'paragraph',
        html: 'A radial survey from point O gives OA = 32 m, OB = 28 m and OC = 41 m, with angle AOB = 115&deg; and angle BOC = 97&deg;. Find the total area of triangles AOB and BOC, correct to 2 decimal places.',
      },
    ],
    solutionBlocks: [
      {
        kind: 'paragraph',
        html: 'Apply the area formula A = &frac12;ab sin C to each triangle sharing vertex O, then add the results.',
      },
      { kind: 'equation', latex: 'A_{AOB} = \\tfrac{1}{2} \\times 32 \\times 28 \\times \\sin 115^{\\circ} \\approx 406.03\\ \\text{m}^{2}' },
      { kind: 'equation', latex: 'A_{BOC} = \\tfrac{1}{2} \\times 28 \\times 41 \\times \\sin 97^{\\circ} \\approx 569.72\\ \\text{m}^{2}' },
      { kind: 'equation', latex: '406.03 + 569.72 \\approx 975.75\\ \\text{m}^{2}' },
    ],
  },

  m6q12: {
    blocks: [
      { kind: 'paragraph', html: 'What is the compass bearing S40&deg;W written as a true bearing?' },
    ],
    solutionBlocks: [
      {
        kind: 'paragraph',
        html: 'A compass bearing S40&deg;W starts from south and turns 40&deg; towards west. Measuring clockwise from north, south itself is 180&deg;, and turning further towards west (still clockwise) adds the 40&deg;.',
      },
      { kind: 'equation', latex: '180^{\\circ} + 40^{\\circ} = 220^{\\circ}' },
    ],
  },

  m6q13: {
    blocks: [
      {
        kind: 'paragraph',
        html: 'From the top of a 62 m cliff, the angle of depression to a boat is 23&deg;. Find the horizontal distance from the base of the cliff to the boat, correct to 2 decimal places.',
      },
      {
        kind: 'geometry',
        data: {
          shape: 'triangle',
          rightAngleAt: 'bottomLeft',
          labels: { left: '62 m', base: '?', angleBottomRight: '23°' },
        },
      },
    ],
    solutionBlocks: [
      {
        kind: 'paragraph',
        html: 'The angle of depression from the cliff top equals the angle of elevation from the boat (alternate angles, since the cliff top&rsquo;s horizontal is parallel to the sea).',
      },
      { kind: 'equation', latex: '\\tan 23^{\\circ} = \\dfrac{62}{\\text{distance}}' },
      { kind: 'equation', latex: '\\text{distance} = \\dfrac{62}{\\tan 23^{\\circ}} \\approx 146.06\\ \\text{m}' },
    ],
  },
}
