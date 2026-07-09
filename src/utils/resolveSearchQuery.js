import { KEYWORD_ROUTE_MAP, normalizeKeyword } from '../data/keywordRouteMap.js'

/**
 * Resolves free-typed search input (from the sidebar search box, or any future command
 * palette) to an internal route, using three tiers of confidence:
 *
 *  1. Exact match against a known keyword phrase.
 *  2. Substring match, either direction — handles typos of extra/missing words
 *     ("solar array cost calc" contains no full phrase, but "solar array calculator"
 *     is contained in a slightly longer typed query, etc). The longest matching known
 *     phrase wins, since a longer overlap is a more specific/confident signal.
 *  3. Word-overlap fallback — e.g. "photovoltaic calculator" shares 2 of 3 words with
 *     "photovoltaic panels calculator" even though neither string contains the other.
 *
 * Returns the matched route string, or null if nothing meets even the word-overlap bar.
 */
export function resolveSearchQuery(rawInput) {
  const query = normalizeKeyword(rawInput || '')
  if (!query) return null

  const exact = KEYWORD_ROUTE_MAP[query]
  if (exact) return exact

  const entries = Object.entries(KEYWORD_ROUTE_MAP)

  const substringMatches = entries
    .filter(([phrase]) => phrase.includes(query) || query.includes(phrase))
    .sort((a, b) => b[0].length - a[0].length)
  if (substringMatches.length > 0) return substringMatches[0][1]

  const queryWords = new Set(query.split(' '))
  let bestRoute = null
  let bestOverlap = 0

  for (const [phrase, route] of entries) {
    const overlap = phrase.split(' ').filter((word) => queryWords.has(word)).length
    if (overlap > bestOverlap) {
      bestOverlap = overlap
      bestRoute = route
    }
  }

  return bestOverlap > 0 ? bestRoute : null
}
