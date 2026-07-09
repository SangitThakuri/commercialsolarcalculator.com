import { useLocation, useSearchParams } from 'react-router-dom'
import { KEYWORD_ROUTE_MAP, normalizeKeyword } from '../data/keywordRouteMap.js'

// Common acronyms that should stay fully uppercase instead of naive title-casing.
const ACRONYMS = new Set(['pv'])

function toTitleCase(text) {
  return text
    .split(' ')
    .map((word) => {
      if (!word) return word
      return ACRONYMS.has(word) ? word.toUpperCase() : word[0].toUpperCase() + word.slice(1)
    })
    .join(' ')
}

/**
 * Swaps a page's default H1 + intro for copy that echoes the visitor's exact search
 * term, when they arrive via ?ref= or ?q= (e.g. from a paid ad or a synonym-keyword
 * redirect) — classic dynamic keyword insertion for conversion/relevance, not an SEO
 * trick: because this is a client-rendered SPA, Googlebot indexes the *default* copy
 * for the bare URL; this only affects what a referred visitor sees.
 *
 * Falls back to the page's default title/intro when:
 *  - no ref/q param is present, or
 *  - the term is unknown, or maps to a *different* route than the current page
 *    (prevents a mismatched headline if a link's ref param doesn't match its target).
 *
 * @param {object} options
 * @param {string} options.defaultTitle
 * @param {string} options.defaultIntro
 * @param {(title: string) => string} [options.introTemplate] - optional generator for a
 *   personalized intro sentence; receives the title-cased search term.
 */
export function useDynamicHero({ defaultTitle, defaultIntro, introTemplate }) {
  const [searchParams] = useSearchParams()
  const location = useLocation()

  const rawTerm = searchParams.get('ref') || searchParams.get('q')

  if (!rawTerm) {
    return { title: defaultTitle, intro: defaultIntro, isPersonalized: false }
  }

  const normalizedTerm = normalizeKeyword(rawTerm)
  const mappedRoute = KEYWORD_ROUTE_MAP[normalizedTerm]

  // Only personalize if this term's canonical destination is the page we're actually on.
  if (!mappedRoute || mappedRoute !== location.pathname) {
    return { title: defaultTitle, intro: defaultIntro, isPersonalized: false }
  }

  const title = toTitleCase(normalizedTerm)
  const intro = introTemplate
    ? introTemplate(title)
    : `Free, instant results for "${title}" — the same commercial-grade Section 48E and MACRS math used throughout this site.`

  return { title, intro, isPersonalized: true }
}
