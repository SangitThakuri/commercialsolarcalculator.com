import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import SiteLayout from '../layouts/SiteLayout.jsx'
import InputPanel from '../components/InputPanel.jsx'
import ResultsSummary from '../components/ResultsSummary.jsx'
import ReportActions from '../components/ReportActions.jsx'
import CashFlowChart from '../components/CashFlowChart.jsx'
import SavingsChart from '../components/SavingsChart.jsx'
import EnergyProductionChart from '../components/EnergyProductionChart.jsx'
import TaxBenefitTimeline from '../components/TaxBenefitTimeline.jsx'
import FinancingComparison from '../components/FinancingComparison.jsx'
import FaqAccordion from '../components/FaqAccordion.jsx'
import SeoIntro from '../components/SeoIntro.jsx'
import SolarEducationGuide from '../components/SolarEducationGuide.jsx'
import RelatedCalculators from '../components/RelatedCalculators.jsx'
import WhyThisMatters from '../components/WhyThisMatters.jsx'
import NewsletterSignup from '../components/NewsletterSignup.jsx'
import CtaBanner from '../components/CtaBanner.jsx'
import ArticleCard from '../components/blog/ArticleCard.jsx'
import { usePageMeta } from '../hooks/usePageMeta.js'
import { BLOG_POSTS } from '../data/blogPosts.js'
import { getDefaultTaxRateForState } from '../data/stateCorporateTaxRates.js'
import {
  calculateSolarMetrics,
  generateCashFlowProjection,
  generateAnnualSavingsSeries,
  generateEnergyProduction,
  generateMacrsTimeline,
} from '../utils/solarMath.js'

const currencyFormatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  maximumFractionDigits: 0,
})

const HOME_JSON_LD = [
  {
    '@context': 'https://schema.org',
    '@type': ['WebApplication', 'FinancialCalculator'],
    name: 'Commercial Solar Calculator',
    url: 'https://www.commercialsolarcalculator.com/',
    description:
      'Calculate corporate solar ROI using live U.S. tax rules. Estimate system sizing, Section 48E Investment Tax Credits (ITC), and 5-Year MACRS depreciation.',
    applicationCategory: 'FinanceApplication',
    operatingSystem: 'Any',
    browserRequirements: 'Requires JavaScript',
    isAccessibleForFree: true,
    offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
    featureList: [
      'Business solar payback analytics',
      'Clean energy modeling',
      'Investment metrics and net capital projections',
      'Section 48E Investment Tax Credit (ITC) calculations',
      '5-Year MACRS accelerated depreciation modeling',
      '25-year cumulative cash flow visualization',
    ],
    about: { '@type': 'Thing', name: 'Commercial Solar Investment Analysis' },
    audience: {
      '@type': 'BusinessAudience',
      audienceType: 'Commercial and Corporate Property Owners',
    },
  },
  {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'How does the 30% Federal Investment Tax Credit (ITC) apply to business properties under Section 48E?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: "The Section 48E Clean Electricity Investment Credit is the federal ITC framework for commercial solar systems placed in service after 2024. Its base rate is 6% of eligible cost basis, stepping up to 30% once a project satisfies the prevailing wage and apprenticeship (PWA) requirements — though most commercial systems under 1 MW (AC) are automatically exempt from PWA and qualify for the full 30% rate outright. Because the credit offsets federal tax liability dollar-for-dollar, it directly reduces the net capital your business needs to finance up front, which is why this calculator applies it before computing your Net Capital Required. One important wrinkle: under IRC Section 50(c), claiming the ITC also requires reducing the asset's depreciable basis by half of the credit amount, which is reflected in the Depreciable Basis figure above.",
        },
      },
      {
        '@type': 'Question',
        name: 'What is MACRS 5-Year Depreciation and how does it generate a corporate tax shield?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'The Modified Accelerated Cost Recovery System (MACRS) is the IRS-prescribed depreciation method under Section 168, and commercial solar equipment is classified as 5-year property — a much faster recovery period than the 39 years used for most commercial real property. Under the standard half-year convention, that schedule spreads across 6 tax years at declining-balance percentages of roughly 20%, 32%, 19.2%, 11.52%, 11.52%, and 5.76%. Each year\'s depreciation deduction reduces taxable income, and multiplying that deduction by your combined federal and state corporate tax rate produces a real, cash "tax shield." To keep this dashboard responsive as you adjust inputs, we model the full schedule as one blended figure — your reduced depreciable basis multiplied by a combined 21% federal and your selected state tax rate — rather than itemizing each of the 6 years individually.',
        },
      },
      {
        '@type': 'Question',
        name: 'Does this commercial solar calculator account for utility rate inflation trends?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes. The 25-year cumulative cash flow chart compounds your current annual electricity savings at 3% per year, consistent with the long-run historical average growth rate of U.S. commercial electricity rates. Because this compounding effect applies every year of the projection, even small changes to the inflation assumption can meaningfully shift the crossover (payback) year shown on the chart. Actual utility rate escalation varies by region, provider, and rate class, so businesses served by utilities with faster-than-average rate growth may reach payback sooner than this baseline model suggests.',
        },
      },
      {
        '@type': 'Question',
        name: 'Are there additional tax credit adders for using domestic content or operating in energy communities?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: "Yes — Section 48E allows several bonus adders on top of the base credit rate. A Domestic Content Bonus adds 10 percentage points when a required share of the project's steel, iron, and manufactured components are produced in the United States. An Energy Community Bonus adds another 10 percentage points for projects sited in areas with historical fossil-fuel employment, brownfield sites, or closed coal facilities. A separate, capacity-limited Low-Income Communities Bonus (Section 48E(h)) can add 10–20 points for qualifying allocations. Stacked together, an eligible commercial project can reach a total credit well above the 30% baseline. This calculator intentionally models the 30% base rate only, since bonus eligibility depends on project-specific sourcing, siting, and a competitive allocation process — confirm applicability with your EPC contractor and tax advisor before assuming a higher rate.",
        },
      },
    ],
  },
]

function HomePage() {
  usePageMeta({
    title: 'Commercial Solar Calculator - Corporate ROI & Tax Incentives',
    description:
      'Calculate corporate solar ROI using live U.S. tax rules. Estimate system sizing, Section 48E Investment Tax Credits (ITC), and 5-Year MACRS depreciation.',
    path: '/',
    jsonLd: HOME_JSON_LD,
  })

  const [monthlyBill, setMonthlyBill] = useState(5000)
  const [stateTaxRate, setStateTaxRate] = useState(getDefaultTaxRateForState('California'))

  const metrics = useMemo(
    () => calculateSolarMetrics(monthlyBill, stateTaxRate),
    [monthlyBill, stateTaxRate],
  )

  const { projection, crossoverYear } = useMemo(
    () => generateCashFlowProjection(metrics.netCapital, metrics.annualSavings),
    [metrics.netCapital, metrics.annualSavings],
  )

  const savingsSeries = useMemo(
    () => generateAnnualSavingsSeries(metrics.annualSavings),
    [metrics.annualSavings],
  )

  const energyProduction = useMemo(
    () => generateEnergyProduction(metrics.systemSizeKw),
    [metrics.systemSizeKw],
  )

  const macrsTimeline = useMemo(
    () => generateMacrsTimeline(metrics.depreciableBasis, stateTaxRate),
    [metrics.depreciableBasis, stateTaxRate],
  )

  const reportLines = [
    `System Size: ${metrics.systemSizeKw} kW`,
    `Gross System Cost: ${currencyFormatter.format(metrics.grossCost)}`,
    `Federal ITC (30%): ${currencyFormatter.format(metrics.itcAmount)}`,
    `MACRS Tax Shield: ${currencyFormatter.format(metrics.macrsSavings)}`,
    `Net Capital Required: ${currencyFormatter.format(metrics.netCapital)}`,
    `Estimated Payback Period: ${Number.isFinite(metrics.paybackPeriod) ? `${metrics.paybackPeriod.toFixed(1)} years` : 'N/A'}`,
  ]

  return (
    <SiteLayout
      title="Commercial Solar Calculator"
      description="Model corporate solar ROI using Section 48E Investment Tax Credits and 5-Year MACRS depreciation."
    >
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-6 lg:grid-cols-12 lg:items-start">
        <div className="lg:sticky lg:top-6 lg:col-span-4 lg:self-start print:static">
          <InputPanel
            monthlyBill={monthlyBill}
            setMonthlyBill={setMonthlyBill}
            stateTaxRate={stateTaxRate}
            setStateTaxRate={setStateTaxRate}
          />
        </div>

        <div className="flex flex-col gap-6 lg:col-span-8">
          <ResultsSummary metrics={metrics} />

          <ReportActions title="Commercial Solar Calculator — ROI Summary" lines={reportLines} />

          <section
            className="animate-fade-in-up rounded-2xl bg-white p-6 shadow-lg ring-1 ring-slate-900/5 dark:bg-slate-800 dark:ring-white/10 sm:p-8 print:shadow-none print:ring-0"
            aria-label="25 year cumulative cash flow projection"
          >
            <h2 className="text-lg font-semibold text-slate-900 dark:text-white">25-Year Cumulative Cash Flow</h2>
            <div className="mt-6">
              <CashFlowChart projection={projection} crossoverYear={crossoverYear} />
            </div>
          </section>

          <section
            className="animate-fade-in-up rounded-2xl bg-white p-6 shadow-lg ring-1 ring-slate-900/5 dark:bg-slate-800 dark:ring-white/10 sm:p-8 print:shadow-none print:ring-0"
            aria-label="Annual utility savings"
          >
            <h2 className="text-lg font-semibold text-slate-900 dark:text-white">Annual Utility Savings</h2>
            <div className="mt-6">
              <SavingsChart series={savingsSeries} />
            </div>
          </section>

          <section
            className="animate-fade-in-up rounded-2xl bg-white p-6 shadow-lg ring-1 ring-slate-900/5 dark:bg-slate-800 dark:ring-white/10 sm:p-8 print:shadow-none print:ring-0"
            aria-label="Estimated annual energy production"
          >
            <h2 className="text-lg font-semibold text-slate-900 dark:text-white">Estimated Energy Production</h2>
            <div className="mt-6">
              <EnergyProductionChart production={energyProduction} />
            </div>
          </section>

          <section
            className="animate-fade-in-up rounded-2xl bg-white p-6 shadow-lg ring-1 ring-slate-900/5 dark:bg-slate-800 dark:ring-white/10 sm:p-8 print:shadow-none print:ring-0"
            aria-label="Tax benefit timeline"
          >
            <h2 className="text-lg font-semibold text-slate-900 dark:text-white">Tax Benefit Timeline</h2>
            <div className="mt-6">
              <TaxBenefitTimeline itcAmount={metrics.itcAmount} macrsTimeline={macrsTimeline} />
            </div>
          </section>

          <FinancingComparison netCapital={metrics.netCapital} annualSavings={metrics.annualSavings} />

          <RelatedCalculators
            currentPath="/"
            heading="Popular Calculators"
            description="The most-used tools on this site — pick the one that matches what you're trying to figure out."
          />

          <WhyThisMatters />

          <SeoIntro />

          <SolarEducationGuide />

          <section aria-label="Latest guides" className="animate-fade-in-up">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <h2 className="text-xl font-bold text-slate-900 dark:text-white sm:text-2xl">Latest Guides</h2>
              <Link
                to="/blog"
                className="text-sm font-semibold text-emerald-600 hover:underline dark:text-emerald-400"
              >
                View All Articles →
              </Link>
            </div>
            <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {BLOG_POSTS.slice(0, 3).map((post) => (
                <ArticleCard key={post.slug} post={post} />
              ))}
            </div>
          </section>

          <FaqAccordion />

          <NewsletterSignup />

          <CtaBanner />
        </div>
      </div>
    </SiteLayout>
  )
}

export default HomePage
