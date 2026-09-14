import { Navigate, useNavigate, useParams } from 'react-router-dom'
import { TopicShell } from '../layouts/TopicShell'
import { EnglishRail } from '../components/rail/EnglishRail'
import { COMMON_MODULE, NINETEEN_EIGHTY_FOUR } from '../content/english/common-module-1984'
import {
  lookupManyById,
  ENGLISH_RESOURCES,
  ENGLISH_RESOURCE_LABELS,
  type EnglishResource,
} from '../lib/content/english'
import { buildQuoteTechniqueQuiz } from '../lib/content/englishQuiz'
import { QuizPanel } from '../components/quiz/QuizPanel'
import { QuoteBank } from '../components/english/QuoteBank'
import { TechniqueTable } from '../components/english/TechniqueTable'
import { ChapterNav } from '../components/english/ChapterNav'
import { ShortAnswerPractice } from '../components/english/ShortAnswerPractice'
import { EssayPractice } from '../components/english/EssayPractice'
import { QuoteLearningMode } from '../components/english/QuoteLearningMode'
import { ConfidenceTag } from '../components/english/ConfidenceTag'
import { englishConfidenceKey } from '../lib/keys'

function isResource(v: string | undefined): v is EnglishResource {
  return !!v && (ENGLISH_RESOURCES as readonly string[]).includes(v)
}

/**
 * English Advanced's subject hub — currently the Common Module and its one
 * prescribed text (Nineteen Eighty-Four) only. Modules A, B and C aren't
 * built yet, so the banner below says so plainly rather than the page
 * pretending to be a complete subject. Once more than one text/module
 * exists, this needs a topic-selection layer above it (see EnglishRail's
 * doc comment) — not needed while there's only one.
 */
export function EnglishAdvancedSubject() {
  const { resource } = useParams()
  const navigate = useNavigate()
  const text = NINETEEN_EIGHTY_FOUR

  if (!isResource(resource)) {
    return <Navigate to="/subjects/english-advanced/overview" replace />
  }

  const quizQuestions = buildQuoteTechniqueQuiz(text)

  return (
    <TopicShell rail={<EnglishRail text={text} currentResource={resource} />}>
      <section className="panel active">
        <div className="panel-head">
          <div className="q-proto-banner">
            Common Module is live with <em>Nineteen Eighty-Four</em>. Modules A, B and C are still
            being built.
          </div>
          <h2>{ENGLISH_RESOURCE_LABELS[resource]}</h2>
          <div className="range">
            {COMMON_MODULE.name} &middot; {text.title} by {text.author}
          </div>
        </div>

        <div className="panel-body">
          {resource === 'overview' && (
            <div className="q-text-overview">
              <div className="q-overview-grid">
                <div>
                  <div className="q-chapter-subhead">Overview</div>
                  <p dangerouslySetInnerHTML={{ __html: text.overviewHtml }} />
                </div>
                <div>
                  <div className="q-chapter-subhead">Major concerns</div>
                  <p dangerouslySetInnerHTML={{ __html: text.majorConcernsHtml }} />
                </div>
                <div>
                  <div className="q-chapter-subhead">Context</div>
                  <p dangerouslySetInnerHTML={{ __html: text.contextHtml }} />
                </div>
                <div>
                  <div className="q-chapter-subhead">Why this text matters to the module</div>
                  <p dangerouslySetInnerHTML={{ __html: text.significanceHtml }} />
                </div>
              </div>

              <div className="q-chapter-subhead">Syllabus requirements — {COMMON_MODULE.name}</div>
              <p dangerouslySetInnerHTML={{ __html: COMMON_MODULE.syllabusOverviewHtml }} />

              <div className="q-overview-actions">
                <button
                  className="cta"
                  type="button"
                  onClick={() => navigate('/subjects/english-advanced/chapters')}
                >
                  Start with the chapters <span className="arw">&rarr;</span>
                </button>
                <button
                  className="pub-btn-ghost"
                  type="button"
                  onClick={() => navigate('/subjects/english-advanced/paper-1/techniques')}
                >
                  Paper 1 &middot; Language Techniques <span className="arw">&rarr;</span>
                </button>
              </div>
            </div>
          )}

          {resource === 'chapters' && <ChapterNav text={text} />}

          {resource === 'characters' && (
            <div className="q-characters-themes">
              <div className="q-chapter-subhead">Characters</div>
              <div className="q-character-grid">
                {text.characters.map((c) => (
                  <div key={c.id} className="q-character-card">
                    <h4>{c.name}</h4>
                    <p dangerouslySetInnerHTML={{ __html: c.roleHtml }} />
                    <p>
                      <b>Relationships:</b> <span dangerouslySetInnerHTML={{ __html: c.relationshipsHtml }} />
                    </p>
                    <p>
                      <b>Development:</b> <span dangerouslySetInnerHTML={{ __html: c.developmentHtml }} />
                    </p>
                    <div className="q-quote-tags">
                      {lookupManyById(text.themes, c.associatedThemeIds).map((t) => (
                        <span key={t.id} className="q-tag theme">
                          {t.name}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              <div className="q-chapter-subhead">Themes</div>
              <div className="q-theme-list">
                {text.themes.map((t) => (
                  <div key={t.id} className="q-theme-card">
                    <h4>{t.name}</h4>
                    <p dangerouslySetInnerHTML={{ __html: t.explanationHtml }} />
                    <p>
                      <b>Development across the text:</b>{' '}
                      <span dangerouslySetInnerHTML={{ __html: t.developmentHtml }} />
                    </p>
                    <div className="q-chapter-subhead">Possible essay arguments</div>
                    <ul>
                      {t.possibleArguments.map((a, i) => (
                        <li key={i}>{a}</li>
                      ))}
                    </ul>
                    <ConfidenceTag tagKey={englishConfidenceKey(text.id, 'theme', t.id)} />
                  </div>
                ))}
              </div>
            </div>
          )}

          {resource === 'quotes' && <QuoteBank text={text} />}
          {resource === 'techniques' && <TechniqueTable text={text} />}
          {resource === 'short-answer' && <ShortAnswerPractice text={text} />}
          {resource === 'essay' && <EssayPractice text={text} />}
          {resource === 'quote-learning' && <QuoteLearningMode text={text} />}
          {resource === 'test' && (
            <QuizPanel subject="english" topicId={`${text.id}-quote-test`} questions={quizQuestions} />
          )}
        </div>
      </section>
    </TopicShell>
  )
}
