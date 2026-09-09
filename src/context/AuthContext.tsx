import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import type { Session, User } from '@supabase/supabase-js'
import { supabase } from '../lib/supabase/client'
import { attachProgressSync, detachProgressSync } from '../lib/progressSync'

type AuthValue = {
  /** Whether VITE_SUPABASE_URL / VITE_SUPABASE_ANON_KEY are set at all. When
   * false, accounts are simply off — every subject stays unlocked, matching
   * local dev/preview with no backend wired up. */
  isConfigured: boolean
  /** True until the initial session check resolves. */
  loading: boolean
  user: User | null
  session: Session | null
  signUp: (name: string, email: string, password: string) => Promise<{ error: string | null }>
  signIn: (email: string, password: string) => Promise<{ error: string | null }>
  signOut: () => Promise<void>
}

const AuthContext = createContext<AuthValue | null>(null)

export function AuthProvider({ children }: { children: ReactNode }) {
  const isConfigured = supabase !== null
  const [loading, setLoading] = useState(isConfigured)
  const [session, setSession] = useState<Session | null>(null)

  useEffect(() => {
    if (!supabase) return
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session)
      setLoading(false)
    })
    const { data: sub } = supabase.auth.onAuthStateChange((_event, next) => {
      setSession(next)
    })
    return () => sub.subscription.unsubscribe()
  }, [])

  useEffect(() => {
    const userId = session?.user.id
    if (userId) void attachProgressSync(userId)
    else detachProgressSync()
  }, [session?.user.id])

  const value = useMemo<AuthValue>(
    () => ({
      isConfigured,
      loading,
      user: session?.user ?? null,
      session,
      async signUp(name, email, password) {
        if (!supabase) return { error: 'Accounts are not set up yet.' }
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: { data: { display_name: name } },
        })
        return { error: error?.message ?? null }
      },
      async signIn(email, password) {
        if (!supabase) return { error: 'Accounts are not set up yet.' }
        const { error } = await supabase.auth.signInWithPassword({ email, password })
        return { error: error?.message ?? null }
      },
      async signOut() {
        if (!supabase) return
        await supabase.auth.signOut()
      },
    }),
    [isConfigured, loading, session],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within an AuthProvider')
  return ctx
}
