import { Link } from 'react-router-dom'
import SiteLayout from '../layouts/SiteLayout.jsx'
import { usePageMeta } from '../hooks/usePageMeta.js'
import { buildBreadcrumbJsonLd } from '../utils/seo.js'

const TITLE = 'About This Calculator'
const DESCRIPTION =
  'What Commercial Solar Calculator is, why it exists, and how its calculation methodology stays transparent.'
const PATH = '/about'

function AboutPage() {
  usePageMeta({
    title: `${TITLE} | Commercial Solar Calculator`,
    description: DESCRIPTION,
    path: PATH,
    jsonLd: [buildBreadcrumbJsonLd(PATH, TITLE)],
  })

  return (
    <SiteLayout
      title={TITLE}
      description="What this site is, why it exists, and how it keeps its math honest."
      breadcrumbLabel="About"
    >
      <div className="mx-auto max-w-3xl">
        <section className="animate-fade-in-up rounded-2xl bg-white p-6 shadow-lg ring-1 ring-slate-900/5 dark:bg-slate-800 dark:ring-white/10 sm:p-10">
          <div className="prose-legal space-y-6 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
            <div>
              <h2 className="text-lg font-bold text-slate-900 dark:text-white">What This Is</h2>
              <p className="mt-2">
                Commercial Solar Calculator is a free set of tools for estimating the real
                financial case for business solar: system sizing, installed cost, the federal
                Section 48E Investment Tax Credit, 5-year MACRS depreciation, financing
                comparisons, payback period, and 25-year cash flow. Every calculator runs entirely
                in your browser — nothing you type is sent to a server, and results update
                instantly as you adjust an input.
              </p>
            </div>

            <div>
              <h2 className="text-lg font-bold text-slate-900 dark:text-white">Why It Exists</h2>
              <p className="mt-2">
                Most solar quotes lead with a system price and a rough savings estimate, without
                showing how the tax credit, depreciation, and financing terms actually interact to
                produce a payback period. This site exists to make that math visible and
                adjustable, so a business owner or facilities manager can stress-test a quote
                against their own numbers before a decision meeting — not to replace the
                site-specific proposal a licensed solar engineer or your tax advisor would
                prepare.
              </p>
            </div>

            <div>
              <h2 className="text-lg font-bold text-slate-900 dark:text-white">
                How the Math Stays Honest
              </h2>
              <p className="mt-2">
                Every formula behind every calculator is documented, in plain language, on the{' '}
                <Link to="/methodology" className="font-semibold text-emerald-600 hover:underline">
                  Calculation Methodology
                </Link>{' '}
                page — there's no hidden model. Where an assumption is a national average (like
                installed cost per watt or utility rate inflation) rather than your specific
                numbers, that's called out directly next to the figure, and our{' '}
                <Link to="/disclaimer" className="font-semibold text-emerald-600 hover:underline">
                  Disclaimer
                </Link>{' '}
                explains the limits of any calculator-based estimate.
              </p>
            </div>

            <div>
              <h2 className="text-lg font-bold text-slate-900 dark:text-white">Who Built It</h2>
              <p className="mt-2">
                This site is built and maintained by an independent developer, not a solar
                installer, financing company, or law firm — we don't sell equipment, financing, or
                installation services, and we have no relationship with any specific installer or
                lender. That independence is also why every calculator defaults to conservative,
                publicly documented federal figures rather than best-case marketing numbers.
              </p>
            </div>

            <div>
              <h2 className="text-lg font-bold text-slate-900 dark:text-white">Get in Touch</h2>
              <p className="mt-2">
                Found a calculation that looks off, or have a calculator you'd like to see added?
                Reach out through our{' '}
                <Link to="/contact" className="font-semibold text-emerald-600 hover:underline">
                  Contact Form
                </Link>
                .
              </p>
            </div>
          </div>
        </section>
      </div>
    </SiteLayout>
  )
}

export default AboutPage
