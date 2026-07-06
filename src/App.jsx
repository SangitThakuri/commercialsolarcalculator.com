import { useMemo, useState } from 'react'
import InputPanel from './components/InputPanel.jsx'
import ResultsSummary from './components/ResultsSummary.jsx'
import CashFlowChart from './components/CashFlowChart.jsx'
import Footer from './components/Footer.jsx'
import { calculateSolarMetrics, generateCashFlowProjection } from './utils/solarMath.js'

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

  return (
    <div className="flex min-h-screen flex-col bg-slate-900">
      <header className="border-b border-slate-800 px-4 py-6 sm:px-8">
        <div className="mx-auto max-w-6xl">
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

      <main className="flex-1 px-4 py-8 sm:px-8">
        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-6 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <InputPanel
              monthlyBill={monthlyBill}
              setMonthlyBill={setMonthlyBill}
              stateTaxRate={stateTaxRate}
              setStateTaxRate={setStateTaxRate}
            />
          </div>

          <div className="flex flex-col gap-6 lg:col-span-8">
            <ResultsSummary metrics={metrics} />

            <section
              className="rounded-2xl bg-white p-6 shadow-lg sm:p-8"
              aria-label="25 year cumulative cash flow projection"
            >
              <h2 className="text-lg font-semibold text-slate-900">
                25-Year Cumulative Cash Flow
              </h2>
              <div className="mt-6">
                <CashFlowChart projection={projection} crossoverYear={crossoverYear} />
              </div>
            </section>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}

export default App
