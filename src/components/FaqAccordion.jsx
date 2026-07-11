import { useState } from 'react'
import { FAQ_ITEMS } from '../data/faqItems.js'

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
