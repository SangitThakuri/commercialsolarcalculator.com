import { useMemo, useState } from 'react'
import SiteLayout from '../layouts/SiteLayout.jsx'
import { SliderNumberField } from '../components/InputPanel.jsx'
import StatTile from '../components/StatTile.jsx'
import ReportActions from '../components/ReportActions.jsx'
import { usePageMeta } from '../hooks/usePageMeta.js'
import { buildBreadcrumbJsonLd, buildToolJsonLd } from '../utils/seo.js'
import { calculateDemandCharge } from '../utils/solarMath.js'

const currencyFormatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  maximumFractionDigits: 0,
})

const TITLE = 'Commercial Demand Charge Calculator'
const DESCRIPTION =
  'Calculate your monthly and annual demand charges from peak kW draw, and see how much battery peak-shaving could save.'
const PATH = '/commercial-demand-charge-calculator'

function DemandChargeCalculatorPage() {
  usePageMeta({
    title: `${TITLE} | Commercial Solar Calculator`,
    description: DESCRIPTION,
    path: PATH,
    jsonLd: [buildToolJsonLd({ path: PATH, name: TITLE, description: DESCRIPTION }), buildBreadcrumbJsonLd(PATH, TITLE)],
  })

  const [peakDemandKw, setPeakDemandKw] = useState(200)
  const [demandRatePerKw, setDemandRatePerKw] = useState(15)
  const [targetReductionPercent, setTargetReductionPercent] = useState(20)

  const result = useMemo(
    () => calculateDemandCharge(peakDemandKw, demandRatePerKw, targetReductionPercent),
    [peakDemandKw, demandRatePerKw, targetReductionPercent],
  )

  return (
    <SiteLayout
      title={TITLE}
      description="See what your peak demand actually costs, and what battery peak-shaving could save."
      breadcrumbLabel={TITLE}
    >
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-12 lg:items-start">
        <section
          className="rounded-2xl bg-white p-6 shadow-lg ring-1 ring-slate-900/5 dark:bg-slate-800 dark:ring-white/10 sm:p-8 lg:col-span-5"
          aria-label="Demand charge calculator inputs"
        >
          <h2 className="text-lg font-semibold text-slate-900 dark:text-white">Your Inputs</h2>
          <div className="mt-6 flex flex-col gap-6">
            <SliderNumberField
              id="demand-peak"
              label="Peak Demand"
              tooltip="Your highest 15-to-30-minute average power draw during a billing period — found on your utility bill as 'billed demand' or 'peak kW'."
              value={peakDemandKw}
              onChange={setPeakDemandKw}
              min={10}
              max={2000}
              step={10}
              suffix=" kW"
              ariaLabel="Peak demand in kilowatts"
              minCaption="10 kW"
              maxCaption="2,000 kW"
            />
            <SliderNumberField
              id="demand-rate"
              label="Demand Charge Rate"
              tooltip="Your utility's demand charge, in dollars per kW of billed peak demand per month. Commonly $8–$25/kW; check your tariff sheet for your exact rate."
              value={demandRatePerKw}
              onChange={setDemandRatePerKw}
              min={2}
              max={40}
              step={0.5}
              prefix="$"
              suffix="/kW"
              ariaLabel="Demand charge rate in dollars per kilowatt"
              minCaption="$2/kW"
              maxCaption="$40/kW"
              formatValue={(v) => v.toFixed(1)}
            />
            <SliderNumberField
              id="demand-reduction"
              label="Target Peak Reduction"
              tooltip="The share of your peak demand you want to shave with battery storage or load management."
              value={targetReductionPercent}
              onChange={setTargetReductionPercent}
              min={5}
              max={50}
              step={5}
              suffix="%"
              ariaLabel="Target peak reduction percentage"
              minCaption="5%"
              maxCaption="50%"
            />
          </div>
        </section>

        <div className="flex flex-col gap-6 lg:col-span-7">
          <section className="rounded-2xl bg-white p-6 shadow-lg ring-1 ring-slate-900/5 dark:bg-slate-800 dark:ring-white/10 sm:p-8">
            <h2 className="text-lg font-semibold text-slate-900 dark:text-white">Your Demand Charge</h2>
            <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
              <StatTile
                label="Current Monthly Demand Charge"
                value={result.monthlyDemandCharge}
                format={(v) => currencyFormatter.format(v)}
                highlight
              />
              <StatTile
                label="Current Annual Demand Charge"
                value={result.annualDemandCharge}
                format={(v) => currencyFormatter.format(v)}
              />
              <StatTile
                label={`Savings at ${targetReductionPercent}% Peak Reduction`}
                value={result.annualSavings}
                format={(v) => `${currencyFormatter.format(v)}/yr`}
              />
              <StatTile
                label="Battery Needed to Shave Peak"
                value={result.batteryCapacityKwh}
                format={(v) => `${Math.round(v).toLocaleString('en-US')} kWh`}
              />
            </div>
          </section>

          <ReportActions
            title="Commercial Demand Charge Calculator — Summary"
            lines={[
              `Peak Demand: ${peakDemandKw} kW`,
              `Demand Charge Rate: $${demandRatePerKw.toFixed(1)}/kW`,
              `Current Monthly Demand Charge: ${currencyFormatter.format(result.monthlyDemandCharge)}`,
              `Current Annual Demand Charge: ${currencyFormatter.format(result.annualDemandCharge)}`,
              `Target Peak Reduction: ${targetReductionPercent}% (${Math.round(result.shavedKw)} kW shaved)`,
              `Estimated Annual Savings: ${currencyFormatter.format(result.annualSavings)}`,
              `Battery Needed: ${Math.round(result.batteryCapacityKwh).toLocaleString('en-US')} kWh (~${currencyFormatter.format(result.batteryCost)})`,
            ]}
          />

          <section className="rounded-2xl bg-white p-6 shadow-lg ring-1 ring-slate-900/5 dark:bg-slate-800 dark:ring-white/10 sm:p-8">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">
              Demand Charges Are a Different Bill Than Energy Charges
            </h2>
            <div className="mt-4 space-y-4 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
              <p>
                Most commercial and industrial electric bills combine two separate charges: a
                volumetric <strong>energy charge</strong> (¢/kWh for total consumption) and a
                <strong> demand charge</strong> based on the single highest 15-to-30-minute average
                power draw during the billing period, billed in $/kW regardless of how briefly
                that peak lasted. For many mid-to-large commercial accounts, demand charges make up
                30–50% of the total bill — and solar generation alone barely touches this portion,
                since a single cloudy 15-minute window at the wrong moment can still set your peak.
              </p>
              <p>
                Reducing demand charges generally requires either shifting load away from your peak
                window, or discharging a battery during that peak to reduce grid draw — a strategy
                called peak-shaving. This calculator estimates the battery capacity needed for a
                2-hour discharge at your target shaved kW, a common sizing basis for peak-shaving
                (shorter than the multi-hour backup duration used for outage protection). Actual
                battery sizing should be validated against your utility's specific peak windows and
                your load profile's shape, ideally with 15-minute interval data from your utility.
              </p>
            </div>
          </section>
        </div>
      </div>
    </SiteLayout>
  )
}

export default DemandChargeCalculatorPage
