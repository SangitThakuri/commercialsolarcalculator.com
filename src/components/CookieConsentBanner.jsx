import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

export const COOKIE_CONSENT_KEY = 'cookie-consent-preference'

/**
 * Reads the visitor's stored cookie choice. Any future analytics/advertising script should
 * gate itself on `getCookieConsent() === 'accepted'` before loading — see Cookie Policy.
 */
export function getCookieConsent() {
  if (typeof window === 'undefined') return null
  try {
    return window.localStorage.getItem(COOKIE_CONSENT_KEY)
  } catch {
    return null
  }
}

function CookieConsentBanner() {
  const [choice, setChoice] = useState(() => getCookieConsent())

  useEffect(() => {
    // Re-check on mount in case another tab already recorded a choice.
    setChoice(getCookieConsent())
  }, [])

  if (choice) return null

  const recordChoice = (value) => {
    try {
      window.localStorage.setItem(COOKIE_CONSENT_KEY, value)
    } catch {
      // Storage unavailable (private browsing, etc.) — the banner will simply reappear
      // next visit, which is an acceptable fallback rather than blocking the user.
    }
    setChoice(value)
  }

  return (
    <div
      role="region"
      aria-label="Cookie consent"
      className="animate-fade-in-up fixed inset-x-0 bottom-0 z-[60] border-t border-slate-800 bg-slate-900/95 px-4 py-4 shadow-[0_-8px_30px_rgba(0,0,0,0.35)] backdrop-blur sm:px-6"
    >
      <div className="mx-auto flex max-w-6xl flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm leading-relaxed text-slate-300">
          We use strictly necessary local storage to remember this choice, plus optional cookies
          for analytics and advertising if you accept them. See our{' '}
          <Link to="/cookie-policy" className="font-semibold text-emerald-400 hover:underline">
            Cookie Policy
          </Link>{' '}
          and{' '}
          <Link to="/privacy-policy" className="font-semibold text-emerald-400 hover:underline">
            Privacy Policy
          </Link>
          .
        </p>

        <div className="flex flex-shrink-0 gap-3">
          <button
            type="button"
            onClick={() => recordChoice('rejected')}
            className="flex-1 rounded-lg border border-slate-600 px-5 py-2.5 text-sm font-semibold text-slate-200 transition hover:border-slate-400 hover:bg-slate-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500/40 sm:flex-none"
          >
            Reject Non-Essential
          </button>
          <button
            type="button"
            onClick={() => recordChoice('accepted')}
            className="flex-1 rounded-lg bg-emerald-500 px-5 py-2.5 text-sm font-semibold text-slate-900 transition hover:bg-emerald-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-300 sm:flex-none"
          >
            Accept All
          </button>
        </div>
      </div>
    </div>
  )
}

export default CookieConsentBanner
