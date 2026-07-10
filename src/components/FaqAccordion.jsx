import { useState } from 'react'

const FAQ_ITEMS = [
  {
    id: 'itc-eligibility',
    question:
      'How does the 30% Federal Investment Tax Credit (ITC) apply to business properties under Section 48E?',
    answer:
      'The Section 48E Clean Electricity Investment Credit is the federal ITC framework for commercial solar systems placed in service after 2024. Its base rate is 6% of eligible cost basis, stepping up to 30% once a project satisfies the prevailing wage and apprenticeship (PWA) requirements — though most commercial systems under 1 MW (AC) are automatically exempt from PWA and qualify for the full 30% rate outright. Because the credit offsets federal tax liability dollar-for-dollar, it directly reduces the net capital your business needs to finance up front, which is why this calculator applies it before computing your Net Capital Required. One important wrinkle: under IRC Section 50(c), claiming the ITC also requires reducing the asset\'s depreciable basis by half of the credit amount, which is reflected in the Depreciable Basis figure above.',
  },
  {
    id: 'macrs-tax-shield',
    question: 'What is MACRS 5-Year Depreciation and how does it generate a corporate tax shield?',
    answer:
      'The Modified Accelerated Cost Recovery System (MACRS) is the IRS-prescribed depreciation method under Section 168, and commercial solar equipment is classified as 5-year property — a much faster recovery period than the 39 years used for most commercial real property. Under the standard half-year convention, that schedule spreads across 6 tax years at declining-balance percentages of roughly 20%, 32%, 19.2%, 11.52%, 11.52%, and 5.76%. Each year\'s depreciation deduction reduces taxable income, and multiplying that deduction by your combined federal and state corporate tax rate produces a real, cash "tax shield." To keep this dashboard responsive as you adjust inputs, we model the full schedule as one blended figure — your reduced depreciable basis multiplied by a combined 21% federal and your selected state tax rate — rather than itemizing each of the 6 years individually.',
  },
  {
    id: 'utility-inflation',
    question: 'Does this commercial solar calculator account for utility rate inflation trends?',
    answer:
      'Yes. The 25-year cumulative cash flow chart compounds your current annual electricity savings at 3% per year, consistent with the long-run historical average growth rate of U.S. commercial electricity rates. Because this compounding effect applies every year of the projection, even small changes to the inflation assumption can meaningfully shift the crossover (payback) year shown on the chart. Actual utility rate escalation varies by region, provider, and rate class, so businesses served by utilities with faster-than-average rate growth may reach payback sooner than this baseline model suggests.',
  },
  {
    id: 'bonus-adders',
    question:
      'Are there additional tax credit adders for using domestic content or operating in energy communities?',
    answer:
      'Yes — Section 48E allows several bonus adders on top of the base credit rate. A Domestic Content Bonus adds 10 percentage points when a required share of the project\'s steel, iron, and manufactured components are produced in the United States. An Energy Community Bonus adds another 10 percentage points for projects sited in areas with historical fossil-fuel employment, brownfield sites, or closed coal facilities. A separate, capacity-limited Low-Income Communities Bonus (Section 48E(h)) can add 10–20 points for qualifying allocations. Stacked together, an eligible commercial project can reach a total credit well above the 30% baseline. This calculator intentionally models the 30% base rate only, since bonus eligibility depends on project-specific sourcing, siting, and a competitive allocation process — confirm applicability with your EPC contractor and tax advisor before assuming a higher rate.',
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
    <div className="border-b border-slate-200 last:border-b-0 dark:border-slate-700">
      <h3 className="m-0">
        <button
          type="button"
          id={headerId}
          onClick={onToggle}
          aria-expanded={isOpen}
          aria-controls={panelId}
          className="flex w-full items-center justify-between gap-4 py-4 text-left text-sm font-semibold text-slate-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500/40 dark:text-white sm:text-base"
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
          <p className="pb-4 pr-2 text-sm leading-relaxed text-slate-600 dark:text-slate-300 sm:pr-8">
            {item.answer}
          </p>
        </div>
      </div>
    </div>
  )
}

function FaqAccordion() {
  const [openId, setOpenId] = useState(null)

  return (
    <section
      className="animate-fade-in-up rounded-2xl bg-white p-6 shadow-lg ring-1 ring-slate-900/5 dark:bg-slate-800 dark:ring-white/10 print:shadow-none print:ring-0 sm:p-8"
      aria-label="Frequently asked questions"
    >
      <h2 className="text-lg font-semibold text-slate-900 dark:text-white">
        Frequently Asked Questions
      </h2>
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
