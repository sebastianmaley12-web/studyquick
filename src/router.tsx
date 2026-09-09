import { lazy } from 'react'
import { createBrowserRouter } from 'react-router-dom'
import { AppLayout } from './layouts/AppLayout'
import { PublicLayout } from './layouts/PublicLayout'
import { SubjectGuard } from './components/SubjectGuard'

const Landing = lazy(() => import('./pages/Landing').then((m) => ({ default: m.Landing })))
const Login = lazy(() => import('./pages/Login').then((m) => ({ default: m.Login })))
const Signup = lazy(() => import('./pages/Signup').then((m) => ({ default: m.Signup })))
const Onboarding = lazy(() =>
  import('./pages/Onboarding').then((m) => ({ default: m.Onboarding })),
)
const OnboardingResults = lazy(() =>
  import('./pages/OnboardingResults').then((m) => ({ default: m.OnboardingResults })),
)
const Pricing = lazy(() => import('./pages/Pricing').then((m) => ({ default: m.Pricing })))
const Dashboard = lazy(() => import('./pages/Dashboard').then((m) => ({ default: m.Dashboard })))
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
    element: <PublicLayout />,
    children: [
      { path: '/', element: <Landing /> },
      { path: '/login', element: <Login /> },
      { path: '/signup', element: <Signup /> },
      { path: '/onboarding', element: <Onboarding /> },
      { path: '/onboarding/results', element: <OnboardingResults /> },
      { path: '/pricing', element: <Pricing /> },
    ],
  },
  {
    element: <AppLayout />,
    children: [
      { path: '/dashboard', element: <Dashboard /> },
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
