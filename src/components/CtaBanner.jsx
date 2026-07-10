import { Link } from 'react-router-dom'

function CtaBanner() {
  return (
    <section className="animate-fade-in-up rounded-2xl bg-gradient-to-br from-emerald-600 to-emerald-700 p-8 text-center shadow-lg sm:p-10">
      <h2 className="text-xl font-bold text-white sm:text-2xl">Ready to See Your Numbers?</h2>
      <p className="mx-auto mt-2 max-w-xl text-sm leading-relaxed text-emerald-50">
        Adjust the calculator above with your real electric bill and state tax rate — every
        result updates instantly, right in your browser, with nothing sent to a server.
      </p>
      <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
        <button
          type="button"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="rounded-lg bg-white px-6 py-2.5 text-sm font-semibold text-emerald-700 transition hover:bg-emerald-50"
        >
          Back to Calculator
        </button>
        <Link
          to="/contact"
          className="rounded-lg border border-white/40 px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-white/10"
        >
          Contact Our Team
        </Link>
      </div>
    </section>
  )
}

export default CtaBanner
