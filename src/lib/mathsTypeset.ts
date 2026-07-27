import { renderLatex } from './latex'

/**
 * Auto-typesets the maths content's existing question/solution HTML into
 * real KaTeX typography (stacked fractions, proper radicals, true super/
 * subscripts) wherever a recognised construct appears — WITHOUT rewriting
 * any content. Every maths question already carries semantic HTML (&frac12;,
 * &radic;, <sup>, <sub>, &sup2;) rather than plain-ASCII "1/2"/"x^2" text, so
 * this is a mechanical upgrade of those existing constructs to Mathspace-
 * style rendering, not new authoring.
 *
 * Deliberately conservative: only replaces a construct when it matches one
 * of the specific patterns below, and only accepts the KaTeX render if it
 * actually produced KaTeX markup. Anything that doesn't match, or that KaTeX
 * fails to render, is left exactly as it was — prose and any construct this
 * doesn't recognise pass through completely untouched.
 */

const ENTITY_TO_LATEX: [RegExp, string][] = [
  [/&pi;/g, '\\pi '],
  [/&times;/g, '\\times '],
  [/&divide;/g, '/'],
  [/&minus;/g, '-'],
  [/&deg;/g, '^{\\circ}'],
  [/&asymp;/g, '\\approx '],
  [/&thinsp;/g, '\\,'],
  [/&sigma;/g, '\\sigma '],
  [/&Sigma;/g, '\\Sigma '],
  [/&theta;/g, '\\theta '],
  [/&mu;/g, '\\mu '],
  [/&rsquo;/g, "'"],
]

/** Converts a self-contained math fragment (an exponent's base/content, or a
 * radical's argument) to LaTeX: strips <em> wrapper tags (letters render
 * italic in math mode anyway) and maps the entities this content actually
 * uses to their LaTeX equivalents. Not intended for arbitrary prose. */
function fragmentToLatex(raw: string): string {
  let s = raw.replace(/<em>([^<]*)<\/em>/g, '$1')
  for (const [pattern, replacement] of ENTITY_TO_LATEX) {
    s = s.replace(pattern, replacement)
  }
  return s.trim()
}

/** Renders `latex` and returns it only if KaTeX actually produced real
 * markup; otherwise returns null so the caller keeps the original HTML. */
function tryRender(latex: string): string | null {
  const rendered = renderLatex(latex)
  return rendered.includes('katex') ? rendered : null
}

const BASE_ATOM = String.raw`(<em>[^<]+<\/em>|\([^()]*\)|[\w.]+)`

function typesetRadicals(html: string): string {
  let out = html.replace(/&radic;\(([^()]*)\)/g, (match, inner: string) => {
    const rendered = tryRender(`\\sqrt{${fragmentToLatex(inner)}}`)
    return rendered ?? match
  })
  out = out.replace(new RegExp(String.raw`&radic;${BASE_ATOM}`, 'g'), (match, atom: string) => {
    const rendered = tryRender(`\\sqrt{${fragmentToLatex(atom)}}`)
    return rendered ?? match
  })
  return out
}

function typesetFractionHalf(html: string): string {
  return html.replace(/&frac12;/g, (match) => tryRender('\\frac{1}{2}') ?? match)
}

function typesetSuperscripts(html: string): string {
  let out = html.replace(
    new RegExp(String.raw`${BASE_ATOM}<sup>([\s\S]*?)<\/sup>`, 'g'),
    (match, base: string, exp: string) => {
      const rendered = tryRender(`{${fragmentToLatex(base)}}^{${fragmentToLatex(exp)}}`)
      return rendered ?? match
    },
  )
  out = out.replace(
    new RegExp(String.raw`${BASE_ATOM}&sup([23]);`, 'g'),
    (match, base: string, digit: string) => {
      const rendered = tryRender(`{${fragmentToLatex(base)}}^{${digit}}`)
      return rendered ?? match
    },
  )
  return out
}

function typesetSubscripts(html: string): string {
  return html.replace(
    new RegExp(String.raw`${BASE_ATOM}<sub>([\s\S]*?)<\/sub>`, 'g'),
    (match, base: string, sub: string) => {
      const rendered = tryRender(`{${fragmentToLatex(base)}}_{${fragmentToLatex(sub)}}`)
      return rendered ?? match
    },
  )
}

export function typesetMathsHtml(html: string): string {
  let out = html
  out = typesetRadicals(out)
  out = typesetFractionHalf(out)
  out = typesetSuperscripts(out)
  out = typesetSubscripts(out)
  return out
}
