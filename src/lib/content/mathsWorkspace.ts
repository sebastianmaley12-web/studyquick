/**
 * Additive presentation layer for a small number of existing Maths Standard 2
 * questions (matched by `questionId` against the real ids in
 * src/content/maths/topics.json) — NOT a rewrite of the maths database. The
 * underlying question record (answer, tolerance, unit, options, marks) is
 * untouched and still comes from topics.json; this only supplies a richer,
 * LaTeX-typeset presentation and an optional step-by-step scaffold for
 * MathsQuestionWorkspace to render. Any question id with no entry here keeps
 * rendering through the original MathsQuestion component, unchanged.
 */

export interface MathsWorkspaceStep {
  label: string
  latex: string
}

export interface MathsWorkspaceEntry {
  /** Plain-text lead-in shown above the formula, in normal prose (not LaTeX). */
  introText: string
  /** The core formula/expression, typeset prominently via KaTeX display mode. */
  formulaLatex: string
  /** Optional inline diagram — raw, hand-authored SVG markup (not user input). */
  diagramSvg?: string
  /** Scaffold shown when the student asks for step-by-step help, before answering. */
  steps: MathsWorkspaceStep[]
  /** Full worked solution, shown after answering, replacing the plain-HTML `sol` field for display. */
  solutionSteps: MathsWorkspaceStep[]
}

const circleDiagram = `
<svg viewBox="0 0 160 160" role="img" aria-label="Circle of radius r">
  <circle cx="80" cy="80" r="60" fill="none" stroke="var(--blue)" stroke-width="2.5" />
  <line x1="80" y1="80" x2="140" y2="80" stroke="var(--ink)" stroke-width="2" />
  <circle cx="80" cy="80" r="2.5" fill="var(--ink)" />
  <text x="106" y="72" font-size="13" fill="var(--ink)">r</text>
</svg>`

export const MATHS_WORKSPACE_ENTRIES: Record<string, MathsWorkspaceEntry> = {
  a1q1: {
    introText:
      'Find the area of a circular garden bed of radius 6.4 m, correct to 2 decimal places.',
    formulaLatex: 'A = \\pi r^{2}',
    diagramSvg: circleDiagram,
    steps: [
      { label: 'Identify the known value', latex: 'r = 6.4' },
      { label: 'Substitute into the formula', latex: 'A = \\pi (6.4)^{2}' },
      { label: 'Evaluate', latex: 'A = \\pi \\times 40.96' },
    ],
    solutionSteps: [
      { label: 'Substitute r = 6.4 into the formula', latex: 'A = \\pi (6.4)^{2}' },
      { label: 'Square the radius', latex: 'A = \\pi \\times 40.96' },
      { label: 'Evaluate and round to 2 decimal places', latex: 'A \\approx 128.68\\ \\text{m}^{2}' },
    ],
  },
  a1q3: {
    introText: 'Solve for x.',
    formulaLatex: '5x - 7 = 3x + 11',
    steps: [
      { label: 'Collect the x terms on one side', latex: '5x - 3x = 11 + 7' },
      { label: 'Simplify both sides', latex: '2x = 18' },
      { label: 'Divide to solve for x', latex: 'x = 9' },
    ],
    solutionSteps: [
      { label: 'Collect the x terms on one side', latex: '5x - 3x = 11 + 7' },
      { label: 'Simplify', latex: '2x = 18' },
      { label: 'Solve for x', latex: 'x = 9' },
    ],
  },
  a1q12: {
    introText: 'Find T for L = 1.8 m and g = 9.8 m/s², correct to 2 decimal places.',
    formulaLatex: 'T = 2\\pi \\sqrt{\\dfrac{L}{g}}',
    steps: [
      { label: 'Substitute the known values', latex: 'T = 2\\pi \\sqrt{\\dfrac{1.8}{9.8}}' },
      { label: 'Evaluate the fraction inside the root', latex: 'T = 2\\pi \\sqrt{0.1837\\ldots}' },
      { label: 'Take the square root', latex: 'T = 2\\pi \\times 0.4286\\ldots' },
    ],
    solutionSteps: [
      { label: 'Substitute L = 1.8 and g = 9.8', latex: 'T = 2\\pi \\sqrt{\\dfrac{1.8}{9.8}}' },
      { label: 'Evaluate inside the root, then take the square root', latex: 'T = 2\\pi \\times 0.4286' },
      { label: 'Evaluate and round to 2 decimal places', latex: 'T \\approx 2.69\\ \\text{s}' },
    ],
  },
  a1q13: {
    introText: 'What is 45 780 written correct to 2 significant figures?',
    formulaLatex: '45\\,780 \\ \\rightarrow\\ \\text{2 s.f.}',
    steps: [
      { label: 'Identify the first two significant figures', latex: '4\\underline{5}\\,780' },
      { label: 'Check the next digit to decide how to round', latex: '7 \\geq 5 \\ \\Rightarrow\\ \\text{round up}' },
    ],
    solutionSteps: [
      { label: 'The first two significant figures are 4 and 5', latex: '4\\underline{5}\\,780' },
      { label: 'The next digit (7) rounds the 5 up to 6', latex: '45\\,780 \\approx 46\\,000' },
    ],
  },
}
