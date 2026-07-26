import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { progressStore } from '../../lib/progressStore'
import { QuizPanel } from './QuizPanel'
import type { HistoryQuizQuestion } from '../../lib/content'

const questions: HistoryQuizQuestion[] = [
  {
    n: 1,
    answer: 'a',
    questionHtml: 'What year did the Treaty of Versailles get signed?',
    options: [
      { opt: 'a', textHtml: '1919' },
      { opt: 'b', textHtml: '1920' },
    ],
  },
  {
    n: 2,
    answer: 'b',
    questionHtml: 'Who led the Bolsheviks?',
    options: [
      { opt: 'a', textHtml: 'Trotsky' },
      { opt: 'b', textHtml: 'Lenin' },
    ],
  },
]

describe('QuizPanel', () => {
  beforeEach(() => {
    progressStore.resetAll()
  })

  it('starts unanswered and locks in a correct answer', async () => {
    const user = userEvent.setup()
    render(<QuizPanel topicId="s1" questions={questions} />)

    expect(screen.getByText('Score: 0 correct / 0 answered (of 2)')).toBeInTheDocument()

    await user.click(screen.getByRole('button', { name: /1919/ }))

    expect(screen.getByText('Score: 1 correct / 1 answered (of 2)')).toBeInTheDocument()
    expect(screen.getByText('Correct!')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /1919/ })).toBeDisabled()
  })

  it('paints an incorrect pick and highlights the correct option', async () => {
    const user = userEvent.setup()
    render(<QuizPanel topicId="s1" questions={questions} />)

    await user.click(screen.getByRole('button', { name: /1920/ }))

    expect(screen.getByText('Score: 0 correct / 1 answered (of 2)')).toBeInTheDocument()
    expect(
      screen.getByText('Not quite — the correct answer is highlighted above.'),
    ).toBeInTheDocument()
  })

  it('filters to unanswered and back to all', async () => {
    const user = userEvent.setup()
    render(<QuizPanel topicId="s1" questions={questions} />)

    await user.click(screen.getByRole('button', { name: /1919/ }))
    await user.click(screen.getByRole('button', { name: /Unanswered/ }))

    expect(screen.getByText('Who led the Bolsheviks?')).toBeInTheDocument()
    expect(screen.queryByText(/Treaty of Versailles/)).not.toBeInTheDocument()

    await user.click(screen.getByRole('button', { name: 'All questions' }))
    expect(screen.getByText(/Treaty of Versailles/)).toBeInTheDocument()
  })

  it('retry incorrect clears only the wrong answer, leaving the correct one', async () => {
    const user = userEvent.setup()
    render(<QuizPanel topicId="s1" questions={questions} />)

    await user.click(screen.getByRole('button', { name: /1919/ })) // correct
    await user.click(screen.getByRole('button', { name: /Trotsky/ })) // wrong

    await user.click(screen.getByRole('button', { name: 'Retry incorrect' }))

    expect(screen.getByText('Score: 1 correct / 1 answered (of 2)')).toBeInTheDocument()
    // the retried question is unlocked again
    expect(screen.getByRole('button', { name: /Trotsky/ })).not.toBeDisabled()
  })
})
