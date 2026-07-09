import { useEffect } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import HomePage from './pages/HomePage.jsx'
import RoiCalculatorPage from './pages/RoiCalculatorPage.jsx'
import PaybackCalculatorPage from './pages/PaybackCalculatorPage.jsx'
import PanelSizeCalculatorPage from './pages/PanelSizeCalculatorPage.jsx'
import BatteryStorageCalculatorPage from './pages/BatteryStorageCalculatorPage.jsx'
import LoanCalculatorPage from './pages/LoanCalculatorPage.jsx'
import LeaseCalculatorPage from './pages/LeaseCalculatorPage.jsx'
import ElectricityCostCalculatorPage from './pages/ElectricityCostCalculatorPage.jsx'
import TaxCreditCalculatorPage from './pages/TaxCreditCalculatorPage.jsx'
import SavingsCalculatorPage from './pages/SavingsCalculatorPage.jsx'
import CarbonSavingsCalculatorPage from './pages/CarbonSavingsCalculatorPage.jsx'
import CostCalculatorPage from './pages/CostCalculatorPage.jsx'
import NpvIrrCalculatorPage from './pages/NpvIrrCalculatorPage.jsx'

function ScrollToTop() {
  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  return null
}

function App() {
  return (
    <>
      <ScrollToTop />
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
      </Routes>
    </>
  )
}

export default App
