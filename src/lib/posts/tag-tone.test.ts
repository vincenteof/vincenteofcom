import { describe, expect, it } from 'vitest'
import { getTagClassName, getTagTone } from './tag-tone'

describe('getTagTone', () => {
  it('maps known tags to semantic tones', () => {
    expect(getTagTone('tech')).toBe('tech')
    expect(getTagTone('TypeScript')).toBe('tech')
    expect(getTagTone('investing')).toBe('investing')
    expect(getTagTone('risk')).toBe('investing')
    expect(getTagTone('notes')).toBe('default')
  })
})

describe('getTagClassName', () => {
  it('returns tone-specific class names', () => {
    expect(getTagClassName('tech')).toBe('tag tag--tech')
    expect(getTagClassName('investing')).toBe('tag tag--investing')
    expect(getTagClassName('notes')).toBe('tag')
  })
})