import { useTheme } from '../context/ThemeContext.jsx'

const CHART_WIDTH = 800
const CHART_HEIGHT = 340
const MARGIN = { top: 40, right: 16, bottom: 28, left: 16 }

function CashFlowChart({ projection, crossoverYear }) {
  const { theme } = useTheme()
  const isDark = theme === 'dark'
  const axisTextColor = isDark ? '#94a3b8' : '#64748b'
  const baselineColor = isDark ? '#334155' : '#cbd5e1'

  const plotWidth = CHART_WIDTH - MARGIN.left - MARGIN.right
  const plotHeight = CHART_HEIGHT - MARGIN.top - MARGIN.bottom

  const values = projection.map((point) => point.cumulative)
  const minValue = Math.min(0, ...values)
  const maxValue = Math.max(0, ...values)
  const range = maxValue - minValue || 1

  const toY = (value) =>
    MARGIN.top + plotHeight - ((value - minValue) / range) * plotHeight

  const baselineY = toY(0)
  const slotWidth = plotWidth / projection.length
  const barWidth = slotWidth * 0.6

  return (
    <div>
      <svg
        viewBox={`0 0 ${CHART_WIDTH} ${CHART_HEIGHT}`}
        className="h-auto w-full"
        role="img"
        aria-label={`25 year cumulative cash flow projection, crossing into profit in year ${crossoverYear ?? 'beyond 25'}`}
      >
        <line
          x1={MARGIN.left}
          y1={baselineY}
          x2={CHART_WIDTH - MARGIN.right}
          y2={baselineY}
          stroke={baselineColor}
          strokeWidth={1}
        />

        {projection.map((point, index) => {
          const x = MARGIN.left + index * slotWidth + (slotWidth - barWidth) / 2
          const barY = Math.min(toY(point.cumulative), baselineY)
          const barHeight = Math.max(Math.abs(toY(point.cumulative) - baselineY), 1)
          const isCrossoverYear = point.year === crossoverYear
          const isPositive = point.cumulative >= 0

          return (
            <g key={point.year}>
              <rect
                x={x}
                y={barY}
                width={barWidth}
                height={barHeight}
                fill={isCrossoverYear ? '#059669' : isPositive ? '#10b981' : '#94a3b8'}
                rx={2}
                className="transition-all duration-500 ease-out"
              />
              {(point.year === 1 || point.year % 5 === 0) && (
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

        {crossoverYear && (
          <g
            transform={`translate(${
              MARGIN.left + (crossoverYear - 1) * slotWidth + slotWidth / 2
            }, ${Math.min(toY(projection[crossoverYear - 1].cumulative), baselineY) - 14})`}
          >
            <rect x={-46} y={-22} width={92} height={22} rx={11} fill="#10b981" />
            <text x={0} y={-6} textAnchor="middle" fontSize="11" fontWeight="700" fill="#ffffff">
              Payback Yr {crossoverYear}
            </text>
          </g>
        )}
      </svg>
      <p className="mt-2 text-center text-xs text-slate-400 dark:text-slate-500">
        Year-by-year cumulative cash position, assuming 3% annual energy inflation.
      </p>
    </div>
  )
}

export default CashFlowChart
