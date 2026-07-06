import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { describe, expect, it } from 'vitest'
import {
  collectPostsFromModules,
  getAllPostSummaries,
  getAllPosts,
  getPostBySlug,
  slugFromPath,
} from './load'

const testDir = path.dirname(fileURLToPath(import.meta.url))
const postsDir = path.resolve(testDir, '../../../content/posts')

function readPostsFromDisk() {
  return fs
    .readdirSync(postsDir)
    .filter((filename) => filename.endsWith('.md'))
    .map((filename) => {
      const slug = filename.replace(/\.md$/, '')
      const raw = fs.readFileSync(path.join(postsDir, filename), 'utf8')
      return { slug, raw, filename }
    })
}

describe('slugFromPath', () => {
  it('derives slugs from glob module paths', () => {
    expect(slugFromPath('../../../content/posts/full-stack-type-safety.md')).toBe(
      'full-stack-type-safety',
    )
  })
})

describe('collectPostsFromModules', () => {
  it('loads and sorts posts from a module map shaped like import.meta.glob output', async () => {
    const diskPosts = readPostsFromDisk()
    const modules = Object.fromEntries(
      diskPosts.map(({ filename, raw }) => [
        `../../../content/posts/${filename}`,
        raw,
      ]),
    )

    const posts = await collectPostsFromModules(modules)

    expect(posts.map((post) => post.slug)).toEqual([
      'full-stack-type-safety',
      'position-sizing-basics',
    ])
    expect(posts[0]?.title).toBe('Type safety from database to browser')
    expect(posts[1]?.title).toBe('Position sizing before entry timing')
  })
})

describe('getAllPosts', () => {
  it('loads every markdown source file from content/posts', async () => {
    const diskSlugs = readPostsFromDisk()
      .map((post) => post.slug)
      .sort()
    const loadedPosts = await getAllPosts()
    const loadedSlugs = loadedPosts.map((post) => post.slug).sort()

    expect(loadedSlugs).toEqual(diskSlugs)
    expect(loadedPosts.length).toBe(diskSlugs.length)
  })

  it('returns posts sorted newest first for the blog listing path', async () => {
    const posts = await getAllPosts()

    expect(posts.map((post) => post.slug)).toEqual([
      'full-stack-type-safety',
      'position-sizing-basics',
    ])
  })
})

describe('getAllPostSummaries', () => {
  it('returns index listing data sourced from markdown files on disk', async () => {
    const diskPosts = readPostsFromDisk()
    const summaries = await getAllPostSummaries()

    for (const { slug, raw } of diskPosts) {
      const summary = summaries.find((entry) => entry.slug === slug)
      const titleMatch = raw.match(/^title:\s*"(.+)"\s*$/m)

      expect(summary).toBeDefined()
      expect(summary?.title).toBe(titleMatch?.[1])
      expect(summary?.excerpt.length).toBeGreaterThan(0)
    }
  })
})

describe('getPostBySlug', () => {
  it('returns the full post with markdown body rendered from disk source', async () => {
    const diskPost = readPostsFromDisk().find(
      (post) => post.slug === 'full-stack-type-safety',
    )

    expect(diskPost).toBeDefined()

    const loaded = await getPostBySlug('full-stack-type-safety')

    expect(loaded?.title).toBe('Type safety from database to browser')
    expect(loaded?.body).toContain(
      'Modern full-stack work is less about picking a framework',
    )
    expect(loaded?.html).toContain(
      '<p>Modern full-stack work is less about picking a framework',
    )
    expect(diskPost!.raw).toContain(loaded?.body ?? '')
  })

  it('returns undefined when the slug has no markdown source', async () => {
    expect(await getPostBySlug('this-slug-does-not-exist')).toBeUndefined()
  })
})