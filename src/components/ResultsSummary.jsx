const currencyFormatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  maximumFractionDigits: 0,
})

function StatCard({ label, value }) {
  return (
    <div className="rounded-xl bg-slate-900 p-4">
      <p className="text-xs font-medium uppercase tracking-wide text-slate-400">{label}</p>
      <p className="mt-1 text-xl font-bold text-white sm:text-2xl">{value}</p>
    </div>
  )
}

function ResultsSummary({ metrics }) {
  const {
    systemSizeKw,
    grossCost,
    itcAmount,
    macrsSavings,
    netCapital,
    paybackPeriod,
  } = metrics

  const paybackLabel = Number.isFinite(paybackPeriod)
    ? `${paybackPeriod.toFixed(1)} yrs`
    : '--'

  return (
    <section
      className="rounded-2xl bg-white p-6 shadow-lg sm:p-8"
      aria-label="Solar investment results"
    >
      <h2 className="text-lg font-semibold text-slate-900">Projected ROI Summary</h2>
      <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3">
        <StatCard label="System Size" value={`${systemSizeKw} kW`} />
        <StatCard label="Gross Cost" value={currencyFormatter.format(grossCost)} />
        <StatCard label="Federal ITC (30%)" value={currencyFormatter.format(itcAmount)} />
        <StatCard label="MACRS Tax Shield" value={currencyFormatter.format(macrsSavings)} />
        <StatCard label="Net Capital Required" value={currencyFormatter.format(netCapital)} />
        <StatCard label="Payback Period" value={paybackLabel} />
      </div>
    </section>
  )
}

export default ResultsSummary
