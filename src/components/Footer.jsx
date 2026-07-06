import { useState } from 'react'
import Modal from './Modal.jsx'

const FOOTER_LINKS = [
  { id: 'methodology', label: 'Calculation Methodology' },
  { id: 'privacy', label: 'Privacy Policy' },
  { id: 'contact', label: 'Contact Us' },
]

function MethodologyContent() {
  return (
    <>
      <p>
        This calculator uses simplified, formula-based estimates so results update instantly as
        you adjust the sliders. It is not a substitute for a site-specific engineering or tax
        proposal.
      </p>
      <ul className="list-disc space-y-2 pl-5">
        <li>
          <strong>System Size:</strong> round((Monthly Bill ÷ $135) × 1.2), in kW — assumes
          roughly 135 kWh of monthly production per installed kW, sized at 120% of your current
          load.
        </li>
        <li>
          <strong>Gross System Cost:</strong> System Size × $2,300 per kW, a blended national
          average for commercial turnkey installation.
        </li>
        <li>
          <strong>Federal ITC:</strong> 30% of Gross System Cost under IRC Section 48E.
        </li>
        <li>
          <strong>Depreciable Basis:</strong> Gross System Cost minus 50% of the ITC amount, per
          the basis-reduction rule in IRC Section 50(c).
        </li>
        <li>
          <strong>MACRS Tax Shield:</strong> Depreciable Basis × (21% federal + your state
          corporate tax rate) — a blended estimate of the 5-year accelerated depreciation
          benefit.
        </li>
        <li>
          <strong>Net Capital Required:</strong> Gross System Cost minus the ITC minus the MACRS
          Tax Shield.
        </li>
        <li>
          <strong>Payback Period:</strong> Net Capital Required ÷ (Monthly Bill × 12 × 95%
          offset).
        </li>
        <li>
          <strong>25-Year Cash Flow:</strong> annual savings compounding at 3% per year, starting
          from a negative position equal to Net Capital Required.
        </li>
      </ul>
    </>
  )
}

function PrivacyContent() {
  return (
    <>
      <p>
        This calculator runs entirely in your browser. The inputs you enter — electric bill,
        state tax rate, and property location — are used only to compute the figures shown on
        this page and are not transmitted to or stored on any server.
      </p>
      <p>
        Like most websites, this site may use standard web analytics and advertising-network
        cookies (for example, to measure traffic or serve relevant ads). These cookies do not
        access the calculator inputs above. You can view, block, or delete cookies at any time
        through your browser settings.
      </p>
      <p>We do not sell personal data to third parties.</p>
    </>
  )
}

function ContactContent() {
  return (
    <>
      <p>
        Have a question about this calculator, spotted an error, or interested in a partnership?
        We&apos;d like to hear from you.
      </p>
      <p className="rounded-lg bg-slate-50 p-3 text-slate-500">
        <em>Contact details placeholder — add your business email or contact form link here.</em>
      </p>
    </>
  )
}

const MODAL_CONTENT = {
  methodology: { title: 'Calculation Methodology', body: <MethodologyContent /> },
  privacy: { title: 'Privacy Policy', body: <PrivacyContent /> },
  contact: { title: 'Contact Us', body: <ContactContent /> },
}

function Footer() {
  const [activeModal, setActiveModal] = useState(null)

  return (
    <footer className="mt-12 border-t border-slate-800 bg-slate-900 py-8 text-slate-400">
      <div className="mx-auto max-w-5xl px-4">
        <h2 className="text-sm font-semibold uppercase tracking-wide text-slate-300">
          Legal &amp; Tax Disclaimer
        </h2>
        <p className="mt-3 text-xs leading-relaxed">
          This calculator provides estimates for informational purposes only and does not
          constitute tax, legal, or financial advice. Figures referencing the Section 48E
          Investment Tax Credit (ITC) under the Internal Revenue Code are based on publicly
          available federal guidance and may vary based on project eligibility, prevailing wage
          and apprenticeship requirements, energy community adders, and other statutory
          conditions. Depreciation estimates assume a 5-year Modified Accelerated Cost Recovery
          System (MACRS) property classification and a reduced depreciable basis consistent with
          current ITC basis-reduction rules. Actual results depend on your organization's
          specific tax position, applicable state incentives, equipment pricing, and financing
          terms. Consult a qualified tax professional or licensed solar engineer before making
          investment decisions.
        </p>

        <nav
          aria-label="Site information"
          className="mt-6 flex flex-wrap gap-x-6 gap-y-2 border-t border-slate-800 pt-6 text-xs"
        >
          {FOOTER_LINKS.map((link) => (
            <button
              key={link.id}
              type="button"
              onClick={() => setActiveModal(link.id)}
              className="font-medium text-slate-300 underline decoration-slate-600 underline-offset-4 transition hover:text-emerald-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500/40"
            >
              {link.label}
            </button>
          ))}
        </nav>

        <p className="mt-4 text-xs text-slate-500">
          &copy; {new Date().getFullYear()} Commercial Solar Calculator. All rights reserved.
        </p>
      </div>

      {FOOTER_LINKS.map((link) => (
        <Modal
          key={link.id}
          title={MODAL_CONTENT[link.id].title}
          isOpen={activeModal === link.id}
          onClose={() => setActiveModal(null)}
        >
          {MODAL_CONTENT[link.id].body}
        </Modal>
      ))}
    </footer>
  )
}

export default Footer
