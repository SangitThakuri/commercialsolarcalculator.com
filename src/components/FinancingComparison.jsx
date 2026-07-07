import { useMemo, useState } from 'react'
import { SliderNumberField } from './InputPanel.jsx'
import { calculateLoanComparison } from '../utils/solarMath.js'

const currencyFormatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  maximumFractionDigits: 0,
})

function Stat({ label, value, tone = 'neutral' }) {
  return (
    <div
      className={`rounded-xl p-4 ${
        tone === 'positive'
          ? 'bg-emerald-50 ring-1 ring-emerald-200'
          : tone === 'negative'
            ? 'bg-amber-50 ring-1 ring-amber-200'
            : 'bg-slate-50 ring-1 ring-slate-200'
      }`}
    >
      <p className="text-xs font-medium uppercase tracking-wide text-slate-500">{label}</p>
      <p
        className={`mt-1 text-lg font-bold tabular-nums sm:text-xl ${
          tone === 'positive' ? 'text-emerald-700' : tone === 'negative' ? 'text-amber-700' : 'text-slate-900'
        }`}
      >
        {value}
      </p>
    </div>
  )
}

function FinancingComparison({ netCapital, annualSavings }) {
  const [mode, setMode] = useState('cash')
  const [apr, setApr] = useState(0.07)
  const [termYears, setTermYears] = useState(10)

  const monthlySavings = annualSavings / 12

  const loan = useMemo(
    () => calculateLoanComparison(netCapital, apr, termYears, monthlySavings),
    [netCapital, apr, termYears, monthlySavings],
  )

  return (
    <section
      className="animate-fade-in-up rounded-2xl bg-white p-6 shadow-lg ring-1 ring-slate-900/5 sm:p-8"
      aria-label="Compare financing options"
    >
      <h2 className="text-lg font-semibold text-slate-900">Compare Financing Options</h2>

      <div className="mt-4 inline-flex rounded-lg bg-slate-100 p-1" role="tablist" aria-label="Financing method">
        <button
          type="button"
          role="tab"
          aria-selected={mode === 'cash'}
          onClick={() => setMode('cash')}
          className={`rounded-md px-4 py-1.5 text-sm font-semibold transition ${
            mode === 'cash' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-700'
          }`}
        >
          Cash Purchase
        </button>
        <button
          type="button"
          role="tab"
          aria-selected={mode === 'loan'}
          onClick={() => setMode('loan')}
          className={`rounded-md px-4 py-1.5 text-sm font-semibold transition ${
            mode === 'loan' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-700'
          }`}
        >
          Solar Loan
        </button>
      </div>

      {mode === 'cash' ? (
        <p className="mt-5 text-sm leading-relaxed text-slate-600">
          Paying the {currencyFormatter.format(netCapital)} Net Capital Required entirely in cash
          avoids financing costs altogether — your payback timeline above is driven purely by
          utility savings against that upfront amount, with no interest to offset.
        </p>
      ) : (
        <div className="mt-5 flex flex-col gap-6">
          <SliderNumberField
            id="loan-apr"
            label="Loan APR"
            tooltip="Illustrative annual percentage rate — your actual rate depends on your lender, term, and creditworthiness."
            value={apr * 100}
            onChange={(percent) => setApr(percent / 100)}
            min={3}
            max={12}
            step={0.25}
            suffix="%"
            ariaLabel="Loan annual percentage rate"
            minCaption="3%"
            maxCaption="12%"
            formatValue={(v) => v.toFixed(2)}
          />
          <SliderNumberField
            id="loan-term"
            label="Loan Term"
            tooltip="Number of years over which the loan is repaid."
            value={termYears}
            onChange={setTermYears}
            min={3}
            max={15}
            step={1}
            suffix=" yrs"
            ariaLabel="Loan term in years"
            minCaption="3 yrs"
            maxCaption="15 yrs"
          />

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
            <Stat label="Monthly Loan Payment" value={currencyFormatter.format(loan.monthlyPayment)} />
            <Stat label="Monthly Utility Savings" value={currencyFormatter.format(loan.monthlySavings)} />
            <Stat
              label="Net Monthly Cash Flow"
              value={`${loan.netMonthlyCashFlow >= 0 ? '+' : '-'}${currencyFormatter.format(Math.abs(loan.netMonthlyCashFlow))}`}
              tone={loan.netMonthlyCashFlow >= 0 ? 'positive' : 'negative'}
            />
          </div>
          <p className="text-xs text-slate-400">
            Illustrative amortization only, financing the full Net Capital Required — your actual
            rate, term, fees, and down payment will depend on your lender.
          </p>
        </div>
      )}
    </section>
  )
}

export default FinancingComparison
