import { Link } from 'react-router-dom'

function Breadcrumbs({ label }) {
  return (
    <nav aria-label="Breadcrumb" className="mx-auto max-w-6xl px-4 pt-4 text-xs text-slate-400 sm:px-8">
      <ol className="flex flex-wrap items-center gap-1.5">
        <li>
          <Link to="/" className="transition hover:text-emerald-400">
            Commercial Solar Calculator
          </Link>
        </li>
        <li aria-hidden="true">/</li>
        <li aria-current="page" className="font-medium text-slate-300">
          {label}
        </li>
      </ol>
    </nav>
  )
}

export default Breadcrumbs
