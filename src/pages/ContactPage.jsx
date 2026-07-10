import { useState } from 'react'
import SiteLayout from '../layouts/SiteLayout.jsx'
import { usePageMeta } from '../hooks/usePageMeta.js'

const TITLE = 'Contact Us'
const DESCRIPTION =
  'Get in touch with the Commercial Solar Calculator team — questions, feedback, or partnership inquiries.'
const PATH = '/contact'

// Placeholder mailbox — confirm/replace before launch. The form has no backend today, so
// submitting opens the visitor's own email client with this address pre-filled as the
// recipient (see the honest, non-overclaiming success copy below).
const CONTACT_EMAIL = 'hello@commercialsolarcalculator.com'

const INITIAL_FORM = { fullName: '', companyName: '', businessEmail: '', message: '' }
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function validate(form) {
  const errors = {}
  if (!form.fullName.trim()) errors.fullName = 'Please enter your full name.'
  if (!form.companyName.trim()) errors.companyName = 'Please enter your company name.'
  if (!form.businessEmail.trim()) {
    errors.businessEmail = 'Please enter your business email.'
  } else if (!EMAIL_PATTERN.test(form.businessEmail.trim())) {
    errors.businessEmail = 'Please enter a valid email address.'
  }
  if (!form.message.trim()) errors.message = 'Please enter a message.'
  return errors
}

function buildMailtoHref(form) {
  const subject = `Website inquiry from ${form.fullName}${form.companyName ? ` (${form.companyName})` : ''}`
  const body = [
    `Name: ${form.fullName}`,
    `Company: ${form.companyName}`,
    `Email: ${form.businessEmail}`,
    '',
    form.message,
  ].join('\n')

  return `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
}

function FormField({ id, label, error, children }) {
  return (
    <div>
      <label htmlFor={id} className="text-sm font-medium text-slate-700 dark:text-slate-300">
        {label}
      </label>
      <div className="mt-1.5">{children}</div>
      {error && (
        <p
          id={`${id}-error`}
          className="mt-1.5 text-xs font-medium text-red-600 dark:text-red-400"
          role="alert"
        >
          {error}
        </p>
      )}
    </div>
  )
}

function ContactPage() {
  usePageMeta({
    title: `${TITLE} | Commercial Solar Calculator`,
    description: DESCRIPTION,
    path: PATH,
  })

  const [form, setForm] = useState(INITIAL_FORM)
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState('idle') // 'idle' | 'sending' | 'success'

  const handleChange = (field) => (event) => {
    const { value } = event.target
    setForm((current) => ({ ...current, [field]: value }))
    setErrors((current) => ({ ...current, [field]: undefined }))
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    const validationErrors = validate(form)
    setErrors(validationErrors)
    if (Object.keys(validationErrors).length > 0) return

    setStatus('sending')
    const mailtoHref = buildMailtoHref(form)

    window.setTimeout(() => {
      window.location.href = mailtoHref
      setStatus('success')
    }, 450)
  }

  const handleReset = () => {
    setForm(INITIAL_FORM)
    setErrors({})
    setStatus('idle')
  }

  const inputClassName =
    'w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm text-slate-900 transition focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/30 dark:border-slate-700 dark:bg-slate-900 dark:text-white'

  return (
    <SiteLayout
      title={TITLE}
      description="Questions, feedback, or partnership inquiries — we'd like to hear from you."
      breadcrumbLabel={TITLE}
    >
      <div className="mx-auto max-w-xl">
        <section className="animate-fade-in-up rounded-2xl bg-white p-6 shadow-lg ring-1 ring-slate-900/5 dark:bg-slate-800 dark:ring-white/10 sm:p-10">
          {status === 'success' ? (
            <div className="py-6 text-center">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-emerald-100 dark:bg-emerald-900/40">
                <svg
                  className="h-6 w-6 text-emerald-600 dark:text-emerald-400"
                  viewBox="0 0 24 24"
                  fill="none"
                  aria-hidden="true"
                >
                  <path
                    d="M5 13l4 4L19 7"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <h2 className="mt-4 text-lg font-bold text-slate-900 dark:text-white">
                Your email app should be opening now
              </h2>
              <p className="mx-auto mt-2 max-w-sm text-sm leading-relaxed text-slate-600 dark:text-slate-300">
                We've prepared a message addressed to our team with the details you entered —
                just hit send from your email app. If it didn't open automatically, you can reach
                us directly at <strong>{CONTACT_EMAIL}</strong>.
              </p>
              <button
                type="button"
                onClick={handleReset}
                className="mt-6 rounded-lg border border-slate-200 px-5 py-2.5 text-sm font-semibold text-slate-700 transition hover:border-emerald-400 hover:text-emerald-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500/40 dark:border-slate-700 dark:text-slate-200 dark:hover:border-emerald-400 dark:hover:text-emerald-400"
              >
                Send another message
              </button>
            </div>
          ) : (
            <>
              <h2 className="text-lg font-semibold text-slate-900 dark:text-white">
                Send Us a Message
              </h2>
              <p className="mt-1.5 text-sm text-slate-500 dark:text-slate-400">
                Fill this out and your email app will open with everything ready to send.
              </p>

              <form onSubmit={handleSubmit} noValidate className="mt-6 space-y-5">
                <FormField id="contact-name" label="Full Name" error={errors.fullName}>
                  <input
                    id="contact-name"
                    type="text"
                    autoComplete="name"
                    value={form.fullName}
                    onChange={handleChange('fullName')}
                    aria-invalid={Boolean(errors.fullName)}
                    aria-describedby={errors.fullName ? 'contact-name-error' : undefined}
                    className={inputClassName}
                  />
                </FormField>

                <FormField id="contact-company" label="Company Name" error={errors.companyName}>
                  <input
                    id="contact-company"
                    type="text"
                    autoComplete="organization"
                    value={form.companyName}
                    onChange={handleChange('companyName')}
                    aria-invalid={Boolean(errors.companyName)}
                    aria-describedby={errors.companyName ? 'contact-company-error' : undefined}
                    className={inputClassName}
                  />
                </FormField>

                <FormField id="contact-email" label="Business Email" error={errors.businessEmail}>
                  <input
                    id="contact-email"
                    type="email"
                    autoComplete="email"
                    value={form.businessEmail}
                    onChange={handleChange('businessEmail')}
                    aria-invalid={Boolean(errors.businessEmail)}
                    aria-describedby={errors.businessEmail ? 'contact-email-error' : undefined}
                    className={inputClassName}
                  />
                </FormField>

                <FormField id="contact-message" label="Message / Inquiry" error={errors.message}>
                  <textarea
                    id="contact-message"
                    rows={5}
                    value={form.message}
                    onChange={handleChange('message')}
                    aria-invalid={Boolean(errors.message)}
                    aria-describedby={errors.message ? 'contact-message-error' : undefined}
                    className={`${inputClassName} resize-y`}
                  />
                </FormField>

                <button
                  type="submit"
                  disabled={status === 'sending'}
                  className="flex w-full items-center justify-center gap-2 rounded-lg bg-emerald-500 px-5 py-2.5 text-sm font-semibold text-slate-900 transition hover:bg-emerald-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-300 disabled:cursor-not-allowed disabled:opacity-70"
                >
                  {status === 'sending' && (
                    <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                      />
                    </svg>
                  )}
                  {status === 'sending' ? 'Sending…' : 'Send Message'}
                </button>
              </form>
            </>
          )}
        </section>
      </div>
    </SiteLayout>
  )
}

export default ContactPage
