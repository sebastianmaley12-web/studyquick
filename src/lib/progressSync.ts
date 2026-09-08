import { supabase } from './supabase/client'
import { progressStore, type ProgressState } from './progressStore'

const PUSH_DEBOUNCE_MS = 500

let unsubscribe: (() => void) | null = null
let syncingUserId: string | null = null

/** Union merge, local wins on key collisions. Not true last-write-wins
 * (that needs a timestamp per item, which localStorage's shape doesn't
 * carry) — this is the simpler, loss-free stand-in: nothing from either
 * side is ever dropped, so a device that's behind never overwrites a device
 * that's ahead, it just doesn't win ties. */
function mergeState(remote: ProgressState, local: ProgressState): ProgressState {
  return {
    v: 1,
    quiz: { ...remote.quiz, ...local.quiz },
    trivia: { ...remote.trivia, ...local.trivia },
    notes: { ...remote.notes, ...local.notes },
    maths: { ...remote.maths, ...local.maths },
    review: { ...remote.review, ...local.review },
  }
}

async function push(userId: string, data: ProgressState) {
  if (!supabase) return
  await supabase
    .from('progress')
    .upsert({ user_id: userId, data, updated_at: new Date().toISOString() })
}

/** Call once a user is signed in. Pulls their remote progress, merges it
 * with whatever's already in localStorage, writes the merge back to both
 * sides, then keeps pushing local changes to Supabase as they happen. */
export async function attachProgressSync(userId: string) {
  if (!supabase || syncingUserId === userId) return
  detachProgressSync()
  syncingUserId = userId

  const { data } = await supabase
    .from('progress')
    .select('data')
    .eq('user_id', userId)
    .single()
  if (syncingUserId !== userId) return // signed out again while this was in flight

  const remote = (data?.data as ProgressState | undefined) ?? null
  const local = progressStore.getSnapshot()
  const merged = remote ? mergeState(remote, local) : local
  progressStore.hydrate(merged)
  void push(userId, merged)

  let pushTimer: ReturnType<typeof setTimeout> | undefined
  unsubscribe = progressStore.subscribe(() => {
    if (syncingUserId !== userId) return
    clearTimeout(pushTimer)
    pushTimer = setTimeout(() => void push(userId, progressStore.getSnapshot()), PUSH_DEBOUNCE_MS)
  })
}

/** Call on sign-out. Local progress is left exactly as it is — only the
 * push loop to Supabase stops. */
export function detachProgressSync() {
  syncingUserId = null
  unsubscribe?.()
  unsubscribe = null
}
