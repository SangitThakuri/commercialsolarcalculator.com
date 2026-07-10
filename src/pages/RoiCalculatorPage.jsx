import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import SiteLayout from '../layouts/SiteLayout.jsx'
import { SliderNumberField } from '../components/InputPanel.jsx'
import StatTile from '../components/StatTile.jsx'
import ReportActions from '../components/ReportActions.jsx'
import CashFlowChart from '../components/CashFlowChart.jsx'
import { usePageMeta } from '../hooks/usePageMeta.js'
import { buildBreadcrumbJsonLd, buildToolJsonLd } from '../utils/seo.js'
import { calculateSolarMetrics, generateCashFlowProjection } from '../utils/solarMath.js'

const currencyFormatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  maximumFractionDigits: 0,
})

const TITLE = 'Commercial Solar ROI Calculator'
const DESCRIPTION =
  'Calculate your total 25-year commercial solar ROI and annualized rate of return, factoring in the Section 48E tax credit and MACRS depreciation.'
const PATH = '/commercial-solar-roi-calculator'

function RoiCalculatorPage() {
  usePageMeta({
    title: `${TITLE} | Commercial Solar Calculator`,
    description: DESCRIPTION,
    path: PATH,
    jsonLd: [buildToolJsonLd({ path: PATH, name: TITLE, description: DESCRIPTION }), buildBreadcrumbJsonLd(PATH, TITLE)],
  })

  const [monthlyBill, setMonthlyBill] = useState(5000)
  const [stateTaxRate, setStateTaxRate] = useState(0.06)

  const metrics = useMemo(
    () => calculateSolarMetrics(monthlyBill, stateTaxRate),
    [monthlyBill, stateTaxRate],
  )

  const { projection, crossoverYear } = useMemo(
    () => generateCashFlowProjection(metrics.netCapital, metrics.annualSavings),
    [metrics.netCapital, metrics.annualSavings],
  )

  const totalNetPosition = projection[projection.length - 1].cumulative
  const roiPercent = (totalNetPosition / metrics.netCapital) * 100
  const totalValue = totalNetPosition + metrics.netCapital
  const annualizedReturnPercent =
    (Math.pow(totalValue / metrics.netCapital, 1 / 25) - 1) * 100

  return (
    <SiteLayout
      title={TITLE}
      description="See your total 25-year return on investment, not just payback — including the compounding effect of tax incentives and utility savings."
      breadcrumbLabel={TITLE}
    >
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-12 lg:items-start">
        <section
          className="rounded-2xl bg-white p-6 shadow-lg ring-1 ring-slate-900/5 dark:bg-slate-800 dark:ring-white/10 sm:p-8 lg:col-span-4"
          aria-label="ROI calculator inputs"
        >
          <h2 className="text-lg font-semibold text-slate-900 dark:text-white">Your Inputs</h2>
          <div className="mt-6 flex flex-col gap-6">
            <SliderNumberField
              id="roi-bill"
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
            <SliderNumberField
              id="roi-tax-rate"
              label="State Corporate Tax Rate"
              tooltip="Combined with the 21% federal rate to determine your MACRS tax shield."
              value={stateTaxRate * 100}
              onChange={(percent) => setStateTaxRate(percent / 100)}
              min={0}
              max={12}
              step={0.5}
              suffix="%"
              ariaLabel="State corporate tax rate percentage"
              minCaption="0%"
              maxCaption="12%"
            />
          </div>
        </section>

        <div className="flex flex-col gap-6 lg:col-span-8">
          <section className="rounded-2xl bg-white p-6 shadow-lg ring-1 ring-slate-900/5 dark:bg-slate-800 dark:ring-white/10 sm:p-8">
            <h2 className="text-lg font-semibold text-slate-900 dark:text-white">25-Year ROI Summary</h2>
            <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3">
              <StatTile
                label="25-Year ROI"
                value={roiPercent}
                format={(v) => `${v.toFixed(0)}%`}
                highlight
              />
              <StatTile
                label="Annualized Return"
                value={annualizedReturnPercent}
                format={(v) => `${v.toFixed(1)}%/yr`}
              />
              <StatTile
                label="Net Capital Required"
                value={metrics.netCapital}
                format={(v) => currencyFormatter.format(v)}
              />
              <StatTile
                label="Total 25-Year Savings"
                value={totalNetPosition + metrics.netCapital}
                format={(v) => currencyFormatter.format(v)}
              />
              <StatTile
                label="Net Profit After Capital Recovered"
                value={totalNetPosition}
                format={(v) => currencyFormatter.format(v)}
              />
              <StatTile
                label="Payback Period"
                value={metrics.paybackPeriod}
                format={(v) => `${v.toFixed(1)} yrs`}
              />
            </div>
          </section>

          <ReportActions
            title="Commercial Solar ROI Calculator — Summary"
            lines={[
              `25-Year ROI: ${roiPercent.toFixed(0)}%`,
              `Annualized Return: ${annualizedReturnPercent.toFixed(1)}%/yr`,
              `Net Capital Required: ${currencyFormatter.format(metrics.netCapital)}`,
              `Total 25-Year Savings: ${currencyFormatter.format(totalNetPosition + metrics.netCapital)}`,
              `Net Profit After Capital Recovered: ${currencyFormatter.format(totalNetPosition)}`,
              `Payback Period: ${metrics.paybackPeriod.toFixed(1)} yrs`,
            ]}
          />

          <section className="rounded-2xl bg-white p-6 shadow-lg ring-1 ring-slate-900/5 dark:bg-slate-800 dark:ring-white/10 sm:p-8">
            <h2 className="text-lg font-semibold text-slate-900 dark:text-white">Cumulative ROI Over 25 Years</h2>
            <div className="mt-6">
              <CashFlowChart projection={projection} crossoverYear={crossoverYear} />
            </div>
          </section>

          <section className="rounded-2xl bg-white p-6 shadow-lg ring-1 ring-slate-900/5 dark:bg-slate-800 dark:ring-white/10 sm:p-8">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">
              ROI vs. Payback Period: Why the Distinction Matters
            </h2>
            <div className="mt-4 space-y-4 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
              <p>
                Payback period tells you how long it takes to recover your capital. ROI tells you
                how much that capital actually earned over the system&apos;s life — a system with
                a longer payback can still deliver a higher total return if its 25-year savings
                are large relative to the upfront cost. Both numbers matter, but businesses
                comparing solar against other capital projects (equipment upgrades, real estate,
                marketable securities) should weigh the annualized return figure above, since
                it&apos;s directly comparable to the expected return on those alternatives.
              </p>
              <p>
                This calculator's ROI figure already factors in the Section 48E federal tax
                credit and the 5-year MACRS depreciation tax shield — the two mechanisms that
                make commercial solar returns meaningfully higher than a simple "utility bill
                savings only" estimate. For a full breakdown of exactly how each dollar of ITC
                and depreciation is calculated, see the{' '}
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

export default RoiCalculatorPage
