import { useEffect, useState } from 'react'

// Matches Tailwind's `xl` breakpoint — the sidebar is a permanent column at 1280px+ and a
// collapsible drawer on everything below that (tablet and mobile).
const DESKTOP_QUERY = '(min-width: 1280px)'

export function useIsDesktop() {
  const [isDesktop, setIsDesktop] = useState(
    () => typeof window !== 'undefined' && window.matchMedia(DESKTOP_QUERY).matches,
  )

  useEffect(() => {
    const mediaQueryList = window.matchMedia(DESKTOP_QUERY)
    const handleChange = (event) => setIsDesktop(event.matches)

    mediaQueryList.addEventListener('change', handleChange)
    return () => mediaQueryList.removeEventListener('change', handleChange)
  }, [])

  return isDesktop
}
