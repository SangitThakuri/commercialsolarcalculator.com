import SiteLayout from '../layouts/SiteLayout.jsx'
import { usePageMeta } from '../hooks/usePageMeta.js'

const TITLE = 'Calculation Methodology'
const DESCRIPTION =
  'How every figure on Commercial Solar Calculator is derived: system sizing, gross cost, the federal ITC, MACRS depreciation, net capital, payback period, and the 25-year cash flow projection.'
const PATH = '/methodology'

function MethodologyPage() {
  usePageMeta({
    title: `${TITLE} | Commercial Solar Calculator`,
    description: DESCRIPTION,
    path: PATH,
  })

  return (
    <SiteLayout
      title={TITLE}
      description="How every number on this site is derived — plainly, with the formulas and assumptions behind them."
      breadcrumbLabel={TITLE}
    >
      <div className="mx-auto max-w-3xl">
        <section className="animate-fade-in-up rounded-2xl bg-white p-6 shadow-lg ring-1 ring-slate-900/5 dark:bg-slate-800 dark:ring-white/10 sm:p-10">
          <div className="prose-legal space-y-6 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
            <p>
              This calculator uses simplified, formula-based estimates so results update instantly
              as you adjust the sliders. It is not a substitute for a site-specific engineering or
              tax proposal.
            </p>
            <ul className="list-disc space-y-3 pl-5">
              <li>
                <strong className="text-slate-900 dark:text-white">System Size:</strong> your
                average monthly business electric bill is converted to estimated monthly kWh usage
                at a blended $0.13/kWh national average commercial rate, then sized against roughly
                135 kWh of monthly production per installed kW at 120% of that usage to allow for
                future load growth.
              </li>
              <li>
                <strong className="text-slate-900 dark:text-white">Gross System Cost:</strong>{' '}
                System Size × $2,300 per kW, a blended national average for commercial turnkey
                installation.
              </li>
              <li>
                <strong className="text-slate-900 dark:text-white">Federal ITC:</strong> 30% of
                Gross System Cost under IRC Section 48E.
              </li>
              <li>
                <strong className="text-slate-900 dark:text-white">Depreciable Basis:</strong>{' '}
                Gross System Cost minus 50% of the ITC amount, per the basis-reduction rule in IRC
                Section 50(c).
              </li>
              <li>
                <strong className="text-slate-900 dark:text-white">MACRS Tax Shield:</strong>{' '}
                Depreciable Basis × (21% federal + your state corporate tax rate) — a blended
                estimate of the 5-year accelerated depreciation benefit.
              </li>
              <li>
                <strong className="text-slate-900 dark:text-white">Net Capital Required:</strong>{' '}
                Gross System Cost minus the ITC minus the MACRS Tax Shield.
              </li>
              <li>
                <strong className="text-slate-900 dark:text-white">Payback Period:</strong> Net
                Capital Required ÷ (Monthly Bill × 12 × 95% offset).
              </li>
              <li>
                <strong className="text-slate-900 dark:text-white">25-Year Cash Flow:</strong>{' '}
                annual savings compounding at 3% per year, starting from a negative position equal
                to Net Capital Required.
              </li>
            </ul>
            <p>
              Every dedicated calculator on this site (loan, lease, battery storage, demand charge,
              EV charging, roof space, and the rest) builds on this same core model with the
              specific inputs relevant to that question. None of these figures account for your
              specific site conditions, utility tariff, or tax position — always confirm with a
              licensed solar engineer and a qualified tax professional before making an investment
              decision.
            </p>
          </div>
        </section>
      </div>
    </SiteLayout>
  )
}

export default MethodologyPage
