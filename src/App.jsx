import { useMemo, useState } from 'react'
import InputPanel from './components/InputPanel.jsx'
import ResultsSummary from './components/ResultsSummary.jsx'
import ReportActions from './components/ReportActions.jsx'
import CashFlowChart from './components/CashFlowChart.jsx'
import SavingsChart from './components/SavingsChart.jsx'
import EnergyProductionChart from './components/EnergyProductionChart.jsx'
import TaxBenefitTimeline from './components/TaxBenefitTimeline.jsx'
import FinancingComparison from './components/FinancingComparison.jsx'
import FaqAccordion from './components/FaqAccordion.jsx'
import Footer from './components/Footer.jsx'
import SeoIntro from './components/SeoIntro.jsx'
import SolarEducationGuide from './components/SolarEducationGuide.jsx'
import TrustBar from './components/TrustBar.jsx'
import {
  calculateSolarMetrics,
  generateCashFlowProjection,
  generateAnnualSavingsSeries,
  generateEnergyProduction,
  generateMacrsTimeline,
} from './utils/solarMath.js'

function App() {
  const [monthlyBill, setMonthlyBill] = useState(5000)
  const [stateTaxRate, setStateTaxRate] = useState(0.06)

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

  return (
    <div className="flex min-h-screen flex-col bg-slate-900">
      <header className="relative overflow-hidden border-b border-slate-800 bg-gradient-to-br from-slate-900 via-slate-900 to-slate-950 px-4 py-6 sm:px-8">
        <div
          className="pointer-events-none absolute -top-24 right-0 h-72 w-72 rounded-full bg-emerald-500/10 blur-3xl"
          aria-hidden="true"
        />
        <div className="relative mx-auto max-w-6xl">
          <p className="text-xs font-semibold uppercase tracking-widest text-emerald-500">
            For Businesses &amp; Commercial Property Owners
          </p>
          <h1 className="mt-1 text-2xl font-bold text-white sm:text-3xl">
            Commercial Solar Calculator
          </h1>
          <p className="mt-2 max-w-2xl text-sm text-slate-400">
            Model corporate solar ROI using Section 48E Investment Tax Credits and 5-Year MACRS
            depreciation.
          </p>
        </div>
      </header>

      <TrustBar />

      <main className="flex-1 px-4 py-8 sm:px-8">
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

            <ReportActions metrics={metrics} />

            <section
              className="animate-fade-in-up rounded-2xl bg-white p-6 shadow-lg ring-1 ring-slate-900/5 sm:p-8 print:shadow-none print:ring-0"
              aria-label="25 year cumulative cash flow projection"
            >
              <h2 className="text-lg font-semibold text-slate-900">
                25-Year Cumulative Cash Flow
              </h2>
              <div className="mt-6">
                <CashFlowChart projection={projection} crossoverYear={crossoverYear} />
              </div>
            </section>

            <section
              className="animate-fade-in-up rounded-2xl bg-white p-6 shadow-lg ring-1 ring-slate-900/5 sm:p-8 print:shadow-none print:ring-0"
              aria-label="Annual utility savings"
            >
              <h2 className="text-lg font-semibold text-slate-900">Annual Utility Savings</h2>
              <div className="mt-6">
                <SavingsChart series={savingsSeries} />
              </div>
            </section>

            <section
              className="animate-fade-in-up rounded-2xl bg-white p-6 shadow-lg ring-1 ring-slate-900/5 sm:p-8 print:shadow-none print:ring-0"
              aria-label="Estimated annual energy production"
            >
              <h2 className="text-lg font-semibold text-slate-900">
                Estimated Energy Production
              </h2>
              <div className="mt-6">
                <EnergyProductionChart production={energyProduction} />
              </div>
            </section>

            <section
              className="animate-fade-in-up rounded-2xl bg-white p-6 shadow-lg ring-1 ring-slate-900/5 sm:p-8 print:shadow-none print:ring-0"
              aria-label="Tax benefit timeline"
            >
              <h2 className="text-lg font-semibold text-slate-900">Tax Benefit Timeline</h2>
              <div className="mt-6">
                <TaxBenefitTimeline itcAmount={metrics.itcAmount} macrsTimeline={macrsTimeline} />
              </div>
            </section>

            <FinancingComparison netCapital={metrics.netCapital} annualSavings={metrics.annualSavings} />

            <SeoIntro />

            <FaqAccordion />

            <SolarEducationGuide />
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}

export default App
