import { lazy } from 'react'
import { createBrowserRouter } from 'react-router-dom'
import { AppLayout } from './layouts/AppLayout'

const Home = lazy(() => import('./pages/Home').then((m) => ({ default: m.Home })))
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
      { path: '/progress', element: <ProgressDashboard /> },
      { path: '/subjects/modern-history', element: <ModernHistorySubject /> },
      { path: '/subjects/modern-history/:topicId/:resource', element: <ModernHistoryTopic /> },
      { path: '/subjects/maths', element: <MathsSubject /> },
      { path: '/subjects/maths/:slug/:resource', element: <MathsTopic /> },
      { path: '/subjects/hms', element: <HmsSubject /> },
      { path: '/subjects/hms/:topicId/:resource', element: <HmsTopic /> },
      { path: '/subjects/business', element: <BusinessSubject /> },
      { path: '/subjects/business/:topicId/:resource', element: <BusinessTopic /> },
      { path: '/subjects/legal', element: <LegalSubject /> },
      { path: '/subjects/legal/:topicId/:resource', element: <LegalTopic /> },
    ],
  },
])
