import { useCountUp } from '../hooks/useCountUp.js'

function StatTile({ label, value, format = (v) => v, highlight = false }) {
  const animatedValue = useCountUp(typeof value === 'number' ? value : 0)

  return (
    <div
      className={`rounded-xl p-4 transition-all duration-300 hover:-translate-y-0.5 ${
        highlight
          ? 'bg-gradient-to-br from-emerald-600 to-emerald-700 shadow-lg shadow-emerald-900/30'
          : 'bg-slate-900 hover:shadow-lg hover:shadow-slate-900/30'
      }`}
    >
      <p className={`text-xs font-medium uppercase tracking-wide ${highlight ? 'text-emerald-100' : 'text-slate-400'}`}>
        {label}
      </p>
      <p className="mt-1 text-xl font-bold tabular-nums text-white sm:text-2xl">
        {typeof value === 'number' ? format(animatedValue) : value}
      </p>
    </div>
  )
}

export default StatTile
