function Footer() {
  return (
    <footer className="mt-12 border-t border-slate-800 bg-slate-900 py-8 text-slate-400">
      <div className="mx-auto max-w-5xl px-4">
        <h2 className="text-sm font-semibold uppercase tracking-wide text-slate-300">
          Legal &amp; Tax Disclaimer
        </h2>
        <p className="mt-3 text-xs leading-relaxed">
          This calculator provides estimates for informational purposes only and does not
          constitute tax, legal, or financial advice. Figures referencing the Section 48E
          Investment Tax Credit (ITC) under the Internal Revenue Code are based on publicly
          available federal guidance and may vary based on project eligibility, prevailing wage
          and apprenticeship requirements, energy community adders, and other statutory
          conditions. Depreciation estimates assume a 5-year Modified Accelerated Cost Recovery
          System (MACRS) property classification and a reduced depreciable basis consistent with
          current ITC basis-reduction rules. Actual results depend on your organization's
          specific tax position, applicable state incentives, equipment pricing, and financing
          terms. Consult a qualified tax professional or licensed solar engineer before making
          investment decisions.
        </p>
        <p className="mt-4 text-xs text-slate-500">
          &copy; {new Date().getFullYear()} Commercial Solar Calculator. All rights reserved.
        </p>
      </div>
    </footer>
  )
}

export default Footer
