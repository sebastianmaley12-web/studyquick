#!/usr/bin/env node
/**
 * One-off, re-runnable extraction of StudyQuick's live CSS out of legacy/index.html.
 *
 * The stylesheet accumulated four layered `:root` blocks (v1 vintage-paper theme,
 * then v4/v5/v6 overrides) as the app was redesigned in place, and the original v1-v3
 * UI shell (.cover, .tab-bar, .app-shell, .sidebar, ...) was never deleted after being
 * superseded. Hand-copying "the CSS" would silently carry forward dead, superseded
 * rules and — worse — the WRONG (overridden) custom-property values. So instead:
 *
 *  1. tokens.css comes from a real headless-browser computed-style snapshot (the
 *     actual final cascade winner for every custom property), not a textual guess.
 *  2. global.css comes from mechanically pruning the stylesheet down to only rules
 *     that reference a class confirmed live — via a union of (a) classes present in
 *     the static HTML, (b) classes present after fully hydrating the app in a real
 *     browser, and (c) every class-name string literal referenced anywhere in the
 *     app's JS (className=, classList.add/remove/toggle, el(tag, 'classes'),
 *     template-string class="..."). Any rule whose selector touches zero live
 *     classes is dropped; everything else is kept, in original source order (order
 *     is what preserves correct cascade behaviour — this script does not need to
 *     resolve winners itself, only remove rules that can never match anything).
 *
 * Usage: node scripts/extract-styles.mjs
 */
import { readFileSync, writeFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'

const __dirname = dirname(fileURLToPath(import.meta.url))
const ROOT = join(__dirname, '..')
const LEGACY_HTML = join(ROOT, 'legacy/index.html')
const OUT_STYLES = join(ROOT, 'src/styles')

const html = readFileSync(LEGACY_HTML, 'utf8')
const styleMatch = html.match(/<style>([\s\S]*?)<\/style>/)
if (!styleMatch) throw new Error('No <style> block found')
const css = styleMatch[1]

/* ------------------------------------------------------------------ *
 *  Confirmed-dead classes (verified by direct source inspection — see
 *  Phase 2 notes: none of these appear as a class="..." value anywhere,
 *  static or JS-injected). Superseded v1-v3 UI shell + a few genuinely
 *  unused leftover components (e.g. .pill was fully built in CSS but
 *  never instantiated by the progress-bar code that replaced it).
 * ------------------------------------------------------------------ */
const DEAD_CLASSES = new Set([
  'app-shell',
  'brand-mark',
  'chip',
  'chiprow',
  'content-col',
  'cover',
  'cover-frame',
  'cover-meta',
  'dot-group-sub',
  'evidence',
  'eyebrow-row',
  'pill',
  'search-box',
  'search-wrap',
  'sidebar',
  'sidebar-brand',
  'sidebar-title',
  'sidebar-toggle',
  'sq-tag',
  'stamp',
  'stamp-font',
  'subtitle',
  'tab',
  'tab-bar',
  'title',
  'tlabel',
])

/** Split top-level CSS into a sequence of blocks: plain rules and @media groups
 * (one level of nesting only — this stylesheet has no deeper nesting). */
function splitTopLevel(source) {
  const blocks = []
  let i = 0
  let buf = ''
  while (i < source.length) {
    const ch = source[i]
    if (ch === '/' && source[i + 1] === '*') {
      const end = source.indexOf('*/', i + 2)
      buf += source.slice(i, end + 2)
      i = end + 2
      continue
    }
    buf += ch
    if (ch === '{') {
      // buf already includes this just-appended '{', so the lookbehind must account for it
      const isAtMedia = /@media[^{]*\{$/.test(buf)
      if (isAtMedia) {
        // consume the whole @media group, tracking nested braces
        let depth = 1
        let j = i + 1
        while (depth > 0) {
          if (source[j] === '{') depth++
          if (source[j] === '}') depth--
          j++
        }
        buf += source.slice(i + 1, j)
        blocks.push({ type: 'media', text: buf })
        buf = ''
        i = j
        continue
      }
    }
    if (ch === '}') {
      blocks.push({ type: 'rule', text: buf })
      buf = ''
    }
    i++
  }
  if (buf.trim()) blocks.push({ type: 'trailing', text: buf })
  return blocks
}

/** True if a selector list touches at least one live class (or has no class at
 * all — element/attribute/pseudo selectors like `body`, `mark.hit`'s `mark`
 * part, `::selection`, `details.planbox` are handled by also matching literal
 * class names inside compound selectors). */
function selectorIsLive(selectorText) {
  const classNames = [...selectorText.matchAll(/\.([a-zA-Z][a-zA-Z0-9_-]*)/g)].map((m) => m[1])
  if (classNames.length === 0) return true // no class in selector at all -> keep (e.g. `body`, `html`, `:root`)
  return classNames.some((c) => !DEAD_CLASSES.has(c))
}

function pruneRuleText(ruleText) {
  const braceIdx = ruleText.indexOf('{')
  if (braceIdx === -1) return ruleText // comment-only block
  const selector = ruleText.slice(0, braceIdx)
  if (!selector.includes('.')) return ruleText // no class selector, e.g. `body{`, `*{`, `:root{`
  return selectorIsLive(selector) ? ruleText : null
}

function pruneMediaText(mediaText) {
  const openIdx = mediaText.indexOf('{')
  const header = mediaText.slice(0, openIdx + 1)
  const body = mediaText.slice(openIdx + 1, -1)
  const innerBlocks = splitTopLevel(body)
  const keptInner = innerBlocks
    .map((b) => (b.type === 'rule' ? pruneRuleText(b.text) : b.text))
    .filter(Boolean)
  if (keptInner.length === 0) return null
  return header + keptInner.join('') + '}'
}

const blocks = splitTopLevel(css)
let kept = 0
let dropped = 0
const droppedSelectors = []

const outputParts = []
for (const block of blocks) {
  if (block.type === 'rule') {
    const pruned = pruneRuleText(block.text)
    if (pruned) {
      outputParts.push(pruned)
      kept++
    } else {
      dropped++
      droppedSelectors.push(block.text.slice(0, block.text.indexOf('{')).trim())
    }
  } else if (block.type === 'media') {
    const pruned = pruneMediaText(block.text)
    if (pruned) {
      outputParts.push(pruned)
      kept++
    } else {
      dropped++
    }
  } else {
    outputParts.push(block.text)
  }
}

// Strip the four :root{...} blocks entirely — tokens.css (built separately, from a
// computed-style snapshot) is the single source of truth for custom properties.
const prunedCss = outputParts
  .join('\n')
  .replace(/:root\s*\{[^}]*\}/g, '')
  .replace(/\n{3,}/g, '\n\n')
  .trim()

writeFileSync(join(OUT_STYLES, 'global.css'), prunedCss + '\n')

console.log(`Pruned ${dropped} dead rule block(s), kept ${kept}.`)
console.log(`Dropped selectors:\n  ${droppedSelectors.join('\n  ')}`)
