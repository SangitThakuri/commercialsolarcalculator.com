import { Link } from 'react-router-dom'
import SiteLayout from '../layouts/SiteLayout.jsx'
import { usePageMeta } from '../hooks/usePageMeta.js'

const TITLE = 'Privacy Policy'
const DESCRIPTION =
  'How Commercial Solar Calculator collects, uses, stores, and protects your personal data, and your rights under GDPR and CCPA.'
const PATH = '/privacy-policy'
const LAST_UPDATED = 'July 10, 2026'

function PrivacyPolicyPage() {
  usePageMeta({
    title: `${TITLE} | Commercial Solar Calculator`,
    description: DESCRIPTION,
    path: PATH,
  })

  return (
    <SiteLayout
      title={TITLE}
      description="How we collect, use, store, and protect your personal data — and your rights under GDPR and CCPA."
      breadcrumbLabel={TITLE}
    >
      <div className="mx-auto max-w-3xl">
        <section className="animate-fade-in-up rounded-2xl bg-white p-6 shadow-lg ring-1 ring-slate-900/5 sm:p-10">
          <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
            Last updated: {LAST_UPDATED}
          </p>

          <div className="prose-legal mt-4 space-y-8 text-sm leading-relaxed text-slate-600">
            <p>
              This Privacy Policy explains how Commercial Solar Calculator
              (&quot;we,&quot; &quot;us,&quot; or &quot;our&quot;) handles personal data in
              connection with your use of commercialsolarcalculator.com and its calculator tools
              (the &quot;Site&quot;). It applies to every calculator page on the Site.
            </p>

            <div>
              <h2 className="text-lg font-bold text-slate-900">1. Who We Are</h2>
              <p className="mt-2">
                Commercial Solar Calculator operates commercialsolarcalculator.com. For any
                privacy question or request described in this policy, reach us via our{' '}
                <Link to="/contact" className="font-semibold text-emerald-600 hover:underline">
                  Contact Form
                </Link>
                .
              </p>
            </div>

            <div>
              <h2 className="text-lg font-bold text-slate-900">2. What Personal Data We Process</h2>
              <p className="mt-2">We process the following categories of data:</p>
              <ul className="mt-3 list-disc space-y-2 pl-5">
                <li>
                  <strong>Calculator inputs.</strong> Your average monthly electric bill, property
                  state/location, state corporate tax rate, and similar figures you enter into a
                  calculator. These are processed entirely in your browser to compute the results
                  displayed on the page and are not transmitted to or stored on our servers.
                </li>
                <li>
                  <strong>Cookie/storage preference.</strong> The choice you make on our cookie
                  consent banner (Accept All or Reject Non-Essential), saved in your browser's
                  local storage so we don't ask again on every visit. See our{' '}
                  <Link to="/cookie-policy" className="font-semibold text-emerald-600 hover:underline">
                    Cookie Policy
                  </Link>{' '}
                  for details.
                </li>
                <li>
                  <strong>Quote-request data (if you use a &quot;Request a Quote&quot; feature).</strong>{' '}
                  Where the Site offers a form to request pricing from a solar installer, we
                  collect the information you voluntarily submit — typically your name, email
                  address, phone number, and property address, plus the utility/system details
                  needed to prepare a quote. This category only applies to pages that include such
                  a form.
                </li>
                <li>
                  <strong>Technical/log data.</strong> Our hosting provider automatically logs
                  standard technical data for every website request (such as IP address, browser
                  type, and request timestamps) for security and operational purposes. We do not
                  use this data to identify you individually.
                </li>
              </ul>
            </div>

            <div>
              <h2 className="text-lg font-bold text-slate-900">3. Legal Basis for Processing</h2>
              <p className="mt-2">Depending on the data and how you interact with the Site, we rely on:</p>
              <ul className="mt-3 list-disc space-y-2 pl-5">
                <li>
                  <strong>Legitimate interest</strong> — to run the calculators themselves, keep
                  the Site secure, and understand aggregate site performance.
                </li>
                <li>
                  <strong>Consent</strong> — for any quote-request / lead-generation form, and for
                  any non-essential analytics or advertising cookies (see our{' '}
                  <Link to="/cookie-policy" className="font-semibold text-emerald-600 hover:underline">
                    Cookie Policy
                  </Link>
                  ). You may withdraw consent at any time; this does not affect processing already
                  carried out based on consent given before withdrawal.
                </li>
                <li>
                  <strong>Contractual necessity</strong> — where submitting a quote request
                  requires us to share your details with an installer partner in order to provide
                  the quote you asked for.
                </li>
              </ul>
            </div>

            <div>
              <h2 className="text-lg font-bold text-slate-900">4. How Data Is Stored</h2>
              <ul className="mt-3 list-disc space-y-2 pl-5">
                <li>
                  Calculator inputs (electric bill, tax rate, system size, and similar figures)
                  live only in your device's memory for the current page view. They are not
                  written to a cookie, to local storage, or to any server-side database today, and
                  they reset when you reload or navigate away.
                </li>
                <li>Your cookie-preference choice is stored in your browser's local storage only.</li>
                <li>
                  Any quote-request submission is stored securely and retained only for as long as
                  necessary to fulfill your request and satisfy our legal/accounting obligations,
                  after which it is deleted or anonymized.
                </li>
              </ul>
            </div>

            <div>
              <h2 className="text-lg font-bold text-slate-900">
                5. Sharing With Solar Installation Partners
              </h2>
              <p className="mt-2">
                We do not sell your personal data. If — and only if — you submit a request for an
                installer quote, we share the details you provided in that form with one or more
                vetted solar installation companies in your area, solely so they can respond to
                your request. We require these partners to handle your data securely and only for
                the purpose of responding to your inquiry. Simply using a calculator on this Site
                does not result in your data being shared with any third party.
              </p>
            </div>

            <div>
              <h2 className="text-lg font-bold text-slate-900">6. Your Rights (GDPR &amp; CCPA)</h2>
              <p className="mt-2">Depending on where you live, you may have the right to:</p>
              <ul className="mt-3 list-disc space-y-2 pl-5">
                <li>
                  <strong>Access</strong> the personal data we hold about you.
                </li>
                <li>
                  <strong>Rectification</strong> of inaccurate or incomplete data.
                </li>
                <li>
                  <strong>Erasure</strong> (&quot;right to be forgotten&quot;) of your personal
                  data.
                </li>
                <li>
                  <strong>Restriction</strong> or objection to certain processing.
                </li>
                <li>
                  <strong>Data portability</strong>, where technically feasible.
                </li>
                <li>
                  <strong>Know and delete</strong> what personal information has been collected
                  about you, and to <strong>opt out of the sale</strong> of personal information —
                  though we note we do not sell personal information.
                </li>
                <li>The right to be free from discrimination for exercising any of these rights.</li>
              </ul>
              <p className="mt-3">
                To exercise any of these rights, reach us via our{' '}
                <Link to="/contact" className="font-semibold text-emerald-600 hover:underline">
                  Contact Form
                </Link>
                . We will respond within the timeframe required by applicable law.
              </p>
            </div>

            <div>
              <h2 className="text-lg font-bold text-slate-900">7. No Financial, Tax, or Legal Advice</h2>
              <p className="mt-2">
                Nothing on this Site, and nothing processed through our calculators, constitutes
                financial, tax, engineering, or legal advice. Calculator outputs are simplified,
                formula-based estimates for general informational purposes only. Always consult a
                qualified tax professional, financial advisor, or licensed solar engineer before
                making an investment decision.
              </p>
            </div>

            <div>
              <h2 className="text-lg font-bold text-slate-900">8. Children's Privacy</h2>
              <p className="mt-2">
                This Site is intended for business and commercial property decision-makers and is
                not directed at children. We do not knowingly collect personal data from children
                under 16.
              </p>
            </div>

            <div>
              <h2 className="text-lg font-bold text-slate-900">9. Changes to This Policy</h2>
              <p className="mt-2">
                We may update this Privacy Policy from time to time. Material changes will be
                reflected by an updated &quot;Last updated&quot; date at the top of this page.
              </p>
            </div>

            <div>
              <h2 className="text-lg font-bold text-slate-900">10. Contact Us</h2>
              <p className="mt-2">
                Questions about this Privacy Policy or your data can be sent via our{' '}
                <Link to="/contact" className="font-semibold text-emerald-600 hover:underline">
                  Contact Form
                </Link>
                .
              </p>
            </div>
          </div>
        </section>
      </div>
    </SiteLayout>
  )
}

export default PrivacyPolicyPage
