import { Link } from 'react-router-dom'

const FOOTER_COLUMNS = [
  {
    heading: 'Calculators',
    links: [
      { path: '/', label: 'Commercial Solar Calculator' },
      { path: '/commercial-solar-roi-calculator', label: 'Solar ROI Calculator' },
      { path: '/solar-payback-calculator', label: 'Solar Payback Calculator' },
      { path: '/calculators', label: 'View All Calculators →' },
    ],
  },
  {
    heading: 'Resources',
    links: [
      { path: '/blog', label: 'Blog' },
      { path: '/solar-guides', label: 'Solar Guides' },
      { path: '/methodology', label: 'Calculation Methodology' },
      { path: '/faq', label: 'FAQ' },
    ],
  },
  {
    heading: 'Legal',
    links: [
      { path: '/privacy-policy', label: 'Privacy Policy' },
      { path: '/terms-of-service', label: 'Terms of Service' },
      { path: '/cookie-policy', label: 'Cookie Policy' },
      { path: '/disclaimer', label: 'Disclaimer' },
    ],
  },
  {
    heading: 'Company',
    links: [
      { path: '/about', label: 'About' },
      { path: '/contact', label: 'Contact Us' },
      { path: '/sitemap', label: 'Sitemap' },
    ],
  },
]

function Footer() {
  return (
    <footer className="mt-12 border-t border-slate-200 bg-slate-50 py-10 text-slate-600 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-400">
      <div className="mx-auto max-w-5xl px-4">
        <nav
          aria-label="Footer"
          className="grid grid-cols-2 gap-x-6 gap-y-8 sm:grid-cols-4"
        >
          {FOOTER_COLUMNS.map((column) => (
            <div key={column.heading}>
              <h2 className="text-xs font-semibold uppercase tracking-wide text-slate-700 dark:text-slate-300">
                {column.heading}
              </h2>
              <ul className="mt-4 space-y-2.5">
                {column.links.map((link) => (
                  <li key={link.path}>
                    <Link
                      to={link.path}
                      className="text-xs text-slate-600 transition hover:text-emerald-600 dark:text-slate-400 dark:hover:text-emerald-400"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </nav>

        <h2 className="mt-10 border-t border-slate-200 pt-6 text-sm font-semibold uppercase tracking-wide text-slate-700 dark:border-slate-800 dark:text-slate-300">
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
          investment decisions. Read the full{' '}
          <Link to="/disclaimer" className="font-semibold text-slate-700 underline decoration-slate-400 underline-offset-4 hover:text-emerald-600 dark:text-slate-300 dark:decoration-slate-600 dark:hover:text-emerald-400">
            Disclaimer
          </Link>
          .
        </p>

        <p className="mt-6 border-t border-slate-200 pt-4 text-xs text-slate-500 dark:border-slate-800 dark:text-slate-500">
          &copy; {new Date().getFullYear()} Commercial Solar Calculator. All rights reserved.
        </p>
      </div>
    </footer>
  )
}

export default Footer
