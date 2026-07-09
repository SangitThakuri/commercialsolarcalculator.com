import { useEffect, useRef, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { Search, X } from 'lucide-react'
import { CALCULATOR_PAGES, CATEGORIES } from '../data/calculatorPages.js'
import { useIsDesktop } from '../hooks/useIsDesktop.js'
import { resolveSearchQuery } from '../utils/resolveSearchQuery.js'

function SidebarNav({ isOpen, onClose }) {
  const location = useLocation()
  const navigate = useNavigate()
  const panelRef = useRef(null)
  const isDesktop = useIsDesktop()
  const [searchTerm, setSearchTerm] = useState('')

  // On desktop the sidebar is a permanent column (always visible via CSS), so it should
  // never be hidden from assistive tech regardless of the mobile-only `isOpen` state.
  const isVisible = isOpen || isDesktop

  // Auto-close the mobile overlay whenever the route changes (e.g. after clicking a link).
  useEffect(() => {
    onClose()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname])

  // Escape-to-close, body-scroll lock, and focus-on-open only apply to the mobile overlay —
  // the desktop column is always open and must never lock page scroll or steal focus.
  useEffect(() => {
    if (!isOpen || isDesktop) return undefined

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', handleKeyDown)

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    panelRef.current?.focus()

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = previousOverflow
    }
  }, [isOpen, isDesktop, onClose])

  const featured = CALCULATOR_PAGES.find((page) => page.featured)
  const groups = Object.values(CATEGORIES).map((category) => ({
    category,
    items: CALCULATOR_PAGES.filter((page) => page.category === category),
  }))

  // Live filter: as the visitor types, only show calculators whose label or subtitle
  // contains the typed text — this is separate from (and complements) the keyword
  // resolver below, which additionally understands known synonym phrases that don't
  // literally appear in any page title (e.g. "pv panel calculator").
  const normalizedSearch = searchTerm.trim().toLowerCase()
  const matchesSearch = (page) =>
    !normalizedSearch ||
    page.label.toLowerCase().includes(normalizedSearch) ||
    page.subtitle.toLowerCase().includes(normalizedSearch)

  const visibleFeatured = featured && matchesSearch(featured) ? featured : null
  const visibleGroups = groups
    .map((group) => ({ ...group, items: group.items.filter(matchesSearch) }))
    .filter((group) => group.items.length > 0)
  const hasNoResults = Boolean(normalizedSearch) && !visibleFeatured && visibleGroups.length === 0

  // Enter jumps straight to the best match: prefer the keyword-synonym resolver (handles
  // phrases like "solar array calculator" that aren't literal page titles), then fall back
  // to whatever the live filter already narrowed down to.
  const goToBestMatch = () => {
    const resolvedRoute =
      resolveSearchQuery(searchTerm) ?? visibleFeatured?.path ?? visibleGroups[0]?.items[0]?.path

    if (resolvedRoute) {
      navigate(resolvedRoute)
      setSearchTerm('')
      onClose()
    }
  }

  const handleSearchKeyDown = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault()
      goToBestMatch()
    }
  }

  return (
    <>
      <div
        className={`fixed inset-0 z-40 bg-slate-950/70 backdrop-blur-sm transition-opacity duration-300 lg:hidden ${
          isOpen ? 'opacity-100' : 'pointer-events-none opacity-0'
        }`}
        aria-hidden="true"
        onClick={onClose}
      />

      <div
        ref={panelRef}
        role={isDesktop ? undefined : 'dialog'}
        aria-modal={isDesktop ? undefined : true}
        aria-label={isDesktop ? undefined : 'All calculators navigation'}
        aria-hidden={!isVisible}
        tabIndex={-1}
        className={`fixed inset-y-0 left-0 z-50 flex w-[85vw] max-w-xs flex-col bg-slate-900 shadow-2xl transition-transform duration-300 ease-out focus:outline-none lg:sticky lg:top-0 lg:z-0 lg:h-screen lg:w-72 lg:max-w-none lg:flex-shrink-0 lg:translate-x-0 lg:border-r lg:border-slate-800 lg:shadow-none ${
          isOpen ? 'translate-x-0' : '-translate-x-full pointer-events-none lg:pointer-events-auto'
        }`}
      >
        <div className="flex items-center justify-between border-b border-slate-800 px-5 py-4">
          <Link
            to="/"
            onClick={onClose}
            className="flex items-center gap-2 text-sm font-semibold text-white"
          >
            <span aria-hidden="true">☀️</span>
            Commercial Solar Calculator
          </Link>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close navigation menu"
            className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg text-slate-400 transition hover:bg-slate-800 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500/40 lg:hidden"
          >
            <X className="h-5 w-5" aria-hidden="true" />
          </button>
        </div>

        <div className="border-b border-slate-800 px-3 py-3">
          <div className="relative">
            <Search
              className="pointer-events-none absolute left-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500"
              aria-hidden="true"
            />
            <input
              type="search"
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
              onKeyDown={handleSearchKeyDown}
              placeholder="Search calculators..."
              aria-label="Search calculators"
              className="w-full rounded-lg border border-slate-800 bg-slate-800/60 py-2 pl-8 pr-3 text-sm text-white placeholder:text-slate-500 transition focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/30"
            />
          </div>
        </div>

        <nav
          aria-label="Calculator navigation"
          className="flex-1 overflow-y-auto overscroll-contain px-3 py-4"
        >
          {visibleFeatured && (
            <Link
              to={visibleFeatured.path}
              onClick={onClose}
              className={`mb-5 flex items-start gap-3 rounded-xl border p-3 transition ${
                location.pathname === visibleFeatured.path
                  ? 'border-emerald-500/40 bg-emerald-500/10'
                  : 'border-slate-800 bg-slate-800/50 hover:border-slate-700 hover:bg-slate-800'
              }`}
            >
              <visibleFeatured.icon
                className="mt-0.5 h-5 w-5 flex-shrink-0 text-emerald-400"
                aria-hidden="true"
              />
              <span>
                <span className="block text-sm font-semibold text-white">
                  {visibleFeatured.label}
                </span>
                <span className="mt-0.5 block text-xs text-slate-500">
                  {visibleFeatured.subtitle}
                </span>
              </span>
            </Link>
          )}

          {visibleGroups.map(({ category, items }) => (
            <div key={category} className="mb-5">
              <p className="mb-1.5 px-2 text-[11px] font-semibold uppercase tracking-wider text-slate-500">
                {category}
              </p>
              <div className="flex flex-col gap-0.5">
                {items.map((item) => {
                  const isActive = location.pathname === item.path
                  const Icon = item.icon

                  return (
                    <Link
                      key={item.path}
                      to={item.path}
                      onClick={onClose}
                      className={`flex items-start gap-3 rounded-lg px-2 py-2 transition ${
                        isActive
                          ? 'bg-emerald-500/10 text-emerald-400'
                          : 'text-slate-300 hover:bg-slate-800/70 hover:text-white'
                      }`}
                    >
                      <Icon
                        className={`mt-0.5 h-5 w-5 flex-shrink-0 ${
                          isActive ? 'text-emerald-400' : 'text-slate-500'
                        }`}
                        aria-hidden="true"
                      />
                      <span>
                        <span className="block text-sm font-medium leading-tight">
                          {item.label}
                        </span>
                        <span className="mt-0.5 block text-xs leading-snug text-slate-500">
                          {item.subtitle}
                        </span>
                      </span>
                    </Link>
                  )
                })}
              </div>
            </div>
          ))}

          {hasNoResults && (
            <p className="px-2 text-sm text-slate-500">
              No calculators match &quot;{searchTerm}&quot;. Press Enter to search anyway.
            </p>
          )}
        </nav>
      </div>
    </>
  )
}

export default SidebarNav
