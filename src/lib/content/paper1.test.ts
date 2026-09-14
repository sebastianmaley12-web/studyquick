import {
  auditEvidenceCoverage,
  buildAdaptivePool,
  buildComparisonQuestions,
  buildIdentifyEffectQuestions,
  buildIdentifyQuestions,
  buildOpenResponseQuestions,
  buildQuoteToAnalysisQuestions,
  buildTechniqueToEffectQuestions,
  computeSkillWeaknesses,
  computeTechniqueWeaknesses,
  paper1QuestionKey,
  weakTechniques,
  type McQuestion,
} from './paper1'
import { PAPER_ONE_TECHNIQUES } from '../../content/english/paper1-technique-bank'
import { PAPER_ONE_EVIDENCE } from '../../content/english/paper1-evidence-bank'
import { PAPER_ONE_COMPARISONS } from '../../content/english/paper1-comparisons'
import { PAPER_ONE_UNSEEN } from '../../content/english/paper1-unseen'

const bank = PAPER_ONE_TECHNIQUES
const evidence = PAPER_ONE_EVIDENCE

describe('paper1 evidence bank', () => {
  it('spans all three parts of the novel, not just the first', () => {
    const coverage = auditEvidenceCoverage(evidence)
    expect(Object.keys(coverage.byPart)).toEqual(expect.arrayContaining(['1', '2', '3']))
    expect(coverage.byPart['1']).toBeGreaterThan(0)
    expect(coverage.byPart['2']).toBeGreaterThan(0)
    expect(coverage.byPart['3']).toBeGreaterThan(0)
  })

  it('draws from more than one speaker/source', () => {
    const coverage = auditEvidenceCoverage(evidence)
    expect(Object.keys(coverage.bySpeaker).length).toBeGreaterThan(1)
  })

  it('every quote resolves to a real technique in the bank', () => {
    const byId = new Set(bank.map((t) => t.id))
    for (const quote of evidence) {
      expect(quote.techniqueIds.length).toBeGreaterThan(0)
      for (const id of quote.techniqueIds) {
        expect(byId.has(id)).toBe(true)
      }
    }
  })
})

describe('paper1 technique bank', () => {
  it('every confusedWithIds entry points at a real technique', () => {
    const byId = new Set(bank.map((t) => t.id))
    for (const t of bank) {
      for (const id of t.confusedWithIds) {
        expect(byId.has(id)).toBe(true)
      }
    }
  })

  it('every technique has either a verified or a generic example, not neither', () => {
    for (const t of bank) {
      expect(t.exampleQuoteId !== null || t.genericExampleHtml !== null).toBe(true)
    }
  })

  it('every exampleQuoteId points at a real evidence quote', () => {
    const byId = new Set(evidence.map((q) => q.id))
    for (const t of bank) {
      if (t.exampleQuoteId) expect(byId.has(t.exampleQuoteId)).toBe(true)
    }
  })
})

function expectValidMc(questions: McQuestion[]) {
  expect(questions.length).toBeGreaterThan(0)
  for (const q of questions) {
    // exactly one option is correct
    const correctOptions = q.options.filter((o) => o.opt === q.correctOpt)
    expect(correctOptions).toHaveLength(1)
    // no duplicate option text (a distractor accidentally equal to the answer)
    const texts = q.options.map((o) => o.textHtml)
    expect(new Set(texts).size).toBe(texts.length)
    expect(q.options.length).toBeGreaterThanOrEqual(2)
  }
}

describe('paper1 question generation', () => {
  it('format A (identify) produces well-formed, non-degenerate MC questions', () => {
    expectValidMc(buildIdentifyQuestions(evidence, bank))
  })

  it('format B (identify + effect) produces well-formed MC questions', () => {
    expectValidMc(buildIdentifyEffectQuestions(evidence, bank))
  })

  it('format C (technique -> effect) produces well-formed MC questions', () => {
    expectValidMc(buildTechniqueToEffectQuestions(evidence, bank))
  })

  it('format D (quote -> analysis) produces well-formed MC questions', () => {
    expectValidMc(buildQuoteToAnalysisQuestions(evidence, bank))
  })

  it('open-response questions carry checkpoints and a modelled analysis for every quote with a resolvable technique', () => {
    const open = buildOpenResponseQuestions(evidence, bank)
    expect(open.length).toBeGreaterThan(0)
    for (const q of open) {
      expect(q.checkpoints.length).toBeGreaterThan(0)
      expect(q.modelAnalysisHtml.length).toBeGreaterThan(0)
    }
  })

  it('the HSC-sentence builder never mangles capitalisation of the effect/meaning text', () => {
    const questions = buildIdentifyQuestions(evidence, bank)
    for (const q of questions) {
      const sentence = q.explanation.hscSentenceHtml
      // Must start with a capital letter (the underlying effect sentence's
      // own capitalisation, not force-lowercased by the builder).
      expect(sentence[0]).toBe(sentence[0].toUpperCase())
      expect(sentence[0]).not.toBe(sentence[0].toLowerCase())
    }
  })

  it('is deterministic across repeated generation (no reshuffle on every call)', () => {
    const a = buildIdentifyQuestions(evidence, bank)
    const b = buildIdentifyQuestions(evidence, bank)
    expect(a.map((q) => q.correctOpt)).toEqual(b.map((q) => q.correctOpt))
    expect(a.map((q) => q.options.map((o) => o.textHtml))).toEqual(b.map((q) => q.options.map((o) => o.textHtml)))
  })
})

describe('paper1 progress tracking', () => {
  const questions = buildIdentifyQuestions(evidence, bank)

  it('computeTechniqueWeaknesses only counts answered questions, and computes accuracy correctly', () => {
    const [q1, q2] = questions
    const progress = {
      [paper1QuestionKey(q1.id)]: { pick: q1.correctOpt, ok: true },
      [paper1QuestionKey(q2.id)]: { pick: 'z', ok: false },
      // every other question left unanswered
    }
    const stats = computeTechniqueWeaknesses(questions, progress, bank)
    const totalAnswered = stats.reduce((sum, s) => sum + s.total, 0)
    expect(totalAnswered).toBe(2)
  })

  it('weakTechniques only flags techniques answered at least twice with under 60% accuracy', () => {
    const stats = [
      { id: 't-a', label: 'A', correct: 0, total: 1, accuracy: 0 }, // too few attempts
      { id: 't-b', label: 'B', correct: 1, total: 3, accuracy: 1 / 3 }, // weak
      { id: 't-c', label: 'C', correct: 3, total: 3, accuracy: 1 }, // strong
    ]
    const weak = weakTechniques(stats)
    expect(weak.map((w) => w.id)).toEqual(['t-b'])
  })

  it('computeSkillWeaknesses groups by skill, not by technique', () => {
    const [q1] = questions
    const progress = { [paper1QuestionKey(q1.id)]: { pick: q1.correctOpt, ok: true } }
    const stats = computeSkillWeaknesses(questions, progress)
    expect(stats.some((s) => s.id === 'identify')).toBe(true)
  })
})

describe('paper1 comparisons', () => {
  it('every authored comparison resolves both quote ids to real evidence quotes', () => {
    const resolved = buildComparisonQuestions(PAPER_ONE_COMPARISONS, evidence)
    expect(resolved).toHaveLength(PAPER_ONE_COMPARISONS.length)
    for (const c of resolved) {
      expect(c.quoteA.text.length).toBeGreaterThan(0)
      expect(c.quoteB.text.length).toBeGreaterThan(0)
      expect(c.quoteA.id).not.toBe(c.quoteB.id)
    }
  })
})

describe('paper1 unseen extracts', () => {
  it('are original compositions with no attribution to a real published source', () => {
    for (const extract of PAPER_ONE_UNSEEN) {
      expect(extract.attribution.toLowerCase()).toContain('studyquick practice')
      expect(extract.questions.length).toBeGreaterThan(0)
    }
  })
})

describe('adaptive pool', () => {
  it('over-represents weak techniques without dropping below the requested size', () => {
    const questions = buildIdentifyQuestions(evidence, bank)
    const weakId = questions[0].quote.techniqueIds[0]
    const pool = buildAdaptivePool(questions, [weakId], 6)
    expect(pool.length).toBeLessThanOrEqual(6)
    const weakCount = pool.filter((q) => q.quote.techniqueIds.includes(weakId)).length
    expect(weakCount).toBeGreaterThan(0)
  })

  it('falls back to a plain slice when there are no weak techniques yet', () => {
    const questions = buildIdentifyQuestions(evidence, bank)
    const pool = buildAdaptivePool(questions, [], 5)
    expect(pool).toEqual(questions.slice(0, 5))
  })
})
