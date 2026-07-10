const formatter = new Intl.DateTimeFormat('en-US', { month: 'long', day: 'numeric', year: 'numeric' })

export function formatBlogDate(isoDate) {
  return formatter.format(new Date(`${isoDate}T00:00:00`))
}
