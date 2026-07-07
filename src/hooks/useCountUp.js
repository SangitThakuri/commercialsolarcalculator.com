import { useEffect, useRef, useState } from 'react'

const DEFAULT_DURATION = 500

function prefersReducedMotion() {
  return (
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches
  )
}

export function useCountUp(targetValue, duration = DEFAULT_DURATION) {
  const [displayValue, setDisplayValue] = useState(targetValue)
  const fromRef = useRef(targetValue)
  const rafRef = useRef(null)

  useEffect(() => {
    if (prefersReducedMotion()) {
      setDisplayValue(targetValue)
      fromRef.current = targetValue
      return undefined
    }

    const from = fromRef.current
    const to = targetValue

    if (from === to) return undefined

    const startTime = performance.now()

    const step = (now) => {
      const progress = Math.min((now - startTime) / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setDisplayValue(from + (to - from) * eased)

      if (progress < 1) {
        rafRef.current = requestAnimationFrame(step)
      } else {
        fromRef.current = to
        setDisplayValue(to)
      }
    }

    rafRef.current = requestAnimationFrame(step)

    return () => cancelAnimationFrame(rafRef.current)
  }, [targetValue, duration])

  return displayValue
}
