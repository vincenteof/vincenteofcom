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
      parsePostPath('../../../content/posts/my-spcx-investment-plan.en.md'),
    ).toEqual({ slug: 'my-spcx-investment-plan', locale: 'en' })
    expect(
      slugFromPath('../../../content/posts/my-spcx-investment-plan.zh.md'),
    ).toBe('my-spcx-investment-plan')
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
    const expectedSlugs = [...new Set(diskPosts.map((post) => post.slug))].sort()

    expect(slugs).toEqual(expectedSlugs)
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
    const diskSlugs = [
      ...new Set(readLocalePostsFromDisk().map((post) => post.slug)),
    ].sort()
    const summaries = await getAllPostSummaries('en')
    // Newest first by date
    const sortedByDate = [...summaries]
      .sort((a, b) => Date.parse(b.date) - Date.parse(a.date))
      .map((post) => post.slug)

    expect(summaries.map((post) => post.slug)).toEqual(sortedByDate)
    expect([...summaries.map((post) => post.slug)].sort()).toEqual(diskSlugs)
    expect(summaries.every((post) => post.locale === 'en')).toBe(true)
    expect(summaries.every((post) => post.isFallback === false)).toBe(true)
  })

  it('returns Chinese titles when locale is zh', async () => {
    const summaries = await getAllPostSummaries('zh')
    const sample = summaries.find(
      (post) => post.slug === 'my-spcx-investment-plan',
    )

    expect(sample?.title).toBe('我的 SPCX 投资计划')
    expect(sample?.locale).toBe('zh')
  })
})

describe('getPostBySlug', () => {
  it('returns the English post body for en', async () => {
    const loaded = await getPostBySlug('my-spcx-investment-plan', 'en')

    expect(loaded?.title).toBe('My SPCX investment plan')
    expect(loaded?.body).toContain("No one seriously doubts SPCX's monopoly")
    expect(loaded?.html).toContain('<p>')
    expect(loaded?.html).toMatch(/SPCX/i)
    expect(loaded?.isFallback).toBe(false)
  })

  it('returns the Chinese post body for zh', async () => {
    const loaded = await getPostBySlug('my-spcx-investment-plan', 'zh')

    expect(loaded?.title).toBe('我的 SPCX 投资计划')
    expect(loaded?.body).toContain('没有人会质疑 SPCX')
    expect(loaded?.isFallback).toBe(false)
  })

  it('returns undefined when the slug has no markdown source', async () => {
    expect(await getPostBySlug('this-slug-does-not-exist', 'en')).toBeUndefined()
  })
})
