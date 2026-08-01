type PostCoverProps = {
  src: string
  alt: string
  /** `hero` = article top; `thumb` = blog list */
  variant?: 'hero' | 'thumb'
  priority?: boolean
  className?: string
}

export default function PostCover({
  src,
  alt,
  variant = 'hero',
  priority = false,
  className = '',
}: PostCoverProps) {
  return (
    <img
      src={src}
      alt={alt}
      width={variant === 'hero' ? 1600 : 184}
      height={variant === 'hero' ? 800 : 184}
      className={['post-cover', `post-cover--${variant}`, className]
        .filter(Boolean)
        .join(' ')}
      loading={priority ? 'eager' : 'lazy'}
      decoding="async"
      fetchPriority={priority ? 'high' : undefined}
    />
  )
}
