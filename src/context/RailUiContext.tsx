import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react'

/** The rail collapse state is shared between the Modern History and Maths topic
 * shells in the original app (one boolean toggles both), not per-page — so this
 * lives in a provider above both, not in local page state. */
type RailUiValue = {
  collapsed: boolean
  toggleCollapsed: () => void
  mobileOpen: boolean
  openMobile: () => void
  closeMobile: () => void
}

const RailUiContext = createContext<RailUiValue | null>(null)

export function RailUiProvider({ children }: { children: ReactNode }) {
  const [collapsed, setCollapsed] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') setMobileOpen(false)
    }
    document.addEventListener('keydown', onKeyDown)
    return () => document.removeEventListener('keydown', onKeyDown)
  }, [])

  const toggleCollapsed = useCallback(() => setCollapsed((c) => !c), [])
  const openMobile = useCallback(() => setMobileOpen(true), [])
  const closeMobile = useCallback(() => setMobileOpen(false), [])

  const value = useMemo<RailUiValue>(
    () => ({ collapsed, toggleCollapsed, mobileOpen, openMobile, closeMobile }),
    [collapsed, toggleCollapsed, mobileOpen, openMobile, closeMobile],
  )

  return <RailUiContext.Provider value={value}>{children}</RailUiContext.Provider>
}

export function useRailUi() {
  const ctx = useContext(RailUiContext)
  if (!ctx) throw new Error('useRailUi must be used within a RailUiProvider')
  return ctx
}
