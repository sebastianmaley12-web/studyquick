import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { TopicShell } from '../layouts/TopicShell'
import { EnglishRail } from '../components/rail/EnglishRail'
import { COMMON_MODULE, NINETEEN_EIGHTY_FOUR } from '../content/english/common-module-1984'
import { PAPER_ONE_TECHNIQUES } from '../content/english/paper1-technique-bank'
import { PAPER_ONE_EVIDENCE } from '../content/english/paper1-evidence-bank'
import { PAPER_ONE_COMPARISONS } from '../content/english/paper1-comparisons'
import { PAPER_ONE_UNSEEN } from '../content/english/paper1-unseen'
import {
  auditEvidenceCoverage,
  buildComparisonQuestions,
  buildIdentifyEffectQuestions,
  buildIdentifyQuestions,
  buildOpenResponseQuestions,
  buildQuoteToAnalysisQuestions,
  buildTechniqueToEffectQuestions,
  buildAdaptivePool,
  computeTechniqueWeaknesses,
  weakTechniques,
  type McQuestion,
} from '../lib/content/paper1'
import { sessionKey } from '../lib/keys'
import { useProgress } from '../lib/progressStore'
import { Paper1QuizSession } from '../components/paper1/Paper1QuizSession'
import { Paper1OpenResponse } from '../components/paper1/Paper1OpenResponse'
import { Paper1Comparison } from '../components/paper1/Paper1Comparison'
import { Paper1Unseen } from '../components/paper1/Paper1Unseen'
import { Paper1TechniqueBank } from '../components/paper1/Paper1TechniqueBank'
import { Paper1Progress } from '../components/paper1/Paper1Progress'
import { Paper1Revision } from '../components/paper1/Paper1Revision'

type Area = 'practice' | 'bank' | 'progress' | 'revision'
type PracticeMode =
  | 'quick'
  | 'identify'
  | 'identify-effect'
  | 'analysis'
  | 'open-response'
  | 'comparison'
  | 'unseen'
  | null

const AREA_LABELS: Record<Area, string> = {
  practice: 'Practice',
  bank: 'Technique Bank',
  progress: 'Progress',
  revision: 'Revision',
}

/**
 * Paper 1 → Language Techniques — a dedicated practice system, not a
 * generic quiz: identify → explain how it works → explain effect →
 * connect to meaning/purpose → apply to new evidence (spec section 2).
 *
 * Mounted at /subjects/english-advanced/paper-1/techniques, gated the same
 * way as the rest of English Advanced.
 */
export function Paper1Techniques() {
  const navigate = useNavigate()
  const [area, setArea] = useState<Area>('practice')
  const [mode, setMode] = useState<PracticeMode>(null)
  const [adhocPool, setAdhocPool] = useState<{ pool: McQuestion[]; key: string; label: string } | null>(null)
  const progress = useProgress()

  const bank = PAPER_ONE_TECHNIQUES
  const evidence = PAPER_ONE_EVIDENCE

  const identifyQuestions = useMemo(() => buildIdentifyQuestions(evidence, bank), [evidence, bank])
  const identifyEffectQuestions = useMemo(() => buildIdentifyEffectQuestions(evidence, bank), [evidence, bank])
  const techniqueToEffectQuestions = useMemo(() => buildTechniqueToEffectQuestions(evidence, bank), [evidence, bank])
  const quoteToAnalysisQuestions = useMemo(() => buildQuoteToAnalysisQuestions(evidence, bank), [evidence, bank])
  const analysisQuestions = useMemo(
    () => [...techniqueToEffectQuestions, ...quoteToAnalysisQuestions],
    [techniqueToEffectQuestions, quoteToAnalysisQuestions],
  )
  const openResponseQuestions = useMemo(() => buildOpenResponseQuestions(evidence, bank), [evidence, bank])
  const comparisonQuestions = useMemo(() => buildComparisonQuestions(PAPER_ONE_COMPARISONS, evidence), [evidence])

  const allMcQuestions = useMemo(
    () => [...identifyQuestions, ...identifyEffectQuestions, ...techniqueToEffectQuestions, ...quoteToAnalysisQuestions],
    [identifyQuestions, identifyEffectQuestions, techniqueToEffectQuestions, quoteToAnalysisQuestions],
  )

  const techniqueStats = useMemo(
    () => computeTechniqueWeaknesses(allMcQuestions, progress.quiz, bank),
    [allMcQuestions, progress.quiz, bank],
  )
  const weakIds = useMemo(() => weakTechniques(techniqueStats).map((w) => w.id), [techniqueStats])
  const quickPool = useMemo(
    () => buildAdaptivePool(allMcQuestions, weakIds, 12),
    [allMcQuestions, weakIds],
  )

  const coverage = useMemo(() => auditEvidenceCoverage(evidence), [evidence])

  function exitToModeMenu() {
    setMode(null)
    setAdhocPool(null)
  }

  function startAdhoc(pool: McQuestion[], keySuffix: string, label: string) {
    setAdhocPool({ pool, key: sessionKey('english', `paper1-${keySuffix}`, 'quiz'), label })
    setArea('practice')
    setMode(null)
  }

  return (
    <TopicShell
      rail={
        <EnglishRail
          module={COMMON_MODULE}
          siblingTexts={[NINETEEN_EIGHTY_FOUR]}
          text={NINETEEN_EIGHTY_FOUR}
          currentResource="paper-1"
        />
      }
    >
      <section className="panel active">
        <div className="panel-head">
          <div className="q-proto-banner">
            Paper 1 evidence bank: {evidence.length} quotes across Parts {Object.keys(coverage.byPart).join(', ')}{' '}
            &middot; {Object.keys(coverage.bySpeaker).length} speakers/sources &middot; {bank.length} techniques in
            the bank.
          </div>
          <button className="text-link" type="button" onClick={() => navigate('/subjects/english-advanced')}>
            &larr; Back to English Advanced
          </button>
          <h2>Paper 1 &middot; Language Techniques</h2>
          <div className="range">
            Train your ability to identify, analyse and explain how language creates meaning.
          </div>
        </div>

        <div className="panel-body">
          <div className="subtab-nav">
            {(Object.keys(AREA_LABELS) as Area[]).map((a) => (
              <button
                key={a}
                className={['subtab-btn', a === area && 'active'].filter(Boolean).join(' ')}
                type="button"
                onClick={() => {
                  setArea(a)
                  setMode(null)
                  setAdhocPool(null)
                }}
              >
                {AREA_LABELS[a]}
              </button>
            ))}
          </div>

          <div className="subtab-panel active">
            {area === 'practice' && (
              <>
                {adhocPool ? (
                  <Paper1QuizSession
                    sessionKey={adhocPool.key}
                    sectionLabel={adhocPool.label}
                    questions={adhocPool.pool}
                    onExit={exitToModeMenu}
                  />
                ) : mode === null ? (
                  <div className="q-p1-mode-grid">
                    <button type="button" className="q-p1-mode-card" onClick={() => setMode('quick')}>
                      <h3>Quick Practice</h3>
                      <p>A short, adaptive set that prioritises your weakest techniques.</p>
                      <span className="q-quote-count">{quickPool.length} questions</span>
                    </button>
                    <button type="button" className="q-p1-mode-card" onClick={() => setMode('identify')}>
                      <h3>Technique Identification</h3>
                      <p>Which technique is most prominent in this quotation?</p>
                      <span className="q-quote-count">{identifyQuestions.length} questions</span>
                    </button>
                    <button type="button" className="q-p1-mode-card" onClick={() => setMode('identify-effect')}>
                      <h3>Technique + Effect</h3>
                      <p>Identify the technique AND its effect together.</p>
                      <span className="q-quote-count">{identifyEffectQuestions.length} questions</span>
                    </button>
                    <button type="button" className="q-p1-mode-card" onClick={() => setMode('analysis')}>
                      <h3>Analysis Practice</h3>
                      <p>Pick the most specific, accurate explanation of how language builds meaning.</p>
                      <span className="q-quote-count">{analysisQuestions.length} questions</span>
                    </button>
                    <button type="button" className="q-p1-mode-card" onClick={() => setMode('open-response')}>
                      <h3>Write Your Own Analysis</h3>
                      <p>Open response, self-assessed against a model analysis.</p>
                      <span className="q-quote-count">{openResponseQuestions.length} prompts</span>
                    </button>
                    <button type="button" className="q-p1-mode-card" onClick={() => setMode('comparison')}>
                      <h3>Technique Comparison</h3>
                      <p>How does language differ between two quotations?</p>
                      <span className="q-quote-count">{comparisonQuestions.length} comparisons</span>
                    </button>
                    <button type="button" className="q-p1-mode-card" onClick={() => setMode('unseen')}>
                      <h3>Unseen Practice</h3>
                      <p>Original persuasive, poetic and visual extracts you haven't seen before.</p>
                      <span className="q-quote-count">{PAPER_ONE_UNSEEN.length} extracts</span>
                    </button>
                  </div>
                ) : (
                  <>
                    {mode === 'quick' && (
                      <Paper1QuizSession
                        sessionKey={sessionKey('english', 'paper1-quick', 'quiz')}
                        sectionLabel="Quick Practice"
                        questions={quickPool}
                        onExit={exitToModeMenu}
                      />
                    )}
                    {mode === 'identify' && (
                      <Paper1QuizSession
                        sessionKey={sessionKey('english', 'paper1-identify', 'quiz')}
                        sectionLabel="Technique Identification"
                        questions={identifyQuestions}
                        onExit={exitToModeMenu}
                      />
                    )}
                    {mode === 'identify-effect' && (
                      <Paper1QuizSession
                        sessionKey={sessionKey('english', 'paper1-identify-effect', 'quiz')}
                        sectionLabel="Technique + Effect"
                        questions={identifyEffectQuestions}
                        onExit={exitToModeMenu}
                      />
                    )}
                    {mode === 'analysis' && (
                      <Paper1QuizSession
                        sessionKey={sessionKey('english', 'paper1-analysis', 'quiz')}
                        sectionLabel="Analysis Practice"
                        questions={analysisQuestions}
                        onExit={exitToModeMenu}
                      />
                    )}
                    {mode === 'open-response' && <Paper1OpenResponse questions={openResponseQuestions} />}
                    {mode === 'comparison' && <Paper1Comparison comparisons={comparisonQuestions} />}
                    {mode === 'unseen' && <Paper1Unseen extracts={PAPER_ONE_UNSEEN} />}
                    {mode !== null && (
                      <button type="button" className="text-link" onClick={exitToModeMenu}>
                        &larr; Back to practice modes
                      </button>
                    )}
                  </>
                )}
              </>
            )}

            {area === 'bank' && <Paper1TechniqueBank techniques={bank} evidence={evidence} />}
            {area === 'progress' && <Paper1Progress allQuestions={allMcQuestions} bank={bank} />}
            {area === 'revision' && (
              <Paper1Revision allQuestions={allMcQuestions} bank={bank} onPractise={startAdhoc} />
            )}
          </div>
        </div>
      </section>
    </TopicShell>
  )
}
