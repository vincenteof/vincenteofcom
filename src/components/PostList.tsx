import { Link } from '@tanstack/react-router'
import { useI18n } from '#/i18n/I18nProvider'
import type { PostSummary } from '#/lib/posts/types'

type PostListProps = {
  posts: PostSummary[]
}

export default function PostList({ posts }: PostListProps) {
  const { formatDate, tag } = useI18n()

  return (
    <ul className="post-list">
      {posts.map((post) => (
        <li key={post.slug} className="post-item">
          <div className="post-item__meta">
            <time dateTime={post.date}>{formatDate(post.date)}</time>
            {post.tags.map((postTag) => (
              <span key={postTag} className="tag">
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