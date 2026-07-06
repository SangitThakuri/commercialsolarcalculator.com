const currencyFormatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  maximumFractionDigits: 0,
})

function InputPanel({ monthlyBill, setMonthlyBill, stateTaxRate, setStateTaxRate }) {
  return (
    <section
      className="rounded-2xl bg-white p-6 shadow-lg sm:p-8"
      aria-label="Solar investment inputs"
    >
      <h2 className="text-lg font-semibold text-slate-900">Your Business Inputs</h2>

      <div className="mt-6">
        <label htmlFor="monthly-bill" className="flex items-baseline justify-between text-sm font-medium text-slate-700">
          <span>Average Monthly Electric Bill</span>
          <span className="text-base font-bold text-emerald-600">
            {currencyFormatter.format(monthlyBill)}
          </span>
        </label>
        <input
          id="monthly-bill"
          type="range"
          min={500}
          max={50000}
          step={100}
          value={monthlyBill}
          onChange={(event) => setMonthlyBill(Number(event.target.value))}
          aria-label="Average monthly electric bill in US dollars"
          aria-valuetext={currencyFormatter.format(monthlyBill)}
          className="mt-3 h-3 w-full min-h-[44px] cursor-pointer touch-manipulation appearance-none rounded-full bg-slate-200 accent-emerald-500"
        />
        <div className="mt-1 flex justify-between text-xs text-slate-400">
          <span>$500</span>
          <span>$50,000</span>
        </div>
      </div>

      <div className="mt-8">
        <label htmlFor="tax-rate" className="flex items-baseline justify-between text-sm font-medium text-slate-700">
          <span>State Corporate Tax Rate</span>
          <span className="text-base font-bold text-emerald-600">
            {(stateTaxRate * 100).toFixed(1)}%
          </span>
        </label>
        <input
          id="tax-rate"
          type="range"
          min={0}
          max={0.12}
          step={0.005}
          value={stateTaxRate}
          onChange={(event) => setStateTaxRate(Number(event.target.value))}
          aria-label="State corporate tax rate percentage"
          aria-valuetext={`${(stateTaxRate * 100).toFixed(1)} percent`}
          className="mt-3 h-3 w-full min-h-[44px] cursor-pointer touch-manipulation appearance-none rounded-full bg-slate-200 accent-emerald-500"
        />
        <div className="mt-1 flex justify-between text-xs text-slate-400">
          <span>0%</span>
          <span>12%</span>
        </div>
      </div>
    </section>
  )
}

export default InputPanel
