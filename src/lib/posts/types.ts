export type PostFrontmatter = {
  title: string
  date: string
  tags: string[]
  /** Public URL path, e.g. `/covers/slug.webp` */
  cover?: string
  coverAlt?: string
}

export type PostSummary = PostFrontmatter & {
  slug: string
  excerpt: string
}

export type Post = PostSummary & {
  body: string
  html: string
}

export type RawPostInput = {
  slug: string
  raw: string
}