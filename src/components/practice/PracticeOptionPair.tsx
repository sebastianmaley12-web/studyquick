import { Fragment } from 'react'
import { highlightHtml, useSearchQuery } from '../../context/SearchQueryContext'
import { PlanReveal } from './PlanReveal'
import { AnswerBox } from './AnswerBox'

type Option = {
  noteKey: string
  label: string
  questionHtml: string
  planHtml: string
}

export function PracticeOptionPair({
  setTitle,
  options,
}: {
  setTitle: string | null
  options: Option[]
}) {
  const query = useSearchQuery()
  return (
    <>
      {setTitle && <div className="set-title">{setTitle}</div>}
      <div className="optionpair">
        {options.map((opt, i) => (
          <Fragment key={opt.noteKey}>
            {i > 0 && <div className="or">OR</div>}
            <div className="opt-card">
              <div className="opt-label">{opt.label}</div>
              <p
                className="qtext"
                dangerouslySetInnerHTML={{ __html: highlightHtml(opt.questionHtml, query) }}
              />
              <AnswerBox noteKey={opt.noteKey} />
              <PlanReveal planHtml={opt.planHtml} />
            </div>
          </Fragment>
        ))}
      </div>
    </>
  )
}
