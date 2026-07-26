import { Suspense } from 'react'
import { Outlet } from 'react-router-dom'
import { SqSprite } from '../components/SqSprite'
import { Topbar } from '../components/Topbar'
import { Footer } from '../components/Footer'
import { RailUiProvider } from '../context/RailUiContext'

export function AppLayout() {
  return (
    <RailUiProvider>
      <SqSprite />
      <Topbar />
      <Suspense fallback={null}>
        <Outlet />
      </Suspense>
      <Footer />
    </RailUiProvider>
  )
}
