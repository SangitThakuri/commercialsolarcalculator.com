import { useMemo, useState } from 'react'
import SiteLayout from '../layouts/SiteLayout.jsx'
import { SliderNumberField } from '../components/InputPanel.jsx'
import StatTile from '../components/StatTile.jsx'
import ReportActions from '../components/ReportActions.jsx'
import { usePageMeta } from '../hooks/usePageMeta.js'
import { buildBreadcrumbJsonLd, buildToolJsonLd } from '../utils/seo.js'
import { calculateSolarMetrics, calculateLeaseComparison } from '../utils/solarMath.js'

const currencyFormatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  maximumFractionDigits: 0,
})

const TITLE = 'Solar Lease Calculator'
const DESCRIPTION =
  'Compare a commercial solar lease or PPA against owning your system outright — monthly savings, who keeps the tax credit, and total cost.'
const PATH = '/solar-lease-calculator'

function LeaseCalculatorPage() {
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

  const lease = useMemo(
    () => calculateLeaseComparison(monthlyBill, metrics.netCapital, metrics.annualSavings),
    [monthlyBill, metrics.netCapital, metrics.annualSavings],
  )

  return (
    <SiteLayout
      title={TITLE}
      description="Compare leasing or a Power Purchase Agreement (PPA) against owning your commercial solar system."
      breadcrumbLabel={TITLE}
    >
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-12 lg:items-start">
        <section
          className="rounded-2xl bg-white p-6 shadow-lg ring-1 ring-slate-900/5 sm:p-8 lg:col-span-4"
          aria-label="Lease calculator inputs"
        >
          <h2 className="text-lg font-semibold text-slate-900">Your Inputs</h2>
          <div className="mt-6 flex flex-col gap-6">
            <SliderNumberField
              id="lease-bill"
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
              id="lease-tax-rate"
              label="State Corporate Tax Rate"
              tooltip="Only relevant to the ownership option — a lease/PPA provider keeps the tax credit and depreciation."
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
          <section className="rounded-2xl bg-white p-6 shadow-lg ring-1 ring-slate-900/5 sm:p-8">
            <h2 className="text-lg font-semibold text-slate-900">Lease / PPA vs. Ownership</h2>
            <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="rounded-xl border border-slate-200 p-4">
                <p className="text-sm font-semibold text-slate-900">Solar Lease / PPA</p>
                <div className="mt-3 flex flex-col gap-3">
                  <StatTile
                    label="Monthly Lease Payment"
                    value={lease.monthlyLeasePayment}
                    format={(v) => currencyFormatter.format(v)}
                  />
                  <StatTile
                    label="Monthly Savings vs. Utility"
                    value={lease.monthlyLeaseSavings}
                    format={(v) => currencyFormatter.format(v)}
                    highlight
                  />
                </div>
                <p className="mt-3 text-xs text-slate-500">$0 upfront. No ITC or depreciation — the third-party owner keeps those.</p>
              </div>
              <div className="rounded-xl border border-slate-200 p-4">
                <p className="text-sm font-semibold text-slate-900">Cash Ownership</p>
                <div className="mt-3 flex flex-col gap-3">
                  <StatTile
                    label="Net Capital Required"
                    value={metrics.netCapital}
                    format={(v) => currencyFormatter.format(v)}
                  />
                  <StatTile
                    label="Annual Utility Savings"
                    value={metrics.annualSavings}
                    format={(v) => currencyFormatter.format(v)}
                    highlight
                  />
                </div>
                <p className="mt-3 text-xs text-slate-500">
                  {currencyFormatter.format(metrics.netCapital)} upfront. You keep the ITC, MACRS
                  depreciation, and 100% of long-run savings.
                </p>
              </div>
            </div>
          </section>

          <ReportActions
            title="Solar Lease Calculator — Summary"
            lines={[
              `Lease/PPA Monthly Payment: ${currencyFormatter.format(lease.monthlyLeasePayment)}`,
              `Lease/PPA Monthly Savings vs. Utility: ${currencyFormatter.format(lease.monthlyLeaseSavings)}`,
              `Ownership Net Capital Required: ${currencyFormatter.format(metrics.netCapital)}`,
              `Ownership Annual Utility Savings: ${currencyFormatter.format(metrics.annualSavings)}`,
            ]}
          />

          <section className="rounded-2xl bg-white p-6 shadow-lg ring-1 ring-slate-900/5 sm:p-8">
            <h2 className="text-xl font-bold text-slate-900">How Solar Leases and PPAs Work</h2>
            <div className="mt-4 space-y-4 text-sm leading-relaxed text-slate-600">
              <p>
                In a solar lease or Power Purchase Agreement (PPA), a third party owns, installs,
                and maintains the system on your roof or property. You pay either a fixed monthly
                lease payment or a per-kWh rate for the power it produces — typically set below
                your current utility rate — with no upfront capital outlay and no maintenance
                responsibility.
              </p>
              <p>
                The trade-off: because a third party owns the system, that third party — not your
                business — claims the Section 48E investment tax credit and the MACRS
                depreciation tax shield. Those incentives are baked into the lease provider&apos;s
                pricing rather than landing on your balance sheet directly, which is why
                ownership almost always produces greater total savings over 20-25 years, at the
                cost of the upfront capital shown above.
              </p>
              <p>
                Leases and PPAs tend to make the most sense for businesses that want predictable
                energy costs and zero capital outlay; ownership makes the most sense for
                businesses that can use the tax benefits and want to maximize long-run return.
              </p>
            </div>
          </section>
        </div>
      </div>
    </SiteLayout>
  )
}

export default LeaseCalculatorPage
