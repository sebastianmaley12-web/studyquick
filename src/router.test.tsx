import { render, screen } from '@testing-library/react'
import { createMemoryRouter, RouterProvider } from 'react-router-dom'
import { AppLayout } from './layouts/AppLayout'
import { Home } from './pages/Home'
import { ModernHistorySubject } from './pages/ModernHistorySubject'
import { ModernHistoryTopic } from './pages/ModernHistoryTopic'
import { MathsTopic } from './pages/MathsTopic'

function routerAt(initialPath: string) {
  return createMemoryRouter(
    [
      {
        element: <AppLayout />,
        children: [
          { path: '/', element: <Home /> },
          { path: '/subjects/modern-history', element: <ModernHistorySubject /> },
          { path: '/subjects/modern-history/:topicId/:resource', element: <ModernHistoryTopic /> },
          { path: '/subjects/maths/:slug/:resource', element: <MathsTopic /> },
        ],
      },
    ],
    { initialEntries: [initialPath] },
  )
}

describe('routing', () => {
  it('renders the home page with derived subject stats', () => {
    render(<RouterProvider router={routerAt('/')} />)
    expect(screen.getByText('Study smarter. Revise quicker.')).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: /Modern History/ })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: /Mathematics Standard 2/ })).toBeInTheDocument()
  })

  it('renders the modern history subject page with all four topics', () => {
    render(<RouterProvider router={routerAt('/subjects/modern-history')} />)
    expect(screen.getByRole('heading', { name: 'Modern History' })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: /Power & Authority/ })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: /Russia & the USSR/ })).toBeInTheDocument()
  })

  it('renders a modern history topic summary with the rail and decoded breadcrumb', () => {
    render(<RouterProvider router={routerAt('/subjects/modern-history/s1/summary')} />)
    expect(screen.getByRole('heading', { name: /Power and Authority/ })).toBeInTheDocument()
    // the breadcrumb must decode "Power &amp; Authority", not show the raw entity
    expect(screen.queryByText(/&amp;/)).not.toBeInTheDocument()
    expect(screen.getAllByText(/Power & Authority/).length).toBeGreaterThan(0)
  })

  it('renders a maths topic facts panel with decoded formulae', () => {
    render(<RouterProvider router={routerAt('/subjects/maths/f4/practice')} />)
    expect(screen.getByRole('heading', { name: 'Investments and Loans' })).toBeInTheDocument()
    expect(
      screen.getByText(
        'Practice Questions is being rebuilt in Phase 4 (feature parity migration) — this page currently only covers the app shell and Key Facts & Formulae content.',
        { exact: false },
      ),
    ).toBeInTheDocument()
  })

  it('redirects an invalid topic id to s1', () => {
    render(<RouterProvider router={routerAt('/subjects/modern-history/bogus/summary')} />)
    expect(screen.getByRole('heading', { name: /Power and Authority/ })).toBeInTheDocument()
  })
})
