import { Link } from 'react-router-dom'
import { Clock } from 'lucide-react'
import ArticleIllustration from './ArticleIllustration.jsx'
import CalculatorBadge from './CalculatorBadge.jsx'
import { formatBlogDate } from '../../utils/formatDate.js'
import { CATEGORY_COLORS } from '../../data/blogCategories.js'

const BADGE_COLOR_CLASSES = {
  emerald: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-400',
  amber: 'bg-amber-100 text-amber-700 dark:bg-amber-500/15 dark:text-amber-400',
  sky: 'bg-sky-100 text-sky-700 dark:bg-sky-500/15 dark:text-sky-400',
  indigo: 'bg-indigo-100 text-indigo-700 dark:bg-indigo-500/15 dark:text-indigo-400',
  teal: 'bg-teal-100 text-teal-700 dark:bg-teal-500/15 dark:text-teal-400',
}

// Note: the card intentionally is NOT one big <Link> wrapping everything — the calculator
// badges below are their own real links, and nesting <a> inside <a> is invalid HTML that
// breaks click behavior in browsers. Instead, the image/title area and the "Read More"
// line are each their own link to the same article.
function ArticleCard({ post, featured = false }) {
  const badgeClass = BADGE_COLOR_CLASSES[CATEGORY_COLORS[post.category]] ?? BADGE_COLOR_CLASSES.emerald
  const href = `/blog/${post.slug}`

  return (
    <article
      className={`group flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl dark:border-slate-700 dark:bg-slate-800 ${
        featured ? 'sm:flex-row' : ''
      }`}
    >
      <Link
        to={href}
        className={`block aspect-[16/9] w-full overflow-hidden ${featured ? 'sm:aspect-auto sm:w-2/5' : ''}`}
        tabIndex={-1}
        aria-hidden="true"
      >
        <div className="h-full w-full transition-transform duration-500 group-hover:scale-105">
          <ArticleIllustration variant={post.illustration} />
        </div>
      </Link>

      <div className="flex flex-1 flex-col p-5">
        <div className="flex flex-wrap items-center gap-2">
          <span className={`rounded-full px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide ${badgeClass}`}>
            {post.category}
          </span>
          <span className="text-xs text-slate-400 dark:text-slate-500">{formatBlogDate(post.publishDate)}</span>
          <span className="flex items-center gap-1 text-xs text-slate-400 dark:text-slate-500">
            <Clock className="h-3 w-3" aria-hidden="true" />
            {post.readingTimeMinutes} min read
          </span>
        </div>

        <Link to={href} className="group/title">
          <h3
            className={`mt-3 font-bold leading-snug text-slate-900 transition group-hover/title:text-emerald-600 dark:text-white dark:group-hover/title:text-emerald-400 ${
              featured ? 'text-2xl' : 'text-lg'
            }`}
          >
            {post.title}
          </h3>
        </Link>

        <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-600 dark:text-slate-400">{post.excerpt}</p>

        {post.relatedCalculatorPaths?.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-1.5">
            {post.relatedCalculatorPaths.slice(0, 2).map((path) => (
              <CalculatorBadge key={path} path={path} />
            ))}
          </div>
        )}

        <div className="mt-4 flex items-center justify-between border-t border-slate-100 pt-4 dark:border-slate-700/60">
          <span className="text-xs font-medium text-slate-500 dark:text-slate-400">By {post.author}</span>
          <Link
            to={href}
            className="text-sm font-semibold text-emerald-600 transition hover:underline dark:text-emerald-400"
          >
            Read More →
          </Link>
        </div>
      </div>
    </article>
  )
}

export default ArticleCard
