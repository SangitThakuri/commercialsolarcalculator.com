import { useMemo, useState } from 'react'
import SiteLayout from '../layouts/SiteLayout.jsx'
import { SliderNumberField } from '../components/InputPanel.jsx'
import StatTile from '../components/StatTile.jsx'
import ReportActions from '../components/ReportActions.jsx'
import { usePageMeta } from '../hooks/usePageMeta.js'
import { buildBreadcrumbJsonLd, buildToolJsonLd } from '../utils/seo.js'
import { calculateSystemSizeDetails, calculateCarbonSavings } from '../utils/solarMath.js'

const TITLE = 'Carbon Savings Calculator'
const DESCRIPTION =
  'Estimate the CO2 emissions your business avoids by going solar, using EPA eGRID grid emissions factors — for ESG and sustainability reporting.'
const PATH = '/carbon-savings-calculator'

function CarbonSavingsCalculatorPage() {
  usePageMeta({
    title: `${TITLE} | Commercial Solar Calculator`,
    description: DESCRIPTION,
    path: PATH,
    jsonLd: [buildToolJsonLd({ path: PATH, name: TITLE, description: DESCRIPTION }), buildBreadcrumbJsonLd(PATH, TITLE)],
  })

  const [monthlyBill, setMonthlyBill] = useState(5000)

  const sizeDetails = useMemo(() => calculateSystemSizeDetails(monthlyBill), [monthlyBill])
  const carbon = useMemo(
    () => calculateCarbonSavings(sizeDetails.annualProductionKwh),
    [sizeDetails.annualProductionKwh],
  )

  return (
    <SiteLayout
      title={TITLE}
      description="Estimate the CO2 emissions avoided by switching your business to solar power."
      breadcrumbLabel={TITLE}
    >
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-12 lg:items-start">
        <section
          className="rounded-2xl bg-white p-6 shadow-lg ring-1 ring-slate-900/5 dark:bg-slate-800 dark:ring-white/10 sm:p-8 lg:col-span-4"
          aria-label="Carbon savings calculator inputs"
        >
          <h2 className="text-lg font-semibold text-slate-900 dark:text-white">Your Input</h2>
          <div className="mt-6">
            <SliderNumberField
              id="carbon-bill"
              label="Average Monthly Electric Bill"
              tooltip="Your average pre-solar monthly electric bill — used to estimate system size and annual production."
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
            <h2 className="text-lg font-semibold text-slate-900 dark:text-white">Estimated Carbon Impact</h2>
            <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
              <StatTile
                label="Annual CO2 Avoided"
                value={carbon.annualTonsCo2}
                format={(v) => `${v.toFixed(1)} tons`}
                highlight
              />
              <StatTile
                label="25-Year CO2 Avoided"
                value={carbon.lifetimeTonsCo2}
                format={(v) => `${Math.round(v).toLocaleString('en-US')} tons`}
              />
              <StatTile
                label="Equivalent Cars Off the Road"
                value={carbon.equivalentCarsPerYear}
                format={(v) => `${v.toFixed(1)}/yr`}
              />
              <StatTile
                label="Equivalent Tree Seedlings Grown 10yrs"
                value={carbon.equivalentTreeSeedlingsGrown10Yr}
                format={(v) => `${Math.round(v).toLocaleString('en-US')}`}
              />
            </div>
          </section>

          <ReportActions
            title="Carbon Savings Calculator — Summary"
            lines={[
              `Annual CO2 Avoided: ${carbon.annualTonsCo2.toFixed(1)} tons`,
              `25-Year CO2 Avoided: ${Math.round(carbon.lifetimeTonsCo2).toLocaleString('en-US')} tons`,
              `Equivalent Cars Off the Road: ${carbon.equivalentCarsPerYear.toFixed(1)}/yr`,
              `Equivalent Tree Seedlings Grown 10yrs: ${Math.round(carbon.equivalentTreeSeedlingsGrown10Yr).toLocaleString('en-US')}`,
            ]}
          />

          <section className="rounded-2xl bg-white p-6 shadow-lg ring-1 ring-slate-900/5 dark:bg-slate-800 dark:ring-white/10 sm:p-8">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">Methodology &amp; ESG Reporting</h2>
            <div className="mt-4 space-y-4 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
              <p>
                This estimate multiplies your system&apos;s estimated annual production by the
                EPA eGRID national average grid emissions factor of 0.855 lbs CO2 per kWh — the
                emissions your utility would otherwise generate to serve that electricity.
                Equivalency figures (cars off the road, tree seedlings grown for 10 years) use
                the EPA Greenhouse Gas Equivalencies Calculator&apos;s published conversion
                factors.
              </p>
              <p>
                Actual grid emissions intensity varies significantly by region — a system in a
                coal-heavy grid region avoids more emissions per kWh than one in a region already
                dominated by hydro, nuclear, or existing renewables. Businesses using these
                figures for ESG or sustainability reporting should substitute their specific
                utility's or eGRID subregion's emissions factor where precision matters.
              </p>
            </div>
          </section>
        </div>
      </div>
    </SiteLayout>
  )
}

export default CarbonSavingsCalculatorPage
