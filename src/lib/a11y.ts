import type { KeyboardEvent } from 'react'

/**
 * A `div role="button" tabIndex={0}` is keyboard-focusable but, unlike a
 * real `<button>`, does nothing when Enter or Space is pressed unless you
 * wire that up yourself — easy to forget, and forgetting it means a
 * keyboard-only user can tab onto the card but never activate it. Use as
 * `onKeyDown={onEnterOrSpace(handler)}` alongside the same `onClick`.
 */
export function onEnterOrSpace(handler: () => void) {
  return (e: KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      handler()
    }
  }
}
