import { useCountUp } from '../hooks/useCountUp.js'

const currencyFormatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  maximumFractionDigits: 0,
})

function StatCard({ label, value, format, highlight = false }) {
  const animatedValue = useCountUp(value)

  return (
    <div
      className={`group relative overflow-hidden rounded-xl p-4 transition-all duration-300 hover:-translate-y-0.5 ${
        highlight
          ? 'bg-gradient-to-br from-emerald-600 to-emerald-700 shadow-lg shadow-emerald-900/30'
          : 'bg-slate-900 hover:shadow-lg hover:shadow-slate-900/30'
      }`}
    >
      <p
        className={`text-xs font-medium uppercase tracking-wide ${
          highlight ? 'text-emerald-100' : 'text-slate-400'
        }`}
      >
        {label}
      </p>
      <p className="mt-1 text-xl font-bold tabular-nums text-white sm:text-2xl">
        {format(animatedValue)}
      </p>
    </div>
  )
}

function ResultsSummary({ metrics }) {
  const { systemSizeKw, grossCost, itcAmount, macrsSavings, netCapital, paybackPeriod } = metrics

  const paybackValue = Number.isFinite(paybackPeriod) ? paybackPeriod : 0

  return (
    <section
      className="animate-fade-in-up rounded-2xl bg-white p-6 shadow-lg ring-1 ring-slate-900/5 sm:p-8 print:shadow-none print:ring-0"
      aria-label="Solar investment results"
    >
      <h2 className="text-lg font-semibold text-slate-900">Projected ROI Summary</h2>
      <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3">
        <StatCard
          label="System Size"
          value={systemSizeKw}
          format={(v) => `${Math.round(v)} kW`}
        />
        <StatCard label="Gross Cost" value={grossCost} format={(v) => currencyFormatter.format(v)} />
        <StatCard
          label="Federal ITC (30%)"
          value={itcAmount}
          format={(v) => currencyFormatter.format(v)}
        />
        <StatCard
          label="MACRS Tax Shield"
          value={macrsSavings}
          format={(v) => currencyFormatter.format(v)}
        />
        <StatCard
          label="Net Capital Required"
          value={netCapital}
          format={(v) => currencyFormatter.format(v)}
        />
        <StatCard
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
