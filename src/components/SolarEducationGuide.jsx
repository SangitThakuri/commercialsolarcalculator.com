const TOPICS = [
  {
    id: 'what-is-commercial-solar',
    heading: 'What Is Commercial Solar?',
    body: "Commercial solar refers to photovoltaic (PV) systems sized for business-owned properties — warehouses, offices, retail centers, and manufacturing facilities — rather than the smaller systems typical of single-family homes. Because commercial electricity rates often carry higher per-kWh pricing and separate demand charges, and because businesses can access commercial-only tax benefits like the Section 48E Investment Tax Credit and 5-year MACRS depreciation, commercial solar economics are frequently more favorable, on a percentage basis, than residential solar.",
  },
  {
    id: 'how-roi-is-calculated',
    heading: 'How Commercial Solar ROI Is Calculated',
    body: "A naive solar ROI estimate simply divides system cost by your monthly bill. This calculator instead models three layers together: the Section 48E federal tax credit (claimed the year the system is placed in service), the 5-year MACRS depreciation tax shield (a blended estimate of a 6-year IRS schedule), and 25 years of utility savings compounding at an assumed 3% annual rate. Net Capital Required — Gross Cost minus the ITC minus the MACRS tax shield — is what actually determines your payback period and long-run return.",
  },
  {
    id: 'federal-tax-credit',
    heading: 'The Section 48E Federal Investment Tax Credit',
    body: 'Section 48E, the Clean Electricity Investment Credit, is the current federal ITC framework for commercial solar placed in service after 2024. Most commercial systems under 1 MW automatically qualify for the full 30% rate; larger systems must meet prevailing wage and apprenticeship requirements to reach that same rate. Because the credit is claimed on the tax return for the year the system is placed in service, project timing directly affects when your business realizes this cash benefit — a detail worth planning around with your tax advisor and EPC contractor.',
  },
  {
    id: 'macrs-depreciation',
    heading: '5-Year MACRS Depreciation',
    body: 'Commercial solar is one of a small number of asset classes eligible for 5-year accelerated depreciation under MACRS, compared to the 39-year straight-line schedule used for most commercial real property improvements. That compressed timeline — roughly 20%, 32%, 19.2%, 11.52%, 11.52%, and 5.76% of depreciable basis across 6 tax years under the half-year convention — is what typically produces the single largest tax benefit in a commercial solar investment, often rivaling the ITC itself in total value.',
  },
  {
    id: 'solar-payback-period',
    heading: 'Understanding Commercial Solar Payback',
    body: 'Payback period — the time it takes utility savings to recover your net capital outlay — is the headline number most businesses look at first. Commercial systems commonly land in a 3-to-7-year payback range after incentives, against a 25-to-30-year usable system lifespan, meaning the bulk of a system\'s savings arrive after payback is already achieved. A shorter payback is attractive, but total 25-year net savings is usually the more decision-relevant number for capital allocation.',
  },
  {
    id: 'solar-incentives',
    heading: 'Solar Incentives Beyond the Federal ITC',
    body: "Many states layer additional incentives on top of the federal credit: property tax exemptions or abatements for the added system value, Solar Renewable Energy Certificates (SRECs) in select state markets, utility rebate programs, and USDA REAP grants for qualifying rural or agricultural businesses. Availability and value vary significantly by state and utility territory, so this calculator intentionally models only the federal ITC and MACRS baseline — treat any state or utility incentive you're eligible for as further upside beyond these numbers.",
  },
  {
    id: 'system-sizing',
    heading: 'How Commercial Solar System Sizing Works',
    body: "This calculator estimates system size from your monthly electric bill: your bill is converted to estimated monthly kWh usage at a blended $0.13/kWh national average commercial rate, then sized against roughly 135 kWh of monthly production per installed kW at 120% of that usage to account for future usage growth. Real-world sizing also depends on available roof or land area, structural and shading constraints, your utility's interconnection capacity limits, your actual electricity rate, and net-metering or export compensation rules — all of which a licensed solar engineer will assess in a formal site survey.",
  },
  {
    id: 'business-electricity-costs',
    heading: 'Business Electricity Costs and Demand Charges',
    body: "Commercial electric bills typically combine two components: a volumetric energy charge (¢/kWh) and, for many mid-to-large accounts, a separate demand charge based on your highest 15-to-30-minute peak power draw (kW) during the billing period. Solar primarily offsets the volumetric energy charge; it only reduces demand charges when paired with battery storage or active load management to shave peak draw. This calculator models bill savings from the energy-charge offset and does not assume demand-charge reduction.",
  },
  {
    id: 'common-mistakes',
    heading: 'Common Mistakes Businesses Make When Evaluating Solar',
    body: 'The most frequent errors: evaluating sticker price alone without modeling the ITC and MACRS tax shield together; forgetting the Section 50(c) basis-reduction rule and overstating depreciation benefits; assuming a flat national average installed cost regardless of roof type or mounting complexity; assuming a bonus credit rate (domestic content, energy community) applies without confirming project-specific eligibility; and committing capital before a utility interconnection review confirms your site can actually export or self-consume the system\'s output as modeled.',
  },
]

function SolarEducationGuide() {
  return (
    <section
      aria-label="Commercial solar education guide"
      className="animate-fade-in-up rounded-2xl bg-white p-6 shadow-lg ring-1 ring-slate-900/5 sm:p-8 print:shadow-none print:ring-0"
    >
      <h2 className="text-xl font-bold text-slate-900 sm:text-2xl">
        Commercial Solar Guide: Everything Businesses Need to Know
      </h2>
      <p className="mt-3 max-w-3xl text-sm leading-relaxed text-slate-600">
        A deeper look at the mechanics behind the numbers above — how commercial solar ROI,
        federal tax incentives, depreciation, and system sizing actually work.
      </p>

      <div className="mt-6 grid grid-cols-1 gap-x-10 gap-y-8 lg:grid-cols-2">
        {TOPICS.map((topic) => (
          <div key={topic.id}>
            <h3 className="text-base font-semibold text-slate-900">{topic.heading}</h3>
            <p className="mt-2 text-sm leading-relaxed text-slate-600">{topic.body}</p>
          </div>
        ))}
      </div>
    </section>
  )
}

export default SolarEducationGuide
