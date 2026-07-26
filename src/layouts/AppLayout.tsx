import { Outlet } from 'react-router-dom'
import { SqSprite } from '../components/SqSprite'
import { Topbar } from '../components/Topbar'
import { RailUiProvider } from '../context/RailUiContext'

export function AppLayout() {
  return (
    <RailUiProvider>
      <SqSprite />
      <Topbar />
      <Outlet />
    </RailUiProvider>
  )
}
