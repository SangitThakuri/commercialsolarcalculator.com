import { useEffect } from 'react'

const SITE_URL = 'https://www.commercialsolarcalculator.com'

function upsertMetaByName(name, content) {
  let tag = document.querySelector(`meta[name="${name}"]`)
  if (!tag) {
    tag = document.createElement('meta')
    tag.setAttribute('name', name)
    document.head.appendChild(tag)
  }
  tag.setAttribute('content', content)
}

function upsertMetaByProperty(property, content) {
  let tag = document.querySelector(`meta[property="${property}"]`)
  if (!tag) {
    tag = document.createElement('meta')
    tag.setAttribute('property', property)
    document.head.appendChild(tag)
  }
  tag.setAttribute('content', content)
}

function upsertCanonical(href) {
  let tag = document.querySelector('link[rel="canonical"]')
  if (!tag) {
    tag = document.createElement('link')
    tag.setAttribute('rel', 'canonical')
    document.head.appendChild(tag)
  }
  tag.setAttribute('href', href)
}

/**
 * Client-side per-route document head manager for this SPA. Google renders JS before
 * indexing, so this keeps title/description/canonical/schema accurate per page. It does
 * NOT help non-JS consumers (social link unfurlers, some legacy crawlers) — those will see
 * index.html's static homepage tags until the route's JS runs.
 */
export function usePageMeta({ title, description, path = '/', jsonLd }) {
  useEffect(() => {
    const url = `${SITE_URL}${path}`

    document.title = title
    upsertMetaByName('description', description)
    upsertCanonical(url)
    upsertMetaByProperty('og:title', title)
    upsertMetaByProperty('og:description', description)
    upsertMetaByProperty('og:url', url)
    upsertMetaByName('twitter:title', title)
    upsertMetaByName('twitter:description', description)

    let script
    if (jsonLd) {
      script = document.createElement('script')
      script.type = 'application/ld+json'
      script.id = 'page-jsonld'
      script.textContent = JSON.stringify(jsonLd)
      document.head.appendChild(script)
    }

    return () => {
      if (script) script.remove()
    }
  }, [title, description, path, jsonLd])
}

export { SITE_URL }
