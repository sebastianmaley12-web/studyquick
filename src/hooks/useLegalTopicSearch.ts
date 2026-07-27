import { useEffect, useRef, useState, type KeyboardEvent } from 'react'
import { LEGAL_RESOURCES, type LegalResource } from '../lib/content/legal'
import { getLegalTopicSearchIndex } from '../lib/legalSearchIndex'
import { requestReveal } from '../lib/searchRevealBus'

/**
 * Cross-tab search for a Legal Studies topic — a parallel copy of
 * useTopicSearch.ts/useHmsTopicSearch.ts/useBusinessTopicSearch.ts rather
 * than a generalized shared hook, since each hardcodes a different resource
 * type and route path. See useTopicSearch.ts's doc comment for why the hit
 * tracking works the way it does (never caching <mark> node references).
 */
export function useLegalTopicSearch(
  topicId: string,
  resource: LegalResource,
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
      if (!pendingNavigationRef.current) setMeta('No matches')
      return
    }
    pendingNavigationRef.current = false
    jumpToHit(0)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [committedQuery, resource])
  /* eslint-enable react-hooks/set-state-in-effect */

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

    const index = getLegalTopicSearchIndex(topicId)
    const lc = trimmed.toLowerCase()
    const hasMatch = (r: LegalResource) => index[r].toLowerCase().includes(lc)

    if (hasMatch(resource)) {
      setCommittedQuery(trimmed)
      return
    }

    const target = LEGAL_RESOURCES.find(hasMatch)
    if (!target) {
      setCommittedQuery(trimmed)
      setMeta('No matches')
      return
    }
    pendingNavigationRef.current = true
    setCommittedQuery(trimmed)
    navigate(`/subjects/legal/${topicId}/${target}`)
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
