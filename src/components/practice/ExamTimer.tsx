import { useEffect, useRef, useState } from 'react'

export function ExamTimer({ minutes }: { minutes: number }) {
  const [left, setLeft] = useState(minutes * 60)
  const [running, setRunning] = useState(false)
  const intervalRef = useRef<ReturnType<typeof setInterval> | undefined>(undefined)

  useEffect(() => {
    if (!running) return
    intervalRef.current = setInterval(() => {
      setLeft((prev) => {
        if (prev <= 1) {
          clearInterval(intervalRef.current)
          setRunning(false)
          // matches the original's alert() on completion
          alert(`Time's up — ${minutes} minutes elapsed.`)
          return 0
        }
        return prev - 1
      })
    }, 1000)
    return () => clearInterval(intervalRef.current)
  }, [running, minutes])

  const m = Math.floor(left / 60)
  const s = left % 60

  return (
    <div className={`timer ${running ? 'run' : ''} ${left <= 300 ? 'low' : ''}`}>
      <span className="tlab">Exam timer</span>
      <span className="tval">
        {m}:{s < 10 ? '0' : ''}
        {s}
      </span>
      <button type="button" title="Start / pause" onClick={() => setRunning((r) => !r)}>
        {running ? '❙❙' : '▶'}
      </button>
      <button
        type="button"
        title="Reset"
        onClick={() => {
          setRunning(false)
          setLeft(minutes * 60)
        }}
      >
        ↺
      </button>
    </div>
  )
}
