import { renderLatex } from '../../lib/latex'

/** Thin KaTeX wrapper — every equation in the new presentation system goes
 * through this rather than ad hoc renderLatex() calls, so there's one place
 * that owns the "equation block" look. */
export function MathEquation({ latex, display = true }: { latex: string; display?: boolean }) {
  return (
    <div
      className={display ? 'mx-equation' : 'mx-equation-inline'}
      dangerouslySetInnerHTML={{ __html: renderLatex(latex, display) }}
    />
  )
}
