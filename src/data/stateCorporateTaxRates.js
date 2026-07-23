// Approximate top marginal state corporate income tax rate, expressed as a decimal (e.g. 0.0884
// for California's 8.84%). Used only to set a sensible starting point for the "State Corporate
// Tax Rate" slider when a visitor picks their state — several states revise these rates most
// years, so this is a convenience default, not tax guidance. The slider stays fully editable
// afterward, and every page that uses it recommends confirming the exact rate with a tax advisor.
//
// States with no general corporate income tax (Nevada, Ohio, South Dakota, Texas, Washington,
// Wyoming) use gross-receipts-style taxes instead (e.g. Texas franchise tax, Washington B&O tax)
// that don't map onto this slider's federal-taxable-income-based MACRS shield model, so they're
// set to 0.
export const STATE_CORPORATE_TAX_RATES = {
  Alabama: 0.065,
  Alaska: 0.094,
  Arizona: 0.049,
  Arkansas: 0.043,
  California: 0.0884,
  Colorado: 0.044,
  Connecticut: 0.075,
  Delaware: 0.087,
  'District of Columbia': 0.0825,
  Florida: 0.055,
  Georgia: 0.0539,
  Hawaii: 0.064,
  Idaho: 0.058,
  Illinois: 0.095,
  Indiana: 0.049,
  Iowa: 0.055,
  Kansas: 0.07,
  Kentucky: 0.05,
  Louisiana: 0.055,
  Maine: 0.0893,
  Maryland: 0.0825,
  Massachusetts: 0.08,
  Michigan: 0.06,
  Minnesota: 0.098,
  Mississippi: 0.05,
  Missouri: 0.04,
  Montana: 0.0675,
  Nebraska: 0.0584,
  Nevada: 0,
  'New Hampshire': 0.075,
  'New Jersey': 0.09,
  'New Mexico': 0.059,
  'New York': 0.0725,
  'North Carolina': 0.025,
  'North Dakota': 0.0431,
  Ohio: 0,
  Oklahoma: 0.04,
  Oregon: 0.076,
  Pennsylvania: 0.0749,
  'Rhode Island': 0.07,
  'South Carolina': 0.05,
  'South Dakota': 0,
  Tennessee: 0.065,
  Texas: 0,
  Utah: 0.0455,
  Vermont: 0.085,
  Virginia: 0.06,
  Washington: 0,
  'West Virginia': 0.065,
  Wisconsin: 0.079,
  Wyoming: 0,
}

export function getDefaultTaxRateForState(state) {
  return STATE_CORPORATE_TAX_RATES[state] ?? 0.06
}
