import {
  buildPostFromRaw,
  findPostBySlug,
  sortPostsByDate,
} from './posts'
import type { Post, PostSummary } from './types'

const postModules = import.meta.glob('../../../content/posts/*.md', {
  query: '?raw',
  import: 'default',
  eager: true,
}) as Record<string, string>

function slugFromPath(path: string): string {
  const filename = path.split('/').pop() ?? path
  return filename.replace(/\.md$/, '')
}

function loadPosts(): Post[] {
  const posts = Object.entries(postModules).map(([path, raw]) =>
    buildPostFromRaw({ slug: slugFromPath(path), raw }),
  )

  return sortPostsByDate(posts) as Post[]
}

let cachedPosts: Post[] | null = null

export function getAllPosts(): Post[] {
  if (!cachedPosts) {
    cachedPosts = loadPosts()
  }

  return cachedPosts
}

export function getAllPostSummaries(): PostSummary[] {
  return getAllPosts().map(({ slug, title, date, tags, excerpt }) => ({
    slug,
    title,
    date,
    tags,
    excerpt,
  }))
}

export function getPostBySlug(slug: string): Post | undefined {
  return findPostBySlug(getAllPosts(), slug)
}