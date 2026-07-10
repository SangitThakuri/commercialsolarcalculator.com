import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Search } from 'lucide-react'
import { CALCULATOR_PAGES } from '../data/calculatorPages.js'
import { resolveSearchQuery } from '../utils/resolveSearchQuery.js'

const MAX_RESULTS = 6

/**
 * Persistent top-bar search — visible at every breakpoint, same as cronparser.org's
 * "Search tools..." bar. Live-filters a dropdown of matching calculators by substring,
 * and understands known synonym phrases via resolveSearchQuery() for Enter-to-jump
 * (e.g. "pv panel calculator" doesn't literally appear in any page title).
 */
function HeaderSearch() {
  const [term, setTerm] = useState('')
  const [isOpen, setIsOpen] = useState(false)
  const containerRef = useRef(null)
  const navigate = useNavigate()

  const normalizedTerm = term.trim().toLowerCase()
  const results = normalizedTerm
    ? CALCULATOR_PAGES.filter(
        (page) =>
          page.label.toLowerCase().includes(normalizedTerm) ||
          page.subtitle.toLowerCase().includes(normalizedTerm),
      ).slice(0, MAX_RESULTS)
    : []

  useEffect(() => {
    if (!isOpen) return undefined

    const handleClickOutside = (event) => {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [isOpen])

  const goTo = (path) => {
    navigate(path)
    setTerm('')
    setIsOpen(false)
  }

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault()
      const bestRoute = resolveSearchQuery(term) ?? results[0]?.path
      if (bestRoute) goTo(bestRoute)
    } else if (event.key === 'Escape') {
      setIsOpen(false)
      event.currentTarget.blur()
    }
  }

  return (
    <div ref={containerRef} className="relative w-full">
      <Search
        className="pointer-events-none absolute left-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400 dark:text-slate-500"
        aria-hidden="true"
      />
      <input
        type="search"
        value={term}
        onChange={(event) => {
          setTerm(event.target.value)
          setIsOpen(true)
        }}
        onFocus={() => setIsOpen(true)}
        onKeyDown={handleKeyDown}
        placeholder="Search calculators..."
        aria-label="Search calculators"
        className="w-full rounded-lg border border-slate-300 bg-slate-100 py-2 pl-8 pr-3 text-sm text-slate-900 placeholder:text-slate-400 transition focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/30 dark:border-slate-700 dark:bg-slate-800/60 dark:text-white dark:placeholder:text-slate-500"
      />

      {isOpen && normalizedTerm && (
        <div className="absolute left-0 right-0 z-30 mt-2 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-2xl dark:border-slate-700 dark:bg-slate-900">
          {results.length > 0 ? (
            results.map((page) => {
              const Icon = page.icon
              return (
                <button
                  key={page.path}
                  type="button"
                  onClick={() => goTo(page.path)}
                  className="flex w-full items-start gap-3 px-3 py-2.5 text-left transition hover:bg-slate-100 dark:hover:bg-slate-800"
                >
                  <Icon
                    className="mt-0.5 h-4 w-4 flex-shrink-0 text-emerald-600 dark:text-emerald-400"
                    aria-hidden="true"
                  />
                  <span>
                    <span className="block text-sm font-medium text-slate-900 dark:text-white">
                      {page.label}
                    </span>
                    <span className="mt-0.5 block text-xs text-slate-500 dark:text-slate-500">
                      {page.subtitle}
                    </span>
                  </span>
                </button>
              )
            })
          ) : (
            <p className="px-3 py-3 text-sm text-slate-500 dark:text-slate-500">
              No calculators match &quot;{term}&quot;. Press Enter to search anyway.
            </p>
          )}
        </div>
      )}
    </div>
  )
}

export default HeaderSearch
