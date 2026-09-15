import { useEffect, useRef, useState } from 'react'
import { progressStore, useNote } from '../../lib/progressStore'

export function AnswerBox({ noteKey }: { noteKey: string }) {
  const saved = useNote(noteKey)
  const [showSaved, setShowSaved] = useState(false)
  const flashTimer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined)

  useEffect(() => () => clearTimeout(flashTimer.current), [])

  const inputId = `answerbox-${noteKey.replace(/[^a-zA-Z0-9_-]/g, '-')}`

  return (
    <div className="answerbox">
      <label htmlFor={inputId}>
        Your attempt <span className={`saved ${showSaved ? 'show' : ''}`}>saved</span>
      </label>
      <textarea
        id={inputId}
        placeholder="Draft your response here before revealing the plan. Saved automatically on this device."
        value={saved}
        onChange={(e) => {
          progressStore.setNote(noteKey, e.target.value)
          setShowSaved(true)
          clearTimeout(flashTimer.current)
          flashTimer.current = setTimeout(() => setShowSaved(false), 1400)
        }}
      />
    </div>
  )
}
