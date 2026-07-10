import { useRef } from 'react'
import { Link, useParams } from 'react-router-dom'
import { Clock } from 'lucide-react'
import SiteLayout from '../layouts/SiteLayout.jsx'
import ArticleCard from '../components/blog/ArticleCard.jsx'
import CalculatorBadge from '../components/blog/CalculatorBadge.jsx'
import ArticleIllustration from '../components/blog/ArticleIllustration.jsx'
import ReadingProgressBar from '../components/blog/ReadingProgressBar.jsx'
import { usePageMeta } from '../hooks/usePageMeta.js'
import { buildArticleBreadcrumbJsonLd, buildArticleJsonLd, buildFaqJsonLd } from '../utils/seo.js'
import { getPostBySlug, getRelatedPosts } from '../data/blogPosts.js'
import { formatBlogDate } from '../utils/formatDate.js'

function ArticleNotFound() {
  return (
    <SiteLayout
      title="Article Not Found"
      description="This article doesn't exist or may have moved."
      breadcrumbLabel="Article Not Found"
      breadcrumbParent={{ label: 'Blog', path: '/blog' }}
    >
      <div className="mx-auto max-w-2xl rounded-2xl border border-dashed border-slate-300 p-12 text-center dark:border-slate-700">
        <p className="text-lg font-semibold text-slate-900 dark:text-white">
          We couldn't find that article.
        </p>
        <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
          It may have been renamed or moved. Browse everything we've published instead.
        </p>
        <Link
          to="/blog"
          className="mt-6 inline-block rounded-lg bg-emerald-500 px-5 py-2.5 text-sm font-semibold text-slate-900 transition hover:bg-emerald-400"
        >
          Back to Blog
        </Link>
      </div>
    </SiteLayout>
  )
}

function BlogArticlePage() {
  const { slug } = useParams()
  const post = getPostBySlug(slug)
  const articleRef = useRef(null)

  const path = `/blog/${slug}`
  const jsonLd = post
    ? [
        buildArticleJsonLd({
          path,
          title: post.title,
          description: post.excerpt,
          publishDate: post.publishDate,
          author: post.author,
        }),
        buildArticleBreadcrumbJsonLd(path, post.title),
        ...(post.faq ? [buildFaqJsonLd(post.faq.map((f) => ({ question: f.question, answer: f.answer })))] : []),
      ]
    : undefined

  usePageMeta({
    title: post ? `${post.title} | Commercial Solar Calculator Blog` : 'Article Not Found',
    description: post?.excerpt ?? 'This article could not be found.',
    path,
    jsonLd,
  })

  if (!post) return <ArticleNotFound />

  const relatedPosts = getRelatedPosts(post)

  return (
    <SiteLayout
      title={post.title}
      description={post.excerpt}
      breadcrumbLabel={post.title}
      breadcrumbParent={{ label: 'Blog', path: '/blog' }}
    >
      <ReadingProgressBar targetRef={articleRef} />

      <div ref={articleRef} className="mx-auto max-w-3xl">
        <article className="animate-fade-in-up overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-lg dark:border-slate-700 dark:bg-slate-800">
          <div className="aspect-[16/9] w-full">
            <ArticleIllustration variant={post.illustration} />
          </div>

          <div className="p-6 sm:p-10">
            <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500 dark:text-slate-400">
              <span className="rounded-full bg-emerald-100 px-2.5 py-1 font-semibold uppercase tracking-wide text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-400">
                {post.category}
              </span>
              <span>{formatBlogDate(post.publishDate)}</span>
              <span className="flex items-center gap-1">
                <Clock className="h-3.5 w-3.5" aria-hidden="true" />
                {post.readingTimeMinutes} min read
              </span>
              <span>By {post.author}</span>
            </div>

            <h1 className="mt-4 text-2xl font-bold leading-tight text-slate-900 dark:text-white sm:text-3xl">
              {post.title}
            </h1>

            <div className="prose-article mt-6 space-y-6">
              {post.sections.map((section, index) => (
                <div key={section.heading ?? index}>
                  {section.heading && (
                    <h2 className="text-lg font-bold text-slate-900 dark:text-white">{section.heading}</h2>
                  )}
                  {section.paragraphs.map((paragraph, paragraphIndex) => (
                    <p
                      key={paragraphIndex}
                      className="mt-3 text-sm leading-relaxed text-slate-600 dark:text-slate-300"
                    >
                      {paragraph}
                    </p>
                  ))}
                </div>
              ))}
            </div>

            {post.faq && (
              <div className="mt-8 border-t border-slate-200 pt-6 dark:border-slate-700">
                <h2 className="text-lg font-bold text-slate-900 dark:text-white">Frequently Asked Questions</h2>
                <div className="mt-4 space-y-4">
                  {post.faq.map((item) => (
                    <div key={item.question}>
                      <p className="text-sm font-semibold text-slate-800 dark:text-slate-200">{item.question}</p>
                      <p className="mt-1 text-sm leading-relaxed text-slate-600 dark:text-slate-400">
                        {item.answer}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {post.relatedCalculatorPaths?.length > 0 && (
              <div className="mt-8 rounded-xl bg-slate-50 p-5 dark:bg-slate-900/40">
                <p className="text-sm font-semibold text-slate-900 dark:text-white">Related Calculators</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {post.relatedCalculatorPaths.map((calcPath) => (
                    <CalculatorBadge key={calcPath} path={calcPath} />
                  ))}
                </div>
              </div>
            )}
          </div>
        </article>

        {relatedPosts.length > 0 && (
          <section aria-label="You may also like" className="mt-12">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">You May Also Like</h2>
            <div className="mt-4 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {relatedPosts.map((relatedPost) => (
                <ArticleCard key={relatedPost.slug} post={relatedPost} />
              ))}
            </div>
          </section>
        )}
      </div>
    </SiteLayout>
  )
}

export default BlogArticlePage
