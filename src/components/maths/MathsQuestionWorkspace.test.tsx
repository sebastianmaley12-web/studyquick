import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { progressStore } from '../../lib/progressStore'
import { MathsQuestionWorkspace } from './MathsQuestionWorkspace'
import type { MathsTopic } from '../../lib/content/maths'
import type { MathsWorkspaceEntry } from '../../lib/content/mathsWorkspace'

const numQuestion: MathsTopic['questions'][number] = {
  id: 'wq1',
  type: 'num',
  q: 'Unused by the workspace — entry.introText/formulaLatex take over.',
  ans: 4,
  tol: 0.1,
  unit: 'm',
  prefix: '',
  marks: 2,
  sol: 'Unused — entry.solutionSteps take over.',
}

const mcQuestion: MathsTopic['questions'][number] = {
  id: 'wq2',
  type: 'mc',
  q: 'Pick B',
  opts: ['A', 'B', 'C'],
  ans: 1,
  marks: 1,
  sol: 'B is correct.',
}

const entry: MathsWorkspaceEntry = {
  introText: 'Find x.',
  formulaLatex: 'x = 2 + 2',
  steps: [{ label: 'Add the numbers', latex: '2 + 2 = 4' }],
  solutionSteps: [{ label: 'Add the numbers', latex: 'x = 4' }],
}

describe('MathsQuestionWorkspace', () => {
  beforeEach(() => {
    progressStore.resetAll()
  })

  it('renders the formula via KaTeX', () => {
    render(<MathsQuestionWorkspace slug="test" index={0} question={numQuestion} entry={entry} />)
    // KaTeX renders its own markup; presence of the katex root class confirms
    // it ran (rather than falling back to raw LaTeX text on an error).
    expect(document.querySelector('.mqw-formula .katex')).toBeInTheDocument()
  })

  it('grades a numeric answer within tolerance as correct', async () => {
    const user = userEvent.setup()
    render(<MathsQuestionWorkspace slug="test" index={0} question={numQuestion} entry={entry} />)

    await user.type(screen.getByPlaceholderText('?'), '4')
    await user.click(screen.getByRole('button', { name: 'Check answer' }))

    expect(screen.getByText('✓ Correct')).toBeInTheDocument()
    expect(progressStore.getSnapshot().maths['test#wq1']).toEqual({ v: 4, ok: true })
  })

  it('grades a numeric answer outside tolerance as incorrect and shows the formatted answer', async () => {
    const user = userEvent.setup()
    render(<MathsQuestionWorkspace slug="test" index={0} question={numQuestion} entry={entry} />)

    await user.type(screen.getByPlaceholderText('?'), '10')
    await user.click(screen.getByRole('button', { name: 'Check answer' }))

    expect(screen.getByText(/Not yet/)).toBeInTheDocument()
    expect(progressStore.getSnapshot().maths['test#wq1']).toEqual({ v: 10, ok: false })
  })

  it('grades a multiple-choice pick and highlights the correct option', async () => {
    const user = userEvent.setup()
    render(<MathsQuestionWorkspace slug="test" index={0} question={mcQuestion} entry={entry} />)

    await user.click(screen.getByRole('button', { name: /A/ }))

    expect(screen.getByRole('button', { name: /B/ })).toHaveClass('correct')
    expect(screen.getByRole('button', { name: /A/ })).toHaveClass('chosen-wrong')
  })

  it('toggles the step-by-step scaffold without affecting grading', async () => {
    const user = userEvent.setup()
    render(<MathsQuestionWorkspace slug="test" index={0} question={numQuestion} entry={entry} />)

    expect(screen.queryByText('Add the numbers')).not.toBeInTheDocument()
    await user.click(screen.getByRole('button', { name: 'Show steps' }))
    expect(screen.getByText('Add the numbers')).toBeInTheDocument()

    await user.click(screen.getByRole('button', { name: 'Hide steps' }))
    expect(screen.queryByText('Add the numbers')).not.toBeInTheDocument()
  })

  it('keeps the scratch working area local and ungraded', async () => {
    const user = userEvent.setup()
    render(<MathsQuestionWorkspace slug="test" index={0} question={numQuestion} entry={entry} />)

    const scratch = screen.getByPlaceholderText(/Use this space to show your working/)
    await user.type(scratch, 'x = 2 + 2, so x = 4')

    expect(scratch).toHaveValue('x = 2 + 2, so x = 4')
    expect(progressStore.getSnapshot().maths['test#wq1']).toBeUndefined()
  })
})
