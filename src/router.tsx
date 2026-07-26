import { createBrowserRouter } from 'react-router-dom'
import { AppLayout } from './layouts/AppLayout'
import { Home } from './pages/Home'
import { ModernHistorySubject } from './pages/ModernHistorySubject'
import { ModernHistoryTopic } from './pages/ModernHistoryTopic'
import { MathsSubject } from './pages/MathsSubject'
import { MathsTopic } from './pages/MathsTopic'

export const router = createBrowserRouter([
  {
    element: <AppLayout />,
    children: [
      { path: '/', element: <Home /> },
      { path: '/subjects/modern-history', element: <ModernHistorySubject /> },
      { path: '/subjects/modern-history/:topicId/:resource', element: <ModernHistoryTopic /> },
      { path: '/subjects/maths', element: <MathsSubject /> },
      { path: '/subjects/maths/:slug/:resource', element: <MathsTopic /> },
    ],
  },
])
