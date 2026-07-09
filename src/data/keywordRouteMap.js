/**
 * Maps high-volume synonym search phrases to the real internal route that best answers
 * that query. Grouped by destination route so it's obvious at a glance which page owns
 * which keyword variants — the flat lookup map below is derived from this automatically.
 *
 * NOTE on two adaptations from a literal 1:1 keyword brief:
 * 1. Routes here are this site's actual top-level slugs (e.g. "/solar-panel-size-calculator"),
 *    not a "/calculators/*" prefix — renaming existing routes now would break already-indexed
 *    URLs, footer links, sitemap.xml, and JSON-LD canonicals built around the flat scheme.
 * 2. "solar panel cost calculator" / "solar cost calculator" route to the dedicated
 *    Commercial Solar Cost Calculator (installed cost per watt), not the Electricity Cost
 *    Calculator (which models your utility bill *without* solar) — that's the closer
 *    semantic match for a "cost" query. Swap the route below if you intended otherwise.
 * 3. "rooftop calculator" has no dedicated destination yet, so it falls back to the Solar
 *    Panel Size Calculator (closest existing match: rooftop sizing/capacity). If you meant
 *    a landlord/property-owner "lease your roof to a solar developer" calculator, that's a
 *    genuinely different, buildable tool — let me know and I'll add it as its own page.
 */
export const ROUTE_KEYWORD_SYNONYMS = {
  '/solar-panel-size-calculator': [
    'solar panel calculator',
    'solar array calculator',
    'pv panel calculator',
    'photovoltaic panels calculator',
    'rooftop calculator',
  ],
  '/commercial-solar-cost-calculator': ['solar panel cost calculator', 'solar cost calculator'],
  '/': ['solar installation calculator', 'solar electricity calculator', 'solar calculator'],
}

function normalizeKeyword(text) {
  return text
    .toLowerCase()
    .replace(/[-_+]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
}

// Flat "keyword phrase" -> "route" lookup, built once from the synonyms table above.
export const KEYWORD_ROUTE_MAP = Object.entries(ROUTE_KEYWORD_SYNONYMS).reduce(
  (map, [route, keywords]) => {
    keywords.forEach((keyword) => {
      map[normalizeKeyword(keyword)] = route
    })
    return map
  },
  {},
)

export { normalizeKeyword }
