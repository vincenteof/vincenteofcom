import type { CSSProperties } from 'react'
import { Link } from '@tanstack/react-router'
import PostCover from '#/components/PostCover'
import { useI18n } from '#/i18n/I18nProvider'
import { getTagClassName } from '#/lib/posts/tag-tone'
import type { PostSummary } from '#/lib/posts/types'

type PostListProps = {
  posts: PostSummary[]
  revealFrom?: number
  /** Show cover images when present. Off on home to keep Hero quiet. */
  showCover?: boolean
}

export default function PostList({
  posts,
  revealFrom,
  showCover = false,
}: PostListProps) {
  const { formatDate, tag } = useI18n()

  return (
    <ul className="post-list">
      {posts.map((post, index) => {
        const hasCover = showCover && Boolean(post.cover)

        return (
          <li
            key={post.slug}
            className={[
              'post-item',
              hasCover ? 'post-item--with-cover' : '',
              revealFrom === undefined ? '' : 'reveal-item',
            ]
              .filter(Boolean)
              .join(' ')}
            style={
              revealFrom === undefined
                ? undefined
                : ({
                    '--reveal-delay': `${revealFrom + index * 80}ms`,
                  } as CSSProperties)
            }
          >
            <Link
              to="/blog/$slug"
              params={{ slug: post.slug }}
              className="post-item__link"
            >
              <div className="post-item__body">
                <div className="post-item__meta">
                  <time dateTime={post.date}>{formatDate(post.date)}</time>
                  {post.tags.map((postTag) => (
                    <span key={postTag} className={getTagClassName(postTag)}>
                      {tag(postTag)}
                    </span>
                  ))}
                </div>
                <h2 className="post-item__title">{post.title}</h2>
                <p className="post-item__excerpt">{post.excerpt}</p>
              </div>
              {hasCover && post.cover ? (
                <div className="post-item__media">
                  <PostCover
                    src={post.cover}
                    alt={post.coverAlt ?? post.title}
                    variant="thumb"
                  />
                </div>
              ) : null}
            </Link>
          </li>
        )
      })}
    </ul>
  )
}
