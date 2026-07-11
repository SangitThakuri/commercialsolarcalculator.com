import { Link } from 'react-router-dom'
import SiteLayout from '../layouts/SiteLayout.jsx'
import { usePageMeta } from '../hooks/usePageMeta.js'
import { CALCULATOR_PAGES } from '../data/calculatorPages.js'
import { BLOG_POSTS } from '../data/blogPosts.js'

const TITLE = 'Sitemap'
const DESCRIPTION = 'Every page on Commercial Solar Calculator, listed in one place.'
const PATH = '/sitemap'

const COMPANY_LINKS = [
  { path: '/about', label: 'About This Calculator' },
  { path: '/contact', label: 'Contact Us' },
]

const RESOURCE_LINKS = [
  { path: '/blog', label: 'Blog' },
  { path: '/solar-guides', label: 'Solar Guides' },
  { path: '/methodology', label: 'Calculation Methodology' },
  { path: '/faq', label: 'FAQ' },
]

const LEGAL_LINKS = [
  { path: '/privacy-policy', label: 'Privacy Policy' },
  { path: '/terms-of-service', label: 'Terms of Service' },
  { path: '/cookie-policy', label: 'Cookie Policy' },
  { path: '/disclaimer', label: 'Disclaimer' },
]

function SitemapSection({ heading, links }) {
  return (
    <div>
      <h2 className="text-xs font-semibold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
        {heading}
      </h2>
      <ul className="mt-3 space-y-2">
        {links.map((link) => (
          <li key={link.path}>
            <Link
              to={link.path}
              className="text-sm text-slate-600 transition hover:text-emerald-600 dark:text-slate-300 dark:hover:text-emerald-400"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

function SitemapPage() {
  usePageMeta({
    title: `${TITLE} | Commercial Solar Calculator`,
    description: DESCRIPTION,
    path: PATH,
  })

  const calculatorLinks = CALCULATOR_PAGES.map((page) => ({ path: page.path, label: page.label }))
  const blogLinks = [
    { path: '/blog', label: 'Blog Index' },
    ...BLOG_POSTS.map((post) => ({ path: `/blog/${post.slug}`, label: post.title })),
  ]

  return (
    <SiteLayout
      title={TITLE}
      description="A full, unfiltered list of every page on this site."
      breadcrumbLabel={TITLE}
    >
      <div className="mx-auto max-w-5xl">
        <section className="animate-fade-in-up rounded-2xl bg-white p-6 shadow-lg ring-1 ring-slate-900/5 dark:bg-slate-800 dark:ring-white/10 sm:p-10">
          <div className="grid grid-cols-1 gap-x-10 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
            <SitemapSection heading="Calculators" links={calculatorLinks} />
            <SitemapSection heading="Resources" links={RESOURCE_LINKS} />
            <SitemapSection heading="Blog Articles" links={blogLinks} />
            <SitemapSection heading="Legal" links={LEGAL_LINKS} />
            <SitemapSection heading="Company" links={COMPANY_LINKS} />
          </div>
        </section>
      </div>
    </SiteLayout>
  )
}

export default SitemapPage
