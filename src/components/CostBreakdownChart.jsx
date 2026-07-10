const COLORS = ['#10b981', '#0ea5e9', '#6366f1', '#f59e0b', '#ec4899', '#14b8a6', '#94a3b8']

const currencyFormatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  maximumFractionDigits: 0,
})

function CostBreakdownChart({ breakdown }) {
  return (
    <div>
      <div
        className="flex h-8 w-full overflow-hidden rounded-lg"
        role="img"
        aria-label={`Installed cost breakdown: ${breakdown.map((item) => `${item.label} ${Math.round(item.percent * 100)}%`).join(', ')}`}
      >
        {breakdown.map((item, index) => (
          <div
            key={item.label}
            style={{ width: `${item.percent * 100}%`, backgroundColor: COLORS[index % COLORS.length] }}
            className="h-full transition-all duration-500 ease-out first:rounded-l-lg last:rounded-r-lg"
            title={item.label}
          />
        ))}
      </div>

      <ul className="mt-4 grid grid-cols-1 gap-x-6 gap-y-2 sm:grid-cols-2">
        {breakdown.map((item, index) => (
          <li key={item.label} className="flex items-center justify-between gap-2 text-sm">
            <span className="flex items-center gap-2 text-slate-600 dark:text-slate-300">
              <span
                className="h-2.5 w-2.5 flex-shrink-0 rounded-sm"
                style={{ backgroundColor: COLORS[index % COLORS.length] }}
                aria-hidden="true"
              />
              {item.label}
            </span>
            <span className="whitespace-nowrap font-semibold text-slate-900 dark:text-white">
              {currencyFormatter.format(item.cost)}{' '}
              <span className="font-normal text-slate-400 dark:text-slate-500">
                ({Math.round(item.percent * 100)}%)
              </span>
            </span>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default CostBreakdownChart
