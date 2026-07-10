import { useState } from 'react'
import { Mail } from 'lucide-react'

// Same honest pattern as the Contact page: there's no email service connected yet, so
// this opens a pre-filled email to our team rather than falsely claiming "You're subscribed!"
const CONTACT_EMAIL = 'hello@commercialsolarcalculator.com'
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function NewsletterSignup() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState('idle') // 'idle' | 'error' | 'success'

  const handleSubmit = (event) => {
    event.preventDefault()

    if (!EMAIL_PATTERN.test(email.trim())) {
      setStatus('error')
      return
    }

    const subject = 'Newsletter signup request'
    const body = `Please add ${email.trim()} to your solar incentive, tax credit, and new calculator update list.`
    window.location.href = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
    setStatus('success')
  }

  return (
    <section className="animate-fade-in-up rounded-2xl border border-slate-200 bg-slate-50 p-8 text-center dark:border-slate-700 dark:bg-slate-800/60 sm:p-10">
      <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-emerald-100 dark:bg-emerald-500/15">
        <Mail className="h-5 w-5 text-emerald-600 dark:text-emerald-400" aria-hidden="true" />
      </div>
      <h2 className="mt-4 text-xl font-bold text-slate-900 dark:text-white">Stay Ahead of Solar Incentive Changes</h2>
      <p className="mx-auto mt-2 max-w-md text-sm leading-relaxed text-slate-600 dark:text-slate-400">
        Get occasional updates on federal tax credit changes, new calculators, and commercial
        solar incentive news — no spam, unsubscribe anytime.
      </p>

      {status === 'success' ? (
        <p className="mx-auto mt-6 max-w-sm text-sm font-medium text-emerald-700 dark:text-emerald-400">
          Your email app should be opening now — just hit send and we'll get you on the list.
        </p>
      ) : (
        <form
          onSubmit={handleSubmit}
          noValidate
          className="mx-auto mt-6 flex max-w-md flex-col gap-3 sm:flex-row"
        >
          <label htmlFor="newsletter-email" className="sr-only">
            Email address
          </label>
          <input
            id="newsletter-email"
            type="email"
            value={email}
            onChange={(event) => {
              setEmail(event.target.value)
              setStatus('idle')
            }}
            placeholder="you@company.com"
            aria-invalid={status === 'error'}
            className="flex-1 rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm text-slate-900 transition focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/30 dark:border-slate-600 dark:bg-slate-900 dark:text-white"
          />
          <button
            type="submit"
            className="rounded-lg bg-emerald-500 px-5 py-2.5 text-sm font-semibold text-slate-900 transition hover:bg-emerald-400"
          >
            Subscribe
          </button>
        </form>
      )}
      {status === 'error' && (
        <p className="mt-2 text-xs font-medium text-red-600 dark:text-red-400" role="alert">
          Please enter a valid email address.
        </p>
      )}
    </section>
  )
}

export default NewsletterSignup
