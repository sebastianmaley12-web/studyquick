/**
 * MS-S4 Bivariate Data Analysis — block entries, keyed by question id
 * (topic slug "s4"). Mostly conceptual multiple-choice questions about
 * correlation, regression lines, and interpolation/extrapolation, so most
 * entries are paragraph + equation blocks — no diagram type in the schema
 * currently models a scatterplot with a fitted trend line.
 */
import type { MathBlockEntry } from '../../lib/content/mathBlocks'

export const S4_ENTRIES: Record<string, MathBlockEntry> = {
  s4q1: {
    blocks: [
      {
        kind: 'paragraph',
        html: 'A study examines how the number of hours studied affects exam marks. Which is the dependent variable?',
      },
    ],
    solutionBlocks: [
      {
        kind: 'paragraph',
        html: 'The exam mark is the variable being explained, so it is the dependent variable and goes on the vertical axis. Hours studied is the independent variable.',
      },
    ],
  },

  s4q2: {
    blocks: [
      {
        kind: 'paragraph',
        html: 'A data set has a correlation coefficient of <i>r</i> = &minus;0.87. How is this best described?',
      },
    ],
    solutionBlocks: [
      {
        kind: 'paragraph',
        html: 'The magnitude 0.87 is close to 1, so the relationship is strong, and the negative sign means one variable decreases as the other increases.',
      },
    ],
  },

  s4q3: {
    blocks: [
      {
        kind: 'paragraph',
        html: 'A least-squares line is &#375; = 3.2<i>x</i> + 15.6. Predict <i>y</i> when <i>x</i> = 12.',
      },
    ],
    solutionBlocks: [
      { kind: 'equation', latex: '\\hat{y} = 3.2(12) + 15.6' },
      { kind: 'equation', latex: '\\hat{y} = 38.4 + 15.6 = 54' },
    ],
  },

  s4q4: {
    blocks: [
      {
        kind: 'paragraph',
        html: 'Data was collected for <i>x</i> between 5 and 30. Using the line of best fit to predict <i>y</i> when <i>x</i> = 45 is an example of:',
      },
    ],
    solutionBlocks: [
      {
        kind: 'paragraph',
        html: 'x = 45 lies outside the range of the data (5 to 30), so this is extrapolation. There is no evidence the pattern continues beyond the data, so the prediction may be unreliable.',
      },
    ],
  },

  s4q5: {
    blocks: [
      {
        kind: 'paragraph',
        html: 'For the model &#375; = 3.2<i>x</i> + 15.6, where <i>x</i> is hours studied and <i>y</i> is exam mark, what does the gradient mean?',
      },
    ],
    solutionBlocks: [
      {
        kind: 'paragraph',
        html: 'The gradient is the change in the predicted y for a one-unit increase in x: one extra hour of study is associated with 3.2 extra marks on average.',
      },
    ],
  },

  s4q6: {
    blocks: [
      {
        kind: 'paragraph',
        html: 'For the same model, what does the <i>y</i>-intercept of 15.6 represent?',
      },
    ],
    solutionBlocks: [
      {
        kind: 'paragraph',
        html: 'The y-intercept is the predicted value of y when x = 0 &mdash; the mark predicted for zero hours of study.',
      },
    ],
  },

  s4q7: {
    blocks: [
      {
        kind: 'paragraph',
        html: 'For &#375; = 3.2<i>x</i> + 15.6, find the value of <i>x</i> that predicts <i>y</i> = 78.',
      },
    ],
    solutionBlocks: [
      { kind: 'equation', latex: '78 = 3.2x + 15.6' },
      { kind: 'equation', latex: '3.2x = 62.4' },
      { kind: 'equation', latex: 'x = 19.5' },
    ],
  },

  s4q8: {
    blocks: [
      {
        kind: 'paragraph',
        html: 'Ice-cream sales and drowning deaths are strongly positively correlated. What is the best conclusion?',
      },
    ],
    solutionBlocks: [
      {
        kind: 'paragraph',
        html: 'Correlation does not imply causation. Hot weather is a confounding variable that raises both ice-cream sales and swimming (and therefore drownings).',
      },
    ],
  },

  s4q9: {
    blocks: [
      {
        kind: 'paragraph',
        html: 'A scatterplot shows points scattered loosely around an upward trend. Which value of <i>r</i> is most likely?',
      },
    ],
    solutionBlocks: [
      {
        kind: 'paragraph',
        html: 'The trend is upward so r is positive; &ldquo;loosely scattered&rdquo; rules out a near-perfect 0.99, and a clear trend rules out 0.15. A moderate positive value near 0.55 fits.',
      },
    ],
  },

  s4q10: {
    blocks: [
      {
        kind: 'paragraph',
        html: 'A least-squares line is &#375; = &minus;0.65<i>x</i> + 42. Predict <i>y</i> when <i>x</i> = 28.',
      },
    ],
    solutionBlocks: [
      { kind: 'equation', latex: '\\hat{y} = -0.65(28) + 42' },
      { kind: 'equation', latex: '\\hat{y} = -18.2 + 42 = 23.8' },
    ],
  },

  s4q11: {
    blocks: [
      { kind: 'paragraph', html: 'Which variable is plotted on the horizontal axis of a scatterplot?' },
    ],
    solutionBlocks: [
      {
        kind: 'paragraph',
        html: 'By convention the independent (explanatory) variable goes on the horizontal axis and the dependent (response) variable on the vertical axis.',
      },
    ],
  },

  s4q12: {
    blocks: [
      {
        kind: 'paragraph',
        html: 'A correlation coefficient of <i>r</i> = 0.04 between two variables suggests:',
      },
    ],
    solutionBlocks: [
      {
        kind: 'paragraph',
        html: 'An r value close to zero means there is almost no linear association between the variables.',
      },
    ],
  },
}
