import { useTheme } from '../context/ThemeContext.jsx'

const CHART_WIDTH = 800
const CHART_HEIGHT = 260
const MARGIN = { top: 28, right: 16, bottom: 28, left: 16 }

const currencyFormatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  maximumFractionDigits: 0,
})

function SavingsChart({ series }) {
  const { theme } = useTheme()
  const axisTextColor = theme === 'dark' ? '#94a3b8' : '#64748b'

  const plotWidth = CHART_WIDTH - MARGIN.left - MARGIN.right
  const plotHeight = CHART_HEIGHT - MARGIN.top - MARGIN.bottom

  const maxValue = Math.max(...series.map((point) => point.savings))
  const toHeight = (value) => (value / maxValue) * plotHeight

  const slotWidth = plotWidth / series.length
  const barWidth = slotWidth * 0.6
  const firstYear = series[0]
  const lastYear = series[series.length - 1]

  return (
    <div>
      <svg
        viewBox={`0 0 ${CHART_WIDTH} ${CHART_HEIGHT}`}
        className="h-auto w-full"
        role="img"
        aria-label={`Annual utility savings growing from ${currencyFormatter.format(firstYear.savings)} in year 1 to ${currencyFormatter.format(lastYear.savings)} in year ${lastYear.year}, assuming 3% annual utility rate inflation`}
      >
        {series.map((point, index) => {
          const height = Math.max(toHeight(point.savings), 1)
          const x = MARGIN.left + index * slotWidth + (slotWidth - barWidth) / 2
          const y = MARGIN.top + plotHeight - height
          const isMilestone = point.year === 1 || point.year % 5 === 0

          return (
            <g key={point.year}>
              <rect
                x={x}
                y={y}
                width={barWidth}
                height={height}
                fill="#f59e0b"
                rx={2}
                className="transition-all duration-500 ease-out"
              />
              {isMilestone && (
                <text
                  x={x + barWidth / 2}
                  y={CHART_HEIGHT - MARGIN.bottom + 16}
                  textAnchor="middle"
                  fontSize="11"
                  fill={axisTextColor}
                >
                  {point.year}
                </text>
              )}
            </g>
          )
        })}
      </svg>
      <p className="mt-2 text-center text-xs text-slate-400 dark:text-slate-500">
        Annual utility bill savings: {currencyFormatter.format(firstYear.savings)} in Year 1,
        growing to {currencyFormatter.format(lastYear.savings)} by Year {lastYear.year} at 3%
        annual utility rate inflation.
      </p>
    </div>
  )
}

export default SavingsChart
