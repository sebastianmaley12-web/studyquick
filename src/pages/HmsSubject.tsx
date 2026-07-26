import { useNavigate } from 'react-router-dom'
import { SqLogo } from '../components/SqLogo'
import { hmsTopics, hmsTotals } from '../lib/content/hms'
import { useProgress } from '../lib/progressStore'
import { historyTopicStats, pct } from '../lib/progressStats'
import { ProgressLine } from '../components/ProgressLine'

const TOPIC_COPY: Record<string, { yr: string; blurb: string; tags: string[]; format: string }> = {
  fa1: {
    yr: 'Focus Area 1',
    blurb:
      'How healthy Australians are, health inequities and priority groups, Australia compared with OECD countries, chronic conditions and an ageing population, how the healthcare system works, digital health and big data, and how the UN Sustainable Development Goals can improve a community’s health.',
    tags: ['syllabus dot points', 'practice questions', 'trivia cards', 'quiz questions'],
    format: 'Source & data-based',
  },
  fa2: {
    yr: 'Focus Area 2',
    blurb:
      'Personalising exercise assessment, training types and methods and their physiological adaptations, designing training sessions and yearly programs, sports psychology, sleep, nutrition and supplementation, biomechanics, recovery and sports injury management.',
    tags: ['syllabus dot points', 'practice questions', 'trivia cards', 'quiz questions'],
    format: 'Applied & scenario-based',
  },
}

export function HmsSubject() {
  const navigate = useNavigate()
  const progress = useProgress()

  return (
    <div className="wrap">
      <div className="subject-hero">
        <div className="brand-row">
          <SqLogo size="xs" />
          <span className="brand-row-sep">&middot;</span>
          <span className="eyebrow">HSC Health and Movement Science &middot; Year 12 &middot; NESA Stage 6</span>
        </div>
        <h1>Health and Movement Science</h1>
        <div className="subject-kicker">
          Trial Examination — Full Focus Area Question Bank
          <span>Both Year 12 Focus Areas</span>
        </div>
        <p className="lede">
          Two focus areas, each examined together across a 100-mark trial: multiple choice,
          short answer, and one 12-mark extended response per focus area.
        </p>
        <p className="lede">
          Mirrors Task 4: Focus Area 1 (Health in an Australian and global context) and Focus
          Area 2 (Training for improved performance), built from the assessment notification, the
          current NESA Health and Movement Science Stage 6 Syllabus (2023), and real past-trial
          questions with verified sample answers.
        </p>
        <div className="stat-strip">
          <div>
            <div className="k">Focus Areas</div>
            <div className="v">Two</div>
          </div>
          <div>
            <div className="k">Marks</div>
            <div className="v">100 total</div>
          </div>
          <div>
            <div className="k">Time</div>
            <div className="v">3 hrs + 10 min reading</div>
          </div>
          <div>
            <div className="k">Sections</div>
            <div className="v">MC &middot; Short answer &middot; Extended</div>
          </div>
        </div>
        <button className="cta" type="button" onClick={() => navigate('/subjects/hms/fa1/summary')}>
          Jump into Focus Area 1 <span className="arw">&rarr;</span>
        </button>
      </div>

      <div className="section-label">Resources in this subject</div>
      <div className="res-grid">
        <div className="res-card">
          <div className="ic">&#9776;</div>
          <h4>Syllabus Summary</h4>
          <p>Every key question for the focus area, with the terms, statistics and examples you need.</p>
          <div className="count">{hmsTotals.summaryPoints} dot points</div>
        </div>
        <div className="res-card">
          <div className="ic">&#9998;</div>
          <h4>Practice Questions</h4>
          <p>Real past-trial short-answer questions with marking criteria and a full model answer under each.</p>
          <div className="count">{hmsTotals.practice} questions</div>
        </div>
        <div className="res-card">
          <div className="ic">&#9889;</div>
          <h4>Quick Trivia</h4>
          <p>Quick-fire recall cards. Tap to flip. Best used in short bursts for key terms and definitions.</p>
          <div className="count">{hmsTotals.trivia} cards</div>
        </div>
        <div className="res-card">
          <div className="ic">&#9673;</div>
          <h4>Multiple Choice Quiz</h4>
          <p>Real past-trial multiple choice questions, marked instantly with a running score.</p>
          <div className="count">{hmsTotals.quiz} questions</div>
        </div>
      </div>

      <div className="section-label">Focus Areas</div>
      <div className="topic-rows">
        {hmsTopics.map((topic) => {
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
              onClick={() => navigate(`/subjects/hms/${topic.id}/summary`)}
            >
              <div className="spine">{topic.id.toUpperCase()}</div>
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
                  Open focus area <span className="arw">&rarr;</span>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
