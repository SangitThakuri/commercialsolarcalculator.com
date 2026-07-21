import { lazy, Suspense, useEffect, useRef } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import CookieConsentBanner from './components/CookieConsentBanner.jsx'
import { trackPageView } from './utils/analytics.js'

const HomePage = lazy(() => import('./pages/HomePage.jsx'))
const RoiCalculatorPage = lazy(() => import('./pages/RoiCalculatorPage.jsx'))
const PaybackCalculatorPage = lazy(() => import('./pages/PaybackCalculatorPage.jsx'))
const PanelSizeCalculatorPage = lazy(() => import('./pages/PanelSizeCalculatorPage.jsx'))
const BatteryStorageCalculatorPage = lazy(() => import('./pages/BatteryStorageCalculatorPage.jsx'))
const LoanCalculatorPage = lazy(() => import('./pages/LoanCalculatorPage.jsx'))
const LeaseCalculatorPage = lazy(() => import('./pages/LeaseCalculatorPage.jsx'))
const ElectricityCostCalculatorPage = lazy(() => import('./pages/ElectricityCostCalculatorPage.jsx'))
const TaxCreditCalculatorPage = lazy(() => import('./pages/TaxCreditCalculatorPage.jsx'))
const SavingsCalculatorPage = lazy(() => import('./pages/SavingsCalculatorPage.jsx'))
const CarbonSavingsCalculatorPage = lazy(() => import('./pages/CarbonSavingsCalculatorPage.jsx'))
const CostCalculatorPage = lazy(() => import('./pages/CostCalculatorPage.jsx'))
const NpvIrrCalculatorPage = lazy(() => import('./pages/NpvIrrCalculatorPage.jsx'))
const DemandChargeCalculatorPage = lazy(() => import('./pages/DemandChargeCalculatorPage.jsx'))
const SolarFinancingCalculatorPage = lazy(() => import('./pages/SolarFinancingCalculatorPage.jsx'))
const EvChargingCalculatorPage = lazy(() => import('./pages/EvChargingCalculatorPage.jsx'))
const RoofSpaceCalculatorPage = lazy(() => import('./pages/RoofSpaceCalculatorPage.jsx'))
const PrivacyPolicyPage = lazy(() => import('./pages/PrivacyPolicyPage.jsx'))
const CookiePolicyPage = lazy(() => import('./pages/CookiePolicyPage.jsx'))
const ContactPage = lazy(() => import('./pages/ContactPage.jsx'))
const BlogIndexPage = lazy(() => import('./pages/BlogIndexPage.jsx'))
const BlogArticlePage = lazy(() => import('./pages/BlogArticlePage.jsx'))
const FaqPage = lazy(() => import('./pages/FaqPage.jsx'))
const MethodologyPage = lazy(() => import('./pages/MethodologyPage.jsx'))
const TermsPage = lazy(() => import('./pages/TermsPage.jsx'))
const DisclaimerPage = lazy(() => import('./pages/DisclaimerPage.jsx'))
const AboutPage = lazy(() => import('./pages/AboutPage.jsx'))
const CalculatorsIndexPage = lazy(() => import('./pages/CalculatorsIndexPage.jsx'))
const SolarGuidesPage = lazy(() => import('./pages/SolarGuidesPage.jsx'))
const SitemapPage = lazy(() => import('./pages/SitemapPage.jsx'))

function ScrollToTop() {
  const { pathname } = useLocation()
  const isFirstRender = useRef(true)

  useEffect(() => {
    window.scrollTo(0, 0)

    // Skip the initial mount — if analytics is already loaded (returning visitor who
    // previously accepted), gtag('config', ...) inside loadGoogleAnalytics() already sends
    // the first page_view. This effect only tracks subsequent client-side navigations.
    if (isFirstRender.current) {
      isFirstRender.current = false
      return
    }
    trackPageView(pathname)
  }, [pathname])

  return null
}

function PageLoadingFallback() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-white dark:bg-slate-900">
      <div
        className="h-8 w-8 animate-spin rounded-full border-2 border-slate-300 border-t-emerald-500 dark:border-slate-700 dark:border-t-emerald-400"
        role="status"
        aria-label="Loading"
      />
    </div>
  )
}

function App() {
  return (
    <>
      <ScrollToTop />
      <Suspense fallback={<PageLoadingFallback />}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/commercial-solar-roi-calculator" element={<RoiCalculatorPage />} />
          <Route path="/solar-payback-calculator" element={<PaybackCalculatorPage />} />
          <Route path="/solar-panel-size-calculator" element={<PanelSizeCalculatorPage />} />
          <Route path="/battery-storage-calculator" element={<BatteryStorageCalculatorPage />} />
          <Route path="/solar-loan-calculator" element={<LoanCalculatorPage />} />
          <Route path="/solar-lease-calculator" element={<LeaseCalculatorPage />} />
          <Route
            path="/commercial-electricity-cost-calculator"
            element={<ElectricityCostCalculatorPage />}
          />
          <Route path="/solar-tax-credit-calculator" element={<TaxCreditCalculatorPage />} />
          <Route path="/solar-savings-calculator" element={<SavingsCalculatorPage />} />
          <Route path="/carbon-savings-calculator" element={<CarbonSavingsCalculatorPage />} />
          <Route path="/commercial-solar-cost-calculator" element={<CostCalculatorPage />} />
          <Route path="/solar-investment-calculator" element={<NpvIrrCalculatorPage />} />
          <Route path="/commercial-demand-charge-calculator" element={<DemandChargeCalculatorPage />} />
          <Route path="/solar-financing-calculator" element={<SolarFinancingCalculatorPage />} />
          <Route path="/commercial-ev-charging-calculator" element={<EvChargingCalculatorPage />} />
          <Route path="/roof-space-calculator" element={<RoofSpaceCalculatorPage />} />
          <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
          <Route path="/cookie-policy" element={<CookiePolicyPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/blog" element={<BlogIndexPage />} />
          <Route path="/blog/:slug" element={<BlogArticlePage />} />
          <Route path="/faq" element={<FaqPage />} />
          <Route path="/methodology" element={<MethodologyPage />} />
          <Route path="/terms-of-service" element={<TermsPage />} />
          <Route path="/disclaimer" element={<DisclaimerPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/calculators" element={<CalculatorsIndexPage />} />
          <Route path="/solar-guides" element={<SolarGuidesPage />} />
          <Route path="/sitemap" element={<SitemapPage />} />
        </Routes>
      </Suspense>
      <CookieConsentBanner />
    </>
  )
}

export default App
