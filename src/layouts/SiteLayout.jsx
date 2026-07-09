import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Menu } from 'lucide-react'
import TrustBar from '../components/TrustBar.jsx'
import Footer from '../components/Footer.jsx'
import SidebarNav from '../components/SidebarNav.jsx'
import Breadcrumbs from '../components/Breadcrumbs.jsx'

function SiteLayout({
  eyebrow = 'For Businesses & Commercial Property Owners',
  title,
  description,
  breadcrumbLabel,
  children,
}) {
  const [isNavOpen, setIsNavOpen] = useState(false)

  return (
    <div className="lg:flex">
      <SidebarNav isOpen={isNavOpen} onClose={() => setIsNavOpen(false)} />

      <div className="flex min-h-screen flex-1 flex-col bg-slate-900 lg:min-w-0">
        <header className="relative border-b border-slate-800 bg-gradient-to-br from-slate-900 via-slate-900 to-slate-950 px-4 py-6 sm:px-8">
          <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
            <div className="absolute -top-24 right-0 h-72 w-72 rounded-full bg-emerald-500/10 blur-3xl" />
          </div>
          <div className="relative mx-auto max-w-6xl">
            <div className="flex items-center justify-between gap-4 lg:hidden">
              <Link to="/" className="flex items-center gap-2 text-sm font-semibold text-white">
                <span aria-hidden="true">☀️</span>
                Commercial Solar Calculator
              </Link>
              <button
                type="button"
                onClick={() => setIsNavOpen(true)}
                aria-label="Open all calculators menu"
                className="flex items-center gap-1.5 rounded-lg border border-slate-700 bg-slate-800/60 px-3 py-1.5 text-xs font-semibold text-slate-200 transition hover:border-emerald-500 hover:text-emerald-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500/40"
              >
                <Menu className="h-4 w-4" aria-hidden="true" />
                All Calculators
              </button>
            </div>

            <p className="mt-5 text-xs font-semibold uppercase tracking-widest text-emerald-500 lg:mt-0">
              {eyebrow}
            </p>
            <h1 className="mt-1 text-2xl font-bold text-white sm:text-3xl">{title}</h1>
            <p className="mt-2 max-w-2xl text-sm text-slate-400">{description}</p>
          </div>
        </header>

        <TrustBar />

        {breadcrumbLabel && <Breadcrumbs label={breadcrumbLabel} />}

        <main className="flex-1 px-4 py-8 sm:px-8">{children}</main>

        <Footer />
      </div>
    </div>
  )
}

export default SiteLayout
