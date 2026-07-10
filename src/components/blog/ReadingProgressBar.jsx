import { useEffect, useState } from 'react'

function ReadingProgressBar({ targetRef }) {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      const el = targetRef.current
      if (!el) return

      const rect = el.getBoundingClientRect()
      const elementHeight = rect.height - window.innerHeight
      if (elementHeight <= 0) {
        setProgress(100)
        return
      }

      const scrolled = Math.min(Math.max(-rect.top, 0), elementHeight)
      setProgress((scrolled / elementHeight) * 100)
    }

    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    window.addEventListener('resize', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('resize', handleScroll)
    }
  }, [targetRef])

  return (
    <div
      className="fixed left-0 top-0 z-40 h-1 bg-emerald-500 transition-[width] duration-150 ease-out"
      style={{ width: `${progress}%` }}
      role="progressbar"
      aria-label="Reading progress"
      aria-valuenow={Math.round(progress)}
      aria-valuemin={0}
      aria-valuemax={100}
    />
  )
}

export default ReadingProgressBar
