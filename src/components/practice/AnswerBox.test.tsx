import { act, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { progressStore } from '../../lib/progressStore'
import { AnswerBox } from './AnswerBox'

describe('AnswerBox', () => {
  beforeEach(() => {
    progressStore.resetAll()
  })

  it('autosaves what is typed', async () => {
    const user = userEvent.setup()
    render(<AnswerBox noteKey="s1-practice#0" />)

    await user.type(screen.getByPlaceholderText(/Draft your response/), 'my attempt')

    expect(progressStore.getSnapshot().notes['s1-practice#0']).toBe('my attempt')
  })

  it('reflects an external clear (e.g. "Clear my written answers") since it is controlled', async () => {
    progressStore.setNote('s1-practice#0', 'existing draft')
    render(<AnswerBox noteKey="s1-practice#0" />)

    expect(screen.getByPlaceholderText(/Draft your response/)).toHaveValue('existing draft')

    act(() => {
      progressStore.clearNotesForTopic('s1-practice')
    })
    expect(screen.getByPlaceholderText(/Draft your response/)).toHaveValue('')
  })

  it("clears the note when emptied, matching the store's delete-on-empty behavior", async () => {
    const user = userEvent.setup()
    render(<AnswerBox noteKey="s1-practice#0" />)
    const textarea = screen.getByPlaceholderText(/Draft your response/)

    await user.type(textarea, 'something')
    expect(progressStore.getSnapshot().notes['s1-practice#0']).toBe('something')

    await user.clear(textarea)
    expect(progressStore.getSnapshot().notes['s1-practice#0']).toBeUndefined()
  })
})
