const SYSTEM_COST_PER_KW = 2300
const FEDERAL_ITC_RATE = 0.3
const FEDERAL_TAX_RATE = 0.21
const ENERGY_INFLATION_RATE = 0.03
const OFFSET_FACTOR = 0.95
const PROJECTION_YEARS = 25

export function calculateSolarMetrics(monthlyBill, stateTaxRate) {
  const systemSizeKw = Math.round((monthlyBill / 135) * 1.2)
  const grossCost = systemSizeKw * SYSTEM_COST_PER_KW
  const itcAmount = grossCost * FEDERAL_ITC_RATE
  const depreciableBasis = grossCost - itcAmount * 0.5
  const macrsSavings = depreciableBasis * (FEDERAL_TAX_RATE + stateTaxRate)
  const netCapital = grossCost - itcAmount - macrsSavings
  const annualSavings = monthlyBill * 12 * OFFSET_FACTOR
  const paybackPeriod = netCapital / annualSavings

  return {
    systemSizeKw,
    grossCost,
    itcAmount,
    depreciableBasis,
    macrsSavings,
    netCapital,
    annualSavings,
    paybackPeriod,
  }
}

export function generateCashFlowProjection(netCapital, annualSavings) {
  const projection = []
  let cumulative = -netCapital
  let crossoverYear = null

  for (let year = 1; year <= PROJECTION_YEARS; year += 1) {
    const yearSavings = annualSavings * Math.pow(1 + ENERGY_INFLATION_RATE, year - 1)
    cumulative += yearSavings

    if (crossoverYear === null && cumulative >= 0) {
      crossoverYear = year
    }

    projection.push({ year, cumulative })
  }

  return { projection, crossoverYear }
}
