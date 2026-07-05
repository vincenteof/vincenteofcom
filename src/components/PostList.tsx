import { Link } from '@tanstack/react-router'
import type { PostSummary } from '#/lib/posts/types'

type PostListProps = {
  posts: PostSummary[]
}

function formatDate(date: string) {
  const parsed = new Date(date)

  if (Number.isNaN(parsed.getTime())) {
    return date
  }

  return parsed.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  })
}

export default function PostList({ posts }: PostListProps) {
  return (
    <ul className="post-list">
      {posts.map((post) => (
        <li key={post.slug} className="post-item">
          <div className="post-item__meta">
            <time dateTime={post.date}>{formatDate(post.date)}</time>
            {post.tags.map((tag) => (
              <span key={tag} className="tag">
                {tag}
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