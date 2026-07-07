import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import SiteLayout from '../layouts/SiteLayout.jsx'
import { SliderNumberField } from '../components/InputPanel.jsx'
import StatTile from '../components/StatTile.jsx'
import ReportActions from '../components/ReportActions.jsx'
import EnergyProductionChart from '../components/EnergyProductionChart.jsx'
import { usePageMeta } from '../hooks/usePageMeta.js'
import { buildBreadcrumbJsonLd, buildToolJsonLd } from '../utils/seo.js'
import { calculateSystemSizeDetails, generateEnergyProduction } from '../utils/solarMath.js'

const TITLE = 'Solar Panel Size Calculator'
const DESCRIPTION =
  'Estimate the commercial solar system size, panel count, and roof area you need based on your average monthly electric bill.'
const PATH = '/solar-panel-size-calculator'

function PanelSizeCalculatorPage() {
  usePageMeta({
    title: `${TITLE} | Commercial Solar Calculator`,
    description: DESCRIPTION,
    path: PATH,
    jsonLd: [buildToolJsonLd({ path: PATH, name: TITLE, description: DESCRIPTION }), buildBreadcrumbJsonLd(PATH, TITLE)],
  })

  const [monthlyBill, setMonthlyBill] = useState(5000)

  const sizeDetails = useMemo(() => calculateSystemSizeDetails(monthlyBill), [monthlyBill])
  const production = useMemo(
    () => generateEnergyProduction(sizeDetails.systemSizeKw),
    [sizeDetails.systemSizeKw],
  )

  return (
    <SiteLayout
      title={TITLE}
      description="Estimate system size, panel count, and roof area from your monthly electric bill."
      breadcrumbLabel={TITLE}
    >
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-12 lg:items-start">
        <section
          className="rounded-2xl bg-white p-6 shadow-lg ring-1 ring-slate-900/5 sm:p-8 lg:col-span-4"
          aria-label="Panel size calculator inputs"
        >
          <h2 className="text-lg font-semibold text-slate-900">Your Input</h2>
          <div className="mt-6">
            <SliderNumberField
              id="size-bill"
              label="Average Monthly Electric Bill"
              tooltip="Your average pre-solar monthly electric bill — this drives the sizing estimate."
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
            <h2 className="text-lg font-semibold text-slate-900">Estimated System Size</h2>
            <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
              <StatTile label="System Size" value={sizeDetails.systemSizeKw} format={(v) => `${Math.round(v)} kW`} highlight />
              <StatTile label="Panel Count" value={sizeDetails.panelCount} format={(v) => `${Math.round(v)} panels`} />
              <StatTile label="Roof Area Needed" value={sizeDetails.roofAreaSqFt} format={(v) => `${Math.round(v).toLocaleString('en-US')} sq ft`} />
              <StatTile
                label="Annual Production"
                value={sizeDetails.annualProductionKwh}
                format={(v) => `${Math.round(v).toLocaleString('en-US')} kWh`}
              />
            </div>
          </section>

          <ReportActions
            title="Solar Panel Size Calculator — Summary"
            lines={[
              `System Size: ${sizeDetails.systemSizeKw} kW`,
              `Panel Count: ${sizeDetails.panelCount} panels`,
              `Roof Area Needed: ${Math.round(sizeDetails.roofAreaSqFt).toLocaleString('en-US')} sq ft`,
              `Annual Production: ${Math.round(sizeDetails.annualProductionKwh).toLocaleString('en-US')} kWh`,
            ]}
          />

          <section className="rounded-2xl bg-white p-6 shadow-lg ring-1 ring-slate-900/5 sm:p-8">
            <h2 className="text-lg font-semibold text-slate-900">25-Year Production Estimate</h2>
            <div className="mt-6">
              <EnergyProductionChart production={production} />
            </div>
          </section>

          <section className="rounded-2xl bg-white p-6 shadow-lg ring-1 ring-slate-900/5 sm:p-8">
            <h2 className="text-xl font-bold text-slate-900">How This Sizing Estimate Works</h2>
            <div className="mt-4 space-y-4 text-sm leading-relaxed text-slate-600">
              <p>
                Your monthly bill is first converted to estimated monthly kWh usage using a
                blended $0.13/kWh national average commercial electricity rate. That usage is then
                sized against roughly 135 kWh of monthly production per installed kW of solar
                capacity — a reasonable blended average across U.S. climate zones — at about 120%
                of usage to leave headroom for future load growth. Panel count assumes standard
                400-watt commercial modules; roof area assumes roughly 75 square feet per kW to
                account for panel spacing, walkways, and setback requirements.
              </p>
              <p>
                Real-world sizing also depends on factors this quick estimate can&apos;t see: your
                actual roof or land area and orientation, structural load capacity, shading from
                nearby buildings or trees, and your utility&apos;s interconnection capacity
                limits. Treat this as a starting point for a conversation with a licensed solar
                engineer, not a final design.
              </p>
              <p>
                Once you have a size estimate, see the{' '}
                <Link to="/" className="font-semibold text-emerald-600 hover:underline">
                  full Commercial Solar Calculator
                </Link>{' '}
                to model the cost, tax credit, depreciation, and payback period for a system this
                size.
              </p>
            </div>
          </section>
        </div>
      </div>
    </SiteLayout>
  )
}

export default PanelSizeCalculatorPage
