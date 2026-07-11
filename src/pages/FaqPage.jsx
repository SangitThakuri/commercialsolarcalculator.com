import SiteLayout from '../layouts/SiteLayout.jsx'
import FaqAccordion from '../components/FaqAccordion.jsx'
import { usePageMeta } from '../hooks/usePageMeta.js'
import { buildFaqJsonLd } from '../utils/seo.js'
import { FAQ_ITEMS } from '../data/faqItems.js'

const TITLE = 'FAQ'
const DESCRIPTION =
  'Answers to common questions about the federal solar Investment Tax Credit, MACRS depreciation, utility rate inflation, and bonus tax credit adders.'
const PATH = '/faq'

function FaqPage() {
  usePageMeta({
    title: `Frequently Asked Questions | Commercial Solar Calculator`,
    description: DESCRIPTION,
    path: PATH,
    jsonLd: [buildFaqJsonLd(FAQ_ITEMS.map((item) => ({ question: item.question, answer: item.answer })))],
  })

  return (
    <SiteLayout
      title={TITLE}
      description="Answers to the questions we hear most about the tax credit, depreciation, and assumptions behind these calculators."
      breadcrumbLabel={TITLE}
    >
      <div className="mx-auto max-w-3xl">
        <FaqAccordion />
      </div>
    </SiteLayout>
  )
}

export default FaqPage
