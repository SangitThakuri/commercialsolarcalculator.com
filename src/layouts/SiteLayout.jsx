import { Link } from 'react-router-dom'
import TrustBar from '../components/TrustBar.jsx'
import Footer from '../components/Footer.jsx'
import CalculatorsMenu from '../components/CalculatorsMenu.jsx'
import Breadcrumbs from '../components/Breadcrumbs.jsx'

function SiteLayout({
  eyebrow = 'For Businesses & Commercial Property Owners',
  title,
  description,
  breadcrumbLabel,
  children,
}) {
  return (
    <div className="flex min-h-screen flex-col bg-slate-900">
      <header className="relative overflow-hidden border-b border-slate-800 bg-gradient-to-br from-slate-900 via-slate-900 to-slate-950 px-4 py-6 sm:px-8">
        <div
          className="pointer-events-none absolute -top-24 right-0 h-72 w-72 rounded-full bg-emerald-500/10 blur-3xl"
          aria-hidden="true"
        />
        <div className="relative mx-auto max-w-6xl">
          <div className="flex items-center justify-between gap-4">
            <Link to="/" className="flex items-center gap-2 text-sm font-semibold text-white">
              <span aria-hidden="true">☀️</span>
              Commercial Solar Calculator
            </Link>
            <CalculatorsMenu />
          </div>

          <p className="mt-5 text-xs font-semibold uppercase tracking-widest text-emerald-500">
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
  )
}

export default SiteLayout
