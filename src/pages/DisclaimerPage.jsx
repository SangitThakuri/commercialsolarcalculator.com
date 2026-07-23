import { Link } from 'react-router-dom'
import SiteLayout from '../layouts/SiteLayout.jsx'
import { usePageMeta } from '../hooks/usePageMeta.js'
import { buildBreadcrumbJsonLd } from '../utils/seo.js'

const TITLE = 'Disclaimer'
const DESCRIPTION =
  'Commercial Solar Calculator provides estimates for informational purposes only and does not constitute tax, legal, engineering, or financial advice.'
const PATH = '/disclaimer'

function DisclaimerPage() {
  usePageMeta({
    title: `${TITLE} | Commercial Solar Calculator`,
    description: DESCRIPTION,
    path: PATH,
    jsonLd: [buildBreadcrumbJsonLd(PATH, TITLE)],
  })

  return (
    <SiteLayout
      title={TITLE}
      description="Read this before treating any calculator output as a final number."
      breadcrumbLabel={TITLE}
    >
      <div className="mx-auto max-w-3xl">
        <section className="animate-fade-in-up rounded-2xl bg-white p-6 shadow-lg ring-1 ring-slate-900/5 dark:bg-slate-800 dark:ring-white/10 sm:p-10">
          <div className="prose-legal space-y-6 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
            <p>
              This calculator provides estimates for informational purposes only and does not
              constitute tax, legal, or financial advice. Figures referencing the Section 48E
              Investment Tax Credit (ITC) under the Internal Revenue Code are based on publicly
              available federal guidance and may vary based on project eligibility, prevailing
              wage and apprenticeship requirements, energy community adders, and other statutory
              conditions. Depreciation estimates assume a 5-year Modified Accelerated Cost
              Recovery System (MACRS) property classification and a reduced depreciable basis
              consistent with current ITC basis-reduction rules. Actual results depend on your
              organization&apos;s specific tax position, applicable state incentives, equipment
              pricing, and financing terms. Consult a qualified tax professional or licensed solar
              engineer before making investment decisions.
            </p>
            <p>
              No calculator on this site accounts for site-specific conditions such as roof
              condition, shading, structural load limits, utility interconnection capacity, or
              local permitting requirements. System sizing, cost, and savings figures are national
              average estimates and will differ from a formal engineering proposal. See our{' '}
              <Link to="/methodology" className="font-semibold text-emerald-600 hover:underline">
                Calculation Methodology
              </Link>{' '}
              page for the exact formulas and assumptions behind every number.
            </p>
            <p>
              This site may display third-party advertising. We are not responsible for the
              content, offers, or practices of third-party advertisers, and their presence does
              not constitute an endorsement by us.
            </p>
            <p>
              Questions about this Disclaimer can be sent via our{' '}
              <Link to="/contact" className="font-semibold text-emerald-600 hover:underline">
                Contact Form
              </Link>
              .
            </p>
          </div>
        </section>
      </div>
    </SiteLayout>
  )
}

export default DisclaimerPage
