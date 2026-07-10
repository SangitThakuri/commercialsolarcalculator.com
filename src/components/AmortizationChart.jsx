import { useTheme } from '../context/ThemeContext.jsx'

const CHART_WIDTH = 800
const CHART_HEIGHT = 280
const MARGIN = { top: 20, right: 16, bottom: 28, left: 16 }

const currencyFormatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  maximumFractionDigits: 0,
})

function AmortizationChart({ schedule }) {
  const { theme } = useTheme()
  const axisTextColor = theme === 'dark' ? '#94a3b8' : '#64748b'

  const plotWidth = CHART_WIDTH - MARGIN.left - MARGIN.right
  const plotHeight = CHART_HEIGHT - MARGIN.top - MARGIN.bottom

  const maxBalance = Math.max(...schedule.map((point) => point.balance))
  const toX = (index) => MARGIN.left + (index / (schedule.length - 1)) * plotWidth
  const toY = (balance) => MARGIN.top + plotHeight - (balance / maxBalance) * plotHeight

  const linePoints = schedule.map((point, index) => `${toX(index)},${toY(point.balance)}`).join(' ')
  const areaPoints = `${toX(0)},${MARGIN.top + plotHeight} ${linePoints} ${toX(schedule.length - 1)},${MARGIN.top + plotHeight}`

  const finalYear = schedule[schedule.length - 1]

  return (
    <div>
      <svg
        viewBox={`0 0 ${CHART_WIDTH} ${CHART_HEIGHT}`}
        className="h-auto w-full"
        role="img"
        aria-label={`Loan balance declining from ${currencyFormatter.format(schedule[0].balance)} to fully paid off by year ${finalYear.year}`}
      >
        <polygon points={areaPoints} fill="#10b981" fillOpacity="0.12" />
        <polyline
          points={linePoints}
          fill="none"
          stroke="#10b981"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="transition-all duration-500 ease-out"
        />
        {schedule.map((point, index) => {
          if (point.year % Math.max(1, Math.round(schedule.length / 6)) !== 0 && point.year !== 0) {
            return null
          }
          return (
            <text
              key={point.year}
              x={toX(index)}
              y={CHART_HEIGHT - MARGIN.bottom + 16}
              textAnchor="middle"
              fontSize="11"
              fill={axisTextColor}
            >
              {point.year}
            </text>
          )
        })}
      </svg>
      <p className="mt-2 text-center text-xs text-slate-400 dark:text-slate-500">
        Remaining loan balance by year, from {currencyFormatter.format(schedule[0].balance)} at
        origination to $0 at year {finalYear.year}.
      </p>
    </div>
  )
}

export default AmortizationChart
