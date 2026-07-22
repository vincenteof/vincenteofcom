import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { describe, expect, it } from 'vitest'
import {
  collectPostsFromModules,
  getAllPostSummaries,
  getAllPosts,
  getPostBySlug,
  parsePostPath,
  slugFromPath,
} from './load'

const testDir = path.dirname(fileURLToPath(import.meta.url))
const postsDir = path.resolve(testDir, '../../../content/posts')

function readLocalePostsFromDisk() {
  return fs
    .readdirSync(postsDir)
    .filter((filename) => /\.(en|zh)\.md$/.test(filename))
    .map((filename) => {
      const match = filename.match(/^(.+)\.(en|zh)\.md$/)!
      const raw = fs.readFileSync(path.join(postsDir, filename), 'utf8')
      return {
        slug: match[1]!,
        locale: match[2] as 'en' | 'zh',
        raw,
        filename,
      }
    })
}

describe('parsePostPath / slugFromPath', () => {
  it('derives slug and locale from localized filenames', () => {
    expect(
      parsePostPath('../../../content/posts/full-stack-type-safety.en.md'),
    ).toEqual({ slug: 'full-stack-type-safety', locale: 'en' })
    expect(slugFromPath('../../../content/posts/full-stack-type-safety.zh.md')).toBe(
      'full-stack-type-safety',
    )
  })
})

describe('collectPostsFromModules', () => {
  it('loads localized sources from a module map shaped like import.meta.glob', async () => {
    const diskPosts = readLocalePostsFromDisk()
    const modules = Object.fromEntries(
      diskPosts.map(({ filename, raw }) => [
        `../../../content/posts/${filename}`,
        raw,
      ]),
    )

    const posts = await collectPostsFromModules(modules)
    const slugs = [...new Set(posts.map((post) => post.slug))].sort()

    expect(slugs).toEqual([
      'full-stack-type-safety',
      'position-sizing-basics',
    ])
    expect(posts.some((post) => post.locale === 'en')).toBe(true)
    expect(posts.some((post) => post.locale === 'zh')).toBe(true)
  })
})

describe('getAllPosts', () => {
  it('loads every localized markdown source from content/posts', async () => {
    const diskFiles = readLocalePostsFromDisk()
    const loadedPosts = await getAllPosts()

    expect(loadedPosts).toHaveLength(diskFiles.length)
  })
})

describe('getAllPostSummaries', () => {
  it('returns one summary per slug for the requested locale', async () => {
    const summaries = await getAllPostSummaries('en')

    expect(summaries.map((post) => post.slug)).toEqual([
      'full-stack-type-safety',
      'position-sizing-basics',
    ])
    expect(summaries[0]?.title).toBe('Type safety from database to browser')
    expect(summaries[0]?.locale).toBe('en')
    expect(summaries[0]?.isFallback).toBe(false)
  })

  it('returns Chinese titles when locale is zh', async () => {
    const summaries = await getAllPostSummaries('zh')

    expect(summaries[0]?.title).toBe('从数据库到浏览器的类型安全')
    expect(summaries[0]?.locale).toBe('zh')
  })
})

describe('getPostBySlug', () => {
  it('returns the English post body for en', async () => {
    const loaded = await getPostBySlug('full-stack-type-safety', 'en')

    expect(loaded?.title).toBe('Type safety from database to browser')
    expect(loaded?.body).toContain(
      'Modern full-stack work is less about picking a framework',
    )
    expect(loaded?.html).toContain(
      '<p>Modern full-stack work is less about picking a framework',
    )
    expect(loaded?.isFallback).toBe(false)
  })

  it('returns the Chinese post body for zh', async () => {
    const loaded = await getPostBySlug('full-stack-type-safety', 'zh')

    expect(loaded?.title).toBe('从数据库到浏览器的类型安全')
    expect(loaded?.body).toContain('现代全栈工作')
    expect(loaded?.isFallback).toBe(false)
  })

  it('returns undefined when the slug has no markdown source', async () => {
    expect(await getPostBySlug('this-slug-does-not-exist', 'en')).toBeUndefined()
  })
})
