import { render, screen } from '@testing-library/react'
import { createMemoryRouter, RouterProvider } from 'react-router-dom'
import { AppLayout } from './layouts/AppLayout'
import { PublicLayout } from './layouts/PublicLayout'
import { AuthProvider } from './context/AuthContext'
import { Landing } from './pages/Landing'
import { ModernHistorySubject } from './pages/ModernHistorySubject'
import { ModernHistoryTopic } from './pages/ModernHistoryTopic'
import { MathsTopic } from './pages/MathsTopic'

function routerAt(initialPath: string) {
  return createMemoryRouter(
    [
      {
        element: <PublicLayout />,
        children: [{ path: '/', element: <Landing /> }],
      },
      {
        element: <AppLayout />,
        children: [
          { path: '/subjects/modern-history', element: <ModernHistorySubject /> },
          { path: '/subjects/modern-history/:topicId/:resource', element: <ModernHistoryTopic /> },
          { path: '/subjects/maths/:slug/:resource', element: <MathsTopic /> },
        ],
      },
    ],
    { initialEntries: [initialPath] },
  )
}

function renderAt(initialPath: string) {
  return render(
    <AuthProvider>
      <RouterProvider router={routerAt(initialPath)} />
    </AuthProvider>,
  )
}

describe('routing', () => {
  it('renders the public landing page with the subject showcase', () => {
    renderAt('/')
    expect(screen.getByRole('heading', { name: /Your HSC tutor/ })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'Modern History' })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'Mathematics Standard 2' })).toBeInTheDocument()
  })

  it('renders the modern history subject page with all four topics', () => {
    renderAt('/subjects/modern-history')
    expect(screen.getByRole('heading', { name: 'Modern History' })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: /Power & Authority/ })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: /Russia & the USSR/ })).toBeInTheDocument()
  })

  it('renders a modern history topic summary with the rail and decoded breadcrumb', () => {
    renderAt('/subjects/modern-history/s1/summary')
    expect(screen.getByRole('heading', { name: /Power and Authority/ })).toBeInTheDocument()
    // the breadcrumb must decode "Power &amp; Authority", not show the raw entity
    expect(screen.queryByText(/&amp;/)).not.toBeInTheDocument()
    expect(screen.getAllByText(/Power & Authority/).length).toBeGreaterThan(0)
  })

  it('renders a maths topic practice panel with working numeric questions', () => {
    renderAt('/subjects/maths/f4/practice')
    expect(screen.getByRole('heading', { name: 'Investments and Loans' })).toBeInTheDocument()
    expect(screen.getAllByRole('button', { name: 'Check' }).length).toBeGreaterThan(0)
  })

  it('renders a maths topic facts panel with decoded formulae', () => {
    renderAt('/subjects/maths/f4/facts')
    expect(screen.getByText('Key facts & formulae')).toBeInTheDocument()
  })

  it('redirects an invalid topic id to s1', () => {
    renderAt('/subjects/modern-history/bogus/summary')
    expect(screen.getByRole('heading', { name: /Power and Authority/ })).toBeInTheDocument()
  })
})
