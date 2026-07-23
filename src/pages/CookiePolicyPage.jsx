import { Link } from 'react-router-dom'
import SiteLayout from '../layouts/SiteLayout.jsx'
import { usePageMeta } from '../hooks/usePageMeta.js'
import { buildBreadcrumbJsonLd } from '../utils/seo.js'

const TITLE = 'Cookie Policy'
const DESCRIPTION =
  'What cookies and local storage Commercial Solar Calculator uses, why, and how to manage or block them in your browser.'
const PATH = '/cookie-policy'
const LAST_UPDATED = 'July 22, 2026'

function CookiePolicyPage() {
  usePageMeta({
    title: `${TITLE} | Commercial Solar Calculator`,
    description: DESCRIPTION,
    path: PATH,
    jsonLd: [buildBreadcrumbJsonLd(PATH, TITLE)],
  })

  return (
    <SiteLayout
      title={TITLE}
      description="What cookies and local storage we use, why, and how to manage or block them."
      breadcrumbLabel={TITLE}
    >
      <div className="mx-auto max-w-3xl">
        <section className="animate-fade-in-up rounded-2xl bg-white p-6 shadow-lg ring-1 ring-slate-900/5 dark:bg-slate-800 dark:ring-white/10 sm:p-10">
          <p className="text-xs font-medium uppercase tracking-wide text-slate-400 dark:text-slate-500">
            Last updated: {LAST_UPDATED}
          </p>

          <div className="mt-4 space-y-8 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
            <p>
              This Cookie Policy explains how Commercial Solar Calculator uses cookies and similar
              browser storage technologies on commercialsolarcalculator.com, and how you can
              control them. It should be read alongside our{' '}
              <Link to="/privacy-policy" className="font-semibold text-emerald-600 hover:underline">
                Privacy Policy
              </Link>
              .
            </p>

            <div>
              <h2 className="text-lg font-bold text-slate-900 dark:text-white">
                1. What Are Cookies and Local Storage?
              </h2>
              <p className="mt-2">
                A <strong>cookie</strong> is a small text file a website can ask your browser to
                store, then read back on later visits. <strong>Local storage</strong> is a similar
                browser feature that also saves small pieces of data on your device, but — unlike
                a cookie — it is not automatically sent to a server with every request; it is only
                read by the website's own code, in your browser. This Site currently relies on
                local storage rather than tracking cookies for the one thing it remembers about
                you (see Section 2).
              </p>
            </div>

            <div>
              <h2 className="text-lg font-bold text-slate-900 dark:text-white">
                2. Strictly Necessary Storage We Use
              </h2>
              <p className="mt-2">
                These are essential to how the Site functions and cannot be switched off in our
                systems. Rejecting non-essential cookies in our banner does not affect these.
              </p>
              <div className="mt-3 overflow-x-auto rounded-lg border border-slate-200 dark:border-slate-700">
                <table className="w-full min-w-[480px] text-left text-xs">
                  <thead className="bg-slate-50 dark:bg-slate-900/60 text-slate-500 dark:text-slate-400">
                    <tr>
                      <th className="px-3 py-2 font-semibold">Name</th>
                      <th className="px-3 py-2 font-semibold">Purpose</th>
                      <th className="px-3 py-2 font-semibold">Duration</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 dark:divide-slate-700">
                    <tr>
                      <td className="px-3 py-2 font-mono text-[11px]">cookie-consent-preference</td>
                      <td className="px-3 py-2">
                        Remembers your Accept All / Reject Non-Essential choice so the consent
                        banner doesn't reappear on every visit.
                      </td>
                      <td className="px-3 py-2">Until you clear your browser storage</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p className="mt-3">
                <strong>About your calculator inputs specifically:</strong> figures you type into
                a calculator (electric bill, tax rate, system size, and similar) are held only in
                your browser's working memory for the current page view. They are not currently
                written to a cookie or to local storage, so reloading the page or navigating to
                another calculator will reset them.
              </p>
            </div>

            <div>
              <h2 className="text-lg font-bold text-slate-900 dark:text-white">
                3. Analytics Cookies (Non-Essential)
              </h2>
              <p className="mt-2">
                We use <strong>Google Analytics (GA4)</strong> to understand aggregate traffic —
                which pages are visited, how many people arrive from search versus a direct link,
                and similar site-usage patterns. It is loaded only after you click{' '}
                &quot;Accept All&quot; on our cookie banner; if you click &quot;Reject
                Non-Essential&quot; or make no choice, Google Analytics never loads and sets no
                cookies.
              </p>
              <div className="mt-3 overflow-x-auto rounded-lg border border-slate-200 dark:border-slate-700">
                <table className="w-full min-w-[480px] text-left text-xs">
                  <thead className="bg-slate-50 dark:bg-slate-900/60 text-slate-500 dark:text-slate-400">
                    <tr>
                      <th className="px-3 py-2 font-semibold">Name</th>
                      <th className="px-3 py-2 font-semibold">Purpose</th>
                      <th className="px-3 py-2 font-semibold">Duration</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 dark:divide-slate-700">
                    <tr>
                      <td className="px-3 py-2 font-mono text-[11px]">_ga</td>
                      <td className="px-3 py-2">Distinguishes unique visitors for Google Analytics.</td>
                      <td className="px-3 py-2">2 years</td>
                    </tr>
                    <tr>
                      <td className="px-3 py-2 font-mono text-[11px]">_ga_*</td>
                      <td className="px-3 py-2">
                        Persists Google Analytics session state (GA4 property-specific cookie).
                      </td>
                      <td className="px-3 py-2">2 years</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p className="mt-3">
                Google Analytics data is processed by Google under its own privacy terms; we do
                not control what Google does with it beyond the reporting we configure. We do not
                use this data to identify you individually, and we do not combine it with any
                calculator input you enter (those never leave your browser — see Section 2).
              </p>
            </div>

            <div>
              <h2 className="text-lg font-bold text-slate-900 dark:text-white">
                4. Advertising Cookies (Non-Essential)
              </h2>
              <p className="mt-2">
                <strong>As of the date at the top of this page, this Site does not load Google
                Ads remarketing tags, the Meta Pixel, or any other advertising/marketing
                cookie.</strong> If we introduce any of these in the future, they will only load
                after you click &quot;Accept All&quot; on our cookie banner, and this section will
                be updated first to describe what's added and what data it collects.
              </p>
            </div>

            <div>
              <h2 className="text-lg font-bold text-slate-900 dark:text-white">5. Managing Your Cookie Choice</h2>
              <p className="mt-2">
                When you first visit, our cookie banner lets you choose <strong>Accept All</strong>{' '}
                or <strong>Reject Non-Essential</strong> — both options are equally easy to select,
                and neither is pre-selected for you. You can change your mind at any time by
                clearing this site's data in your browser (see Section 6), which will bring the
                banner back on your next visit.
              </p>
            </div>

            <div>
              <h2 className="text-lg font-bold text-slate-900 dark:text-white">
                6. Blocking or Deleting Cookies via Your Browser
              </h2>
              <p className="mt-2">
                Every major browser lets you view, block, or delete cookies and site data,
                typically from a <strong>Privacy</strong> or <strong>Privacy &amp; Security</strong>{' '}
                section of its settings:
              </p>
              <ul className="mt-3 list-disc space-y-2 pl-5">
                <li>
                  <strong>Chrome:</strong> Settings → Privacy and security → Cookies and other site
                  data.
                </li>
                <li>
                  <strong>Safari:</strong> Settings → Privacy → Manage Website Data.
                </li>
                <li>
                  <strong>Firefox:</strong> Settings → Privacy &amp; Security → Cookies and Site
                  Data.
                </li>
                <li>
                  <strong>Edge:</strong> Settings → Cookies and site permissions → Manage and
                  delete cookies and site data.
                </li>
              </ul>
              <p className="mt-3">
                Blocking all cookies and local storage may prevent the Site from remembering your
                cookie-banner choice, but will not prevent any calculator from working, since
                calculator inputs are not stored in cookies today.
              </p>
            </div>

            <div>
              <h2 className="text-lg font-bold text-slate-900 dark:text-white">7. Updates to This Policy</h2>
              <p className="mt-2">
                We may update this Cookie Policy as the Site's use of cookies and local storage
                changes. Material changes — such as adding an analytics or advertising cookie —
                will be reflected here with an updated &quot;Last updated&quot; date before that
                cookie is set.
              </p>
            </div>

            <div>
              <h2 className="text-lg font-bold text-slate-900 dark:text-white">8. Contact Us</h2>
              <p className="mt-2">
                Questions about this Cookie Policy can be sent via our{' '}
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

export default CookiePolicyPage
