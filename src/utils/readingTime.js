const WORDS_PER_MINUTE = 200

// Computed from real word count rather than hand-typed per article, so the displayed
// reading time can't drift out of sync with the actual content.
export function estimateReadingTime(sections) {
  const wordCount = sections.reduce((total, section) => {
    const headingWords = section.heading ? section.heading.split(/\s+/).length : 0
    const bodyWords = section.paragraphs.reduce((sum, paragraph) => sum + paragraph.split(/\s+/).length, 0)
    return total + headingWords + bodyWords
  }, 0)

  return Math.max(1, Math.round(wordCount / WORDS_PER_MINUTE))
}
