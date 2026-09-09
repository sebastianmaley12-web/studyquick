import type { Year, ImprovementGoal, StudyStyle } from './profile'

/** Holds the personalisation survey's answers between /onboarding (now
 * reachable before an account exists) and /signup, where they're attached
 * to signUp()'s metadata and copied into `profiles` by the signup trigger
 * — see schema.sql's handle_new_user(). sessionStorage rather than router
 * state so a refresh on /signup doesn't lose them. Cleared once a session
 * picks the data up for real (OnboardingResults, once `user` exists). */
export type OnboardingDraft = {
  year: Year | null
  subjectsStudying: string[]
  focusSubjectId: string | null
  improvementGoal: ImprovementGoal | null
  studyStyle: StudyStyle | null
  biggestChallenge: string
}

const KEY = 'studyquick.onboardingDraft.v1'

export function saveOnboardingDraft(draft: OnboardingDraft) {
  try {
    sessionStorage.setItem(KEY, JSON.stringify(draft))
  } catch {
    // ignore — worst case the student redoes the survey
  }
}

export function loadOnboardingDraft(): OnboardingDraft | null {
  try {
    const raw = sessionStorage.getItem(KEY)
    return raw ? (JSON.parse(raw) as OnboardingDraft) : null
  } catch {
    return null
  }
}

export function clearOnboardingDraft() {
  try {
    sessionStorage.removeItem(KEY)
  } catch {
    // ignore
  }
}
