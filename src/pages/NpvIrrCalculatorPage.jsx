import { useMemo, useState } from 'react'
import SiteLayout from '../layouts/SiteLayout.jsx'
import { SliderNumberField } from '../components/InputPanel.jsx'
import StatTile from '../components/StatTile.jsx'
import ReportActions from '../components/ReportActions.jsx'
import CashFlowChart from '../components/CashFlowChart.jsx'
import { usePageMeta } from '../hooks/usePageMeta.js'
import { buildBreadcrumbJsonLd, buildToolJsonLd } from '../utils/seo.js'
import { calculateSolarMetrics, calculateNpvAndIrr } from '../utils/solarMath.js'

const currencyFormatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  maximumFractionDigits: 0,
})

const TITLE = 'Solar Investment Calculator (NPV & IRR)'
const DESCRIPTION =
  'Run a full discounted cash flow analysis on your commercial solar investment — net present value (NPV) and internal rate of return (IRR).'
const PATH = '/solar-investment-calculator'

function NpvIrrCalculatorPage() {
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

  const { npv, irr, discountedProjection, discountedCrossoverYear } = useMemo(
    () => calculateNpvAndIrr(metrics.netCapital, metrics.annualSavings, discountRate),
    [metrics.netCapital, metrics.annualSavings, discountRate],
  )

  return (
    <SiteLayout
      title={TITLE}
      description="A full discounted cash flow (DCF) view of your solar investment — net present value and internal rate of return, not just simple payback."
      breadcrumbLabel="Solar Investment Calculator"
    >
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-12 lg:items-start">
        <section
          className="rounded-2xl bg-white p-6 shadow-lg ring-1 ring-slate-900/5 dark:bg-slate-800 dark:ring-white/10 sm:p-8 lg:col-span-4"
          aria-label="NPV and IRR calculator inputs"
        >
          <h2 className="text-lg font-semibold text-slate-900 dark:text-white">Your Inputs</h2>
          <div className="mt-6 flex flex-col gap-6">
            <SliderNumberField
              id="npv-bill"
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
              id="npv-tax-rate"
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
              id="npv-discount-rate"
              label="Discount Rate"
              tooltip="Your business's cost of capital or required rate of return — the rate future cash flows are discounted at to compute NPV."
              value={discountRate * 100}
              onChange={(percent) => setDiscountRate(percent / 100)}
              min={2}
              max={20}
              step={0.5}
              suffix="%"
              ariaLabel="Discount rate percentage"
              minCaption="2%"
              maxCaption="20%"
              formatValue={(v) => v.toFixed(1)}
            />
          </div>
        </section>

        <div className="flex flex-col gap-6 lg:col-span-8">
          <section className="rounded-2xl bg-white p-6 shadow-lg ring-1 ring-slate-900/5 dark:bg-slate-800 dark:ring-white/10 sm:p-8">
            <h2 className="text-lg font-semibold text-slate-900 dark:text-white">Discounted Cash Flow Summary</h2>
            <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-3">
              <StatTile
                label="Net Present Value (NPV)"
                value={npv}
                format={(v) => currencyFormatter.format(v)}
                highlight
              />
              <StatTile
                label="Internal Rate of Return (IRR)"
                value={irr !== null ? irr * 100 : 0}
                format={(v) => `${v.toFixed(1)}%`}
              />
              <StatTile
                label="Discounted Payback"
                value={discountedCrossoverYear ?? 0}
                format={(v) => (discountedCrossoverYear !== null ? `${v.toFixed(0)} yrs` : 'Beyond 25 yrs')}
              />
            </div>
          </section>

          <ReportActions
            title="Solar Investment Calculator — NPV & IRR Summary"
            lines={[
              `Discount Rate Used: ${(discountRate * 100).toFixed(1)}%`,
              `Net Present Value (NPV): ${currencyFormatter.format(npv)}`,
              `Internal Rate of Return (IRR): ${irr !== null ? `${(irr * 100).toFixed(1)}%` : 'N/A'}`,
              `Discounted Payback: ${discountedCrossoverYear !== null ? `${discountedCrossoverYear} yrs` : 'Beyond 25 yrs'}`,
              `Net Capital Required: ${currencyFormatter.format(metrics.netCapital)}`,
            ]}
          />

          <section className="rounded-2xl bg-white p-6 shadow-lg ring-1 ring-slate-900/5 dark:bg-slate-800 dark:ring-white/10 sm:p-8">
            <h2 className="text-lg font-semibold text-slate-900 dark:text-white">Discounted Cumulative Cash Flow</h2>
            <div className="mt-6">
              <CashFlowChart projection={discountedProjection} crossoverYear={discountedCrossoverYear} />
            </div>
          </section>

          <section className="rounded-2xl bg-white p-6 shadow-lg ring-1 ring-slate-900/5 dark:bg-slate-800 dark:ring-white/10 sm:p-8">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">Why NPV and IRR Matter More Than Simple ROI</h2>
            <div className="mt-4 space-y-4 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
              <p>
                Simple ROI and payback period ignore the time value of money — a dollar saved in
                year 20 is treated the same as a dollar saved next year. Net Present Value (NPV)
                discounts every future year of utility savings back to today's dollars using your
                discount rate (typically your business's cost of capital or the return you'd
                expect from an alternative investment), then subtracts your net capital outlay. A
                positive NPV means the investment clears your required rate of return; a negative
                NPV means it doesn't, even if the simple payback period looks attractive.
              </p>
              <p>
                Internal Rate of Return (IRR) is the discount rate at which NPV equals exactly
                zero — in other words, the annualized return the investment actually generates
                across all 25 years of cash flows. It's the number most directly comparable to
                the expected return on other capital projects, equipment purchases, or marketable
                securities your business might consider instead. Because this figure already
                incorporates the Section 48E tax credit and MACRS depreciation tax shield modeled
                on the full calculator, it reflects the after-incentive return, not just the raw
                utility savings.
              </p>
            </div>
          </section>
        </div>
      </div>
    </SiteLayout>
  )
}

export default NpvIrrCalculatorPage
