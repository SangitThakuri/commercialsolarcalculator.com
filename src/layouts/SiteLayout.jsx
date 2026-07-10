import { useState } from 'react'
import { Menu } from 'lucide-react'
import TrustBar from '../components/TrustBar.jsx'
import Footer from '../components/Footer.jsx'
import SidebarNav from '../components/SidebarNav.jsx'
import HeaderSearch from '../components/HeaderSearch.jsx'
import Breadcrumbs from '../components/Breadcrumbs.jsx'
import ThemeToggle from '../components/ThemeToggle.jsx'
import { useDynamicHero } from '../hooks/useDynamicHero.js'

function SiteLayout({
  eyebrow = 'For Businesses & Commercial Property Owners',
  title,
  description,
  breadcrumbLabel,
  breadcrumbParent,
  children,
}) {
  const [isNavOpen, setIsNavOpen] = useState(false)

  // If this page was reached via ?ref=/?q= with a search term whose canonical
  // destination is this exact route, swap in a headline matching that term.
  const hero = useDynamicHero({ defaultTitle: title, defaultIntro: description })

  return (
    <div className="xl:flex">
      <SidebarNav isOpen={isNavOpen} onClose={() => setIsNavOpen(false)} />

      <div className="flex min-h-screen flex-1 flex-col bg-white dark:bg-slate-900 xl:min-w-0">
        <header className="relative border-b border-slate-200 bg-gradient-to-br from-white via-white to-slate-50 px-4 py-6 dark:border-slate-800 dark:from-slate-900 dark:via-slate-900 dark:to-slate-950 sm:px-8">
          <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
            <div className="absolute -top-24 right-0 h-72 w-72 rounded-full bg-emerald-500/10 blur-3xl" />
          </div>
          <div className="relative mx-auto max-w-6xl">
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => setIsNavOpen(true)}
                aria-label="Open all calculators menu"
                className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg border border-slate-300 bg-slate-100 text-slate-600 transition hover:border-emerald-500 hover:text-emerald-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500/40 dark:border-slate-700 dark:bg-slate-800/60 dark:text-slate-200 dark:hover:text-emerald-400 xl:hidden"
              >
                <Menu className="h-4 w-4" aria-hidden="true" />
              </button>

              <div className="max-w-md flex-1">
                <HeaderSearch />
              </div>

              <ThemeToggle />
            </div>

            <p className="mt-5 text-xs font-semibold uppercase tracking-widest text-emerald-600 dark:text-emerald-500">
              {eyebrow}
            </p>
            <h1 className="mt-1 text-2xl font-bold text-slate-900 dark:text-white sm:text-3xl">
              {hero.title}
            </h1>
            <p className="mt-2 max-w-2xl text-sm text-slate-600 dark:text-slate-400">
              {hero.intro}
            </p>
          </div>
        </header>

        <TrustBar />

        {breadcrumbLabel && <Breadcrumbs label={breadcrumbLabel} parent={breadcrumbParent} />}

        <main className="flex-1 px-4 py-8 sm:px-8">{children}</main>

        <Footer />
      </div>
    </div>
  )
}

export default SiteLayout
