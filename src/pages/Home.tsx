import { useNavigate } from 'react-router-dom'
import { SqLogo } from '../components/SqLogo'
import { modernHistoryTotals, modernHistoryTopics } from '../lib/content/modernHistory'
import { mathsTotals, mathsYear11Topics, mathsYear12Topics } from '../lib/content/maths'
import { hmsTotals, hmsTopics } from '../lib/content/hms'
import { useProgress } from '../lib/progressStore'
import { historyTopicStats, mathsTopicStats, pct } from '../lib/progressStats'
import { ProgressLine } from '../components/ProgressLine'

export function Home() {
  const navigate = useNavigate()
  const progress = useProgress()

  const historyOverall = modernHistoryTopics.reduce(
    (acc, topic) => {
      const stats = historyTopicStats(progress, topic)
      return { score: acc.score + stats.score, max: acc.max + stats.max }
    },
    { score: 0, max: 0 },
  )
  const mathsOverall = [...mathsYear12Topics, ...mathsYear11Topics].reduce(
    (acc, topic) => {
      const stats = mathsTopicStats(progress, topic)
      return { right: acc.right + stats.right, total: acc.total + stats.total }
    },
    { right: 0, total: 0 },
  )
  const hmsOverall = hmsTopics.reduce(
    (acc, topic) => {
      const stats = historyTopicStats(progress, topic)
      return { score: acc.score + stats.score, max: acc.max + stats.max }
    },
    { score: 0, max: 0 },
  )

  return (
    <>
      <div className="wrap">
        <div className="hero">
          <SqLogo size="lg" tagline />
          <p className="hero-sub">
            Everything for the exam in one place — syllabus summaries, practice questions with
            answer plans, quick-fire trivia and marked quizzes. No log-in, no clutter, no lost tabs.
          </p>
          <div className="hero-stats">
            <span>
              <b>{modernHistoryTotals.practice}</b> practice questions
            </span>
            <span className="dot">&middot;</span>
            <span>
              <b>{modernHistoryTotals.trivia}</b> trivia cards
            </span>
            <span className="dot">&middot;</span>
            <span>
              <b>{modernHistoryTotals.quiz}</b> quiz questions
            </span>
            <span className="dot">&middot;</span>
            <span>
              <b>{modernHistoryTotals.summaryPoints}</b> syllabus dot points
            </span>
          </div>
          <button
            className="cta"
            type="button"
            onClick={() => navigate('/subjects/modern-history')}
          >
            Start revising <span className="arw">&rarr;</span>
          </button>
        </div>

        <div className="section-label">Subjects</div>
        <div className="subject-rows">
          <div
            className="subject-card"
            role="button"
            tabIndex={0}
            onClick={() => navigate('/subjects/modern-history')}
          >
            <div className="subject-glyph">
              <svg className="sq-mark" viewBox="0 0 32 32" aria-hidden="true">
                <use href="#sq-mark" />
              </svg>
            </div>
            <div className="subject-body">
              <h3>
                Modern History <span className="live">Ready</span>
              </h3>
              <p>
                HSC Year 12 &middot; NESA Stage 6 &middot; four core topics with syllabus summaries,
                exam practice with answer plans, trivia and marked quizzes.
              </p>
              <ProgressLine
                done={historyOverall.score}
                total={historyOverall.max}
                text={`${pct(historyOverall.score, historyOverall.max)}% complete`}
                size="sm"
              />
            </div>
            <div className="subject-stats">
              <div>
                <div className="n">{modernHistoryTopics.length}</div>
                <div className="l">Topics</div>
              </div>
              <div>
                <div className="n">{modernHistoryTotals.practice}</div>
                <div className="l">Practice Qs</div>
              </div>
              <div>
                <div className="n">{modernHistoryTotals.trivia}</div>
                <div className="l">Trivia</div>
              </div>
              <div>
                <div className="n">{modernHistoryTotals.quiz}</div>
                <div className="l">Quiz Qs</div>
              </div>
            </div>
            <div className="subject-arrow">&rarr;</div>
          </div>

          <div
            className="subject-card"
            role="button"
            tabIndex={0}
            onClick={() => navigate('/subjects/maths')}
          >
            <div className="subject-glyph">&#8747;</div>
            <div className="subject-body">
              <h3>
                Mathematics Standard 2 <span className="live">Ready</span>
              </h3>
              <p>
                HSC Year 12 &middot; NESA Stage 6 &middot; all {mathsTotals.topics} syllabus topics
                with key formulae and {mathsTotals.questions} practice questions that mark your
                answers as you type them.
              </p>
              <ProgressLine
                done={mathsOverall.right}
                total={mathsOverall.total}
                text={`${pct(mathsOverall.right, mathsOverall.total)}% complete`}
                size="sm"
              />
            </div>
            <div className="subject-stats">
              <div>
                <div className="n">{mathsTotals.topics}</div>
                <div className="l">Topics</div>
              </div>
              <div>
                <div className="n">{mathsTotals.numEntry}</div>
                <div className="l">Answer-entry</div>
              </div>
              <div>
                <div className="n">{mathsTotals.multipleChoice}</div>
                <div className="l">Multiple choice</div>
              </div>
              <div>
                <div className="n">{mathsTotals.questions}</div>
                <div className="l">Total Qs</div>
              </div>
            </div>
            <div className="subject-arrow">&rarr;</div>
          </div>

          <div
            className="subject-card"
            role="button"
            tabIndex={0}
            onClick={() => navigate('/subjects/hms')}
          >
            <div className="subject-glyph">&#9877;</div>
            <div className="subject-body">
              <h3>
                Health &amp; Movement Science <span className="live">Ready</span>
              </h3>
              <p>
                HSC Year 12 &middot; NESA Stage 6 &middot; both focus areas with syllabus summaries,
                real past-trial practice questions with model answers, trivia and marked quizzes.
              </p>
              <ProgressLine
                done={hmsOverall.score}
                total={hmsOverall.max}
                text={`${pct(hmsOverall.score, hmsOverall.max)}% complete`}
                size="sm"
              />
            </div>
            <div className="subject-stats">
              <div>
                <div className="n">{hmsTopics.length}</div>
                <div className="l">Focus Areas</div>
              </div>
              <div>
                <div className="n">{hmsTotals.practice}</div>
                <div className="l">Practice Qs</div>
              </div>
              <div>
                <div className="n">{hmsTotals.trivia}</div>
                <div className="l">Trivia</div>
              </div>
              <div>
                <div className="n">{hmsTotals.quiz}</div>
                <div className="l">Quiz Qs</div>
              </div>
            </div>
            <div className="subject-arrow">&rarr;</div>
          </div>

          <div className="subject-card locked">
            <div className="subject-glyph">&#43;</div>
            <div className="subject-body">
              <h3>More subjects</h3>
              <p>
                Built to hold the rest of your line-up — English, Economics, Legal Studies. Each new
                subject drops in as another row here with its own topics and resources.
              </p>
            </div>
            <div className="soon">Coming later</div>
          </div>
        </div>

        <div className="section-label">
          How <SqLogo size="xs" /> works
        </div>
        <div className="how-grid">
          <div className="how-card">
            <span className="how-n">1</span>
            <span className="how-ic">&#9906;</span>
            <h4>Pick your subject</h4>
            <p>
              Every subject you study, lined up on one screen. Modern History is live now — more
              slot straight in beside it.
            </p>
          </div>
          <div className="how-card">
            <span className="how-n">2</span>
            <span className="how-ic">&#9776;</span>
            <h4>Choose a topic</h4>
            <p>
              Each subject opens to a summary of what&rsquo;s inside and the topics beneath it, so
              you always know what you&rsquo;re walking into.
            </p>
          </div>
          <div className="how-card">
            <span className="how-n">3</span>
            <span className="how-ic">&#9889;</span>
            <h4>Switch resources instantly</h4>
            <p>
              Summary, practice, trivia, quiz — all one click apart in the side bar, which retracts
              when you want the room.
            </p>
          </div>
        </div>

        <div className="brand-strip">
          <SqLogo size="md" />
          <p>
            Built from the Task 4 assessment notification and the NESA Modern History Stage 6
            Syllabus (2017), with historian quotes checked against their published source.
          </p>
        </div>
      </div>
    </>
  )
}
