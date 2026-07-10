import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import SiteLayout from '../layouts/SiteLayout.jsx'
import { SliderNumberField } from '../components/InputPanel.jsx'
import ReportActions from '../components/ReportActions.jsx'
import { usePageMeta } from '../hooks/usePageMeta.js'
import { buildBreadcrumbJsonLd, buildToolJsonLd } from '../utils/seo.js'
import { compareFinancingOptions } from '../utils/solarMath.js'

const currencyFormatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  maximumFractionDigits: 0,
})

const TITLE = 'Solar Financing Calculator'
const DESCRIPTION =
  'Compare cash purchase, a solar loan, and a solar lease side by side — upfront cost, monthly cash flow, and who keeps the tax benefits.'
const PATH = '/solar-financing-calculator'

function FinancingCard({ label, badge, upfrontCost, monthlyLine, footnote, highlight }) {
  return (
    <div
      className={`rounded-xl border p-5 transition-all duration-300 ${
        highlight
          ? 'border-emerald-500/40 bg-emerald-50 dark:bg-emerald-900/20'
          : 'border-slate-200 bg-slate-50 dark:border-slate-700 dark:bg-slate-900/40'
      }`}
    >
      <div className="flex items-center justify-between gap-2">
        <p className="text-sm font-semibold text-slate-900 dark:text-white">{label}</p>
        {badge && (
          <span className="rounded-full bg-emerald-500 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-slate-900">
            {badge}
          </span>
        )}
      </div>
      <p className="mt-3 text-xs font-medium uppercase tracking-wide text-slate-400 dark:text-slate-500">
        Upfront Cost
      </p>
      <p className="text-xl font-bold tabular-nums text-slate-900 dark:text-white">
        {currencyFormatter.format(upfrontCost)}
      </p>
      <p className="mt-3 text-xs font-medium uppercase tracking-wide text-slate-400 dark:text-slate-500">
        {monthlyLine.label}
      </p>
      <p className="text-xl font-bold tabular-nums text-emerald-600 dark:text-emerald-400">
        {monthlyLine.value}
      </p>
      <p className="mt-3 text-xs leading-relaxed text-slate-500 dark:text-slate-400">{footnote}</p>
    </div>
  )
}

function SolarFinancingCalculatorPage() {
  usePageMeta({
    title: `${TITLE} | Commercial Solar Calculator`,
    description: DESCRIPTION,
    path: PATH,
    jsonLd: [buildToolJsonLd({ path: PATH, name: TITLE, description: DESCRIPTION }), buildBreadcrumbJsonLd(PATH, TITLE)],
  })

  const [monthlyBill, setMonthlyBill] = useState(5000)
  const [stateTaxRate, setStateTaxRate] = useState(0.06)
  const [loanApr, setLoanApr] = useState(0.07)
  const [loanTermYears, setLoanTermYears] = useState(10)

  const comparison = useMemo(
    () => compareFinancingOptions(monthlyBill, stateTaxRate, loanApr, loanTermYears),
    [monthlyBill, stateTaxRate, loanApr, loanTermYears],
  )

  const bestMonthlyCashFlow = Math.max(
    comparison.cash.monthlyNetCashFlow,
    comparison.loan.monthlyNetCashFlow,
    comparison.lease.monthlyNetCashFlow,
  )

  return (
    <SiteLayout
      title={TITLE}
      description="Cash, loan, or lease — compare upfront cost and monthly cash flow side by side before you decide."
      breadcrumbLabel={TITLE}
    >
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-12 lg:items-start">
        <section
          className="rounded-2xl bg-white p-6 shadow-lg ring-1 ring-slate-900/5 dark:bg-slate-800 dark:ring-white/10 sm:p-8 lg:col-span-4"
          aria-label="Solar financing calculator inputs"
        >
          <h2 className="text-lg font-semibold text-slate-900 dark:text-white">Your Inputs</h2>
          <div className="mt-6 flex flex-col gap-6">
            <SliderNumberField
              id="financing-bill"
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
              id="financing-tax-rate"
              label="State Corporate Tax Rate"
              tooltip="Only affects the cash and loan options — a lease provider keeps the tax credit and depreciation."
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
              id="financing-apr"
              label="Loan APR"
              tooltip="Illustrative annual percentage rate for the loan option — your actual rate depends on your lender and creditworthiness."
              value={loanApr * 100}
              onChange={(percent) => setLoanApr(percent / 100)}
              min={3}
              max={15}
              step={0.25}
              suffix="%"
              ariaLabel="Loan annual percentage rate"
              minCaption="3%"
              maxCaption="15%"
              formatValue={(v) => v.toFixed(2)}
            />
            <SliderNumberField
              id="financing-term"
              label="Loan Term"
              tooltip="Number of years over which the loan is repaid."
              value={loanTermYears}
              onChange={setLoanTermYears}
              min={2}
              max={20}
              step={1}
              suffix=" yrs"
              ariaLabel="Loan term in years"
              minCaption="2 yrs"
              maxCaption="20 yrs"
            />
          </div>
        </section>

        <div className="flex flex-col gap-6 lg:col-span-8">
          <section className="rounded-2xl bg-white p-6 shadow-lg ring-1 ring-slate-900/5 dark:bg-slate-800 dark:ring-white/10 sm:p-8">
            <h2 className="text-lg font-semibold text-slate-900 dark:text-white">
              Cash vs. Loan vs. Lease
            </h2>
            <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
              <FinancingCard
                label="Cash Purchase"
                highlight={comparison.cash.monthlyNetCashFlow === bestMonthlyCashFlow}
                badge={comparison.cash.monthlyNetCashFlow === bestMonthlyCashFlow ? 'Best' : null}
                upfrontCost={comparison.cash.upfrontCost}
                monthlyLine={{
                  label: 'Monthly Cash Flow',
                  value: `+${currencyFormatter.format(comparison.cash.monthlyNetCashFlow)}`,
                }}
                footnote={`You own the system outright and keep 100% of the ITC, MACRS depreciation, and long-run savings. Payback in ${comparison.cash.paybackYears.toFixed(1)} years.`}
              />
              <FinancingCard
                label="Solar Loan"
                highlight={comparison.loan.monthlyNetCashFlow === bestMonthlyCashFlow}
                badge={comparison.loan.monthlyNetCashFlow === bestMonthlyCashFlow ? 'Best' : null}
                upfrontCost={comparison.loan.upfrontCost}
                monthlyLine={{
                  label: 'Monthly Cash Flow',
                  value: `${comparison.loan.monthlyNetCashFlow >= 0 ? '+' : ''}${currencyFormatter.format(comparison.loan.monthlyNetCashFlow)}`,
                }}
                footnote={`$0 down. You still keep the ITC and depreciation, but pay ${currencyFormatter.format(comparison.loan.monthlyPayment)}/mo toward the loan.`}
              />
              <FinancingCard
                label="Solar Lease / PPA"
                highlight={comparison.lease.monthlyNetCashFlow === bestMonthlyCashFlow}
                badge={comparison.lease.monthlyNetCashFlow === bestMonthlyCashFlow ? 'Best' : null}
                upfrontCost={comparison.lease.upfrontCost}
                monthlyLine={{
                  label: 'Monthly Savings',
                  value: `+${currencyFormatter.format(comparison.lease.monthlyNetCashFlow)}`,
                }}
                footnote={`$0 down, no maintenance responsibility — but a third party owns the system and keeps the ITC and depreciation.`}
              />
            </div>
          </section>

          <ReportActions
            title="Solar Financing Calculator — Summary"
            lines={[
              `Cash — Upfront: ${currencyFormatter.format(comparison.cash.upfrontCost)}, Monthly Cash Flow: +${currencyFormatter.format(comparison.cash.monthlyNetCashFlow)}, Payback: ${comparison.cash.paybackYears.toFixed(1)} yrs`,
              `Loan — Upfront: $0, Monthly Payment: ${currencyFormatter.format(comparison.loan.monthlyPayment)}, Net Monthly Cash Flow: ${currencyFormatter.format(comparison.loan.monthlyNetCashFlow)}`,
              `Lease — Upfront: $0, Monthly Savings: +${currencyFormatter.format(comparison.lease.monthlyNetCashFlow)}`,
            ]}
          />

          <section className="rounded-2xl bg-white p-6 shadow-lg ring-1 ring-slate-900/5 dark:bg-slate-800 dark:ring-white/10 sm:p-8">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">
              Choosing How to Pay for Commercial Solar
            </h2>
            <div className="mt-4 space-y-4 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
              <p>
                <strong>Cash</strong> maximizes total return — you keep the Section 48E tax credit,
                MACRS depreciation, and every dollar of long-run savings — but it ties up capital
                that might have other uses in your business. A <strong>loan</strong> preserves that
                capital while still capturing the tax benefits, at the cost of interest and a
                monthly payment. A <strong>lease or Power Purchase Agreement (PPA)</strong> requires
                no capital and no tax appetite at all, since a third party owns the system and
                simply sells you power at a discount — but you give up the tax credit,
                depreciation, and most of the long-term upside in exchange for simplicity.
              </p>
              <p>
                For a deeper look at any one option, see the dedicated{' '}
                <Link to="/solar-loan-calculator" className="font-semibold text-emerald-600 hover:underline dark:text-emerald-400">
                  Solar Loan Calculator
                </Link>{' '}
                or{' '}
                <Link to="/solar-lease-calculator" className="font-semibold text-emerald-600 hover:underline dark:text-emerald-400">
                  Solar Lease Calculator
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

export default SolarFinancingCalculatorPage
