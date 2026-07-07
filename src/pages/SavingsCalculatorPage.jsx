import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import SiteLayout from '../layouts/SiteLayout.jsx'
import { SliderNumberField } from '../components/InputPanel.jsx'
import StatTile from '../components/StatTile.jsx'
import ReportActions from '../components/ReportActions.jsx'
import SavingsChart from '../components/SavingsChart.jsx'
import { usePageMeta } from '../hooks/usePageMeta.js'
import { buildBreadcrumbJsonLd, buildToolJsonLd } from '../utils/seo.js'
import { calculateSolarMetrics, generateAnnualSavingsSeries } from '../utils/solarMath.js'

const currencyFormatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  maximumFractionDigits: 0,
})

const TITLE = 'Solar Savings Calculator'
const DESCRIPTION =
  'Calculate how much your business will save on electricity with commercial solar — year one, 25-year total, and average monthly savings.'
const PATH = '/solar-savings-calculator'

function SavingsCalculatorPage() {
  usePageMeta({
    title: `${TITLE} | Commercial Solar Calculator`,
    description: DESCRIPTION,
    path: PATH,
    jsonLd: [buildToolJsonLd({ path: PATH, name: TITLE, description: DESCRIPTION }), buildBreadcrumbJsonLd(PATH, TITLE)],
  })

  const [monthlyBill, setMonthlyBill] = useState(5000)

  const metrics = useMemo(() => calculateSolarMetrics(monthlyBill, 0.06), [monthlyBill])
  const series = useMemo(() => generateAnnualSavingsSeries(metrics.annualSavings), [metrics.annualSavings])

  const totalLifetimeSavings = series.reduce((sum, point) => sum + point.savings, 0)
  const averageMonthlySavings = totalLifetimeSavings / 25 / 12

  return (
    <SiteLayout
      title={TITLE}
      description="See how much your business can save on electricity costs with a commercial solar system."
      breadcrumbLabel={TITLE}
    >
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-12 lg:items-start">
        <section
          className="rounded-2xl bg-white p-6 shadow-lg ring-1 ring-slate-900/5 sm:p-8 lg:col-span-4"
          aria-label="Savings calculator inputs"
        >
          <h2 className="text-lg font-semibold text-slate-900">Your Input</h2>
          <div className="mt-6">
            <SliderNumberField
              id="savings-bill"
              label="Average Monthly Electric Bill"
              tooltip="Your average pre-solar monthly electric bill."
              value={monthlyBill}
              onChange={setMonthlyBill}
              min={500}
              max={50000}
              step={100}
              prefix="$"
              ariaLabel="Average monthly electric bill in US dollars"
              minCaption="$500"
              maxCaption="$50,000"
              formatValue={(v) => Math.round(v).toLocaleString('en-US')}
            />
          </div>
        </section>

        <div className="flex flex-col gap-6 lg:col-span-8">
          <section className="rounded-2xl bg-white p-6 shadow-lg ring-1 ring-slate-900/5 sm:p-8">
            <h2 className="text-lg font-semibold text-slate-900">Your Estimated Savings</h2>
            <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-3">
              <StatTile label="Year 1 Savings" value={metrics.annualSavings} format={(v) => currencyFormatter.format(v)} />
              <StatTile
                label="Average Monthly Savings"
                value={averageMonthlySavings}
                format={(v) => currencyFormatter.format(v)}
                highlight
              />
              <StatTile
                label="25-Year Total Savings"
                value={totalLifetimeSavings}
                format={(v) => currencyFormatter.format(v)}
              />
            </div>
          </section>

          <ReportActions
            title="Solar Savings Calculator — Summary"
            lines={[
              `Year 1 Savings: ${currencyFormatter.format(metrics.annualSavings)}`,
              `Average Monthly Savings: ${currencyFormatter.format(averageMonthlySavings)}`,
              `25-Year Total Savings: ${currencyFormatter.format(totalLifetimeSavings)}`,
            ]}
          />

          <section className="rounded-2xl bg-white p-6 shadow-lg ring-1 ring-slate-900/5 sm:p-8">
            <h2 className="text-lg font-semibold text-slate-900">Annual Savings Over Time</h2>
            <div className="mt-6">
              <SavingsChart series={series} />
            </div>
          </section>

          <section className="rounded-2xl bg-white p-6 shadow-lg ring-1 ring-slate-900/5 sm:p-8">
            <h2 className="text-xl font-bold text-slate-900">Why Savings Grow Every Year</h2>
            <div className="mt-4 space-y-4 text-sm leading-relaxed text-slate-600">
              <p>
                This estimate assumes solar offsets 95% of your current usage (accounting for a
                small utility interconnection/standby fee) and that utility rates continue rising
                at roughly 3% per year, the long-run historical average for U.S. commercial
                electricity. Because your solar production cost is effectively fixed once the
                system is installed, every year of utility rate inflation increases the value of
                the electricity you're no longer buying — which is why year-25 savings are
                substantially larger than year-1 savings.
              </p>
              <p>
                This page shows savings only. For the capital cost, tax credit, depreciation, and
                payback period behind these numbers, see the{' '}
                <Link to="/" className="font-semibold text-emerald-600 hover:underline">
                  full Commercial Solar Calculator
                </Link>
                .
              </p>
            </div>
          </section>
        </div>
      </div>
    </SiteLayout>
  )
}

export default SavingsCalculatorPage
