import { lazy } from 'react'
import { createBrowserRouter } from 'react-router-dom'
import { AppLayout } from './layouts/AppLayout'
import { SubjectGuard } from './components/SubjectGuard'

const Home = lazy(() => import('./pages/Home').then((m) => ({ default: m.Home })))
const Account = lazy(() => import('./pages/Account').then((m) => ({ default: m.Account })))
const ProgressDashboard = lazy(() =>
  import('./pages/ProgressDashboard').then((m) => ({ default: m.ProgressDashboard })),
)
const ModernHistorySubject = lazy(() =>
  import('./pages/ModernHistorySubject').then((m) => ({ default: m.ModernHistorySubject })),
)
const ModernHistoryTopic = lazy(() =>
  import('./pages/ModernHistoryTopic').then((m) => ({ default: m.ModernHistoryTopic })),
)
const MathsSubject = lazy(() =>
  import('./pages/MathsSubject').then((m) => ({ default: m.MathsSubject })),
)
const MathsTopic = lazy(() => import('./pages/MathsTopic').then((m) => ({ default: m.MathsTopic })))
const HmsSubject = lazy(() => import('./pages/HmsSubject').then((m) => ({ default: m.HmsSubject })))
const HmsTopic = lazy(() => import('./pages/HmsTopic').then((m) => ({ default: m.HmsTopic })))
const BusinessSubject = lazy(() =>
  import('./pages/BusinessSubject').then((m) => ({ default: m.BusinessSubject })),
)
const BusinessTopic = lazy(() =>
  import('./pages/BusinessTopic').then((m) => ({ default: m.BusinessTopic })),
)
const LegalSubject = lazy(() =>
  import('./pages/LegalSubject').then((m) => ({ default: m.LegalSubject })),
)
const LegalTopic = lazy(() => import('./pages/LegalTopic').then((m) => ({ default: m.LegalTopic })))

export const router = createBrowserRouter([
  {
    element: <AppLayout />,
    children: [
      { path: '/', element: <Home /> },
      { path: '/account', element: <Account /> },
      { path: '/progress', element: <ProgressDashboard /> },
      {
        path: '/subjects/modern-history',
        element: (
          <SubjectGuard subjectId="modern-history">
            <ModernHistorySubject />
          </SubjectGuard>
        ),
      },
      {
        path: '/subjects/modern-history/:topicId/:resource',
        element: (
          <SubjectGuard subjectId="modern-history">
            <ModernHistoryTopic />
          </SubjectGuard>
        ),
      },
      {
        path: '/subjects/maths',
        element: (
          <SubjectGuard subjectId="maths">
            <MathsSubject />
          </SubjectGuard>
        ),
      },
      {
        path: '/subjects/maths/:slug/:resource',
        element: (
          <SubjectGuard subjectId="maths">
            <MathsTopic />
          </SubjectGuard>
        ),
      },
      {
        path: '/subjects/hms',
        element: (
          <SubjectGuard subjectId="hms">
            <HmsSubject />
          </SubjectGuard>
        ),
      },
      {
        path: '/subjects/hms/:topicId/:resource',
        element: (
          <SubjectGuard subjectId="hms">
            <HmsTopic />
          </SubjectGuard>
        ),
      },
      {
        path: '/subjects/business',
        element: (
          <SubjectGuard subjectId="business">
            <BusinessSubject />
          </SubjectGuard>
        ),
      },
      {
        path: '/subjects/business/:topicId/:resource',
        element: (
          <SubjectGuard subjectId="business">
            <BusinessTopic />
          </SubjectGuard>
        ),
      },
      {
        path: '/subjects/legal',
        element: (
          <SubjectGuard subjectId="legal">
            <LegalSubject />
          </SubjectGuard>
        ),
      },
      {
        path: '/subjects/legal/:topicId/:resource',
        element: (
          <SubjectGuard subjectId="legal">
            <LegalTopic />
          </SubjectGuard>
        ),
      },
    ],
  },
])
