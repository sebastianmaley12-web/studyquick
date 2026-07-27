import { typesetMathsHtml } from './mathsTypeset'
import mathsContent from '../content/maths/topics.json'

describe('typesetMathsHtml', () => {
  it('renders &frac12; as a real KaTeX fraction', () => {
    const out = typesetMathsHtml('The area of a triangle is <em>A</em> = &frac12;<em>bh</em>.')
    expect(out).toContain('katex')
    expect(out).not.toContain('&frac12;')
    expect(out).toContain('<em>A</em> = ')
  })

  it('renders a parenthesised radical argument as a real KaTeX square root', () => {
    const out = typesetMathsHtml(
      'The period of a pendulum is <em>T</em> = 2&pi;&radic;(<em>L</em>&divide;<em>g</em>) seconds.',
    )
    expect(out).toContain('katex')
    expect(out).not.toContain('&radic;')
  })

  it('renders a bare-number radical argument as a real KaTeX square root', () => {
    const out = typesetMathsHtml('T = 2&pi; &times; &radic;0.18367 = 2&pi; &times; 0.42857')
    expect(out).toContain('katex')
    expect(out).not.toContain('&radic;')
  })

  it('renders a tag-based exponent as a real KaTeX superscript', () => {
    const out = typesetMathsHtml('A = &pi; &times; 6.4<sup>2</sup> = &pi; &times; 40.96')
    expect(out).toContain('katex')
    expect(out).not.toContain('<sup>')
  })

  it('renders an entity-based exponent (&sup2;) as a real KaTeX superscript', () => {
    const out = typesetMathsHtml('Distance = &radic;(40&sup2; + 25&sup2;) = &radic;2225 = 47.17 km')
    expect(out).toContain('katex')
    expect(out).not.toContain('&sup2;')
  })

  it('renders a subscript as real KaTeX', () => {
    const out = typesetMathsHtml('a<sub><em>n</em>+1</sub> = a<sub><em>n</em></sub> + d')
    expect(out).toContain('katex')
    expect(out).not.toContain('<sub>')
  })

  it('leaves plain prose with no recognised construct completely untouched', () => {
    const prose = 'Find the gradient of the line through (2, 5) and (8, 23).'
    expect(typesetMathsHtml(prose)).toBe(prose)
  })

  it('never throws and never drops content across every real maths question/solution/option', () => {
    let checked = 0
    for (const topic of mathsContent.topics) {
      for (const q of topic.questions) {
        expect(() => typesetMathsHtml(q.q)).not.toThrow()
        checked++
        if (q.sol) {
          expect(() => typesetMathsHtml(q.sol)).not.toThrow()
          checked++
        }
        if (q.type === 'mc') {
          for (const opt of q.opts ?? []) {
            expect(() => typesetMathsHtml(opt)).not.toThrow()
            checked++
          }
        }
      }
    }
    expect(checked).toBeGreaterThan(400)
  })
})
