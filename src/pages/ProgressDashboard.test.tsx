import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { progressStore } from '../lib/progressStore'
import { quizKey } from '../lib/keys'
import { ProgressDashboard } from './ProgressDashboard'

describe('ProgressDashboard', () => {
  beforeEach(() => {
    progressStore.resetAll()
  })

  it('lists every subject with no weak-spots callout when nothing is attempted', () => {
    render(
      <MemoryRouter>
        <ProgressDashboard />
      </MemoryRouter>,
    )

    expect(screen.getByText('Modern History')).toBeInTheDocument()
    expect(screen.getByText('Maths')).toBeInTheDocument()
    expect(screen.getByText('Health & Movement Science')).toBeInTheDocument()
    expect(screen.getByText('Business Studies')).toBeInTheDocument()
    expect(screen.queryByText('Focus on these next')).not.toBeInTheDocument()
  })

  it('surfaces an attempted-but-low-scoring topic under "Focus on these next"', () => {
    // s1's first quiz question answered wrong: attempted (score > 0 is false
    // here since it's wrong, so mark one right + rest of the topic untouched
    // isn't enough) — instead answer one right so score > 0 and pct stays low.
    progressStore.setQuizAnswer(quizKey('s1', 0), 'x', true)

    render(
      <MemoryRouter>
        <ProgressDashboard />
      </MemoryRouter>,
    )

    expect(screen.getByText('Focus on these next')).toBeInTheDocument()
  })
})
