import { createContext, useContext } from 'react'
import { highlightMatches } from '../lib/domSearch'

/**
 * Carries the active search query down to every content renderer. Highlight
 * marks MUST be produced as part of React's own render output (a string fed
 * to dangerouslySetInnerHTML), not as an out-of-band DOM mutation — mutating
 * the live, React-owned DOM directly (the original's approach, and this
 * app's first attempt) gets silently wiped the next time anything in that
 * subtree re-renders, since React reconciles the DOM back to what it thinks
 * it rendered. Operating on a detached, in-memory element instead sidesteps
 * that entirely: the result is just a string, indistinguishable from any
 * other content HTML by the time React renders it.
 */
const SearchQueryContext = createContext('')

export const SearchQueryProvider = SearchQueryContext.Provider

export function highlightHtml(html: string, query: string): string {
  const trimmed = query.trim()
  if (trimmed.length < 2) return html
  const container = document.createElement('div')
  container.innerHTML = html
  highlightMatches(container, trimmed)
  return container.innerHTML
}

/** Call once per component (Rules of Hooks) to read the active query, then
 * pass it to the plain `highlightHtml` function as many times as needed —
 * including inside .map() callbacks, where a hook call isn't allowed. */
export function useSearchQuery(): string {
  return useContext(SearchQueryContext)
}
