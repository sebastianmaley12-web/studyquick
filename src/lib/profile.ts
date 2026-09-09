import { useEffect, useState } from 'react'
import { useAuth } from '../context/AuthContext'
import { supabase, queryWithRetry } from './supabase/client'

export type Year = '11' | '12'

export type ImprovementGoal =
  | 'understanding'
  | 'keeping_up'
  | 'exam_technique'
  | 'practice_questions'
  | 'overall_marks'
  | 'everything'

export type StudyStyle = 'alone' | 'tutoring' | 'school_resources' | 'mixture'

export const IMPROVEMENT_GOAL_LABELS: Record<ImprovementGoal, string> = {
  understanding: 'Understanding the content',
  keeping_up: 'Keeping up with school',
  exam_technique: 'Exam technique',
  practice_questions: 'Practice questions',
  overall_marks: 'Overall marks',
  everything: 'Everything above',
}

export const STUDY_STYLE_LABELS: Record<StudyStyle, string> = {
  alone: 'Mostly on my own',
  tutoring: 'With tutoring',
  school_resources: 'With school resources',
  mixture: 'A mixture',
}

export type Profile = {
  id: string
  display_name: string | null
  year: Year | null
  subjects_studying: string[]
  focus_subject_id: string | null
  improvement_goal: ImprovementGoal | null
  study_style: StudyStyle | null
  biggest_challenge: string | null
  onboarding_completed_at: string | null
}

type ProfileUpdate = Partial<Omit<Profile, 'id'>>

type ProfileState = {
  isConfigured: boolean
  loading: boolean
  profile: Profile | null
  /** Convenience — false while loading, so callers don't redirect a still-
   * loading user off onboarding before we actually know their status. */
  hasCompletedOnboarding: boolean
  refresh: () => void
  update: (patch: ProfileUpdate) => Promise<{ error: string | null }>
}

export function useProfile(): ProfileState {
  const { isConfigured, user } = useAuth()
  const [profile, setProfile] = useState<Profile | null>(null)
  const [fetchedForUserId, setFetchedForUserId] = useState<string | null>(null)
  const [nonce, setNonce] = useState(0)

  useEffect(() => {
    if (!isConfigured || !supabase || !user) return
    const client = supabase
    let cancelled = false
    const columns =
      'id, display_name, year, subjects_studying, focus_subject_id, improvement_goal, study_style, biggest_challenge, onboarding_completed_at'
    queryWithRetry(() => client.from('profiles').select(columns).eq('id', user.id).single()).then(
      (data) => {
        if (cancelled) return
        setProfile((data as Profile | null) ?? null)
        setFetchedForUserId(user.id)
      },
    )
    return () => {
      cancelled = true
    }
  }, [isConfigured, user, nonce])

  const loading = isConfigured && !!user && fetchedForUserId !== user.id
  const effectiveProfile = user && fetchedForUserId === user.id ? profile : null

  async function update(patch: ProfileUpdate) {
    if (!supabase || !user) return { error: 'Not signed in.' }
    const { error } = await supabase.from('profiles').update(patch).eq('id', user.id)
    if (!error) setProfile((prev) => (prev ? { ...prev, ...patch } : prev))
    return { error: error?.message ?? null }
  }

  return {
    isConfigured,
    loading,
    profile: effectiveProfile,
    hasCompletedOnboarding: !loading && effectiveProfile?.onboarding_completed_at != null,
    refresh: () => setNonce((n) => n + 1),
    update,
  }
}
