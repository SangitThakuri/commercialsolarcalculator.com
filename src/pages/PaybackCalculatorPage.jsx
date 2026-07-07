import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import SiteLayout from '../layouts/SiteLayout.jsx'
import { SliderNumberField } from '../components/InputPanel.jsx'
import StatTile from '../components/StatTile.jsx'
import { usePageMeta } from '../hooks/usePageMeta.js'
import { buildBreadcrumbJsonLd, buildToolJsonLd } from '../utils/seo.js'
import { calculateSolarMetrics, calculateDiscountedPayback } from '../utils/solarMath.js'

const TITLE = 'Solar Payback Calculator'
const DESCRIPTION =
  'Calculate your commercial solar payback period — both simple payback and discounted payback accounting for the time value of money.'
const PATH = '/solar-payback-calculator'

function PaybackCalculatorPage() {
  usePageMeta({
    title: `${TITLE} | Commercial Solar Calculator`,
    description: DESCRIPTION,
    path: PATH,
    jsonLd: [buildToolJsonLd({ path: PATH, name: TITLE, description: DESCRIPTION }), buildBreadcrumbJsonLd(PATH, TITLE)],
  })

  const [monthlyBill, setMonthlyBill] = useState(5000)
  const [stateTaxRate, setStateTaxRate] = useState(0.06)
  const [discountRate, setDiscountRate] = useState(0.08)

  const metrics = useMemo(
    () => calculateSolarMetrics(monthlyBill, stateTaxRate),
    [monthlyBill, stateTaxRate],
  )

  const discountedPayback = useMemo(
    () => calculateDiscountedPayback(metrics.netCapital, metrics.annualSavings, discountRate),
    [metrics.netCapital, metrics.annualSavings, discountRate],
  )

  return (
    <SiteLayout
      title={TITLE}
      description="Find out exactly how many years it takes for utility savings to recover your commercial solar investment."
      breadcrumbLabel={TITLE}
    >
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-12 lg:items-start">
        <section
          className="rounded-2xl bg-white p-6 shadow-lg ring-1 ring-slate-900/5 sm:p-8 lg:col-span-5"
          aria-label="Payback calculator inputs"
        >
          <h2 className="text-lg font-semibold text-slate-900">Your Inputs</h2>
          <div className="mt-6 flex flex-col gap-6">
            <SliderNumberField
              id="payback-bill"
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
              id="payback-tax-rate"
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
            <SliderNumberField
              id="payback-discount-rate"
              label="Discount Rate"
              tooltip="Your business's cost of capital or required rate of return, used to discount future savings to today's dollars."
              value={discountRate * 100}
              onChange={(percent) => setDiscountRate(percent / 100)}
              min={2}
              max={15}
              step={0.5}
              suffix="%"
              ariaLabel="Discount rate percentage"
              minCaption="2%"
              maxCaption="15%"
            />
          </div>
        </section>

        <div className="flex flex-col gap-6 lg:col-span-7">
          <section className="rounded-2xl bg-white p-6 shadow-lg ring-1 ring-slate-900/5 sm:p-8">
            <h2 className="text-lg font-semibold text-slate-900">Payback Results</h2>
            <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
              <StatTile
                label="Simple Payback Period"
                value={metrics.paybackPeriod}
                format={(v) => `${v.toFixed(1)} yrs`}
                highlight
              />
              <StatTile
                label="Discounted Payback Period"
                value={discountedPayback ?? 0}
                format={(v) => (discountedPayback !== null ? `${v.toFixed(1)} yrs` : 'Beyond 25 yrs')}
              />
            </div>
          </section>

          <section className="rounded-2xl bg-white p-6 shadow-lg ring-1 ring-slate-900/5 sm:p-8">
            <h2 className="text-xl font-bold text-slate-900">
              Simple Payback vs. Discounted Payback
            </h2>
            <div className="mt-4 space-y-4 text-sm leading-relaxed text-slate-600">
              <p>
                <strong>Simple payback</strong> divides your net capital required by your annual
                utility savings — straightforward, but it ignores the time value of money: a
                dollar saved in year 10 is treated as equal to a dollar saved today.
              </p>
              <p>
                <strong>Discounted payback</strong> applies your discount rate (typically your
                business&apos;s cost of capital or a hurdle rate used for other investment
                decisions) to each future year of savings before counting it toward capital
                recovery. Because future dollars are worth less in today&apos;s terms, discounted
                payback is always longer than simple payback — and it&apos;s the more rigorous
                number to use when comparing solar against other capital projects with their own
                discounted returns.
              </p>
              <p>
                Commercial solar payback periods commonly fall in a 3-to-7-year range after
                incentives. For the full breakdown of the Section 48E tax credit and MACRS
                depreciation that drive this number, see the{' '}
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

export default PaybackCalculatorPage
