import { useMemo, useState } from 'react'
import SiteLayout from '../layouts/SiteLayout.jsx'
import { SliderNumberField } from '../components/InputPanel.jsx'
import StatTile from '../components/StatTile.jsx'
import ReportActions from '../components/ReportActions.jsx'
import AmortizationChart from '../components/AmortizationChart.jsx'
import { usePageMeta } from '../hooks/usePageMeta.js'
import { buildBreadcrumbJsonLd, buildToolJsonLd } from '../utils/seo.js'
import { generateAmortizationSchedule } from '../utils/solarMath.js'

const currencyFormatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  maximumFractionDigits: 0,
})

const TITLE = 'Solar Loan Calculator'
const DESCRIPTION =
  'Calculate your monthly payment, total interest, and full amortization schedule for a commercial solar loan.'
const PATH = '/solar-loan-calculator'

function LoanCalculatorPage() {
  usePageMeta({
    title: `${TITLE} | Commercial Solar Calculator`,
    description: DESCRIPTION,
    path: PATH,
    jsonLd: [buildToolJsonLd({ path: PATH, name: TITLE, description: DESCRIPTION }), buildBreadcrumbJsonLd(PATH, TITLE)],
  })

  const [loanAmount, setLoanAmount] = useState(50000)
  const [apr, setApr] = useState(0.07)
  const [termYears, setTermYears] = useState(10)

  const { monthlyPayment, schedule } = useMemo(
    () => generateAmortizationSchedule(loanAmount, apr, termYears),
    [loanAmount, apr, termYears],
  )

  const totalPaid = monthlyPayment * termYears * 12
  const totalInterest = totalPaid - loanAmount

  return (
    <SiteLayout
      title={TITLE}
      description="Model the monthly payment and full amortization schedule for financing a commercial solar system."
      breadcrumbLabel={TITLE}
    >
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-12 lg:items-start">
        <section
          className="rounded-2xl bg-white p-6 shadow-lg ring-1 ring-slate-900/5 dark:bg-slate-800 dark:ring-white/10 sm:p-8 lg:col-span-4"
          aria-label="Loan calculator inputs"
        >
          <h2 className="text-lg font-semibold text-slate-900 dark:text-white">Loan Details</h2>
          <div className="mt-6 flex flex-col gap-6">
            <SliderNumberField
              id="loan-amount"
              label="Loan Amount"
              tooltip="The amount you're financing — typically your net capital required after the tax credit and depreciation benefit."
              value={loanAmount}
              onChange={setLoanAmount}
              min={5000}
              max={2000000}
              step={1000}
              prefix="$"
              ariaLabel="Loan amount in US dollars"
              minCaption="$5,000"
              maxCaption="$2,000,000"
              formatValue={(v) => Math.round(v).toLocaleString('en-US')}
            />
            <SliderNumberField
              id="standalone-loan-apr"
              label="Loan APR"
              tooltip="Illustrative annual percentage rate — your actual rate depends on your lender and creditworthiness."
              value={apr * 100}
              onChange={(percent) => setApr(percent / 100)}
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
              id="standalone-loan-term"
              label="Loan Term"
              tooltip="Number of years over which the loan is repaid."
              value={termYears}
              onChange={setTermYears}
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
            <h2 className="text-lg font-semibold text-slate-900 dark:text-white">Loan Summary</h2>
            <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-3">
              <StatTile
                label="Monthly Payment"
                value={monthlyPayment}
                format={(v) => currencyFormatter.format(v)}
                highlight
              />
              <StatTile label="Total Interest Paid" value={totalInterest} format={(v) => currencyFormatter.format(v)} />
              <StatTile label="Total Cost of Loan" value={totalPaid} format={(v) => currencyFormatter.format(v)} />
            </div>
          </section>

          <ReportActions
            title="Solar Loan Calculator — Summary"
            lines={[
              `Loan Amount: ${currencyFormatter.format(loanAmount)}`,
              `APR: ${(apr * 100).toFixed(2)}%`,
              `Term: ${termYears} yrs`,
              `Monthly Payment: ${currencyFormatter.format(monthlyPayment)}`,
              `Total Interest Paid: ${currencyFormatter.format(totalInterest)}`,
              `Total Cost of Loan: ${currencyFormatter.format(totalPaid)}`,
            ]}
          />

          <section className="rounded-2xl bg-white p-6 shadow-lg ring-1 ring-slate-900/5 dark:bg-slate-800 dark:ring-white/10 sm:p-8">
            <h2 className="text-lg font-semibold text-slate-900 dark:text-white">Amortization Schedule</h2>
            <div className="mt-6">
              <AmortizationChart schedule={schedule} />
            </div>
          </section>

          <section className="rounded-2xl bg-white p-6 shadow-lg ring-1 ring-slate-900/5 dark:bg-slate-800 dark:ring-white/10 sm:p-8">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">Financing a Commercial Solar System</h2>
            <div className="mt-4 space-y-4 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
              <p>
                Most commercial solar loans are structured so the monthly payment is close to —
                or lower than — the utility savings the system generates, making the project
                cash-flow positive from month one. Many businesses finance only the Net Capital
                Required (after the ITC and depreciation benefit) rather than the full system
                cost, using the tax savings to reduce the amount borrowed rather than as a
                separate check.
              </p>
              <p>
                This is a standard amortization calculation: your monthly payment stays constant
                for the life of the loan, but the split between interest and principal shifts
                over time — early payments are interest-heavy, later payments are
                principal-heavy. Your actual rate, term, fees, and any down payment requirement
                will depend on your lender and creditworthiness.
              </p>
            </div>
          </section>
        </div>
      </div>
    </SiteLayout>
  )
}

export default LoanCalculatorPage
