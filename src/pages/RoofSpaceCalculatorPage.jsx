import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import SiteLayout from '../layouts/SiteLayout.jsx'
import { SliderNumberField } from '../components/InputPanel.jsx'
import StatTile from '../components/StatTile.jsx'
import ReportActions from '../components/ReportActions.jsx'
import { usePageMeta } from '../hooks/usePageMeta.js'
import { buildBreadcrumbJsonLd, buildToolJsonLd } from '../utils/seo.js'
import { calculateFromRoofArea } from '../utils/solarMath.js'

const currencyFormatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  maximumFractionDigits: 0,
})

const TITLE = 'Roof Space Calculator'
const DESCRIPTION =
  'Enter your roof dimensions to estimate how many solar panels fit, the resulting system size, and how much of your electric bill it could offset.'
const PATH = '/roof-space-calculator'

function RoofSpaceCalculatorPage() {
  usePageMeta({
    title: `${TITLE} | Commercial Solar Calculator`,
    description: DESCRIPTION,
    path: PATH,
    jsonLd: [buildToolJsonLd({ path: PATH, name: TITLE, description: DESCRIPTION }), buildBreadcrumbJsonLd(PATH, TITLE)],
  })

  const [roofLengthFt, setRoofLengthFt] = useState(200)
  const [roofWidthFt, setRoofWidthFt] = useState(100)

  const result = useMemo(
    () => calculateFromRoofArea(roofLengthFt, roofWidthFt),
    [roofLengthFt, roofWidthFt],
  )

  return (
    <SiteLayout
      title={TITLE}
      description="Start from your roof's dimensions instead of your electric bill — see what system size actually fits."
      breadcrumbLabel={TITLE}
    >
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-12 lg:items-start">
        <section
          className="rounded-2xl bg-white p-6 shadow-lg ring-1 ring-slate-900/5 dark:bg-slate-800 dark:ring-white/10 sm:p-8 lg:col-span-5"
          aria-label="Roof space calculator inputs"
        >
          <h2 className="text-lg font-semibold text-slate-900 dark:text-white">Your Roof Dimensions</h2>
          <div className="mt-6 flex flex-col gap-6">
            <SliderNumberField
              id="roof-length"
              label="Roof Length"
              tooltip="The longer dimension of your usable roof area, in feet."
              value={roofLengthFt}
              onChange={setRoofLengthFt}
              min={20}
              max={1000}
              step={10}
              suffix=" ft"
              ariaLabel="Roof length in feet"
              minCaption="20 ft"
              maxCaption="1,000 ft"
            />
            <SliderNumberField
              id="roof-width"
              label="Roof Width"
              tooltip="The shorter dimension of your usable roof area, in feet."
              value={roofWidthFt}
              onChange={setRoofWidthFt}
              min={20}
              max={500}
              step={10}
              suffix=" ft"
              ariaLabel="Roof width in feet"
              minCaption="20 ft"
              maxCaption="500 ft"
            />
          </div>
        </section>

        <div className="flex flex-col gap-6 lg:col-span-7">
          <section className="rounded-2xl bg-white p-6 shadow-lg ring-1 ring-slate-900/5 dark:bg-slate-800 dark:ring-white/10 sm:p-8">
            <h2 className="text-lg font-semibold text-slate-900 dark:text-white">What Fits on Your Roof</h2>
            <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3">
              <StatTile
                label="Total Roof Area"
                value={result.totalRoofSqFt}
                format={(v) => `${Math.round(v).toLocaleString('en-US')} sq ft`}
              />
              <StatTile
                label="Usable Roof Area"
                value={result.usableRoofSqFt}
                format={(v) => `${Math.round(v).toLocaleString('en-US')} sq ft`}
              />
              <StatTile label="Panels That Fit" value={result.panelCount} format={(v) => `${Math.round(v)} panels`} />
              <StatTile
                label="Resulting System Size"
                value={result.systemSizeKw}
                format={(v) => `${v.toFixed(1)} kW`}
                highlight
              />
              <StatTile
                label="Estimated Annual Production"
                value={result.annualProductionKwh}
                format={(v) => `${Math.round(v).toLocaleString('en-US')} kWh`}
              />
              <StatTile
                label="Bill This Typically Offsets"
                value={result.estimatedMonthlyBillOffset}
                format={(v) => `${currencyFormatter.format(v)}/mo`}
              />
            </div>
          </section>

          <ReportActions
            title="Roof Space Calculator — Summary"
            lines={[
              `Roof Dimensions: ${roofLengthFt} ft × ${roofWidthFt} ft`,
              `Total Roof Area: ${Math.round(result.totalRoofSqFt).toLocaleString('en-US')} sq ft`,
              `Usable Roof Area (70%): ${Math.round(result.usableRoofSqFt).toLocaleString('en-US')} sq ft`,
              `Panels That Fit: ${result.panelCount}`,
              `Resulting System Size: ${result.systemSizeKw.toFixed(1)} kW`,
              `Estimated Annual Production: ${Math.round(result.annualProductionKwh).toLocaleString('en-US')} kWh`,
              `Typical Bill Offset: ${currencyFormatter.format(result.estimatedMonthlyBillOffset)}/mo`,
            ]}
          />

          <section className="rounded-2xl bg-white p-6 shadow-lg ring-1 ring-slate-900/5 dark:bg-slate-800 dark:ring-white/10 sm:p-8">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">
              Starting From Roof Space Instead of Your Bill
            </h2>
            <div className="mt-4 space-y-4 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
              <p>
                Most of this site's calculators start from your electric bill and work out the
                system size and roof area you'd need. This tool runs the math in the other
                direction: useful if you already know your roof's dimensions — from a lease,
                survey, or satellite measurement — and want to know what system size actually
                fits, before you know (or without needing) your exact utility bill.
              </p>
              <p>
                This estimate assumes 70% of total roof area is usable after setbacks, HVAC
                equipment, walkways, and fire-code clearances — a typical planning assumption, but
                your actual usable area depends on your specific roof's obstructions and shape.
                Panel count assumes a standard commercial panel footprint of roughly 21 sq ft at
                450W each. For the full financial picture — cost, tax credit, depreciation, and
                payback — once you have a system size, use the{' '}
                <Link to="/" className="font-semibold text-emerald-600 hover:underline dark:text-emerald-400">
                  full Commercial Solar Calculator
                </Link>{' '}
                with the equivalent monthly bill shown above.
              </p>
            </div>
          </section>
        </div>
      </div>
    </SiteLayout>
  )
}

export default RoofSpaceCalculatorPage
