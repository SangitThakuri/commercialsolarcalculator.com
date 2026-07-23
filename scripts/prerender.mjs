// Runs after `vite build`. This is a pure client-rendered SPA with no server, so every route
// serves the exact same dist/index.html by default (via public/_redirects' SPA fallback rule) —
// meaning any crawler or link-unfurler that doesn't execute JavaScript (social previews on
// Slack/iMessage/LinkedIn, some legacy bots, most AI-answer-engine crawlers) sees the homepage's
// title/description/image no matter which page was actually shared.
//
// This script writes a real dist/<path>/index.html for every route, each with that route's own
// title/description/canonical/OG/Twitter tags and JSON-LD baked in statically. The <body> and
// script tags are left untouched, so the SPA still mounts normally and client-side navigation
// (and usePageMeta) works exactly as before — this only fixes the *first* HTML response.
//
// Title/description copy below is transcribed directly from each page's own TITLE/DESCRIPTION
// consts so it stays accurate — if you change a page's copy, update its entry here too.

import { readFile, writeFile, mkdir } from 'node:fs/promises'
import { fileURLToPath } from 'node:url'
import path from 'node:path'
import {
  buildToolJsonLd,
  buildBreadcrumbJsonLd,
  buildArticleJsonLd,
  buildArticleBreadcrumbJsonLd,
  buildFaqJsonLd,
} from '../src/utils/seo.js'
import { CALCULATOR_PAGES } from '../src/data/calculatorPages.js'
import { BLOG_POSTS } from '../src/data/blogPosts.js'
import { FAQ_ITEMS } from '../src/data/faqItems.js'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const DIST_DIR = path.join(__dirname, '..', 'dist')
const SITE_URL = 'https://www.commercialsolarcalculator.com'

const SIMPLE_PAGES = [
  {
    path: '/privacy-policy',
    title: 'Privacy Policy',
    description:
      'How Commercial Solar Calculator collects, uses, stores, and protects your personal data, and your rights under GDPR and CCPA.',
  },
  {
    path: '/cookie-policy',
    title: 'Cookie Policy',
    description:
      'What cookies and local storage Commercial Solar Calculator uses, why, and how to manage or block them in your browser.',
  },
  {
    path: '/contact',
    title: 'Contact Us',
    description:
      'Get in touch with the Commercial Solar Calculator team — questions, feedback, or partnership inquiries.',
  },
  {
    path: '/faq',
    title: 'Frequently Asked Questions',
    description:
      'Answers to common questions about the federal solar Investment Tax Credit, MACRS depreciation, utility rate inflation, and bonus tax credit adders.',
  },
  {
    path: '/methodology',
    title: 'Calculation Methodology',
    description:
      'How every figure on Commercial Solar Calculator is derived: system sizing, gross cost, the federal ITC, MACRS depreciation, net capital, payback period, and the 25-year cash flow projection.',
  },
  {
    path: '/terms-of-service',
    title: 'Terms of Service',
    description:
      'The terms that govern your use of Commercial Solar Calculator: informational-use-only scope, no warranty, limitation of liability, and third-party advertising.',
  },
  {
    path: '/disclaimer',
    title: 'Disclaimer',
    description:
      'Commercial Solar Calculator provides estimates for informational purposes only and does not constitute tax, legal, engineering, or financial advice.',
  },
  {
    path: '/about',
    title: 'About This Calculator',
    description:
      'What Commercial Solar Calculator is, why it exists, and how its calculation methodology stays transparent.',
  },
  {
    path: '/calculators',
    title: 'All Commercial Solar Calculators',
    description:
      'Every free commercial solar calculator on this site in one place: ROI, payback, system sizing, financing, tax credits, and energy analysis tools.',
  },
  {
    path: '/solar-guides',
    title: 'Solar Guides',
    description:
      'A plain-English reference guide to commercial solar: the federal ITC, MACRS depreciation, payback period, system sizing, demand charges, and the most common mistakes businesses make.',
  },
  {
    path: '/sitemap',
    title: 'Sitemap',
    description: 'Every page on Commercial Solar Calculator, listed in one place.',
  },
  {
    path: '/blog',
    title: 'Commercial Solar Blog',
    description:
      'Practical guides on commercial solar ROI, tax credits, MACRS depreciation, financing, and system design — written in plain English.',
  },
]

// The real per-page DESCRIPTION copy (richer than CALCULATOR_PAGES' short sidebar subtitle),
// transcribed from each page's own const so search snippets match what the live page shows.
const CALCULATOR_DESCRIPTIONS = {
  '/commercial-solar-roi-calculator':
    'Calculate your total 25-year commercial solar ROI and annualized rate of return, factoring in the Section 48E tax credit and MACRS depreciation.',
  '/solar-payback-calculator':
    'Calculate your commercial solar payback period — both simple payback and discounted payback accounting for the time value of money.',
  '/solar-panel-size-calculator':
    'Estimate the commercial solar system size, panel count, and roof area you need based on your average monthly electric bill.',
  '/battery-storage-calculator':
    'Estimate the battery capacity and cost needed to keep your business running during a power outage, sized from your critical load and desired backup time.',
  '/solar-loan-calculator':
    'Calculate your monthly payment, total interest, and full amortization schedule for a commercial solar loan.',
  '/solar-lease-calculator':
    'Compare a commercial solar lease or PPA against owning your system outright — monthly savings, who keeps the tax credit, and total cost.',
  '/commercial-electricity-cost-calculator':
    'Calculate your effective electricity rate and project your 25-year electricity cost at current utility inflation trends — no solar required.',
  '/solar-tax-credit-calculator':
    'Calculate your Section 48E federal solar Investment Tax Credit and 5-Year MACRS depreciation tax shield from your system cost.',
  '/solar-savings-calculator':
    'Calculate how much your business will save on electricity with commercial solar — year one, 25-year total, and average monthly savings.',
  '/carbon-savings-calculator':
    'Estimate the CO2 emissions your business avoids by going solar, using EPA eGRID grid emissions factors — for ESG and sustainability reporting.',
  '/commercial-solar-cost-calculator':
    'Estimate your total commercial solar installation cost and see the per-component breakdown — panels, inverters, racking, labor, and soft costs.',
  '/solar-investment-calculator':
    'Run a full discounted cash flow analysis on your commercial solar investment — net present value (NPV) and internal rate of return (IRR).',
  '/commercial-demand-charge-calculator':
    'Calculate your monthly and annual demand charges from peak kW draw, and see how much battery peak-shaving could save.',
  '/solar-financing-calculator':
    'Compare cash purchase, a solar loan, and a solar lease side by side — upfront cost, monthly cash flow, and who keeps the tax benefits.',
  '/commercial-ev-charging-calculator':
    'Estimate installed cost, daily revenue, and payback period for adding commercial EV charging stations to your property.',
  '/roof-space-calculator':
    'Enter your roof dimensions to estimate how many solar panels fit, the resulting system size, and how much of your electric bill it could offset.',
}

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

function replaceTag(html, regex, replacement) {
  if (!regex.test(html)) {
    throw new Error(`Prerender template mismatch — pattern not found: ${regex}`)
  }
  return html.replace(regex, replacement)
}

function renderRoute(template, { routePath, title, description, jsonLd }) {
  const fullTitle = `${title} | Commercial Solar Calculator`
  const url = `${SITE_URL}${routePath}`
  const safeTitle = escapeHtml(fullTitle)
  const safeDescription = escapeHtml(description)

  let html = template
  html = replaceTag(html, /<title>.*?<\/title>/s, `<title>${safeTitle}</title>`)
  html = replaceTag(
    html,
    /<meta\s+name="description"[\s\S]*?\/>/,
    `<meta name="description" content="${safeDescription}" />`,
  )
  html = replaceTag(
    html,
    /<link\s+rel="canonical"[\s\S]*?\/>/,
    `<link rel="canonical" href="${url}" />`,
  )
  html = replaceTag(
    html,
    /<meta\s+property="og:title"[\s\S]*?\/>/,
    `<meta property="og:title" content="${safeTitle}" />`,
  )
  html = replaceTag(
    html,
    /<meta\s+property="og:description"[\s\S]*?\/>/,
    `<meta property="og:description" content="${safeDescription}" />`,
  )
  html = replaceTag(
    html,
    /<meta\s+property="og:url"[\s\S]*?\/>/,
    `<meta property="og:url" content="${url}" />`,
  )
  html = replaceTag(
    html,
    /<meta\s+name="twitter:title"[\s\S]*?\/>/,
    `<meta name="twitter:title" content="${safeTitle}" />`,
  )
  html = replaceTag(
    html,
    /<meta\s+name="twitter:description"[\s\S]*?\/>/,
    `<meta name="twitter:description" content="${safeDescription}" />`,
  )

  if (jsonLd && jsonLd.length > 0) {
    const script = `    <script type="application/ld+json" id="page-jsonld">\n${JSON.stringify(jsonLd)}\n    </script>\n  </head>`
    html = html.replace(/<\/head>/, script)
  }

  return html
}

async function writeRoute(template, route) {
  const html = renderRoute(template, route)
  // Cloudflare Pages serves "/foo" directly from "foo.html" with no redirect, but a nested
  // "foo/index.html" gets 308-redirected from "/foo" to "/foo/" — which would silently turn
  // every internal link and canonical URL on the site into an extra redirect hop. Flat files
  // avoid that entirely.
  const outFile = path.join(DIST_DIR, `${route.routePath}.html`)
  await mkdir(path.dirname(outFile), { recursive: true })
  await writeFile(outFile, html, 'utf-8')
}

async function main() {
  const template = await readFile(path.join(DIST_DIR, 'index.html'), 'utf-8')
  let count = 0

  for (const page of SIMPLE_PAGES) {
    const jsonLd =
      page.path === '/faq'
        ? [buildFaqJsonLd(FAQ_ITEMS.map((item) => ({ question: item.question, answer: item.answer })))]
        : [buildBreadcrumbJsonLd(page.path, page.title)]
    await writeRoute(template, {
      routePath: page.path,
      title: page.title,
      description: page.description,
      jsonLd,
    })
    count += 1
  }

  for (const calc of CALCULATOR_PAGES) {
    if (calc.path === '/') continue // homepage is dist/index.html itself, handled separately
    const title = calc.label
    const description = CALCULATOR_DESCRIPTIONS[calc.path] ?? calc.subtitle
    await writeRoute(template, {
      routePath: calc.path,
      title,
      description,
      jsonLd: [
        buildToolJsonLd({ path: calc.path, name: title, description }),
        buildBreadcrumbJsonLd(calc.path, title),
      ],
    })
    count += 1
  }

  for (const post of BLOG_POSTS) {
    const routePath = `/blog/${post.slug}`
    const jsonLd = [
      buildArticleJsonLd({
        path: routePath,
        title: post.title,
        description: post.excerpt,
        publishDate: post.publishDate,
        author: post.author,
      }),
      buildArticleBreadcrumbJsonLd(routePath, post.title),
      ...(post.faq
        ? [buildFaqJsonLd(post.faq.map((f) => ({ question: f.question, answer: f.answer })))]
        : []),
    ]
    await writeRoute(template, {
      routePath,
      title: post.title,
      description: post.excerpt,
      jsonLd,
    })
    count += 1
  }

  // Homepage: dist/index.html already has correct static title/description/canonical/OG from
  // the source index.html — just add its JSON-LD (WebApplication/FinancialCalculator + FAQPage,
  // mirrored from HOME_JSON_LD in src/pages/HomePage.jsx) so it's present without JS too.
  const homeJsonLd = [
    {
      '@context': 'https://schema.org',
      '@type': ['WebApplication', 'FinancialCalculator'],
      name: 'Commercial Solar Calculator',
      url: `${SITE_URL}/`,
      description:
        'Calculate corporate solar ROI using live U.S. tax rules. Estimate system sizing, Section 48E Investment Tax Credits (ITC), and 5-Year MACRS depreciation.',
      applicationCategory: 'FinanceApplication',
      operatingSystem: 'Any',
      browserRequirements: 'Requires JavaScript',
      isAccessibleForFree: true,
      offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
      featureList: [
        'Business solar payback analytics',
        'Clean energy modeling',
        'Investment metrics and net capital projections',
        'Section 48E Investment Tax Credit (ITC) calculations',
        '5-Year MACRS accelerated depreciation modeling',
        '25-year cumulative cash flow visualization',
      ],
      about: { '@type': 'Thing', name: 'Commercial Solar Investment Analysis' },
      audience: {
        '@type': 'BusinessAudience',
        audienceType: 'Commercial and Corporate Property Owners',
      },
    },
  ]
  const homeHtml = template.replace(
    /<\/head>/,
    `    <script type="application/ld+json" id="page-jsonld">\n${JSON.stringify(homeJsonLd)}\n    </script>\n  </head>`,
  )
  await writeFile(path.join(DIST_DIR, 'index.html'), homeHtml, 'utf-8')

  console.log(`Prerendered ${count} routes + homepage JSON-LD.`)
}

main().catch((error) => {
  console.error('Prerender failed:', error)
  process.exit(1)
})
