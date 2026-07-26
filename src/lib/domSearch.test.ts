import { clearHighlights, highlightMatches } from './domSearch'

function makeRoot(html: string) {
  const root = document.createElement('div')
  root.innerHTML = html
  document.body.appendChild(root)
  return root
}

describe('domSearch', () => {
  afterEach(() => {
    document.body.innerHTML = ''
  })

  it('wraps every case-insensitive match in <mark class="hit">', () => {
    const root = makeRoot(
      '<p>The Treaty of Versailles was signed in 1919, and Versailles fell.</p>',
    )
    const hits = highlightMatches(root, 'versailles')

    expect(hits).toHaveLength(2)
    expect(hits[0].textContent).toBe('Versailles')
    expect(hits[1].textContent).toBe('Versailles')
    expect(root.textContent).toBe(
      'The Treaty of Versailles was signed in 1919, and Versailles fell.',
    )
  })

  it('does not match inside script/style tags', () => {
    const root = makeRoot(
      '<script>versailles</script><style>versailles {}</style><p>versailles</p>',
    )
    const hits = highlightMatches(root, 'versailles')
    expect(hits).toHaveLength(1)
  })

  it('clearHighlights removes marks and restores plain text nodes', () => {
    const root = makeRoot('<p>Versailles and Versailles again</p>')
    highlightMatches(root, 'versailles')
    expect(root.querySelectorAll('mark.hit')).toHaveLength(2)

    clearHighlights(root)
    expect(root.querySelectorAll('mark.hit')).toHaveLength(0)
    expect(root.textContent).toBe('Versailles and Versailles again')
  })

  it('finds text inside a closed <details> element (matches TreeWalker ignoring display)', () => {
    const root = makeRoot('<details><summary>x</summary><p>hidden versailles content</p></details>')
    const hits = highlightMatches(root, 'versailles')
    expect(hits).toHaveLength(1)
  })
})
