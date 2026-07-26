import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { createMemoryRouter, RouterProvider } from 'react-router-dom'
import { AppLayout } from '../layouts/AppLayout'
import { ModernHistoryTopic } from '../pages/ModernHistoryTopic'
import { progressStore } from '../lib/progressStore'

function routerAt(initialPath: string) {
  return createMemoryRouter(
    [
      {
        element: <AppLayout />,
        children: [
          { path: '/subjects/modern-history/:topicId/:resource', element: <ModernHistoryTopic /> },
        ],
      },
    ],
    { initialEntries: [initialPath] },
  )
}

describe('search', () => {
  beforeEach(() => {
    progressStore.resetAll()
    // jsdom doesn't implement scrollIntoView
    Element.prototype.scrollIntoView = vi.fn()
  })

  it('highlights a match in the currently active tab without navigating away', async () => {
    const user = userEvent.setup()
    render(<RouterProvider router={routerAt('/subjects/modern-history/s1/summary')} />)

    await user.type(screen.getByPlaceholderText(/Search every topic/), 'Reichstag Fire')
    await waitFor(() => expect(document.querySelectorAll('mark.hit').length).toBeGreaterThan(0))

    expect(document.querySelector('.subtab-btn.active')).toHaveTextContent('Syllabus Summary')
  })

  it('jumps to a different tab when the query only matches there, and marks the current hit', async () => {
    const user = userEvent.setup()
    render(<RouterProvider router={routerAt('/subjects/modern-history/s1/summary')} />)

    // "the outbreak of the Spanish Civil War" is a quiz-distractor option,
    // not present anywhere in the s1 summary content
    await user.type(screen.getByPlaceholderText(/Search every topic/), 'spanish civil war')

    await waitFor(() =>
      expect(document.querySelector('.subtab-btn.active')).toHaveTextContent(
        'Multiple Choice Quiz',
      ),
    )
    await waitFor(() => expect(document.querySelector('mark.hit.current')).not.toBeNull())
    expect(document.querySelectorAll('mark.hit').length).toBeGreaterThan(0)
  })

  it('clears highlights and the input on Escape', async () => {
    const user = userEvent.setup()
    render(<RouterProvider router={routerAt('/subjects/modern-history/s1/summary')} />)
    const input = screen.getByPlaceholderText(/Search every topic/)

    await user.type(input, 'Reichstag')
    await waitFor(() => expect(document.querySelectorAll('mark.hit').length).toBeGreaterThan(0))

    await user.type(input, '{Escape}')
    expect(input).toHaveValue('')
    await waitFor(() => expect(document.querySelectorAll('mark.hit').length).toBe(0))
  })
})
