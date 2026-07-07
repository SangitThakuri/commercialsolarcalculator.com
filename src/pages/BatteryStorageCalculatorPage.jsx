import { useMemo, useState } from 'react'
import SiteLayout from '../layouts/SiteLayout.jsx'
import { SliderNumberField } from '../components/InputPanel.jsx'
import StatTile from '../components/StatTile.jsx'
import { usePageMeta } from '../hooks/usePageMeta.js'
import { buildBreadcrumbJsonLd, buildToolJsonLd } from '../utils/seo.js'
import { calculateBatteryStorage } from '../utils/solarMath.js'

const currencyFormatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  maximumFractionDigits: 0,
})

const TITLE = 'Battery Storage Calculator'
const DESCRIPTION =
  'Estimate the battery capacity and cost needed to keep your business running during a power outage, sized from your critical load and desired backup time.'
const PATH = '/battery-storage-calculator'

function BatteryStorageCalculatorPage() {
  usePageMeta({
    title: `${TITLE} | Commercial Solar Calculator`,
    description: DESCRIPTION,
    path: PATH,
    jsonLd: [buildToolJsonLd({ path: PATH, name: TITLE, description: DESCRIPTION }), buildBreadcrumbJsonLd(PATH, TITLE)],
  })

  const [criticalLoadKw, setCriticalLoadKw] = useState(25)
  const [backupHours, setBackupHours] = useState(4)

  const battery = useMemo(
    () => calculateBatteryStorage(criticalLoadKw, backupHours),
    [criticalLoadKw, backupHours],
  )

  return (
    <SiteLayout
      title={TITLE}
      description="Size the battery capacity your business needs to ride through a grid outage."
      breadcrumbLabel={TITLE}
    >
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-12 lg:items-start">
        <section
          className="rounded-2xl bg-white p-6 shadow-lg ring-1 ring-slate-900/5 sm:p-8 lg:col-span-5"
          aria-label="Battery storage calculator inputs"
        >
          <h2 className="text-lg font-semibold text-slate-900">Your Inputs</h2>
          <div className="mt-6 flex flex-col gap-6">
            <SliderNumberField
              id="battery-load"
              label="Critical Load"
              tooltip="The combined power draw (in kW) of the equipment you need to keep running during an outage — refrigeration, servers, security systems, essential lighting."
              value={criticalLoadKw}
              onChange={setCriticalLoadKw}
              min={5}
              max={500}
              step={5}
              suffix=" kW"
              ariaLabel="Critical load in kilowatts"
              minCaption="5 kW"
              maxCaption="500 kW"
            />
            <SliderNumberField
              id="battery-hours"
              label="Desired Backup Duration"
              tooltip="How many hours you want to be able to run your critical load on battery alone."
              value={backupHours}
              onChange={setBackupHours}
              min={1}
              max={24}
              step={1}
              suffix=" hrs"
              ariaLabel="Desired backup duration in hours"
              minCaption="1 hr"
              maxCaption="24 hrs"
            />
          </div>
        </section>

        <div className="flex flex-col gap-6 lg:col-span-7">
          <section className="rounded-2xl bg-white p-6 shadow-lg ring-1 ring-slate-900/5 sm:p-8">
            <h2 className="text-lg font-semibold text-slate-900">Estimated Battery Requirement</h2>
            <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
              <StatTile
                label="Usable Battery Capacity"
                value={battery.usableCapacityKwh}
                format={(v) => `${Math.round(v).toLocaleString('en-US')} kWh`}
                highlight
              />
              <StatTile
                label="Estimated Equipment Cost"
                value={battery.estimatedCost}
                format={(v) => currencyFormatter.format(v)}
              />
            </div>
          </section>

          <section className="rounded-2xl bg-white p-6 shadow-lg ring-1 ring-slate-900/5 sm:p-8">
            <h2 className="text-xl font-bold text-slate-900">
              Battery Storage: A Different Problem Than Solar Generation
            </h2>
            <div className="mt-4 space-y-4 text-sm leading-relaxed text-slate-600">
              <p>
                Solar panels generate power only while the sun is shining, and — critically — most
                grid-tied commercial solar systems automatically shut off during a utility outage
                for safety reasons (anti-islanding protection), unless paired with battery storage
                and the right inverter configuration. If backup power during outages matters to
                your business, sizing is a battery-capacity problem, not a solar-panel problem.
              </p>
              <p>
                This estimate multiplies your critical load (in kW) by your desired backup
                duration (in hours) to get usable battery capacity in kWh, then applies a blended
                commercial battery cost of roughly $500 per kWh installed. Actual sizing should
                add a safety margin for battery degradation and depth-of-discharge limits, and
                actual pricing varies by chemistry, inverter/battery brand, and installation
                complexity.
              </p>
              <p>
                Battery storage is typically evaluated alongside — not instead of — a solar
                system sized for your full electricity usage; pairing the two lets stored solar
                energy (rather than grid power) recharge the battery between outages.
              </p>
            </div>
          </section>
        </div>
      </div>
    </SiteLayout>
  )
}

export default BatteryStorageCalculatorPage
