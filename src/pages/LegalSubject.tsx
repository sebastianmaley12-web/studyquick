import { useNavigate } from 'react-router-dom'
import { SqLogo } from '../components/SqLogo'
import { legalTopics, legalTotals } from '../lib/content/legal'
import { useProgress } from '../lib/progressStore'
import { historyTopicStats, pct } from '../lib/progressStats'
import { ProgressLine } from '../components/ProgressLine'

const TOPIC_COPY: Record<string, { yr: string; blurb: string; tags: string[]; format: string }> = {
  crime: {
    yr: 'HSC Core',
    blurb:
      'The nature of crime, the criminal investigation and trial processes, sentencing and punishment, young offenders, and international crime — the mandatory core topic tested in every HSC Legal Studies exam.',
    tags: ['syllabus dot points', 'practice questions', 'trivia cards', 'quiz questions'],
    format: 'MC, short answer & extended response',
  },
  humanrights: {
    yr: 'HSC Core',
    blurb:
      'The nature and development of human rights, and how they are promoted and enforced domestically and internationally — the other mandatory core topic, including ad hoc tribunals and a contemporary human rights issue.',
    tags: ['syllabus dot points', 'practice questions', 'trivia cards', 'quiz questions'],
    format: 'MC, short answer & extended response',
  },
  environment: {
    yr: 'HSC Option',
    blurb:
      'The nature of global environmental protection, legal and non-legal responses (treaties, courts, state sovereignty), and contemporary issues including climate litigation — one of two Options studied for the HSC exam.',
    tags: ['syllabus dot points', 'practice questions', 'trivia cards', 'quiz questions'],
    format: 'Extended response essays',
  },
  worldorder: {
    yr: 'HSC Option',
    blurb:
      "The nature of world order, the UN Security Council and its veto power, legal and non-legal responses to conflict, and contemporary issues including the 'responsibility to protect' — the other Option studied for the HSC exam.",
    tags: ['syllabus dot points', 'practice questions', 'trivia cards', 'quiz questions'],
    format: 'Extended response essays',
  },
}

export function LegalSubject() {
  const navigate = useNavigate()
  const progress = useProgress()

  return (
    <div className="wrap">
      <div className="subject-hero">
        <div className="brand-row">
          <SqLogo size="xs" />
          <span className="brand-row-sep">&middot;</span>
          <span className="eyebrow">HSC Legal Studies &middot; Year 12 &middot; NESA Stage 6</span>
        </div>
        <h1>Legal Studies</h1>
        <div className="subject-kicker">
          HSC Exam Practice — Full Topic Question Bank
          <span>Core + Two Options</span>
        </div>
        <p className="lede">
          The mandatory core (Crime and Human Rights) plus two Options (Global Environmental
          Protection and World Order), examined via multiple choice, short answer and extended
          response.
        </p>
        <p className="lede">
          Built from the NESA Legal Studies Stage 6 Syllabus and modelled on real HSC exam
          questions and marking criteria — every case, piece of legislation and treaty cited here
          traces back to a real source, not a guess.
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
        <button className="cta" type="button" onClick={() => navigate('/subjects/legal/crime/summary')}>
          Jump into Crime <span className="arw">&rarr;</span>
        </button>
      </div>

      <div className="section-label">Resources in this subject</div>
      <div className="res-grid">
        <div className="res-card">
          <div className="ic">&#9776;</div>
          <h4>Syllabus Summary</h4>
          <p>Every syllabus heading for the topic, with definitions, real cases and legislation.</p>
          <div className="count">{legalTotals.summaryPoints} dot points</div>
        </div>
        <div className="res-card">
          <div className="ic">&#9998;</div>
          <h4>Practice Questions</h4>
          <p>Real exam-style extended-response prompts with a hidden marking guide and model answer under each.</p>
          <div className="count">{legalTotals.practice} questions</div>
        </div>
        <div className="res-card">
          <div className="ic">&#9889;</div>
          <h4>Quick Trivia</h4>
          <p>Quick-fire recall cards. Tap to flip. Best used in short bursts for key terms and cases.</p>
          <div className="count">{legalTotals.trivia} cards</div>
        </div>
        <div className="res-card">
          <div className="ic">&#9673;</div>
          <h4>Multiple Choice Quiz</h4>
          <p>Four-option questions marked instantly with a running score.</p>
          <div className="count">{legalTotals.quiz} questions</div>
        </div>
      </div>

      <div className="section-label">Topics</div>
      <div className="topic-rows">
        {legalTopics.map((topic) => {
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
              onClick={() => navigate(`/subjects/legal/${topic.id}/summary`)}
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
