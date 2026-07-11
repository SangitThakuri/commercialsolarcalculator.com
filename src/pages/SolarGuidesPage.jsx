import { Link } from 'react-router-dom'
import SiteLayout from '../layouts/SiteLayout.jsx'
import SolarEducationGuide from '../components/SolarEducationGuide.jsx'
import { usePageMeta } from '../hooks/usePageMeta.js'
import { buildBreadcrumbJsonLd } from '../utils/seo.js'

const TITLE = 'Solar Guides'
const DESCRIPTION =
  'A plain-English reference guide to commercial solar: the federal ITC, MACRS depreciation, payback period, system sizing, demand charges, and the most common mistakes businesses make.'
const PATH = '/solar-guides'

function SolarGuidesPage() {
  usePageMeta({
    title: `${TITLE} | Commercial Solar Calculator`,
    description: DESCRIPTION,
    path: PATH,
    jsonLd: [buildBreadcrumbJsonLd(PATH, TITLE)],
  })

  return (
    <SiteLayout
      title={TITLE}
      description="A standing reference for the mechanics behind commercial solar economics — separate from our dated Blog articles."
      breadcrumbLabel={TITLE}
    >
      <div className="mx-auto max-w-6xl space-y-8">
        <SolarEducationGuide />

        <div className="rounded-2xl border border-dashed border-slate-300 p-6 text-sm text-slate-600 dark:border-slate-700 dark:text-slate-300">
          Looking for something more specific or recently published? Check the{' '}
          <Link to="/blog" className="font-semibold text-emerald-600 hover:underline">
            Blog
          </Link>{' '}
          for in-depth articles, or the{' '}
          <Link to="/faq" className="font-semibold text-emerald-600 hover:underline">
            FAQ
          </Link>{' '}
          for quick answers to common questions.
        </div>
      </div>
    </SiteLayout>
  )
}

export default SolarGuidesPage
