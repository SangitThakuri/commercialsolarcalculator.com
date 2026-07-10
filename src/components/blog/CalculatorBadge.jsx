import { Link } from 'react-router-dom'
import { CALCULATOR_PAGES } from '../../data/calculatorPages.js'

function CalculatorBadge({ path }) {
  const calculator = CALCULATOR_PAGES.find((page) => page.path === path)
  if (!calculator) return null

  const Icon = calculator.icon

  return (
    <Link
      to={path}
      className="inline-flex items-center gap-1.5 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1.5 text-xs font-semibold text-emerald-700 transition hover:border-emerald-400 hover:bg-emerald-100 dark:border-emerald-500/30 dark:bg-emerald-500/10 dark:text-emerald-400 dark:hover:bg-emerald-500/20"
    >
      <Icon className="h-3.5 w-3.5 flex-shrink-0" aria-hidden="true" />
      {calculator.label}
    </Link>
  )
}

export default CalculatorBadge
