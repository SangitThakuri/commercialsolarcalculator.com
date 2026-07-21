// Loaded only after the visitor accepts non-essential cookies on the Cookie Consent Banner —
// see getCookieConsent() in CookieConsentBanner.jsx and the "Analytics Cookies" section of the
// Cookie Policy. Never import/call loadGoogleAnalytics() without checking consent first.
export const GA_MEASUREMENT_ID = 'G-3GB8G04W6P'

let isLoaded = false

export function isAnalyticsLoaded() {
  return isLoaded
}

export function loadGoogleAnalytics() {
  if (isLoaded || typeof window === 'undefined') return
  isLoaded = true

  window.dataLayer = window.dataLayer || []
  window.gtag = function gtag() {
    window.dataLayer.push(arguments)
  }
  window.gtag('js', new Date())
  window.gtag('config', GA_MEASUREMENT_ID)

  const script = document.createElement('script')
  script.async = true
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`
  document.head.appendChild(script)
}

// Call on client-side route changes only — the initial page_view is already sent by the
// gtag('config', ...) call inside loadGoogleAnalytics().
export function trackPageView(path) {
  if (!isLoaded || typeof window.gtag !== 'function') return
  window.gtag('event', 'page_view', {
    page_path: path,
    page_location: window.location.href,
    page_title: document.title,
  })
}
