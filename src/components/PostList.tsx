import type { CSSProperties } from 'react'
import { Link } from '@tanstack/react-router'
import { useI18n } from '#/i18n/I18nProvider'
import { getTagClassName } from '#/lib/posts/tag-tone'
import type { PostSummary } from '#/lib/posts/types'

type PostListProps = {
  posts: PostSummary[]
  revealFrom?: number
}

export default function PostList({ posts, revealFrom }: PostListProps) {
  const { formatDate, tag } = useI18n()

  return (
    <ul className="post-list">
      {posts.map((post, index) => (
        <li
          key={post.slug}
          className={revealFrom === undefined ? 'post-item' : 'post-item reveal-item'}
          style={
            revealFrom === undefined
              ? undefined
              : ({
                  '--reveal-delay': `${revealFrom + index * 80}ms`,
                } as CSSProperties)
          }
        >
          <div className="post-item__meta">
            <time dateTime={post.date}>{formatDate(post.date)}</time>
            {post.tags.map((postTag) => (
              <span key={postTag} className={getTagClassName(postTag)}>
                {tag(postTag)}
              </span>
            ))}
          </div>
          <h2 className="post-item__title">
            <Link to="/blog/$slug" params={{ slug: post.slug }}>
              {post.title}
            </Link>
          </h2>
          <p className="post-item__excerpt">{post.excerpt}</p>
        </li>
      ))}
    </ul>
  )
}