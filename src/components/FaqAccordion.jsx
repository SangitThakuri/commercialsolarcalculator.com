import { useState } from 'react'

const FAQ_ITEMS = [
  {
    id: 'itc-basis-reduction',
    question:
      'How is the Section 48E Investment Tax Credit calculated, and why does it reduce my depreciable basis?',
    answer:
      "The Section 48E Clean Electricity Investment Credit applies a base rate to the eligible cost basis of your solar system, which this calculator models at 30% (the rate typically available when prevailing wage and apprenticeship requirements are met, or for systems under 1 MW). Under IRC Section 50(c), a taxpayer who claims the ITC must reduce the asset's depreciable basis by one-half of the credit claimed. That is why our Depreciable Basis figure equals your Gross System Cost minus 50% of the ITC amount, not the full credit — this is a statutory basis-reduction rule, not a calculator simplification.",
  },
  {
    id: 'macrs-schedule',
    question:
      'Why does this tool use a 5-year MACRS schedule, and how is the tax shield estimated?',
    answer:
      'Commercial solar energy property is classified as 5-year property under the Modified Accelerated Cost Recovery System (MACRS), per IRS guidance in Publication 946 and Section 168. In practice, the IRS half-year convention spreads that 5-year schedule across 6 tax years with declining-balance percentages (20%, 32%, 19.2%, 11.52%, 11.52%, 5.76%). To keep the dashboard responsive while you adjust inputs, this calculator estimates the total MACRS Tax Shield as a single blended figure: your reduced depreciable basis multiplied by a combined 21% federal and your selected state corporate tax rate. This approximates the present-value benefit of accelerated depreciation rather than itemizing each of the 6 tax years individually.',
  },
  {
    id: 'utility-inflation',
    question:
      'What utility rate inflation assumption drives the 25-year cumulative cash flow projection?',
    answer:
      'The cash flow chart compounds your current annual electricity savings at 3% per year for 25 years, reflecting the long-run historical average growth rate of U.S. commercial electricity rates. Because this compounding effect is applied every year of the projection, small changes to this assumption meaningfully shift the crossover (payback) year on the chart. Actual utility rate escalation varies significantly by region, utility provider, and rate class, so businesses in high-growth utility territories may see a faster payback than this baseline model suggests.',
  },
  {
    id: 'model-scope',
    question:
      'Does this calculator account for financing costs, state-level incentives, or interconnection fees?',
    answer:
      'No. This is a planning-grade model that assumes an all-cash system purchase and does not incorporate loan interest, lease/PPA structures, state or utility rebates, Solar Renewable Energy Certificates (SRECs), property tax exemptions, or interconnection and utility upgrade costs. These factors can materially change your net capital outlay and payback period. We recommend using these results as a directional starting point and consulting a licensed solar engineer and a qualified tax professional for a site-specific proposal.',
  },
]

function ChevronIcon({ isOpen }) {
  return (
    <svg
      className={`h-5 w-5 flex-shrink-0 text-emerald-500 transition-transform duration-300 ${
        isOpen ? 'rotate-180' : 'rotate-0'
      }`}
      viewBox="0 0 20 20"
      fill="none"
      aria-hidden="true"
    >
      <path d="M5 7.5L10 12.5L15 7.5" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function AccordionItem({ item, isOpen, onToggle }) {
  const headerId = `faq-header-${item.id}`
  const panelId = `faq-panel-${item.id}`

  return (
    <div className="border-b border-slate-200 last:border-b-0">
      <h3 className="m-0">
        <button
          type="button"
          id={headerId}
          onClick={onToggle}
          aria-expanded={isOpen}
          aria-controls={panelId}
          className="flex w-full items-center justify-between gap-4 py-4 text-left text-sm font-semibold text-slate-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500/40 sm:text-base"
        >
          <span>{item.question}</span>
          <ChevronIcon isOpen={isOpen} />
        </button>
      </h3>
      <div
        id={panelId}
        role="region"
        aria-labelledby={headerId}
        className="grid transition-[grid-template-rows] duration-300 ease-in-out"
        style={{ gridTemplateRows: isOpen ? '1fr' : '0fr' }}
      >
        <div className="overflow-hidden">
          <p className="pb-4 pr-2 text-sm leading-relaxed text-slate-600 sm:pr-8">{item.answer}</p>
        </div>
      </div>
    </div>
  )
}

function FaqAccordion() {
  const [openId, setOpenId] = useState(null)

  return (
    <section
      className="rounded-2xl bg-white p-6 shadow-lg sm:p-8"
      aria-label="Frequently asked questions"
    >
      <h2 className="text-lg font-semibold text-slate-900">Frequently Asked Questions</h2>
      <div className="mt-2">
        {FAQ_ITEMS.map((item) => (
          <AccordionItem
            key={item.id}
            item={item}
            isOpen={openId === item.id}
            onToggle={() => setOpenId((current) => (current === item.id ? null : item.id))}
          />
        ))}
      </div>
    </section>
  )
}

export default FaqAccordion
