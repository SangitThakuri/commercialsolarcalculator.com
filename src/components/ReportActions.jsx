import { useState } from 'react'

const currencyFormatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  maximumFractionDigits: 0,
})

function buildSummaryText(metrics) {
  const paybackLabel = Number.isFinite(metrics.paybackPeriod)
    ? `${metrics.paybackPeriod.toFixed(1)} years`
    : 'N/A'

  return [
    'Commercial Solar Calculator — ROI Summary',
    '',
    `System Size: ${metrics.systemSizeKw} kW`,
    `Gross System Cost: ${currencyFormatter.format(metrics.grossCost)}`,
    `Federal ITC (30%): ${currencyFormatter.format(metrics.itcAmount)}`,
    `MACRS Tax Shield: ${currencyFormatter.format(metrics.macrsSavings)}`,
    `Net Capital Required: ${currencyFormatter.format(metrics.netCapital)}`,
    `Estimated Payback Period: ${paybackLabel}`,
    '',
    'Generated at commercialsolarcalculator.com — estimates only, not tax or financial advice.',
  ].join('\n')
}

function ReportActions({ metrics }) {
  const [copyStatus, setCopyStatus] = useState(null)

  const summaryText = buildSummaryText(metrics)
  const pageUrl = typeof window !== 'undefined' ? window.location.href : 'https://www.commercialsolarcalculator.com/'

  const handleShare = async () => {
    if (typeof navigator !== 'undefined' && navigator.share) {
      try {
        await navigator.share({
          title: 'Commercial Solar Calculator — ROI Summary',
          text: summaryText,
          url: pageUrl,
        })
        return
      } catch {
        // user cancelled the native share sheet — fall through to clipboard copy
      }
    }

    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      await navigator.clipboard.writeText(`${summaryText}\n${pageUrl}`)
      setCopyStatus('Summary copied to clipboard')
      setTimeout(() => setCopyStatus(null), 2600)
    }
  }

  const mailtoHref = `mailto:?subject=${encodeURIComponent(
    'My Commercial Solar ROI Summary',
  )}&body=${encodeURIComponent(summaryText)}`

  return (
    <div className="flex flex-wrap items-center gap-2 print:hidden" aria-label="Report actions">
      <button
        type="button"
        onClick={() => window.print()}
        className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 transition hover:border-emerald-400 hover:text-emerald-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500/40"
      >
        Print / Save as PDF
      </button>
      <a
        href={mailtoHref}
        className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 transition hover:border-emerald-400 hover:text-emerald-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500/40"
      >
        Email Report
      </a>
      <button
        type="button"
        onClick={handleShare}
        className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 transition hover:border-emerald-400 hover:text-emerald-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500/40"
      >
        Share
      </button>
      {copyStatus && (
        <span role="status" className="text-xs font-medium text-emerald-600">
          {copyStatus}
        </span>
      )}
    </div>
  )
}

export default ReportActions
