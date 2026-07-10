import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { CALCULATOR_PAGES, CATEGORIES } from '../data/calculatorPages.js'

/**
 * Grouped by intent (Financial & ROI, Cost & Financing, Tax & Incentives, System Design,
 * Energy Analysis) — deliberately NOT alphabetical, so related tools stay together the way
 * a visitor would actually shop for them. Excludes the page you're currently on.
 */
function RelatedCalculators({
  currentPath,
  heading = 'Explore More Commercial Solar Calculators',
  description = "Every tool below runs the same instant, browser-only calculations — pick the one that matches what you're trying to figure out.",
}) {
  const groups = Object.values(CATEGORIES)
    .map((category) => ({
      category,
      items: CALCULATOR_PAGES.filter((page) => page.category === category && page.path !== currentPath),
    }))
    .filter((group) => group.items.length > 0)

  return (
    <section aria-label="Related calculators" className="animate-fade-in-up">
      <h2 className="text-xl font-bold text-slate-900 dark:text-white sm:text-2xl">{heading}</h2>
      <p className="mt-2 max-w-2xl text-sm leading-relaxed text-slate-600 dark:text-slate-400">
        {description}
      </p>

      <div className="mt-8 space-y-8">
        {groups.map(({ category, items }) => (
          <div key={category}>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
              {category}
            </h3>
            <div className="mt-3 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {items.map((item) => {
                const Icon = item.icon
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    className="group flex flex-col rounded-xl border border-slate-200 bg-white p-4 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-emerald-300 hover:shadow-lg dark:border-slate-700 dark:bg-slate-800 dark:hover:border-emerald-500/40"
                  >
                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-50 dark:bg-emerald-500/10">
                      <Icon className="h-[18px] w-[18px] text-emerald-600 dark:text-emerald-400" aria-hidden="true" />
                    </div>
                    <p className="mt-3 text-sm font-semibold text-slate-900 dark:text-white">
                      {item.label}
                    </p>
                    <p className="mt-1 flex-1 text-xs leading-relaxed text-slate-500 dark:text-slate-400">
                      {item.subtitle}
                    </p>
                    <span className="mt-3 flex items-center gap-1 text-xs font-semibold text-emerald-600 transition group-hover:gap-1.5 dark:text-emerald-400">
                      Try it
                      <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                    </span>
                  </Link>
                )
              })}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

export default RelatedCalculators
