import { useEffect, useRef } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { X } from 'lucide-react'
import { CALCULATOR_PAGES, CATEGORIES } from '../data/calculatorPages.js'

function SidebarNav({ isOpen, onClose }) {
  const location = useLocation()
  const panelRef = useRef(null)

  // Auto-close whenever the route changes (e.g. after clicking a nav link).
  useEffect(() => {
    onClose()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname])

  useEffect(() => {
    if (!isOpen) return undefined

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
  }, [isOpen, onClose])

  const featured = CALCULATOR_PAGES.find((page) => page.featured)
  const groups = Object.values(CATEGORIES).map((category) => ({
    category,
    items: CALCULATOR_PAGES.filter((page) => page.category === category),
  }))

  return (
    <>
      <div
        className={`fixed inset-0 z-40 bg-slate-950/70 backdrop-blur-sm transition-opacity duration-300 ${
          isOpen ? 'opacity-100' : 'pointer-events-none opacity-0'
        }`}
        aria-hidden="true"
        onClick={onClose}
      />

      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-label="All calculators navigation"
        aria-hidden={!isOpen}
        tabIndex={-1}
        className={`fixed inset-y-0 left-0 z-50 flex w-[85vw] max-w-xs flex-col bg-slate-900 shadow-2xl transition-transform duration-300 ease-out focus:outline-none ${
          isOpen ? 'translate-x-0' : '-translate-x-full pointer-events-none'
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
            className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg text-slate-400 transition hover:bg-slate-800 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500/40"
          >
            <X className="h-5 w-5" aria-hidden="true" />
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto overscroll-contain px-3 py-4">
          {featured && (
            <Link
              to={featured.path}
              onClick={onClose}
              className={`mb-5 flex items-start gap-3 rounded-xl border p-3 transition ${
                location.pathname === featured.path
                  ? 'border-emerald-500/40 bg-emerald-500/10'
                  : 'border-slate-800 bg-slate-800/50 hover:border-slate-700 hover:bg-slate-800'
              }`}
            >
              <featured.icon
                className="mt-0.5 h-5 w-5 flex-shrink-0 text-emerald-400"
                aria-hidden="true"
              />
              <span>
                <span className="block text-sm font-semibold text-white">{featured.label}</span>
                <span className="mt-0.5 block text-xs text-slate-500">{featured.subtitle}</span>
              </span>
            </Link>
          )}

          {groups.map(({ category, items }) => (
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
        </nav>
      </div>
    </>
  )
}

export default SidebarNav
