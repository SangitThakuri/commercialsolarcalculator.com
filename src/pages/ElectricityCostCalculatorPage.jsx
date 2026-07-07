import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import SiteLayout from '../layouts/SiteLayout.jsx'
import { SliderNumberField } from '../components/InputPanel.jsx'
import StatTile from '../components/StatTile.jsx'
import ReportActions from '../components/ReportActions.jsx'
import { usePageMeta } from '../hooks/usePageMeta.js'
import { buildBreadcrumbJsonLd, buildToolJsonLd } from '../utils/seo.js'
import { calculateElectricityCostProfile } from '../utils/solarMath.js'

const currencyFormatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  maximumFractionDigits: 0,
})

const TITLE = 'Commercial Electricity Cost Calculator'
const DESCRIPTION =
  'Calculate your effective electricity rate and project your 25-year electricity cost at current utility inflation trends — no solar required.'
const PATH = '/commercial-electricity-cost-calculator'

function ElectricityCostCalculatorPage() {
  usePageMeta({
    title: `${TITLE} | Commercial Solar Calculator`,
    description: DESCRIPTION,
    path: PATH,
    jsonLd: [buildToolJsonLd({ path: PATH, name: TITLE, description: DESCRIPTION }), buildBreadcrumbJsonLd(PATH, TITLE)],
  })

  const [monthlyBill, setMonthlyBill] = useState(5000)
  const [monthlyKwh, setMonthlyKwh] = useState(33000)

  const profile = useMemo(
    () => calculateElectricityCostProfile(monthlyBill, monthlyKwh),
    [monthlyBill, monthlyKwh],
  )

  const year10 = profile.projection[9]
  const year25 = profile.projection[24]

  return (
    <SiteLayout
      title={TITLE}
      description="See your effective electricity rate and what doing nothing will cost over the next 25 years."
      breadcrumbLabel={TITLE}
    >
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-12 lg:items-start">
        <section
          className="rounded-2xl bg-white p-6 shadow-lg ring-1 ring-slate-900/5 sm:p-8 lg:col-span-4"
          aria-label="Electricity cost calculator inputs"
        >
          <h2 className="text-lg font-semibold text-slate-900">Your Inputs</h2>
          <div className="mt-6 flex flex-col gap-6">
            <SliderNumberField
              id="cost-bill"
              label="Average Monthly Electric Bill"
              tooltip="Your current average monthly electric bill, in dollars."
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
              id="cost-kwh"
              label="Average Monthly Usage"
              tooltip="Your average monthly electricity consumption in kWh — found on your utility bill."
              value={monthlyKwh}
              onChange={setMonthlyKwh}
              min={500}
              max={500000}
              step={500}
              suffix=" kWh"
              ariaLabel="Average monthly electricity usage in kilowatt-hours"
              minCaption="500 kWh"
              maxCaption="500,000 kWh"
              formatValue={(v) => Math.round(v).toLocaleString('en-US')}
            />
          </div>
        </section>

        <div className="flex flex-col gap-6 lg:col-span-8">
          <section className="rounded-2xl bg-white p-6 shadow-lg ring-1 ring-slate-900/5 sm:p-8">
            <h2 className="text-lg font-semibold text-slate-900">Your Electricity Cost Profile</h2>
            <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-3">
              <StatTile
                label="Effective Rate"
                value={profile.effectiveRatePerKwh}
                format={(v) => `${(v * 100).toFixed(1)}¢/kWh`}
                highlight
              />
              <StatTile label="Annual Cost Today" value={profile.annualCost} format={(v) => currencyFormatter.format(v)} />
              <StatTile
                label="Projected Annual Cost (Year 25)"
                value={year25.cost}
                format={(v) => currencyFormatter.format(v)}
              />
            </div>
            <p className="mt-4 text-xs text-slate-500">
              At 3% annual utility inflation, your cumulative electricity spend reaches{' '}
              {currencyFormatter.format(year10.cumulative)} by year 10 and{' '}
              {currencyFormatter.format(year25.cumulative)} by year 25 — with no solar offset.
            </p>
          </section>

          <ReportActions
            title="Commercial Electricity Cost Calculator — Summary"
            lines={[
              `Effective Rate: ${(profile.effectiveRatePerKwh * 100).toFixed(1)}¢/kWh`,
              `Annual Cost Today: ${currencyFormatter.format(profile.annualCost)}`,
              `Projected Annual Cost (Year 25): ${currencyFormatter.format(year25.cost)}`,
              `Cumulative Cost by Year 10: ${currencyFormatter.format(year10.cumulative)}`,
              `Cumulative Cost by Year 25: ${currencyFormatter.format(year25.cumulative)}`,
            ]}
          />

          <section className="rounded-2xl bg-white p-6 shadow-lg ring-1 ring-slate-900/5 sm:p-8">
            <h2 className="text-xl font-bold text-slate-900">
              Understanding Your Effective Electricity Rate
            </h2>
            <div className="mt-4 space-y-4 text-sm leading-relaxed text-slate-600">
              <p>
                Your effective rate — total bill divided by total usage — blends together every
                component of a commercial electric bill: the volumetric energy charge, any peak
                demand charge, delivery/transmission fees, and taxes. It&apos;s a more accurate
                way to compare your costs across billing periods than looking at the volumetric
                rate alone, since demand charges and fees can make up a large share of a
                commercial bill.
              </p>
              <p>
                This projection assumes 3% annual utility rate inflation, consistent with the
                long-run historical average for U.S. commercial electricity rates — though actual
                escalation varies by region and utility. The point of this exercise isn&apos;t to
                alarm you; it&apos;s to establish an honest baseline before evaluating whether
                solar makes sense for your business.
              </p>
              <p>
                Ready to see how much of this cost solar could offset? Try the{' '}
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

export default ElectricityCostCalculatorPage
