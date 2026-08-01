import { describe, expect, it } from 'vitest'
import { highlightCodeBlock, wrapCodeBlock } from './highlight'

describe('wrapCodeBlock', () => {
  it('wraps highlighted markup with toolbar markup', () => {
    const html = wrapCodeBlock('<pre><code>const x = 1</code></pre>', 'typescript')

    expect(html).toContain('data-code-block')
    expect(html).toContain('data-copy-button')
    expect(html).toContain('code-block__copy-label')
    expect(html).toContain('typescript')
    expect(html).toContain('<pre><code>const x = 1</code></pre>')
  })

  it('escapes language labels in the toolbar', () => {
    const html = wrapCodeBlock('<pre></pre>', '"><script>')

    expect(html).not.toContain('"><script>')
    expect(html).toContain('&quot;&gt;&lt;script&gt;')
  })
})

describe('highlightCodeBlock', () => {
  it('highlights typescript with dual-theme shiki output', async () => {
    const html = await highlightCodeBlock('const total = 1', 'typescript')

    expect(html).toContain('shiki')
    expect(html).toContain('data-copy-button')
    expect(html).toContain('const')
  })
})