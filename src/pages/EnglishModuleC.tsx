import { Navigate, useParams } from 'react-router-dom'
import { TopicShell } from '../layouts/TopicShell'
import { EnglishModuleCRail } from '../components/rail/EnglishModuleCRail'
import { MODULE_C_RESOURCES, MODULE_C_RESOURCE_LABELS, type ModuleCResource } from '../lib/content/english'
import { MODULE_C } from '../content/english/module-c-craft-of-writing'
import { CraftTechniqueTable } from '../components/english/CraftTechniqueTable'
import { WritingStimulusPractice } from '../components/english/WritingStimulusPractice'
import { QuizPanel } from '../components/quiz/QuizPanel'
import { buildCraftTechniqueQuiz } from '../lib/content/englishQuiz'

function isResource(v: string | undefined): v is ModuleCResource {
  return !!v && (MODULE_C_RESOURCES as readonly string[]).includes(v)
}

/** Module C has no prescribed text, so it gets its own page rather than
 * reusing EnglishText — its resources are craft techniques and per-mode
 * writing practice, not chapters/quotes. */
export function EnglishModuleC() {
  const { area } = useParams()

  if (!isResource(area)) {
    return <Navigate to="/subjects/english-advanced/module-c/overview" replace />
  }

  const quizQuestions = buildCraftTechniqueQuiz(MODULE_C.techniques)

  return (
    <TopicShell rail={<EnglishModuleCRail currentResource={area} />}>
      <section className="panel active">
        <div className="panel-head">
          <h2>{MODULE_C_RESOURCE_LABELS[area]}</h2>
          <div className="range">{MODULE_C.name}</div>
        </div>

        <div className="panel-body">
          {area === 'overview' && (
            <div className="q-text-overview">
              <div className="q-chapter-subhead">Overview</div>
              <p dangerouslySetInnerHTML={{ __html: MODULE_C.overviewHtml }} />
              <div className="q-chapter-subhead">Syllabus requirements</div>
              <p dangerouslySetInnerHTML={{ __html: MODULE_C.syllabusOverviewHtml }} />
            </div>
          )}
          {area === 'techniques' && <CraftTechniqueTable techniques={MODULE_C.techniques} />}
          {area === 'imaginative' && <WritingStimulusPractice mode="imaginative" stimuli={MODULE_C.stimuli} />}
          {area === 'discursive' && <WritingStimulusPractice mode="discursive" stimuli={MODULE_C.stimuli} />}
          {area === 'persuasive' && <WritingStimulusPractice mode="persuasive" stimuli={MODULE_C.stimuli} />}
          {area === 'test' && (
            <QuizPanel subject="english" topicId="module-c-craft-technique-test" questions={quizQuestions} />
          )}
        </div>
      </section>
    </TopicShell>
  )
}
