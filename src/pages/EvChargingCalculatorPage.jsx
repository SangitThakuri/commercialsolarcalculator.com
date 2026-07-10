import { useMemo, useState } from 'react'
import SiteLayout from '../layouts/SiteLayout.jsx'
import { SliderNumberField } from '../components/InputPanel.jsx'
import StatTile from '../components/StatTile.jsx'
import ReportActions from '../components/ReportActions.jsx'
import { usePageMeta } from '../hooks/usePageMeta.js'
import { buildBreadcrumbJsonLd, buildToolJsonLd } from '../utils/seo.js'
import { calculateEvChargingRoi } from '../utils/solarMath.js'

const currencyFormatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  maximumFractionDigits: 0,
})

const TITLE = 'Commercial EV Charging Calculator'
const DESCRIPTION =
  'Estimate installed cost, daily revenue, and payback period for adding commercial EV charging stations to your property.'
const PATH = '/commercial-ev-charging-calculator'

const CHARGER_TYPES = [
  { value: 'level2', label: 'Level 2' },
  { value: 'dcFast', label: 'DC Fast Charging' },
]

function EvChargingCalculatorPage() {
  usePageMeta({
    title: `${TITLE} | Commercial Solar Calculator`,
    description: DESCRIPTION,
    path: PATH,
    jsonLd: [buildToolJsonLd({ path: PATH, name: TITLE, description: DESCRIPTION }), buildBreadcrumbJsonLd(PATH, TITLE)],
  })

  const [chargerType, setChargerType] = useState('level2')
  const [portCount, setPortCount] = useState(4)
  const [sessionsPerDayPerPort, setSessionsPerDayPerPort] = useState(3)
  const [avgKwhPerSession, setAvgKwhPerSession] = useState(20)
  const [pricePerKwh, setPricePerKwh] = useState(0.35)
  const [electricityCostPerKwh, setElectricityCostPerKwh] = useState(0.13)

  const result = useMemo(
    () =>
      calculateEvChargingRoi({
        chargerType,
        portCount,
        sessionsPerDayPerPort,
        avgKwhPerSession,
        pricePerKwh,
        electricityCostPerKwh,
      }),
    [chargerType, portCount, sessionsPerDayPerPort, avgKwhPerSession, pricePerKwh, electricityCostPerKwh],
  )

  return (
    <SiteLayout
      title={TITLE}
      description="Model installed cost, daily margin, and payback for on-site EV charging stations."
      breadcrumbLabel={TITLE}
    >
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-12 lg:items-start">
        <section
          className="rounded-2xl bg-white p-6 shadow-lg ring-1 ring-slate-900/5 dark:bg-slate-800 dark:ring-white/10 sm:p-8 lg:col-span-5"
          aria-label="EV charging calculator inputs"
        >
          <h2 className="text-lg font-semibold text-slate-900 dark:text-white">Your Inputs</h2>

          <div className="mt-6">
            <p className="text-sm font-medium text-slate-700 dark:text-slate-300">Charger Type</p>
            <div className="mt-2 grid grid-cols-2 gap-2">
              {CHARGER_TYPES.map((option) => (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => setChargerType(option.value)}
                  aria-pressed={chargerType === option.value}
                  className={`rounded-lg border px-3 py-2 text-sm font-semibold transition ${
                    chargerType === option.value
                      ? 'border-emerald-500 bg-emerald-50 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400'
                      : 'border-slate-200 bg-slate-50 text-slate-600 hover:border-slate-300 dark:border-slate-700 dark:bg-slate-900/40 dark:text-slate-300'
                  }`}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-6 flex flex-col gap-6">
            <SliderNumberField
              id="ev-ports"
              label="Number of Charging Ports"
              tooltip="How many individual charging ports (plugs) you plan to install."
              value={portCount}
              onChange={setPortCount}
              min={1}
              max={20}
              step={1}
              ariaLabel="Number of charging ports"
              minCaption="1"
              maxCaption="20"
            />
            <SliderNumberField
              id="ev-sessions"
              label="Sessions per Port per Day"
              tooltip="Average number of charging sessions each port completes per day."
              value={sessionsPerDayPerPort}
              onChange={setSessionsPerDayPerPort}
              min={1}
              max={10}
              step={1}
              ariaLabel="Charging sessions per port per day"
              minCaption="1"
              maxCaption="10"
            />
            <SliderNumberField
              id="ev-kwh-session"
              label="Average kWh per Session"
              tooltip="Typical energy delivered per charging session."
              value={avgKwhPerSession}
              onChange={setAvgKwhPerSession}
              min={5}
              max={60}
              step={1}
              suffix=" kWh"
              ariaLabel="Average kilowatt-hours per charging session"
              minCaption="5 kWh"
              maxCaption="60 kWh"
            />
            <SliderNumberField
              id="ev-price"
              label="Price Charged to Driver"
              tooltip="What you charge drivers per kWh delivered. Adjust to match your local market or planned pricing."
              value={pricePerKwh}
              onChange={setPricePerKwh}
              min={0.2}
              max={0.8}
              step={0.01}
              prefix="$"
              suffix="/kWh"
              ariaLabel="Price charged to driver per kilowatt-hour"
              minCaption="$0.20/kWh"
              maxCaption="$0.80/kWh"
              formatValue={(v) => v.toFixed(2)}
            />
            <SliderNumberField
              id="ev-cost"
              label="Your Electricity Cost"
              tooltip="What you pay your utility per kWh — the cost side of your charging margin."
              value={electricityCostPerKwh}
              onChange={setElectricityCostPerKwh}
              min={0.08}
              max={0.3}
              step={0.01}
              prefix="$"
              suffix="/kWh"
              ariaLabel="Electricity cost per kilowatt-hour"
              minCaption="$0.08/kWh"
              maxCaption="$0.30/kWh"
              formatValue={(v) => v.toFixed(2)}
            />
          </div>
        </section>

        <div className="flex flex-col gap-6 lg:col-span-7">
          <section className="rounded-2xl bg-white p-6 shadow-lg ring-1 ring-slate-900/5 dark:bg-slate-800 dark:ring-white/10 sm:p-8">
            <h2 className="text-lg font-semibold text-slate-900 dark:text-white">
              Your Charging Station Economics
            </h2>
            <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3">
              <StatTile
                label="Installed Cost"
                value={result.installedCost}
                format={(v) => currencyFormatter.format(v)}
              />
              <StatTile
                label="Total Power Draw"
                value={result.totalPowerKw}
                format={(v) => `${Math.round(v)} kW`}
              />
              <StatTile
                label="Daily Net Profit"
                value={result.dailyNetProfit}
                format={(v) => currencyFormatter.format(v)}
              />
              <StatTile
                label="Annual Net Profit"
                value={result.annualNetProfit}
                format={(v) => currencyFormatter.format(v)}
              />
              <StatTile
                label="Payback Period"
                value={result.paybackYears ?? 0}
                format={(v) => (result.paybackYears !== null ? `${v.toFixed(1)} yrs` : 'N/A')}
                highlight
              />
            </div>
          </section>

          <ReportActions
            title="Commercial EV Charging Calculator — Summary"
            lines={[
              `Charger Type: ${chargerType === 'level2' ? 'Level 2' : 'DC Fast Charging'}`,
              `Ports: ${portCount}`,
              `Installed Cost: ${currencyFormatter.format(result.installedCost)}`,
              `Daily Net Profit: ${currencyFormatter.format(result.dailyNetProfit)}`,
              `Annual Net Profit: ${currencyFormatter.format(result.annualNetProfit)}`,
              `Payback Period: ${result.paybackYears !== null ? `${result.paybackYears.toFixed(1)} yrs` : 'N/A'}`,
            ]}
          />

          <section className="rounded-2xl bg-white p-6 shadow-lg ring-1 ring-slate-900/5 dark:bg-slate-800 dark:ring-white/10 sm:p-8">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">
              Sizing a Commercial EV Charging Business Case
            </h2>
            <div className="mt-4 space-y-4 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
              <p>
                Level 2 chargers (roughly 7–19 kW) cost far less to install — typically a few
                thousand dollars per port — and suit properties where vehicles park for hours:
                offices, hotels, apartments. DC fast chargers (50–350 kW) cost tens of thousands
                of dollars per port installed, largely due to utility service upgrades and
                transformer capacity, but deliver a full charge in minutes, making them suited to
                retail, travel corridors, and fleet turnaround.
              </p>
              <p>
                This calculator uses blended national-average installed costs of $6,000 per Level
                2 port and $65,000 per DC fast charging port — actual costs vary significantly
                based on your existing electrical service capacity, trenching distance, and local
                labor rates. Revenue assumes you charge drivers per kWh; many commercial EV
                charging deployments are instead justified by amenity value (attracting tenants,
                customers, or fleet uptime) rather than direct charging revenue, in which case this
                payback calculation understates the total business case.
              </p>
            </div>
          </section>
        </div>
      </div>
    </SiteLayout>
  )
}

export default EvChargingCalculatorPage
