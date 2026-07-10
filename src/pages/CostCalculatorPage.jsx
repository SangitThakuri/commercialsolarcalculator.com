import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import SiteLayout from '../layouts/SiteLayout.jsx'
import { SliderNumberField } from '../components/InputPanel.jsx'
import StatTile from '../components/StatTile.jsx'
import ReportActions from '../components/ReportActions.jsx'
import CostBreakdownChart from '../components/CostBreakdownChart.jsx'
import { usePageMeta } from '../hooks/usePageMeta.js'
import { buildBreadcrumbJsonLd, buildToolJsonLd } from '../utils/seo.js'
import { calculateCostBreakdown } from '../utils/solarMath.js'

const currencyFormatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  maximumFractionDigits: 0,
})

const TITLE = 'Commercial Solar Cost Calculator'
const DESCRIPTION =
  'Estimate your total commercial solar installation cost and see the per-component breakdown — panels, inverters, racking, labor, and soft costs.'
const PATH = '/commercial-solar-cost-calculator'

function CostCalculatorPage() {
  usePageMeta({
    title: `${TITLE} | Commercial Solar Calculator`,
    description: DESCRIPTION,
    path: PATH,
    jsonLd: [buildToolJsonLd({ path: PATH, name: TITLE, description: DESCRIPTION }), buildBreadcrumbJsonLd(PATH, TITLE)],
  })

  const [monthlyBill, setMonthlyBill] = useState(5000)

  const cost = useMemo(() => calculateCostBreakdown(monthlyBill), [monthlyBill])

  return (
    <SiteLayout
      title={TITLE}
      description="See your estimated total installed cost, cost per watt, and exactly where the money goes."
      breadcrumbLabel={TITLE}
    >
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-12 lg:items-start">
        <section
          className="rounded-2xl bg-white p-6 shadow-lg ring-1 ring-slate-900/5 dark:bg-slate-800 dark:ring-white/10 sm:p-8 lg:col-span-4"
          aria-label="Cost calculator inputs"
        >
          <h2 className="text-lg font-semibold text-slate-900 dark:text-white">Your Input</h2>
          <div className="mt-6">
            <SliderNumberField
              id="cost-bill"
              label="Average Monthly Electric Bill"
              tooltip="Your average pre-solar monthly electric bill — used to estimate the system size this cost is based on."
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
          <section className="rounded-2xl bg-white p-6 shadow-lg ring-1 ring-slate-900/5 dark:bg-slate-800 dark:ring-white/10 sm:p-8">
            <h2 className="text-lg font-semibold text-slate-900 dark:text-white">Estimated Installed Cost</h2>
            <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-3">
              <StatTile
                label="Total Installed Cost"
                value={cost.grossCost}
                format={(v) => currencyFormatter.format(v)}
                highlight
              />
              <StatTile label="System Size" value={cost.systemSizeKw} format={(v) => `${Math.round(v)} kW`} />
              <StatTile label="Cost per Watt" value={cost.costPerWatt} format={(v) => `$${v.toFixed(2)}/W`} />
            </div>
          </section>

          <ReportActions
            title="Commercial Solar Cost Calculator — Summary"
            lines={[
              `System Size: ${cost.systemSizeKw} kW`,
              `Total Installed Cost: ${currencyFormatter.format(cost.grossCost)}`,
              `Cost per Watt: $${cost.costPerWatt.toFixed(2)}/W`,
              ...cost.breakdown.map(
                (item) => `${item.label}: ${currencyFormatter.format(item.cost)} (${Math.round(item.percent * 100)}%)`,
              ),
            ]}
          />

          <section className="rounded-2xl bg-white p-6 shadow-lg ring-1 ring-slate-900/5 dark:bg-slate-800 dark:ring-white/10 sm:p-8">
            <h2 className="text-lg font-semibold text-slate-900 dark:text-white">Cost Breakdown by Component</h2>
            <div className="mt-6">
              <CostBreakdownChart breakdown={cost.breakdown} />
            </div>
          </section>

          <section className="rounded-2xl bg-white p-6 shadow-lg ring-1 ring-slate-900/5 dark:bg-slate-800 dark:ring-white/10 sm:p-8">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">What Drives Commercial Solar Cost</h2>
            <div className="mt-4 space-y-4 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
              <p>
                A commercial solar quote bundles hardware, labor, and soft costs into a single
                number, which makes it hard to tell whether a bid is competitive. This calculator
                uses a blended national-average rate of $2.30 per watt and applies typical
                industry cost-share percentages across seven components: modules, inverters,
                racking, electrical balance-of-system, labor, permitting/interconnection, and
                design/engineering overhead.
              </p>
              <p>
                Actual quotes vary based on roof type (ground mount, flat commercial roof, or
                carport), interconnection complexity, local labor rates, and whether your utility
                requires costly service upgrades. Use this breakdown as a sanity check against
                installer proposals — if one line item is wildly out of proportion to the others,
                it's worth asking why. For the full return-on-investment picture including the
                Section 48E tax credit and MACRS depreciation, see the{' '}
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

export default CostCalculatorPage
