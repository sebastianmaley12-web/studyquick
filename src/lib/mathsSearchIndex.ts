import type { MathsResource, MathsTopic } from './content/maths'

/**
 * Search index for a Maths topic — mirrors legalSearchIndex.ts/
 * hmsSearchIndex.ts/businessSearchIndex.ts in shape, but only the "facts"
 * resource is actually searchable. "Test yourself" is a sequential,
 * one-question-at-a-time engine (MathsTest) with no list view to scroll a
 * match into, unlike every other subject's quiz/trivia tabs — so rather
 * than half-wire a "found a match, but there's nothing to jump to" result,
 * this deliberately indexes "test" as an empty string. A student searching
 * for a term that only appears in a question will correctly get "no
 * matches" rather than a misleading jump to an unrelated screen.
 */
function htmlToText(html: string): string {
  const el = document.createElement('div')
  el.innerHTML = html
  return el.textContent ?? ''
}

export type MathsTopicSearchIndex = Record<MathsResource, string>

function buildIndex(topic: MathsTopic): MathsTopicSearchIndex {
  const facts = [...topic.formulae, ...topic.dotpoints].map(htmlToText).join(' ')
  return { facts, test: '' }
}

const cache = new Map<string, MathsTopicSearchIndex>()

export function getMathsTopicSearchIndex(topic: MathsTopic): MathsTopicSearchIndex {
  let index = cache.get(topic.slug)
  if (!index) {
    index = buildIndex(topic)
    cache.set(topic.slug, index)
  }
  return index
}
