import type { BusinessResource } from './content/business'
import { BUSINESS_TOPIC_DATA, type BusinessTopicData } from './content/business'

/** Mirrors searchIndex.ts/hmsSearchIndex.ts — kept as a separate module so no
 * subject's search wiring depends on another's. */
function htmlToText(html: string): string {
  const el = document.createElement('div')
  el.innerHTML = html
  return el.textContent ?? ''
}

export type BusinessTopicSearchIndex = Record<BusinessResource, string>

function buildIndex(data: BusinessTopicData): BusinessTopicSearchIndex {
  const summary = [data.summary.note, ...data.summary.groups.flatMap((g) => [g.title, ...g.points])]

  const practice = [
    ...data.practice.notes.map((n) => n.html),
    ...data.practice.sources.flatMap((s) => [s.tag, s.bodyHtml]),
    ...data.practice.groups.flatMap((g) => [
      g.title,
      ...g.questions.flatMap((q) => [q.qtype, q.badge, q.questionHtml, q.planHtml]),
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

const cache = new Map<string, BusinessTopicSearchIndex>()

export function getBusinessTopicSearchIndex(topicId: string): BusinessTopicSearchIndex {
  let index = cache.get(topicId)
  if (!index) {
    index = buildIndex(BUSINESS_TOPIC_DATA[topicId])
    cache.set(topicId, index)
  }
  return index
}
