import { useMemo, useState } from 'react'
import SiteLayout from '../layouts/SiteLayout.jsx'
import { SliderNumberField } from '../components/InputPanel.jsx'
import StatTile from '../components/StatTile.jsx'
import ReportActions from '../components/ReportActions.jsx'
import TaxBenefitTimeline from '../components/TaxBenefitTimeline.jsx'
import { usePageMeta } from '../hooks/usePageMeta.js'
import { buildBreadcrumbJsonLd, buildToolJsonLd } from '../utils/seo.js'
import { generateMacrsTimeline } from '../utils/solarMath.js'

const currencyFormatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  maximumFractionDigits: 0,
})

const FEDERAL_ITC_RATE = 0.3

const TITLE = 'Solar Tax Credit Calculator'
const DESCRIPTION =
  'Calculate your Section 48E federal solar Investment Tax Credit and 5-Year MACRS depreciation tax shield from your system cost.'
const PATH = '/solar-tax-credit-calculator'

function TaxCreditCalculatorPage() {
  usePageMeta({
    title: `${TITLE} | Commercial Solar Calculator`,
    description: DESCRIPTION,
    path: PATH,
    jsonLd: [buildToolJsonLd({ path: PATH, name: TITLE, description: DESCRIPTION }), buildBreadcrumbJsonLd(PATH, TITLE)],
  })

  const [grossCost, setGrossCost] = useState(100000)
  const [stateTaxRate, setStateTaxRate] = useState(0.06)

  const { itcAmount, depreciableBasis, macrsTimeline, totalMacrsShield, totalBenefit } = useMemo(() => {
    const itc = grossCost * FEDERAL_ITC_RATE
    const basis = grossCost - itc * 0.5
    const timeline = generateMacrsTimeline(basis, stateTaxRate)
    const totalShield = timeline.reduce((sum, entry) => sum + entry.taxShield, 0)

    return {
      itcAmount: itc,
      depreciableBasis: basis,
      macrsTimeline: timeline,
      totalMacrsShield: totalShield,
      totalBenefit: itc + totalShield,
    }
  }, [grossCost, stateTaxRate])

  return (
    <SiteLayout
      title={TITLE}
      description="Calculate your Section 48E federal tax credit and 5-year MACRS depreciation tax shield from your quoted system cost."
      breadcrumbLabel={TITLE}
    >
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-12 lg:items-start">
        <section
          className="rounded-2xl bg-white p-6 shadow-lg ring-1 ring-slate-900/5 sm:p-8 lg:col-span-4"
          aria-label="Tax credit calculator inputs"
        >
          <h2 className="text-lg font-semibold text-slate-900">Your Inputs</h2>
          <div className="mt-6 flex flex-col gap-6">
            <SliderNumberField
              id="tax-gross-cost"
              label="Gross System Cost"
              tooltip="Your quoted or estimated total system cost before any tax incentives — from an installer proposal, or the full calculator's estimate."
              value={grossCost}
              onChange={setGrossCost}
              min={5000}
              max={2000000}
              step={1000}
              prefix="$"
              ariaLabel="Gross system cost in US dollars"
              minCaption="$5,000"
              maxCaption="$2,000,000"
              formatValue={(v) => Math.round(v).toLocaleString('en-US')}
            />
            <SliderNumberField
              id="tax-rate-only"
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
          <section className="rounded-2xl bg-white p-6 shadow-lg ring-1 ring-slate-900/5 sm:p-8">
            <h2 className="text-lg font-semibold text-slate-900">Your Tax Benefit</h2>
            <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
              <StatTile label="Section 48E ITC (30%)" value={itcAmount} format={(v) => currencyFormatter.format(v)} />
              <StatTile label="Depreciable Basis" value={depreciableBasis} format={(v) => currencyFormatter.format(v)} />
              <StatTile
                label="Total MACRS Shield (6 yrs)"
                value={totalMacrsShield}
                format={(v) => currencyFormatter.format(v)}
              />
              <StatTile label="Total Tax Benefit" value={totalBenefit} format={(v) => currencyFormatter.format(v)} highlight />
            </div>
          </section>

          <ReportActions
            title="Solar Tax Credit Calculator — Summary"
            lines={[
              `Gross System Cost: ${currencyFormatter.format(grossCost)}`,
              `Section 48E ITC (30%): ${currencyFormatter.format(itcAmount)}`,
              `Depreciable Basis: ${currencyFormatter.format(depreciableBasis)}`,
              `Total MACRS Shield (6 yrs): ${currencyFormatter.format(totalMacrsShield)}`,
              `Total Tax Benefit: ${currencyFormatter.format(totalBenefit)}`,
            ]}
          />

          <section className="rounded-2xl bg-white p-6 shadow-lg ring-1 ring-slate-900/5 sm:p-8">
            <h2 className="text-lg font-semibold text-slate-900">When You Realize Each Benefit</h2>
            <div className="mt-6">
              <TaxBenefitTimeline itcAmount={itcAmount} macrsTimeline={macrsTimeline} />
            </div>
          </section>

          <section className="rounded-2xl bg-white p-6 shadow-lg ring-1 ring-slate-900/5 sm:p-8">
            <h2 className="text-xl font-bold text-slate-900">
              Stacking the ITC and MACRS Depreciation
            </h2>
            <div className="mt-4 space-y-4 text-sm leading-relaxed text-slate-600">
              <p>
                Commercial solar is one of the few asset classes where two major federal tax
                benefits stack on the same system: the Section 48E Investment Tax Credit (30% of
                cost, claimed the year the system is placed in service) and 5-year MACRS
                accelerated depreciation (spread across 6 tax years under the half-year
                convention). Together they typically offset 45-55% of the gross system cost in
                tax benefits alone, before a single dollar of utility savings.
              </p>
              <p>
                One rule trips up a lot of first-time calculations: claiming the ITC requires
                reducing your depreciable basis by half the credit amount (IRC Section 50(c)) —
                which is why the Depreciable Basis above is lower than your Gross System Cost
                minus the full credit.
              </p>
            </div>
          </section>
        </div>
      </div>
    </SiteLayout>
  )
}

export default TaxCreditCalculatorPage
