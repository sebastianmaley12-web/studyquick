/**
 * A trivia card's "revealed" state lives in TriviaGrid's React state, not as
 * a DOM class — so when search jumps to a hit inside a not-yet-revealed
 * card, we can't just toggle a class on it directly (React would stomp it
 * back on the next unrelated re-render). This is a minimal pub-sub so
 * TriviaGrid can opt in to reveal requests from the search feature without
 * either one needing to import the other.
 */
type Listener = (tid: string) => void

const listeners = new Set<Listener>()

export function requestReveal(tid: string) {
  listeners.forEach((l) => l(tid))
}

export function onRevealRequest(listener: Listener) {
  listeners.add(listener)
  return () => {
    listeners.delete(listener)
  }
}
