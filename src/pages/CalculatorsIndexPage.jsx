import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import SiteLayout from '../layouts/SiteLayout.jsx'
import RelatedCalculators from '../components/RelatedCalculators.jsx'
import { usePageMeta } from '../hooks/usePageMeta.js'
import { buildBreadcrumbJsonLd } from '../utils/seo.js'
import { CALCULATOR_PAGES } from '../data/calculatorPages.js'

const TITLE = 'All Commercial Solar Calculators'
const DESCRIPTION =
  'Every free commercial solar calculator on this site in one place: ROI, payback, system sizing, financing, tax credits, and energy analysis tools.'
const PATH = '/calculators'

function CalculatorsIndexPage() {
  usePageMeta({
    title: `${TITLE} | Commercial Solar Calculator`,
    description: DESCRIPTION,
    path: PATH,
    jsonLd: [buildBreadcrumbJsonLd(PATH, TITLE)],
  })

  const featured = CALCULATOR_PAGES.find((page) => page.featured)
  const FeaturedIcon = featured?.icon

  return (
    <SiteLayout
      title={TITLE}
      description="Every calculator on this site, grouped by what you're trying to figure out."
      breadcrumbLabel="All Calculators"
    >
      <div className="mx-auto max-w-6xl space-y-10">
        {featured && (
          <Link
            to={featured.path}
            className="group flex flex-col gap-4 rounded-2xl border border-emerald-200 bg-emerald-50 p-6 shadow-sm transition hover:-translate-y-0.5 hover:shadow-lg dark:border-emerald-500/30 dark:bg-emerald-500/10 sm:flex-row sm:items-center sm:justify-between"
          >
            <div className="flex items-center gap-4">
              {FeaturedIcon && (
                <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-emerald-500 text-white">
                  <FeaturedIcon className="h-6 w-6" aria-hidden="true" />
                </div>
              )}
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-emerald-700 dark:text-emerald-400">
                  Start Here
                </p>
                <p className="mt-1 text-lg font-bold text-slate-900 dark:text-white">
                  {featured.label}
                </p>
                <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">{featured.subtitle}</p>
              </div>
            </div>
            <span className="flex items-center gap-1 text-sm font-semibold text-emerald-700 transition group-hover:gap-1.5 dark:text-emerald-400">
              Open Calculator
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </span>
          </Link>
        )}

        <RelatedCalculators
          heading="Browse By Category"
          description="Every tool below runs the same instant, browser-only calculations — pick the one that matches what you're trying to figure out."
        />
      </div>
    </SiteLayout>
  )
}

export default CalculatorsIndexPage
