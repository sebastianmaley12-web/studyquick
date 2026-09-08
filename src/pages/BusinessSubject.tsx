import { useNavigate } from 'react-router-dom'
import { SqLogo } from '../components/SqLogo'
import { businessTopics, businessTotals } from '../lib/content/business'
import { useProgress } from '../lib/progressStore'
import { historyTopicStats, pct } from '../lib/progressStats'
import { ProgressLine } from '../components/ProgressLine'

const TOPIC_COPY: Record<string, { yr: string; blurb: string; tags: string[]; format: string }> = {
  operations: {
    yr: 'HSC Topic',
    blurb:
      'The role of operations management, transformation processes (inputs, the 4 Vs, monitoring and control), and operations strategies — supply chain management, technology, quality management, inventory management and overcoming resistance to change.',
    tags: ['syllabus dot points', 'practice questions', 'trivia cards', 'quiz questions'],
    format: 'Applied & case-study based',
  },
  marketing: {
    yr: 'HSC Topic',
    blurb:
      'The role of marketing, influences on customer choice and consumer law, the marketing process (SWOT, market research, target markets), and marketing strategies — segmentation, the 4 Ps, and global marketing.',
    tags: ['syllabus dot points', 'practice questions', 'trivia cards', 'quiz questions'],
    format: 'Applied & case-study based',
  },
  finance: {
    yr: 'HSC Topic',
    blurb:
      'The role of financial management, sources of finance and financial institutions, financial ratios and the limitations of financial reports, and financial management strategies — cash flow, working capital and global finance.',
    tags: ['syllabus dot points', 'practice questions', 'trivia cards', 'quiz questions'],
    format: 'Applied & case-study based',
  },
  hr: {
    yr: 'HSC Topic',
    blurb:
      'The role of human resource management and key influences (stakeholders, legal, economic, technological, social, ethics), processes and strategies in HRM, workplace disputes, and the effectiveness of HRM.',
    tags: ['syllabus dot points', 'practice questions', 'trivia cards', 'quiz questions'],
    format: 'Applied & case-study based',
  },
}

export function BusinessSubject() {
  const navigate = useNavigate()
  const progress = useProgress()

  return (
    <div className="wrap">
      <div className="subject-hero">
        <div className="brand-row">
          <SqLogo size="xs" />
          <span className="brand-row-sep">&middot;</span>
          <span className="eyebrow">HSC Business Studies &middot; Year 12 &middot; NESA Stage 6</span>
        </div>
        <h1>Business Studies</h1>
        <div className="subject-kicker">
          HSC Exam Practice — Full Topic Question Bank
          <span>All Four HSC Topics</span>
        </div>
        <p className="lede">
          Four topics examined together across the 100-mark HSC exam: multiple choice, short
          answer, a business-report extended response, and a choice of case-study extended
          responses.
        </p>
        <p className="lede">
          Covers Operations, Marketing, Finance and Human Resources in full, built from the NESA
          Business Studies Stage 6 Syllabus.
        </p>
        <div className="stat-strip">
          <div>
            <div className="k">Topics</div>
            <div className="v">Four</div>
          </div>
          <div>
            <div className="k">Marks</div>
            <div className="v">100 total</div>
          </div>
          <div>
            <div className="k">Time</div>
            <div className="v">3 hrs + 5 min reading</div>
          </div>
          <div>
            <div className="k">Sections</div>
            <div className="v">MC &middot; Short answer &middot; 2 extended response</div>
          </div>
        </div>
        <button
          className="cta"
          type="button"
          onClick={() => navigate('/subjects/business/operations/summary')}
        >
          Jump into Operations <span className="arw">&rarr;</span>
        </button>
      </div>

      <div className="section-label">Resources in this subject</div>
      <div className="res-grid">
        <div className="res-card">
          <div className="ic">&#9776;</div>
          <h4>Syllabus Summary</h4>
          <p>Every syllabus heading for the topic, with definitions, terms and real business examples.</p>
          <div className="count">{businessTotals.summaryPoints} dot points</div>
        </div>
        <div className="res-card">
          <div className="ic">&#9998;</div>
          <h4>Practice Questions</h4>
          <p>Exam-style short-answer questions with a hidden marking guide and model answer under each.</p>
          <div className="count">{businessTotals.practice} questions</div>
        </div>
        <div className="res-card">
          <div className="ic">&#9889;</div>
          <h4>Quick Trivia</h4>
          <p>Quick-fire recall cards. Tap to flip. Best used in short bursts for key terms and definitions.</p>
          <div className="count">{businessTotals.trivia} cards</div>
        </div>
        <div className="res-card">
          <div className="ic">&#9673;</div>
          <h4>Multiple Choice Quiz</h4>
          <p>Four-option questions marked instantly with a running score.</p>
          <div className="count">{businessTotals.quiz} questions</div>
        </div>
      </div>

      <div className="section-label">Topics</div>
      <div className="topic-rows">
        {businessTopics.map((topic) => {
          const copy = TOPIC_COPY[topic.id]
          const counts = [
            topic.summaryPointCount,
            topic.practiceCount,
            topic.triviaCount,
            topic.quizCount,
          ]
          const stats = historyTopicStats(progress, topic)
          return (
            <div
              key={topic.id}
              className="topic-card"
              role="button"
              tabIndex={0}
              onClick={() => navigate(`/subjects/business/${topic.id}/summary`)}
            >
              <div className="spine">{topic.short.slice(0, 2).toUpperCase()}</div>
              <div className="topic-inner">
                <div className="topic-text">
                  <div className="yr">{copy.yr}</div>
                  <h3 dangerouslySetInnerHTML={{ __html: topic.short }} />
                  <p>{copy.blurb}</p>
                  <div className="topic-tags">
                    {copy.tags.map((label, i) => (
                      <span key={label}>
                        {counts[i]} {label}
                      </span>
                    ))}
                    <span>{copy.format}</span>
                  </div>
                  <ProgressLine
                    done={stats.score}
                    total={stats.max}
                    text={`${pct(stats.score, stats.max)}% covered`}
                  />
                </div>
                <div className="topic-go">
                  Open topic <span className="arw">&rarr;</span>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
