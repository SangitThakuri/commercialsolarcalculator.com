import StatTile from './StatTile.jsx'

const currencyFormatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  maximumFractionDigits: 0,
})

function ResultsSummary({ metrics }) {
  const { systemSizeKw, grossCost, itcAmount, macrsSavings, netCapital, paybackPeriod } = metrics

  const paybackValue = Number.isFinite(paybackPeriod) ? paybackPeriod : 0

  return (
    <section
      className="animate-fade-in-up rounded-2xl bg-white p-6 shadow-lg ring-1 ring-slate-900/5 dark:bg-slate-800 dark:ring-white/10 print:shadow-none print:ring-0 sm:p-8"
      aria-label="Solar investment results"
    >
      <h2 className="text-lg font-semibold text-slate-900 dark:text-white">Projected ROI Summary</h2>
      <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3">
        <StatTile label="System Size" value={systemSizeKw} format={(v) => `${Math.round(v)} kW`} />
        <StatTile label="Gross Cost" value={grossCost} format={(v) => currencyFormatter.format(v)} />
        <StatTile
          label="Federal ITC (30%)"
          value={itcAmount}
          format={(v) => currencyFormatter.format(v)}
        />
        <StatTile
          label="MACRS Tax Shield"
          value={macrsSavings}
          format={(v) => currencyFormatter.format(v)}
        />
        <StatTile
          label="Net Capital Required"
          value={netCapital}
          format={(v) => currencyFormatter.format(v)}
        />
        <StatTile
          label="Payback Period"
          value={paybackValue}
          format={(v) => (Number.isFinite(paybackPeriod) ? `${v.toFixed(1)} yrs` : '--')}
          highlight
        />
      </div>
    </section>
  )
}

export default ResultsSummary
