function SeoIntro() {
  return (
    <section
      aria-label="Commercial solar financing overview"
      className="animate-fade-in-up rounded-2xl bg-white p-6 shadow-lg ring-1 ring-slate-900/5 sm:p-8 print:shadow-none print:ring-0"
    >
      <h2 className="text-xl font-bold text-slate-900 sm:text-2xl">
        Understanding Commercial Solar Financing
      </h2>
      <p className="mt-3 text-sm leading-relaxed text-slate-600">
        Commercial solar financing works differently than a residential purchase: a business can
        stack a direct federal tax credit with accelerated depreciation, often recovering the
        majority of a system's cost within the first one to two tax years rather than over a
        decade. The two mechanics below are what this calculator models to turn your monthly
        utility bill into a full return-on-investment picture.
      </p>
      <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2">
        <div>
          <h3 className="text-base font-semibold text-slate-900">
            Section 48E Tax Credit Eligibility
          </h3>
          <p className="mt-2 text-sm leading-relaxed text-slate-600">
            The Section 48E Clean Electricity Investment Credit is the current federal Investment
            Tax Credit (ITC) framework for commercial solar placed in service after 2024. Most
            commercial systems under 1 MW qualify automatically for the full 30% credit rate,
            while larger installations must satisfy prevailing wage and apprenticeship
            requirements to reach that same rate. Confirming eligibility early in your project
            timeline directly affects the net capital requirement calculated below.
          </p>
        </div>
        <div>
          <h3 className="text-base font-semibold text-slate-900">
            Optimizing Solar MACRS Depreciation Assets
          </h3>
          <p className="mt-2 text-sm leading-relaxed text-slate-600">
            Commercial solar equipment qualifies as 5-year property under the Modified
            Accelerated Cost Recovery System, letting your business recover most of its
            depreciable basis on an accelerated schedule instead of over decades. Layered on top
            of the Section 48E credit, this depreciation schedule is typically what produces the
            largest first-year tax shield in a commercial solar investment.
          </p>
        </div>
      </div>
    </section>
  )
}

export default SeoIntro
