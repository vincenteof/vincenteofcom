import '@tanstack/react-start/server-only'

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

export function slugFromPath(path: string): string {
  const filename = path.split('/').pop() ?? path
  return filename.replace(/\.md$/, '')
}

export async function collectPostsFromModules(
  modules: Record<string, string>,
): Promise<Post[]> {
  const posts = await Promise.all(
    Object.entries(modules).map(([path, raw]) =>
      buildPostFromRaw({ slug: slugFromPath(path), raw }),
    ),
  )

  return sortPostsByDate(posts) as Post[]
}

async function loadPosts(): Promise<Post[]> {
  return collectPostsFromModules(postModules)
}

let cachedPosts: Post[] | null = null
let loadingPromise: Promise<Post[]> | null = null

export async function getAllPosts(): Promise<Post[]> {
  if (cachedPosts) {
    return cachedPosts
  }

  if (!loadingPromise) {
    loadingPromise = loadPosts().then((posts) => {
      cachedPosts = posts
      return posts
    })
  }

  return loadingPromise
}

export async function getAllPostSummaries(): Promise<PostSummary[]> {
  const posts = await getAllPosts()

  return posts.map(({ slug, title, date, tags, excerpt }) => ({
    slug,
    title,
    date,
    tags,
    excerpt,
  }))
}

export async function getPostBySlug(slug: string): Promise<Post | undefined> {
  const posts = await getAllPosts()
  return findPostBySlug(posts, slug)
}