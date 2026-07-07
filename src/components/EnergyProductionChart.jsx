const CHART_WIDTH = 800
const CHART_HEIGHT = 260
const MARGIN = { top: 28, right: 16, bottom: 28, left: 16 }

const kwhFormatter = new Intl.NumberFormat('en-US', { maximumFractionDigits: 0 })

function EnergyProductionChart({ production }) {
  const plotWidth = CHART_WIDTH - MARGIN.left - MARGIN.right
  const plotHeight = CHART_HEIGHT - MARGIN.top - MARGIN.bottom

  const maxValue = Math.max(...production.map((point) => point.kwh))
  const toHeight = (value) => (value / maxValue) * plotHeight

  const slotWidth = plotWidth / production.length
  const barWidth = slotWidth * 0.6
  const firstYear = production[0]
  const lastYear = production[production.length - 1]

  return (
    <div>
      <svg
        viewBox={`0 0 ${CHART_WIDTH} ${CHART_HEIGHT}`}
        className="h-auto w-full"
        role="img"
        aria-label={`Annual energy production declining from ${kwhFormatter.format(firstYear.kwh)} kWh in year 1 to ${kwhFormatter.format(lastYear.kwh)} kWh in year ${lastYear.year}, assuming 0.5% annual panel degradation`}
      >
        {production.map((point, index) => {
          const height = Math.max(toHeight(point.kwh), 1)
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
                fill="#0ea5e9"
                rx={2}
                className="transition-all duration-500 ease-out"
              />
              {isMilestone && (
                <text
                  x={x + barWidth / 2}
                  y={CHART_HEIGHT - MARGIN.bottom + 16}
                  textAnchor="middle"
                  fontSize="11"
                  fill="#64748b"
                >
                  {point.year}
                </text>
              )}
            </g>
          )
        })}
      </svg>
      <p className="mt-2 text-center text-xs text-slate-400">
        Estimated annual output: {kwhFormatter.format(firstYear.kwh)} kWh in Year 1, declining to{' '}
        {kwhFormatter.format(lastYear.kwh)} kWh by Year {lastYear.year} at a 0.5% annual panel
        degradation rate.
      </p>
    </div>
  )
}

export default EnergyProductionChart
