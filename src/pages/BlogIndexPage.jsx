import { useMemo, useState } from 'react'
import SiteLayout from '../layouts/SiteLayout.jsx'
import ArticleCard from '../components/blog/ArticleCard.jsx'
import BlogFilters from '../components/blog/BlogFilters.jsx'
import { usePageMeta } from '../hooks/usePageMeta.js'
import { BLOG_POSTS } from '../data/blogPosts.js'
import { buildBreadcrumbJsonLd } from '../utils/seo.js'

const TITLE = 'Commercial Solar Blog'
const DESCRIPTION =
  'Practical guides on commercial solar ROI, tax credits, MACRS depreciation, financing, and system design — written in plain English.'
const PATH = '/blog'

function BlogIndexPage() {
  usePageMeta({
    title: `${TITLE} | Commercial Solar Calculator`,
    description: DESCRIPTION,
    path: PATH,
    jsonLd: [buildBreadcrumbJsonLd(PATH, TITLE)],
  })

  const [activeCategory, setActiveCategory] = useState(null)
  const [searchTerm, setSearchTerm] = useState('')

  const [featuredPost, ...restPosts] = BLOG_POSTS

  const filteredPosts = useMemo(() => {
    const normalizedSearch = searchTerm.trim().toLowerCase()

    return restPosts.filter((post) => {
      const matchesCategory = !activeCategory || post.category === activeCategory
      const matchesSearch =
        !normalizedSearch ||
        post.title.toLowerCase().includes(normalizedSearch) ||
        post.excerpt.toLowerCase().includes(normalizedSearch)
      return matchesCategory && matchesSearch
    })
  }, [restPosts, activeCategory, searchTerm])

  return (
    <SiteLayout
      title={TITLE}
      description="Practical, plain-English guides on commercial solar ROI, tax credits, depreciation, financing, and system design."
      breadcrumbLabel="Blog"
    >
      <div className="mx-auto max-w-6xl">
        <section aria-label="Featured article" className="animate-fade-in-up">
          <h2 className="text-xs font-semibold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
            Featured
          </h2>
          <div className="mt-3">
            <ArticleCard post={featuredPost} featured />
          </div>
        </section>

        <section aria-label="All articles" className="mt-12">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">Latest Articles</h2>
          </div>

          <div className="mt-4">
            <BlogFilters
              activeCategory={activeCategory}
              onCategoryChange={setActiveCategory}
              searchTerm={searchTerm}
              onSearchChange={setSearchTerm}
            />
          </div>

          {filteredPosts.length > 0 ? (
            <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {filteredPosts.map((post) => (
                <ArticleCard key={post.slug} post={post} />
              ))}
            </div>
          ) : (
            <div className="mt-6 rounded-2xl border border-dashed border-slate-300 p-12 text-center dark:border-slate-700">
              <p className="text-sm font-medium text-slate-600 dark:text-slate-300">
                No articles match &quot;{searchTerm}&quot;{activeCategory ? ` in ${activeCategory}` : ''}.
              </p>
              <button
                type="button"
                onClick={() => {
                  setActiveCategory(null)
                  setSearchTerm('')
                }}
                className="mt-3 text-sm font-semibold text-emerald-600 hover:underline dark:text-emerald-400"
              >
                Clear filters
              </button>
            </div>
          )}
        </section>
      </div>
    </SiteLayout>
  )
}

export default BlogIndexPage
