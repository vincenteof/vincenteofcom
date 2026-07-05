export type PostFrontmatter = {
  title: string
  date: string
  tags: string[]
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