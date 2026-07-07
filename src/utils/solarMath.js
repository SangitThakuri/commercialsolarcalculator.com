const SYSTEM_COST_PER_KW = 2300
const FEDERAL_ITC_RATE = 0.3
const FEDERAL_TAX_RATE = 0.21
const ENERGY_INFLATION_RATE = 0.03
const OFFSET_FACTOR = 0.95
const PROJECTION_YEARS = 25
const MONTHLY_PRODUCTION_PER_KW = 135
const PANEL_DEGRADATION_RATE = 0.005
// Blended U.S. national average commercial retail electricity rate (EIA), used to convert a
// dollar bill amount into kWh usage before sizing a system against production-per-kW.
const AVG_COMMERCIAL_RATE_PER_KWH = 0.13

export function estimateSystemSizeKw(monthlyBill) {
  const monthlyUsageKwh = monthlyBill / AVG_COMMERCIAL_RATE_PER_KWH
  return Math.round((monthlyUsageKwh / MONTHLY_PRODUCTION_PER_KW) * 1.2)
}

// IRS half-year-convention declining-balance percentages for 5-year MACRS property.
const MACRS_SCHEDULE = [0.2, 0.32, 0.192, 0.1152, 0.1152, 0.0576]

export function calculateSolarMetrics(monthlyBill, stateTaxRate) {
  const systemSizeKw = estimateSystemSizeKw(monthlyBill)
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

const SQFT_PER_KW = 75
const KW_PER_PANEL = 0.4

export function calculateSystemSizeDetails(monthlyBill) {
  const systemSizeKw = estimateSystemSizeKw(monthlyBill)
  return {
    systemSizeKw,
    panelCount: Math.ceil(systemSizeKw / KW_PER_PANEL),
    roofAreaSqFt: Math.round(systemSizeKw * SQFT_PER_KW),
    annualProductionKwh: systemSizeKw * MONTHLY_PRODUCTION_PER_KW * 12,
  }
}

const BATTERY_COST_PER_KWH = 500

export function calculateBatteryStorage(criticalLoadKw, backupHours) {
  const usableCapacityKwh = criticalLoadKw * backupHours
  return {
    usableCapacityKwh,
    estimatedCost: usableCapacityKwh * BATTERY_COST_PER_KWH,
  }
}

const LEASE_RATE_DISCOUNT = 0.15

export function calculateLeaseComparison(monthlyBill, netCapital, annualSavings) {
  const monthlyUtilityCost = monthlyBill
  const monthlyLeasePayment = monthlyUtilityCost * (1 - LEASE_RATE_DISCOUNT)
  const monthlyLeaseSavings = monthlyUtilityCost - monthlyLeasePayment

  return {
    monthlyLeasePayment,
    monthlyLeaseSavings,
    annualLeaseSavings: monthlyLeaseSavings * 12,
    ownershipNetCapital: netCapital,
    ownershipAnnualSavings: annualSavings,
  }
}

export function calculateElectricityCostProfile(monthlyBill, monthlyKwh) {
  const effectiveRatePerKwh = monthlyKwh > 0 ? monthlyBill / monthlyKwh : 0
  const annualCost = monthlyBill * 12

  const projection = []
  let cumulative = 0
  for (let year = 1; year <= PROJECTION_YEARS; year += 1) {
    const yearCost = annualCost * Math.pow(1 + ENERGY_INFLATION_RATE, year - 1)
    cumulative += yearCost
    projection.push({ year, cost: yearCost, cumulative })
  }

  return { effectiveRatePerKwh, annualCost, projection }
}

// EPA eGRID national average grid emissions factor (lbs CO2 per kWh).
const GRID_EMISSIONS_LBS_PER_KWH = 0.855
const LBS_PER_METRIC_TON = 2204.62
// EPA Greenhouse Gas Equivalencies Calculator conversion factors.
const TONS_CO2_PER_CAR_PER_YEAR = 4.6
const TONS_CO2_PER_TREE_SEEDLING_10YR = 0.0605

export function calculateDiscountedPayback(netCapital, annualSavings, discountRate) {
  let cumulative = -netCapital
  let previousCumulative = cumulative

  for (let year = 1; year <= PROJECTION_YEARS; year += 1) {
    const nominalSavings = annualSavings * Math.pow(1 + ENERGY_INFLATION_RATE, year - 1)
    const discountedSavings = nominalSavings / Math.pow(1 + discountRate, year)
    previousCumulative = cumulative
    cumulative += discountedSavings

    if (cumulative >= 0) {
      const fraction = -previousCumulative / (cumulative - previousCumulative)
      return year - 1 + fraction
    }
  }

  return null
}

export function generateAmortizationSchedule(loanAmount, annualPercentageRate, termYears) {
  const { monthlyPayment } = calculateLoanComparison(loanAmount, annualPercentageRate, termYears, 0)
  const monthlyRate = annualPercentageRate / 12

  let balance = loanAmount
  const schedule = [{ year: 0, balance }]

  for (let month = 1; month <= termYears * 12; month += 1) {
    const interest = balance * monthlyRate
    balance = Math.max(balance + interest - monthlyPayment, 0)

    if (month % 12 === 0) {
      schedule.push({ year: month / 12, balance })
    }
  }

  return { monthlyPayment, schedule }
}

export function calculateCarbonSavings(annualKwh) {
  const annualTonsCo2 = (annualKwh * GRID_EMISSIONS_LBS_PER_KWH) / LBS_PER_METRIC_TON
  const lifetimeTonsCo2 = annualTonsCo2 * PROJECTION_YEARS

  return {
    annualTonsCo2,
    lifetimeTonsCo2,
    equivalentCarsPerYear: annualTonsCo2 / TONS_CO2_PER_CAR_PER_YEAR,
    equivalentTreeSeedlingsGrown10Yr: annualTonsCo2 / TONS_CO2_PER_TREE_SEEDLING_10YR,
  }
}
