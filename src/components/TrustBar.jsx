const SIGNALS = [
  'Runs entirely in your browser — inputs are never sent to a server',
  'Modeled on IRS Section 48E & MACRS depreciation rules',
  'No signup required',
]

function CheckIcon() {
  return (
    <svg className="h-3.5 w-3.5 flex-shrink-0 text-emerald-500" viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <path
        d="M4 10.5L8 14.5L16 5.5"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function TrustBar() {
  return (
    <div className="border-b border-slate-200 bg-slate-50 dark:border-slate-800 dark:bg-slate-950/60">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center gap-x-6 gap-y-2 px-4 py-3 text-xs text-slate-600 dark:text-slate-400 sm:px-8">
        {SIGNALS.map((signal) => (
          <span key={signal} className="flex items-center gap-1.5">
            <CheckIcon />
            {signal}
          </span>
        ))}
      </div>
    </div>
  )
}

export default TrustBar
