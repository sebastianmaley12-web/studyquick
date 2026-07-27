import type { LegalResource } from './content/legal'
import { LEGAL_TOPIC_DATA, type LegalTopicData } from './content/legal'

/** Mirrors searchIndex.ts/hmsSearchIndex.ts/businessSearchIndex.ts — kept as a
 * separate module so no subject's search wiring depends on another's. */
function htmlToText(html: string): string {
  const el = document.createElement('div')
  el.innerHTML = html
  return el.textContent ?? ''
}

export type LegalTopicSearchIndex = Record<LegalResource, string>

function buildIndex(data: LegalTopicData): LegalTopicSearchIndex {
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

const cache = new Map<string, LegalTopicSearchIndex>()

export function getLegalTopicSearchIndex(topicId: string): LegalTopicSearchIndex {
  let index = cache.get(topicId)
  if (!index) {
    index = buildIndex(LEGAL_TOPIC_DATA[topicId])
    cache.set(topicId, index)
  }
  return index
}
