import katex from 'katex'

/** Renders a LaTeX source string to an HTML string via KaTeX, for use with
 * dangerouslySetInnerHTML — matches how the rest of the app renders
 * pre-built HTML fragments rather than wrapping content in a component tree.
 * Never throws: a malformed LaTeX string renders as its own raw text rather
 * than crashing the question it appears in. */
export function renderLatex(source: string, displayMode = false): string {
  try {
    return katex.renderToString(source, { throwOnError: false, displayMode, output: 'html' })
  } catch {
    return source
  }
}
