import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { progressStore } from '../../lib/progressStore'
import { PracticeSection } from './PracticeSection'
import s2 from '../../content/modern-history/s2.json'
import type { ModernHistoryTopicData } from '../../lib/content'

describe('PracticeSection', () => {
  beforeEach(() => {
    progressStore.resetAll()
  })

  it('gives each option in an "answer ONE of two" pair its own note key, not one per pair', async () => {
    const user = userEvent.setup()
    render(
      <PracticeSection
        topicId="s2"
        practice={(s2 as unknown as ModernHistoryTopicData).practice}
      />,
    )

    const textareas = screen.getAllByPlaceholderText(/Draft your response/)
    // s2's first group is an options-format question: Option A and Option B
    await user.type(textareas[0], 'answer to option A')
    await user.type(textareas[1], 'answer to option B')

    expect(progressStore.getSnapshot().notes).toMatchObject({
      's2-practice#0': 'answer to option A',
      's2-practice#1': 'answer to option B',
    })
  })

  it('renders the exam timer and a working "Clear my written answers" button', async () => {
    const user = userEvent.setup()
    vi.spyOn(window, 'confirm').mockReturnValue(true)
    render(
      <PracticeSection
        topicId="s2"
        practice={(s2 as unknown as ModernHistoryTopicData).practice}
      />,
    )

    expect(screen.getByText('Exam timer')).toBeInTheDocument()

    const textareas = screen.getAllByPlaceholderText(/Draft your response/)
    await user.type(textareas[0], 'a draft')
    expect(progressStore.getSnapshot().notes['s2-practice#0']).toBe('a draft')

    await user.click(screen.getByRole('button', { name: 'Clear my written answers' }))
    expect(progressStore.getSnapshot().notes['s2-practice#0']).toBeUndefined()
  })
})
