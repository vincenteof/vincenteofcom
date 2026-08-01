import '@tanstack/react-start/server-only'

import type { Locale } from '#/i18n/types'
import {
  buildPostFromRaw,
  groupPostsBySlug,
  resolveLocalizedPost,
  sortPostsByDate,
  toPostSummary,
} from './posts'
import type { LocalizedPostGroup, Post, PostSummary } from './types'

const postModules = import.meta.glob('../../../content/posts/*.{en,zh}.md', {
  query: '?raw',
  import: 'default',
  eager: true,
}) as Record<string, string>

const LOCALE_FILE = /^(.+)\.(en|zh)\.md$/

export function parsePostPath(path: string): {
  slug: string
  locale: Locale
} | null {
  const filename = path.split('/').pop() ?? path
  const match = filename.match(LOCALE_FILE)
  if (!match) {
    return null
  }

  return {
    slug: match[1]!,
    locale: match[2] as Locale,
  }
}

/** @deprecated prefer parsePostPath — kept for clearer test names */
export function slugFromPath(path: string): string {
  return parsePostPath(path)?.slug ?? path.replace(/\.md$/, '')
}

export async function collectPostsFromModules(
  modules: Record<string, string>,
): Promise<Post[]> {
  const posts = await Promise.all(
    Object.entries(modules).map(async ([path, raw]) => {
      const parsed = parsePostPath(path)
      if (!parsed) {
        throw new Error(`Invalid post path (expected slug.en.md / slug.zh.md): ${path}`)
      }

      return buildPostFromRaw({
        slug: parsed.slug,
        raw,
        sourceLocale: parsed.locale,
      })
    }),
  )

  return posts
}

async function loadLocalizedGroups(): Promise<LocalizedPostGroup[]> {
  const posts = await collectPostsFromModules(postModules)
  return groupPostsBySlug(posts)
}

let cachedGroups: LocalizedPostGroup[] | null = null
let loadingPromise: Promise<LocalizedPostGroup[]> | null = null

export async function getLocalizedPostGroups(): Promise<LocalizedPostGroup[]> {
  if (cachedGroups) {
    return cachedGroups
  }

  if (!loadingPromise) {
    loadingPromise = loadLocalizedGroups().then((groups) => {
      cachedGroups = groups
      return groups
    })
  }

  return loadingPromise
}

/** All source files as posts (one entry per locale file). Mostly for tests. */
export async function getAllPosts(): Promise<Post[]> {
  const groups = await getLocalizedPostGroups()
  return groups.flatMap((group) => Object.values(group.byLocale) as Post[])
}

export async function getAllPostSummaries(
  locale: Locale,
): Promise<PostSummary[]> {
  const groups = await getLocalizedPostGroups()
  const resolved = groups
    .map((group) => resolveLocalizedPost(group, locale))
    .filter((post): post is Post => post !== undefined)
    .map(toPostSummary)

  return sortPostsByDate(resolved)
}

export async function getPostBySlug(
  slug: string,
  locale: Locale,
): Promise<Post | undefined> {
  const groups = await getLocalizedPostGroups()
  const group = groups.find((entry) => entry.slug === slug)
  if (!group) {
    return undefined
  }

  return resolveLocalizedPost(group, locale)
}
