import { useNavigate } from 'react-router-dom'
import { SqLogo } from '../components/SqLogo'
import { modernHistoryTopics, modernHistoryTotals, TOPIC_ROMAN } from '../lib/content'

const TOPIC_COPY: Record<string, { yr: string; blurb: string; tags: string[]; format: string }> = {
  s1: {
    yr: '1919–1946 · Germany — Weimar & Nazi rule',
    blurb:
      'How the post-war settlement, economic collapse and fear of communism created the conditions for dictatorship — then how the Nazi state seized, consolidated and used total power, and how the world tried to rebuild peace afterwards.',
    tags: ['syllabus dot points', 'practice questions', 'trivia cards', 'quiz questions'],
    format: 'Source-based · 25 marks',
  },
  s2: {
    yr: '1917–1941 · National study',
    blurb:
      "From the Bolshevik seizure of power through civil war and the NEP, to the succession struggle after Lenin and the nature of Stalin's state — collectivisation, the Terror, propaganda and foreign policy to 1941.",
    tags: ['syllabus dot points', 'practice questions', 'trivia cards', 'quiz questions'],
    format: 'Extended response · 25 marks',
  },
  s3: {
    yr: '1935–1945 · Conflict in Europe',
    blurb:
      'Growing European tension and appeasement, German foreign policy, the course of the war from Blitzkrieg to the Eastern Front, civilians under occupation and resistance, and the reasons the Third Reich was defeated.',
    tags: ['syllabus dot points', 'practice questions', 'trivia cards', 'quiz questions'],
    format: 'Extended response · 25 marks',
  },
  s4: {
    yr: '1960–1994 · Apartheid in South Africa',
    blurb:
      'The nature of apartheid and the machinery that enforced it, internal and external opposition from Sharpeville to the UDF, the role of Mandela and de Klerk, and the negotiated transition to majority rule in 1994.',
    tags: ['syllabus dot points', 'practice questions', 'trivia cards', 'quiz questions'],
    format: 'Short answer & extended response · 25 marks',
  },
}

export function ModernHistorySubject() {
  const navigate = useNavigate()

  return (
    <div className="wrap">
      <div className="subject-hero">
        <div className="brand-row">
          <SqLogo size="xs" />
          <span className="brand-row-sep">&middot;</span>
          <span className="eyebrow">HSC Modern History &middot; Year 12 &middot; NESA Stage 6</span>
        </div>
        <h1>Modern History</h1>
        <div className="subject-kicker">
          Trial Examination — Full Syllabus Question Bank
          <span>Full Syllabus Practice File</span>
        </div>
        <p className="lede">
          Four topics, each examined for 25 marks in roughly 45 minutes: a source-based study of
          power and authority, a national study of Russia and the Soviet Union, an international
          study of conflict in Europe, and a study of change through apartheid in South Africa.
        </p>
        <p className="lede">
          Mirrors Task 4: four 45-minute sections, 25 marks each. Every syllabus dot point for all
          four topics — Power &amp; Authority, Russia &amp; the Soviet Union, Conflict in Europe,
          and Apartheid in South Africa — is represented by at least one practice question, built
          from the Assessment Notification and the current NESA Modern History Stage 6 Syllabus
          (2017).
        </p>
        <div className="stat-strip">
          <div>
            <div className="k">Sections</div>
            <div className="v">Four</div>
          </div>
          <div>
            <div className="k">Marks</div>
            <div className="v">25 per section</div>
          </div>
          <div>
            <div className="k">Time / section</div>
            <div className="v">~45 minutes</div>
          </div>
          <div>
            <div className="k">Total time</div>
            <div className="v">3 hrs + 5 min reading</div>
          </div>
        </div>
        <button
          className="cta"
          type="button"
          onClick={() => navigate('/subjects/modern-history/s1/summary')}
        >
          Jump into Topic I <span className="arw">&rarr;</span>
        </button>
      </div>

      <div className="section-label">Resources in this subject</div>
      <div className="res-grid">
        <div className="res-card">
          <div className="ic">&#9776;</div>
          <h4>Syllabus Summary</h4>
          <p>
            Every official NESA dot point for the topic, grouped exactly as the syllabus groups
            them, with the key dates, figures and statistics written in.
          </p>
          <div className="count">{modernHistoryTotals.summaryPoints} dot points</div>
        </div>
        <div className="res-card">
          <div className="ic">&#9998;</div>
          <h4>Practice Questions</h4>
          <p>
            Exam-style questions with a hidden answer plan under each — thesis, paragraph structure,
            evidence and verified historian quotes. Attempt first, then reveal.
          </p>
          <div className="count">{modernHistoryTotals.practice} questions</div>
        </div>
        <div className="res-card">
          <div className="ic">&#9889;</div>
          <h4>Quick Trivia</h4>
          <p>
            Quick-fire recall cards. Tap to flip. Best used in short bursts for dates, names and
            definitions.
          </p>
          <div className="count">{modernHistoryTotals.trivia} cards</div>
        </div>
        <div className="res-card">
          <div className="ic">&#9673;</div>
          <h4>Multiple Choice Quiz</h4>
          <p>
            Four-option questions marked instantly with a running score, so you can spot the dot
            points you have not locked in yet.
          </p>
          <div className="count">{modernHistoryTotals.quiz} questions</div>
        </div>
      </div>

      <div className="section-label">Before you start</div>
      <details className="prestart">
        <summary>
          Read the four notes on how this file was built and how to use it{' '}
          <span className="tag">4 notes</span>
          <span className="caret">&#9656;</span>
        </summary>
        <div className="prestart-body">
          <div className="note-box">
            <b>A note on Section I:</b> your notification lists "Power and Authority in the Modern
            World 1919–1946" with no case study named. This file uses{' '}
            <b>Germany 1918–1946 (Weimar &amp; Nazi Germany)</b> as the working example, since it's
            the most commonly taught option — if your class studied a different country, the
            question <em>structures</em> transfer directly; swap in your own content. The Survey
            (WWI peace treaties) and comparative "rise of dictatorships" and "search for peace and
            security" dot points are now covered as well, not just the Germany case study.
          </div>
          <div className="note-box green">
            <b>How to use the plans:</b> attempt every question properly first — under timed
            conditions where you can. Only then click <b>"Reveal answer plan"</b> beneath it. Each
            plan gives a position/thesis and a paragraph-by-paragraph structure with the evidence to
            use — not a full model answer — so you still have to do the writing.
          </div>
          <div className="note-box">
            <b>On historian quotes:</b> plans marked{' '}
            <span className="mono" style={{ fontSize: '11px' }}>
              HISTORIAN'S VIEW — VERIFIED QUOTE
            </span>{' '}
            use a genuine, checked direct quote from a named historian's (or, occasionally, a key
            primary eyewitness's) published work, kept short and attributed with the source text. I
            have not invented quotes for every question — misattributing or misremembering a
            historian's exact words is a bigger risk in an exam than not having one at all. Where a
            plan doesn't have one, add a genuine line from your own class notes or textbook if you
            have one memorised for that topic.
          </div>
          <div className="note-box rust">
            <b>A note on sourcing:</b> this file was built from the assessment notification, the
            current NESA syllabus structure, real past HSC question styles (NESA sample and past
            papers), and verified historian quotes checked against their published source. It was{' '}
            <em>not</em> built from your class's own course-note booklets — draw on those directly
            for any dates, statistics or source extracts your teacher has specifically emphasised,
            since a teacher's own notes should always take precedence over a general file like this
            one.
          </div>
        </div>
      </details>

      <div className="section-label">Topics</div>
      <div className="topic-rows">
        {modernHistoryTopics.map((topic) => {
          const copy = TOPIC_COPY[topic.id]
          const counts = [
            topic.summaryPointCount,
            topic.practiceCount,
            topic.triviaCount,
            topic.quizCount,
          ]
          return (
            <div
              key={topic.id}
              className="topic-card"
              role="button"
              tabIndex={0}
              onClick={() => navigate(`/subjects/modern-history/${topic.id}/summary`)}
            >
              <div className="spine">{TOPIC_ROMAN[topic.id]}</div>
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
