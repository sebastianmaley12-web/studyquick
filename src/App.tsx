import { createElement, useState } from 'react'
import './App.css'
import mathsTopics from './content/maths/topics.json'
import modernHistoryMeta from './content/modern-history/topic-meta.json'
import modernHistoryS1 from './content/modern-history/s1.json'

type SubjectId = 'modern-history' | 'maths'

type ModernHistoryTopicMeta = Record<string, { short: string; years: string }>

type Subject = {
  id: SubjectId
  title: string
  tagline: string
  blurb: string
  topicCount: number
  accent: string
}

/** Content extracted from legacy/index.html (topic-meta.json, s1.json, ...) is
 * stored as HTML — entities like "&amp;" and tags like <ul> — matching how the
 * original app rendered it via innerHTML. Render it as HTML here too, rather
 * than as plain text, or entities show up literally and tags get stripped. */
function Html({ as = 'span', html }: { as?: 'span' | 'small'; html: string }) {
  return createElement(as, { dangerouslySetInnerHTML: { __html: html } })
}

const subjects: Subject[] = [
  {
    id: 'modern-history',
    title: 'Modern History',
    tagline: 'Syllabus-ready revision',
    blurb: 'Explore the core sections and practice prompts for the modern history course.',
    topicCount: Object.keys(modernHistoryMeta as ModernHistoryTopicMeta).length,
    accent: 'history',
  },
  {
    id: 'maths',
    title: 'Maths',
    tagline: 'Formulae and practice',
    blurb: 'Work through algebra topics, worked examples and quick revision points.',
    topicCount: mathsTopics.topics.length,
    accent: 'maths',
  },
]

const modernHistoryTopics = Object.entries(modernHistoryMeta as ModernHistoryTopicMeta).map(
  ([id, entry]) => ({
    id,
    title: entry.short,
    years: entry.years,
  }),
)

function App() {
  const [view, setView] = useState<'home' | 'subject'>('home')
  const [selectedSubject, setSelectedSubject] = useState<Subject | null>(null)
  const [selectedTopicId, setSelectedTopicId] = useState('s1')

  const currentTopic = modernHistoryTopics.find((topic) => topic.id === selectedTopicId)

  const openSubject = (subject: Subject) => {
    setSelectedSubject(subject)
    setView('subject')
    if (subject.id === 'modern-history') {
      setSelectedTopicId('s1')
    }
  }

  return (
    <div className="app-shell">
      {view === 'home' ? (
        <main className="home-view">
          <header className="hero-panel">
            <p className="eyebrow">Study Quick</p>
            <h1>Study Quick</h1>
            <p className="hero-copy">
              Jump into a clean set of revision guides, topic summaries and practice prompts.
            </p>
          </header>

          <section className="subject-list" aria-label="Study subjects">
            {subjects.map((subject) => (
              <button
                key={subject.id}
                type="button"
                className={`subject-card ${subject.accent}`}
                onClick={() => openSubject(subject)}
                aria-label={subject.title}
              >
                <div className="subject-card__content">
                  <p className="subject-card__tagline">{subject.tagline}</p>
                  <h2>{subject.title}</h2>
                  <p>{subject.blurb}</p>
                </div>
                <div className="subject-card__meta">
                  <span>{subject.topicCount} topics</span>
                  <span className="arrow">→</span>
                </div>
              </button>
            ))}
          </section>
        </main>
      ) : (
        <main className="subject-view">
          <button type="button" className="back-link" onClick={() => setView('home')}>
            ← Back to subjects
          </button>

          <header className="subject-hero">
            <p className="eyebrow">{selectedSubject?.title}</p>
            <h1>
              {selectedSubject?.id === 'modern-history' && currentTopic ? (
                <Html as="span" html={currentTopic.title} />
              ) : (
                'Maths topics'
              )}
            </h1>
            <p className="hero-copy">
              {selectedSubject?.id === 'modern-history'
                ? 'A compact overview of the modern history section with exam-ready review points.'
                : 'A practical index of the maths topics available in the local content set.'}
            </p>
          </header>

          {selectedSubject?.id === 'modern-history' ? (
            <>
              <section className="panel">
                <h2>Section overview</h2>
                <p>
                  <Html as="span" html={modernHistoryS1.meta.range} />
                </p>
                <ul className="info-list">
                  {modernHistoryS1.meta.boxes.map((box) => (
                    <li key={`${box.label}-${box.kind}`}>
                      <strong>{box.label}</strong> — <Html as="span" html={box.bodyHtml} />
                    </li>
                  ))}
                </ul>
              </section>

              <section className="panel">
                <h2>Available topics</h2>
                <div className="topic-list">
                  {modernHistoryTopics.map((topic) => (
                    <button
                      key={topic.id}
                      type="button"
                      className={`topic-chip ${selectedTopicId === topic.id ? 'active' : ''}`}
                      onClick={() => setSelectedTopicId(topic.id)}
                    >
                      <Html as="span" html={topic.title} />
                      <Html as="small" html={topic.years} />
                    </button>
                  ))}
                </div>
              </section>
            </>
          ) : (
            <section className="panel">
              <h2>Featured maths topics</h2>
              <ul className="info-list">
                {mathsTopics.topics.slice(0, 5).map((topic) => (
                  <li key={topic.code}>
                    <strong>{topic.code}</strong> — {topic.name}
                  </li>
                ))}
              </ul>
            </section>
          )}
        </main>
      )}
    </div>
  )
}

export default App
