import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { progressStore } from '../../lib/progressStore'
import { TriviaGrid } from './TriviaGrid'
import type { HistoryTriviaCard } from '../../lib/content/modernHistory'

const cards: HistoryTriviaCard[] = [
  { n: 1, questionHtml: 'What year was the Reichstag Fire?', answerHtml: '1933' },
  {
    n: 2,
    questionHtml: 'What was the Enabling Act?',
    answerHtml: 'Law letting Hitler bypass the Reichstag',
  },
]

describe('TriviaGrid', () => {
  beforeEach(() => {
    progressStore.resetAll()
  })

  it('shows the card count and reveals a card on click', async () => {
    const user = userEvent.setup()
    render(<TriviaGrid topicId="s1" cards={cards} />)

    expect(
      screen.getByText('2 quick-fire questions · tap a card to reveal the answer'),
    ).toBeInTheDocument()

    const card = screen.getByText('What year was the Reichstag Fire?').closest('.trivia-card')!
    expect(card).not.toHaveClass('revealed')

    await user.click(card)
    expect(card).toHaveClass('revealed')
  })

  it('rating a card shaky updates the shaky count and persists', async () => {
    const user = userEvent.setup()
    render(<TriviaGrid topicId="s1" cards={cards} />)

    const card = screen.getByText('What year was the Reichstag Fire?').closest('.trivia-card')!
    await user.click(card)
    await user.click(screen.getByRole('button', { name: 'Still shaky' }))

    expect(screen.getByRole('button', { name: /Shaky only/ })).toHaveTextContent('1')
    expect(progressStore.getSnapshot().trivia['s1-trivia#0']).toBe('shaky')
  })

  it('shaky filter hides cards that are not rated shaky', async () => {
    const user = userEvent.setup()
    render(<TriviaGrid topicId="s1" cards={cards} />)

    const card = screen.getByText('What year was the Reichstag Fire?').closest('.trivia-card')!
    await user.click(card)
    await user.click(screen.getByRole('button', { name: 'Still shaky' }))

    await user.click(screen.getByRole('button', { name: /Shaky only/ }))
    expect(screen.getByText('What year was the Reichstag Fire?')).toBeInTheDocument()
    expect(screen.queryByText('What was the Enabling Act?')).not.toBeInTheDocument()
  })

  it('reveal all and hide all toggle every card at once', async () => {
    const user = userEvent.setup()
    render(<TriviaGrid topicId="s1" cards={cards} />)

    await user.click(screen.getByRole('button', { name: 'Reveal all' }))
    const allCards = document.querySelectorAll('.trivia-card')
    allCards.forEach((c) => expect(c).toHaveClass('revealed'))

    await user.click(screen.getByRole('button', { name: 'Hide all' }))
    allCards.forEach((c) => expect(c).not.toHaveClass('revealed'))
  })
})
