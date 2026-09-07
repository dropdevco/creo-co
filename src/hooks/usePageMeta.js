import { useEffect } from 'react'

const SITE_NAME = 'Creo & Co.'

function setMetaTag(attr, key, content) {
  let el = document.head.querySelector(`meta[${attr}="${key}"]`)
  if (!el) {
    el = document.createElement('meta')
    el.setAttribute(attr, key)
    document.head.appendChild(el)
  }
  el.setAttribute('content', content)
}

// Sets the document title and description/OG/Twitter meta tags for the
// current route. Restores the previous values on unmount so navigating
// between pages never leaves stale tags from the last page behind.
export function usePageMeta({ title, description }) {
  useEffect(() => {
    const prevTitle = document.title
    const fullTitle = title ? `${title} | ${SITE_NAME}` : document.title
    document.title = fullTitle

    if (description) {
      setMetaTag('name', 'description', description)
      setMetaTag('property', 'og:description', description)
      setMetaTag('name', 'twitter:description', description)
    }
    setMetaTag('property', 'og:title', fullTitle)
    setMetaTag('name', 'twitter:title', fullTitle)

    return () => {
      document.title = prevTitle
    }
  }, [title, description])
}
