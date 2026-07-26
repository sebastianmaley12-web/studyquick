import { useEffect, useRef, useState, type KeyboardEvent } from 'react'
import { MODERN_HISTORY_RESOURCES, type ModernHistoryResource } from '../lib/content/modernHistory'
import { getTopicSearchIndex } from '../lib/searchIndex'
import { requestReveal } from '../lib/searchRevealBus'

/**
 * Cross-tab search for a Modern History topic. The original does a live
 * TreeWalker across all four subtabs at once because they're all mounted
 * simultaneously (just hidden via CSS); here only the active resource is
 * mounted, so this uses a lightweight per-resource text index (search-time
 * only, not for rendering) purely to decide *which* tab has a match.
 *
 * Highlighting itself is NOT a DOM mutation here (see SearchQueryContext for
 * why that breaks under React) — `committedQuery` is provided via context
 * and content renderers bake <mark> tags into their own HTML during render.
 *
 * This hook never caches references to the <mark> DOM nodes themselves —
 * only `currentHitRef` (an index) and `hitCount` (state). Testing surfaced a
 * real bug: React does not reliably leave a dangerouslySetInnerHTML
 * subtree's DOM alone across re-renders even when the computed __html
 * string is unchanged, so a cached node reference (or a manually-added
 * class on one) can silently go stale — pointing at an element React has
 * already replaced — the moment anything else in the tree re-renders.
 * Re-querying `main.querySelectorAll('mark.hit')` fresh every time is what
 * makes this robust regardless of *why* a re-render happened.
 */
export function useTopicSearch(
  topicId: string,
  resource: ModernHistoryResource,
  navigate: (path: string) => void,
) {
  const [query, setQuery] = useState('')
  const [committedQuery, setCommittedQuery] = useState('')
  const [meta, setMeta] = useState('')
  const [hitCount, setHitCount] = useState(0)
  const currentHitRef = useRef(-1)
  const pendingNavigationRef = useRef(false)
  const debounceRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined)
  const inputRef = useRef<HTMLInputElement>(null)

  function getCurrentHits(): HTMLElement[] {
    const main = document.querySelector('main')
    return main ? (Array.from(main.querySelectorAll('mark.hit')) as HTMLElement[]) : []
  }

  function jumpToHit(index: number) {
    const hits = getCurrentHits()
    if (hits.length === 0) return
    const wrapped = ((index % hits.length) + hits.length) % hits.length
    currentHitRef.current = wrapped
    hits.forEach((h, i) => h.classList.toggle('current', i === wrapped))
    const hit = hits[wrapped]

    const details = hit.closest('details.planbox')
    if (details instanceof HTMLDetailsElement && !details.open) details.open = true

    const triviaCard = hit.closest('.trivia-card') as HTMLElement | null
    if (triviaCard?.dataset.tid) requestReveal(triviaCard.dataset.tid)

    hit.scrollIntoView({ behavior: 'smooth', block: 'center' })
    setMeta(`${wrapped + 1} / ${hits.length}`)
  }

  // Runs once the marks for `committedQuery` have actually committed to the
  // DOM (either after a same-tab re-render, or after landing on a different
  // tab that was navigated to because it held the match). This is exactly
  // the "synchronize with an external system" case effects exist for — the
  // hit count only exists in the DOM after commit, there's no way to derive
  // it during render itself, so the set-state-in-effect rule doesn't apply.
  /* eslint-disable react-hooks/set-state-in-effect */
  useEffect(() => {
    if (committedQuery.length < 2) {
      currentHitRef.current = -1
      setHitCount(0)
      return
    }
    const hits = getCurrentHits()
    setHitCount(hits.length)
    if (hits.length === 0) {
      // only report "no matches" once we're not mid-navigation to a tab
      // that's expected to have them
      if (!pendingNavigationRef.current) setMeta('No matches')
      return
    }
    pendingNavigationRef.current = false
    jumpToHit(0)
    // jumpToHit is intentionally omitted: it's redefined every render (not
    // memoized) but only reads getCurrentHits()/refs, no stale-closure risk,
    // and this effect must only re-run when committedQuery/resource change
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [committedQuery, resource])
  /* eslint-enable react-hooks/set-state-in-effect */

  // Re-applies the "current" class after every render, with no dependency
  // array — see the module doc comment above for why a one-time class
  // mutation isn't enough on its own.
  useEffect(() => {
    if (currentHitRef.current < 0) return
    const hits = getCurrentHits()
    hits.forEach((h, i) => h.classList.toggle('current', i === currentHitRef.current))
  })

  function runSearch(q: string) {
    const trimmed = q.trim()
    if (trimmed.length < 2) {
      setCommittedQuery('')
      setMeta('')
      return
    }

    const index = getTopicSearchIndex(topicId)
    const lc = trimmed.toLowerCase()
    const hasMatch = (r: ModernHistoryResource) => index[r].toLowerCase().includes(lc)

    if (hasMatch(resource)) {
      setCommittedQuery(trimmed)
      return
    }

    const target = MODERN_HISTORY_RESOURCES.find(hasMatch)
    if (!target) {
      setCommittedQuery(trimmed)
      setMeta('No matches')
      return
    }
    pendingNavigationRef.current = true
    setCommittedQuery(trimmed)
    navigate(`/subjects/modern-history/${topicId}/${target}`)
  }

  function onChange(value: string) {
    setQuery(value)
    clearTimeout(debounceRef.current)
    debounceRef.current = setTimeout(() => runSearch(value), 220)
  }

  function onPrev() {
    if (hitCount > 0) jumpToHit(currentHitRef.current - 1)
  }
  function onNext() {
    if (hitCount > 0) jumpToHit(currentHitRef.current + 1)
  }

  function onInputKeyDown(e: KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Enter') {
      e.preventDefault()
      if (hitCount > 0) jumpToHit(currentHitRef.current + (e.shiftKey ? -1 : 1))
    }
    if (e.key === 'Escape') {
      setQuery('')
      clearTimeout(debounceRef.current)
      runSearch('')
      inputRef.current?.blur()
    }
  }

  // global "/" shortcut focuses search, matching the original
  useEffect(() => {
    function onKeyDown(e: globalThis.KeyboardEvent) {
      if (e.key === '/' && document.activeElement !== inputRef.current) {
        e.preventDefault()
        inputRef.current?.focus()
      }
    }
    document.addEventListener('keydown', onKeyDown)
    return () => document.removeEventListener('keydown', onKeyDown)
  }, [])

  return {
    query,
    committedQuery,
    meta,
    onChange,
    onPrev,
    onNext,
    onInputKeyDown,
    inputRef,
    disabled: hitCount === 0,
  }
}
