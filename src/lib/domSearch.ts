/**
 * Live text-highlighting, ported directly from the original's TreeWalker
 * approach. TreeWalker doesn't care about CSS display/visibility, so this
 * finds matches inside collapsed <details> or filtered-out list items just
 * like the original did — that's a pre-existing quirk of the original, not
 * something introduced here (see the search architecture notes for why it's
 * not worth "fixing").
 */

export function clearHighlights(root: HTMLElement) {
  root.querySelectorAll('mark.hit').forEach((mark) => {
    const parent = mark.parentNode
    if (!parent) return
    parent.replaceChild(document.createTextNode(mark.textContent ?? ''), mark)
    parent.normalize()
  })
}

export function highlightMatches(root: HTMLElement, query: string): HTMLElement[] {
  const lcQuery = query.toLowerCase()
  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, {
    acceptNode(node) {
      if (!node.nodeValue || !node.nodeValue.toLowerCase().includes(lcQuery)) {
        return NodeFilter.FILTER_REJECT
      }
      const tag = node.parentNode?.nodeName
      if (tag === 'SCRIPT' || tag === 'STYLE' || tag === 'MARK') return NodeFilter.FILTER_REJECT
      return NodeFilter.FILTER_ACCEPT
    },
  })

  const nodes: Text[] = []
  let n: Node | null
  while ((n = walker.nextNode())) nodes.push(n as Text)

  for (const node of nodes) {
    const text = node.nodeValue ?? ''
    const lcText = text.toLowerCase()
    const frag = document.createDocumentFragment()
    let lastIndex = 0
    let idx = lcText.indexOf(lcQuery)
    while (idx !== -1) {
      if (idx > lastIndex) frag.appendChild(document.createTextNode(text.slice(lastIndex, idx)))
      const mark = document.createElement('mark')
      mark.className = 'hit'
      mark.textContent = text.slice(idx, idx + query.length)
      frag.appendChild(mark)
      lastIndex = idx + query.length
      idx = lcText.indexOf(lcQuery, lastIndex)
    }
    if (lastIndex < text.length) frag.appendChild(document.createTextNode(text.slice(lastIndex)))
    node.parentNode?.replaceChild(frag, node)
  }

  return Array.from(root.querySelectorAll('mark.hit'))
}
