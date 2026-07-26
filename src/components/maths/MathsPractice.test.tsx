import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { progressStore } from '../../lib/progressStore'
import { MathsPractice } from './MathsPractice'
import type { MathsTopic } from '../../lib/content'

const topic: MathsTopic = {
  code: 'MS-TEST',
  name: 'Test Topic',
  strand: 'Algebra',
  year: 12,
  blurb: 'A test topic',
  formulae: [],
  dotpoints: [],
  slug: 'test',
  questions: [
    {
      id: 'q1',
      type: 'num',
      q: 'What is 2 + 2?',
      ans: 4,
      tol: 0.1,
      unit: '',
      prefix: '',
      marks: 1,
      sol: 'It is 4.',
    },
    {
      id: 'q2',
      type: 'mc',
      q: 'Pick B',
      opts: ['A', 'B', 'C'],
      ans: 1,
      marks: 1,
      sol: 'B is correct.',
    },
  ],
}

describe('MathsPractice', () => {
  beforeEach(() => {
    progressStore.resetAll()
  })

  it('grades a numeric answer within tolerance as correct', async () => {
    const user = userEvent.setup()
    render(<MathsPractice topic={topic} />)

    await user.type(screen.getByPlaceholderText('answer'), '4')
    await user.click(screen.getByRole('button', { name: 'Check' }))

    expect(screen.getByText('✓ Correct')).toBeInTheDocument()
    expect(document.querySelector('.scoreline')).toHaveTextContent('1 correct/1 attemptedof2')
  })

  it('grades a numeric answer outside tolerance as incorrect and shows the formatted answer', async () => {
    const user = userEvent.setup()
    render(<MathsPractice topic={topic} />)

    await user.type(screen.getByPlaceholderText('answer'), '10')
    await user.click(screen.getByRole('button', { name: 'Check' }))

    expect(screen.getByText(/Not yet/)).toBeInTheDocument()
  })

  it('grades a multiple-choice pick and highlights the correct option', async () => {
    const user = userEvent.setup()
    render(<MathsPractice topic={topic} />)

    await user.click(screen.getByRole('button', { name: /A\./ }))

    expect(screen.getByRole('button', { name: /B\./ })).toHaveClass('correct')
    expect(screen.getByRole('button', { name: /A\./ })).toHaveClass('chosen-wrong')
  })

  it('retry incorrect clears only the wrong answer', async () => {
    const user = userEvent.setup()
    render(<MathsPractice topic={topic} />)

    await user.type(screen.getByPlaceholderText('answer'), '4') // correct
    await user.click(screen.getByRole('button', { name: 'Check' }))
    await user.click(screen.getByRole('button', { name: /A\./ })) // wrong

    await user.click(screen.getByRole('button', { name: 'Retry incorrect' }))

    expect(progressStore.getSnapshot().maths['test#q1']).toEqual({ v: 4, ok: true })
    expect(progressStore.getSnapshot().maths['test#q2']).toBeUndefined()
  })
})
