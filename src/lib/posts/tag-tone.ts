const TECH_TAGS = new Set(['tech', 'typescript'])
const INVESTING_TAGS = new Set(['investing', 'risk'])

export type TagTone = 'tech' | 'investing' | 'default'

export function getTagTone(tag: string): TagTone {
  const normalized = tag.trim().toLowerCase()

  if (TECH_TAGS.has(normalized)) {
    return 'tech'
  }

  if (INVESTING_TAGS.has(normalized)) {
    return 'investing'
  }

  return 'default'
}

export function getTagClassName(tag: string) {
  const tone = getTagTone(tag)

  if (tone === 'tech') {
    return 'tag tag--tech'
  }

  if (tone === 'investing') {
    return 'tag tag--investing'
  }

  return 'tag'
}