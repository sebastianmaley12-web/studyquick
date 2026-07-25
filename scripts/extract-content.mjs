#!/usr/bin/env node
/**
 * One-off, re-runnable extraction of StudyQuick's content out of legacy/index.html
 * into structured JSON under src/content/. Never hand-retype content — this script
 * is the only path from the original HTML to the new data files, so a diff of its
 * output against known item counts is what proves nothing was dropped.
 *
 * Usage: node scripts/extract-content.mjs
 */
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'
import { JSDOM } from 'jsdom'

const __dirname = dirname(fileURLToPath(import.meta.url))
const ROOT = join(__dirname, '..')
const LEGACY_HTML = join(ROOT, 'legacy/index.html')
const OUT_HISTORY = join(ROOT, 'src/content/modern-history')
const OUT_MATHS = join(ROOT, 'src/content/maths')

const html = readFileSync(LEGACY_HTML, 'utf8')
const dom = new JSDOM(html)
const document = dom.window.document

function text(el) {
  return el ? el.textContent.trim() : ''
}

/** Extract a balanced {...} object literal starting at the first "{" after `marker`. */
function extractBalancedObjectLiteral(source, marker) {
  const start = source.indexOf(marker)
  if (start === -1) throw new Error(`Marker not found: ${marker}`)
  const braceStart = source.indexOf('{', start)
  let depth = 0
  let inString = false
  let stringChar = ''
  let escaped = false
  for (let i = braceStart; i < source.length; i++) {
    const ch = source[i]
    if (inString) {
      if (escaped) {
        escaped = false
      } else if (ch === '\\') {
        escaped = true
      } else if (ch === stringChar) {
        inString = false
      }
      continue
    }
    if (ch === '"' || ch === "'") {
      inString = true
      stringChar = ch
      continue
    }
    if (ch === '{') depth++
    if (ch === '}') {
      depth--
      if (depth === 0) return source.slice(braceStart, i + 1)
    }
  }
  throw new Error(`Unbalanced object literal for marker: ${marker}`)
}

/* ------------------------------------------------------------------ *
 *  Modern History — per-topic extraction (s1..s4)
 * ------------------------------------------------------------------ */

function extractMeta(panel) {
  const head = panel.querySelector('.panel-head')
  const boxes = [...head.querySelectorAll('.scope .box')].map((box) => ({
    kind: box.classList.contains('in') ? 'in' : 'out',
    label: text(box.querySelector('.lbl')),
    bodyHtml: (() => {
      const clone = box.cloneNode(true)
      clone.querySelector('.lbl')?.remove()
      return clone.innerHTML.trim()
    })(),
  }))
  return {
    title: text(head.querySelector('h2')),
    range: text(head.querySelector('.range')),
    boxes,
  }
}

function extractSummary(panel) {
  const summaryPanel = panel.querySelector('.subtab-panel[id$="-summary"]')
  const note = text(summaryPanel.querySelector('.summary-note'))
  const groups = [...summaryPanel.querySelectorAll('.dot-group')].map((group) => ({
    title: text(group.querySelector('.dot-group-title')),
    points: [...group.querySelectorAll('.dotpoints > li')].map((li) => li.innerHTML.trim()),
  }))
  return { note, groups }
}

/** The <details class="planbox"> content minus its <summary> — covers both the plain
 * `.plan` shape and the essay `.plan.essay-plan` shape, plus any trailing sibling
 * (e.g. a "historian's view" `.plan-row`) rather than assuming only one child. */
function extractPlanHtml(questionEl) {
  const details = questionEl.querySelector('details.planbox')
  if (!details) return ''
  const clone = details.cloneNode(true)
  clone.querySelector('summary')?.remove()
  return clone.innerHTML.trim()
}

function extractCardQuestion(card) {
  return {
    format: 'card',
    accent: card.dataset.accent ?? null,
    qtype: text(card.querySelector('.qtype')),
    badge: text(card.querySelector('.badge')),
    questionHtml: card.querySelector('.qtext')?.innerHTML.trim() ?? '',
    planHtml: extractPlanHtml(card),
  }
}

function extractOptionPair(optionpairEl, setTitle) {
  const options = [...optionpairEl.querySelectorAll(':scope > .opt-card')].map((opt) => ({
    label: text(opt.querySelector('.opt-label')),
    questionHtml: opt.querySelector('.qtext')?.innerHTML.trim() ?? '',
    planHtml: extractPlanHtml(opt),
  }))
  return { format: 'options', setTitle, options }
}

function extractPractice(panel) {
  const practicePanel = panel.querySelector('.subtab-panel[id$="-practice"]')
  const notes = []
  const sources = []
  const groups = []
  let currentBank = null
  let currentGroup = null
  let currentSetTitle = null

  function ensureGroup() {
    if (!currentGroup) {
      currentGroup = { bank: currentBank, number: null, title: null, questions: [] }
      groups.push(currentGroup)
    }
    return currentGroup
  }

  for (const child of practicePanel.children) {
    if (child.classList.contains('group-title')) {
      currentBank = text(child)
      currentGroup = null
    } else if (child.classList.contains('note-box')) {
      notes.push({
        bank: currentBank,
        variant: [...child.classList].find((c) => c !== 'note-box') ?? null,
        html: child.innerHTML.trim(),
      })
    } else if (child.classList.contains('source')) {
      sources.push({
        bank: currentBank,
        tag: text(child.querySelector('.stag')),
        bodyHtml: [...child.querySelectorAll('p')].map((p) => p.innerHTML.trim()).join('\n'),
      })
    } else if (child.classList.contains('subgroup-title')) {
      currentGroup = {
        bank: currentBank,
        number: text(child.querySelector('.n')),
        title: (() => {
          const clone = child.cloneNode(true)
          clone.querySelector('.n')?.remove()
          return clone.textContent.trim()
        })(),
        questions: [],
      }
      groups.push(currentGroup)
    } else if (child.classList.contains('set-title')) {
      currentSetTitle = text(child)
    } else if (child.classList.contains('card')) {
      ensureGroup().questions.push(extractCardQuestion(child))
    } else if (child.classList.contains('optionpair')) {
      ensureGroup().questions.push(extractOptionPair(child, currentSetTitle))
      currentSetTitle = null
    }
  }
  return { notes, sources, groups }
}

/** Count leaf questions regardless of format: a 'card' is one question, an
 * 'options' block ("answer ONE of two") counts as one question with two options. */
function countPracticeQuestions(practice) {
  return practice.groups.reduce((sum, g) => sum + g.questions.length, 0)
}

function extractTrivia(panel) {
  const triviaPanel = panel.querySelector('.subtab-panel[id$="-trivia"]')
  return [...triviaPanel.querySelectorAll('.trivia-card')].map((card) => {
    const tq = card.querySelector('.tq').cloneNode(true)
    tq.querySelector('.tn')?.remove()
    return {
      n: Number(text(card.querySelector('.tn'))),
      questionHtml: tq.innerHTML.trim(),
      answerHtml: card.querySelector('.ta').innerHTML.trim(),
    }
  })
}

function extractQuiz(panel) {
  const quizPanel = panel.querySelector('.subtab-panel[id$="-quiz"]')
  return [...quizPanel.querySelectorAll('.quiz-q')].map((q, i) => {
    const qEl = q.querySelector('.qz-question').cloneNode(true)
    qEl.querySelector('.tn')?.remove()
    const options = [...q.querySelectorAll('.qz-opt')].map((opt) => ({
      opt: opt.dataset.opt,
      textHtml: (() => {
        const clone = opt.cloneNode(true)
        clone.querySelector('b')?.remove()
        return clone.innerHTML.trim()
      })(),
    }))
    return {
      n: i + 1,
      answer: q.dataset.answer,
      questionHtml: qEl.innerHTML.trim(),
      options,
    }
  })
}

const TOPIC_IDS = ['s1', 's2', 's3', 's4']
const historyTopics = {}
const counts = {
  practiceCards: 0,
  practiceOptionPairs: 0,
  practiceOptionLeaves: 0,
  triviaCards: 0,
  quizQuestions: 0,
}

for (const id of TOPIC_IDS) {
  const panel = document.getElementById(id)
  if (!panel) throw new Error(`Topic panel not found: #${id}`)

  const meta = extractMeta(panel)
  const summary = extractSummary(panel)
  const practice = extractPractice(panel)
  const trivia = extractTrivia(panel)
  const quiz = extractQuiz(panel)

  for (const group of practice.groups) {
    for (const q of group.questions) {
      if (q.format === 'card') counts.practiceCards++
      else {
        counts.practiceOptionPairs++
        counts.practiceOptionLeaves += q.options.length
      }
    }
  }
  counts.triviaCards += trivia.length
  counts.quizQuestions += quiz.length

  const topicData = { id, meta, summary, practice, trivia, quiz }
  historyTopics[id] = topicData
  mkdirSync(OUT_HISTORY, { recursive: true })
  writeFileSync(join(OUT_HISTORY, `${id}.json`), JSON.stringify(topicData, null, 2) + '\n')
}

/* ------------------------------------------------------------------ *
 *  Modern History — topic nav metadata (short names / years)
 * ------------------------------------------------------------------ */

const topicMetaSrc = extractBalancedObjectLiteral(html, 'var TOPIC_META =')
const TOPIC_META = new Function(`"use strict"; return (${topicMetaSrc});`)()
mkdirSync(OUT_HISTORY, { recursive: true })
writeFileSync(join(OUT_HISTORY, 'topic-meta.json'), JSON.stringify(TOPIC_META, null, 2) + '\n')

/* ------------------------------------------------------------------ *
 *  Maths Standard 2 — window.MATHS_DATA is already structured JSON
 * ------------------------------------------------------------------ */

const mathsSrc = extractBalancedObjectLiteral(html, 'window.MATHS_DATA =')
const MATHS_DATA = JSON.parse(mathsSrc)
mkdirSync(OUT_MATHS, { recursive: true })
writeFileSync(join(OUT_MATHS, 'topics.json'), JSON.stringify(MATHS_DATA, null, 2) + '\n')

const mathsQuestionCount = MATHS_DATA.topics.reduce((sum, t) => sum + t.questions.length, 0)

/* ------------------------------------------------------------------ *
 *  Verification report
 * ------------------------------------------------------------------ */

const practiceLeafTotal = counts.practiceCards + counts.practiceOptionLeaves
const rawPlanboxTotal = document.querySelectorAll('details.planbox').length

console.log('Extraction complete.\n')
console.log('Modern History:')
console.log(`  practice — short-answer cards: ${counts.practiceCards}`)
console.log(
  `  practice — "answer ONE of two" sets: ${counts.practiceOptionPairs} (${counts.practiceOptionLeaves} options)`,
)
console.log(`  trivia cards:       ${counts.triviaCards}`)
console.log(`  quiz questions:     ${counts.quizQuestions}`)
console.log('Maths Standard 2:')
console.log(`  topics:             ${MATHS_DATA.topics.length}`)
console.log(`  practice questions: ${mathsQuestionCount}`)

// Cross-checks against independent DOM counts (not derived from the walk above),
// so a bug in extractPractice/extractTrivia/extractQuiz can't silently pass.
const EXPECTED = {
  triviaCards: 166,
  quizQuestions: 128,
}
let ok = true
for (const [key, expected] of Object.entries(EXPECTED)) {
  if (counts[key] !== expected) {
    console.error(`\nMISMATCH: ${key} = ${counts[key]}, expected ${expected}`)
    ok = false
  }
}
if (practiceLeafTotal !== rawPlanboxTotal) {
  console.error(
    `\nMISMATCH: extracted ${practiceLeafTotal} practice answer-plans, but the source ` +
      `document has ${rawPlanboxTotal} <details class="planbox"> elements — extraction dropped content.`,
  )
  ok = false
}
if (!ok) process.exit(1)
console.log(
  `\nAll counts verified: 166 trivia, 128 quiz, ${practiceLeafTotal} practice answer-plans ` +
    `(matches ${rawPlanboxTotal} raw <details class="planbox"> elements in the source).`,
)
