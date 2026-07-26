import type { ModernHistoryResource } from './content/modernHistory'
import { MODERN_HISTORY_TOPIC_DATA, type ModernHistoryTopicData } from './content/modernHistory'

/** Strips tags and decodes entities the same way the browser would when
 * rendering — used only to know which of the four tabs contain a match and
 * to count them; the actual highlighting is a live DOM walk of whatever's
 * mounted (src/lib/domSearch.ts), exactly like the original. */
function htmlToText(html: string): string {
  const el = document.createElement('div')
  el.innerHTML = html
  return el.textContent ?? ''
}

export type TopicSearchIndex = Record<ModernHistoryResource, string>

function buildIndex(data: ModernHistoryTopicData): TopicSearchIndex {
  const summary = [data.summary.note, ...data.summary.groups.flatMap((g) => [g.title, ...g.points])]

  const practice = [
    ...data.practice.notes.map((n) => n.html),
    ...data.practice.sources.flatMap((s) => [s.tag, s.bodyHtml]),
    ...data.practice.groups.flatMap((g) => [
      g.title,
      ...g.questions.flatMap((q) =>
        q.format === 'card'
          ? [q.qtype, q.badge, q.questionHtml, q.planHtml]
          : [q.setTitle, ...q.options.flatMap((o) => [o.label, o.questionHtml, o.planHtml])],
      ),
    ]),
  ]

  const trivia = data.trivia.flatMap((c) => [c.questionHtml, c.answerHtml])
  const quiz = data.quiz.flatMap((q) => [q.questionHtml, ...q.options.map((o) => o.textHtml)])

  const toText = (parts: (string | null)[]) =>
    parts
      .filter((p): p is string => !!p)
      .map(htmlToText)
      .join(' ')

  return {
    summary: toText(summary),
    practice: toText(practice),
    trivia: toText(trivia),
    quiz: toText(quiz),
  }
}

const cache = new Map<string, TopicSearchIndex>()

export function getTopicSearchIndex(topicId: string): TopicSearchIndex {
  let index = cache.get(topicId)
  if (!index) {
    index = buildIndex(MODERN_HISTORY_TOPIC_DATA[topicId])
    cache.set(topicId, index)
  }
  return index
}
