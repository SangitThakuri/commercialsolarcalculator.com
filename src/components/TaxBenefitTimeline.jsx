const CHART_WIDTH = 800
const CHART_HEIGHT = 280
const MARGIN = { top: 28, right: 16, bottom: 40, left: 16 }

const currencyFormatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  maximumFractionDigits: 0,
})

function TaxBenefitTimeline({ itcAmount, macrsTimeline }) {
  const plotWidth = CHART_WIDTH - MARGIN.left - MARGIN.right
  const plotHeight = CHART_HEIGHT - MARGIN.top - MARGIN.bottom

  const bars = macrsTimeline.map((entry) => ({
    year: entry.year,
    macrs: entry.taxShield,
    itc: entry.year === 1 ? itcAmount : 0,
    total: entry.taxShield + (entry.year === 1 ? itcAmount : 0),
  }))

  const maxValue = Math.max(...bars.map((bar) => bar.total))
  const toHeight = (value) => (maxValue === 0 ? 0 : (value / maxValue) * plotHeight)

  const slotWidth = plotWidth / bars.length
  const barWidth = slotWidth * 0.55

  return (
    <div>
      <svg
        viewBox={`0 0 ${CHART_WIDTH} ${CHART_HEIGHT}`}
        className="h-auto w-full"
        role="img"
        aria-label="Tax benefit timeline showing the Section 48E investment tax credit landing in year one, followed by five more years of MACRS depreciation tax shield"
      >
        {bars.map((bar, index) => {
          const macrsHeight = Math.max(toHeight(bar.macrs), 1)
          const itcHeight = toHeight(bar.itc)
          const x = MARGIN.left + index * slotWidth + (slotWidth - barWidth) / 2
          const macrsY = MARGIN.top + plotHeight - macrsHeight
          const itcY = macrsY - itcHeight

          return (
            <g key={bar.year}>
              {bar.itc > 0 && (
                <rect
                  x={x}
                  y={itcY}
                  width={barWidth}
                  height={itcHeight}
                  fill="#6366f1"
                  rx={2}
                  className="transition-all duration-500 ease-out"
                />
              )}
              <rect
                x={x}
                y={macrsY}
                width={barWidth}
                height={macrsHeight}
                fill="#10b981"
                rx={2}
                className="transition-all duration-500 ease-out"
              />
              <text
                x={x + barWidth / 2}
                y={itcY - 8}
                textAnchor="middle"
                fontSize="10.5"
                fontWeight="600"
                fill="#334155"
              >
                {currencyFormatter.format(bar.total)}
              </text>
              <text
                x={x + barWidth / 2}
                y={CHART_HEIGHT - MARGIN.bottom + 16}
                textAnchor="middle"
                fontSize="11"
                fill="#64748b"
              >
                Yr {bar.year}
              </text>
            </g>
          )
        })}
      </svg>
      <div className="mt-2 flex items-center justify-center gap-5 text-xs text-slate-500">
        <span className="flex items-center gap-1.5">
          <span className="h-2.5 w-2.5 rounded-sm bg-indigo-500" aria-hidden="true" />
          Section 48E ITC (Year 1)
        </span>
        <span className="flex items-center gap-1.5">
          <span className="h-2.5 w-2.5 rounded-sm bg-emerald-500" aria-hidden="true" />
          MACRS depreciation shield
        </span>
      </div>
    </div>
  )
}

export default TaxBenefitTimeline
