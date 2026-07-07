const SYSTEM_COST_PER_KW = 2300
const FEDERAL_ITC_RATE = 0.3
const FEDERAL_TAX_RATE = 0.21
const ENERGY_INFLATION_RATE = 0.03
const OFFSET_FACTOR = 0.95
const PROJECTION_YEARS = 25
const MONTHLY_PRODUCTION_PER_KW = 135
const PANEL_DEGRADATION_RATE = 0.005

// IRS half-year-convention declining-balance percentages for 5-year MACRS property.
const MACRS_SCHEDULE = [0.2, 0.32, 0.192, 0.1152, 0.1152, 0.0576]

export function calculateSolarMetrics(monthlyBill, stateTaxRate) {
  const systemSizeKw = Math.round((monthlyBill / MONTHLY_PRODUCTION_PER_KW) * 1.2)
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

export function generateMacrsTimeline(depreciableBasis, stateTaxRate) {
  const combinedRate = FEDERAL_TAX_RATE + stateTaxRate

  return MACRS_SCHEDULE.map((percent, index) => {
    const deduction = depreciableBasis * percent
    return {
      year: index + 1,
      deduction,
      taxShield: deduction * combinedRate,
    }
  })
}

export function generateEnergyProduction(systemSizeKw, years = PROJECTION_YEARS) {
  const firstYearKwh = systemSizeKw * MONTHLY_PRODUCTION_PER_KW * 12
  const production = []

  for (let year = 1; year <= years; year += 1) {
    const kwh = firstYearKwh * Math.pow(1 - PANEL_DEGRADATION_RATE, year - 1)
    production.push({ year, kwh })
  }

  return production
}

export function calculateLoanComparison(financedAmount, annualPercentageRate, termYears, monthlySavings) {
  const monthlyRate = annualPercentageRate / 12
  const numPayments = termYears * 12

  const monthlyPayment =
    monthlyRate === 0
      ? financedAmount / numPayments
      : (financedAmount * monthlyRate) / (1 - Math.pow(1 + monthlyRate, -numPayments))

  return {
    monthlyPayment,
    monthlySavings,
    netMonthlyCashFlow: monthlySavings - monthlyPayment,
    totalInterest: monthlyPayment * numPayments - financedAmount,
  }
}

export function generateAnnualSavingsSeries(annualSavings, years = PROJECTION_YEARS) {
  const series = []

  for (let year = 1; year <= years; year += 1) {
    series.push({ year, savings: annualSavings * Math.pow(1 + ENERGY_INFLATION_RATE, year - 1) })
  }

  return series
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
