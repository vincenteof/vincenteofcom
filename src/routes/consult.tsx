import { createFileRoute } from '@tanstack/react-router'
import { useEffect, useState } from 'react'

const TALLY_FORM_ID = 'ODBlNR'

export const Route = createFileRoute('/consult')({
  head: () => ({
    meta: [
      { title: '咨询服务 | Vincenteof' },
      {
        name: 'description',
        content:
          '软件开发咨询与全球投资咨询，请填写需求表单，通常在 48 小时内回复。',
      },
    ],
  }),
  component: ConsultPage,
})

function ConsultPage() {
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    const script = document.createElement('script')
    script.src = 'https://tally.so/widgets/embed.js'
    script.async = true
    document.body.appendChild(script)
    return () => {
      document.body.removeChild(script)
    }
  }, [])

  return (
    <main className="px-5 py-20">
      <div className="mx-auto max-w-180">
        <h1 className="m-0 text-[clamp(1.5rem,3vw,1.95rem)] font-medium tracking-[0.03em]">
          咨询服务
        </h1>
        <p className="mt-4 mb-0 max-w-135 text-[0.98rem] leading-[1.9] text-(--text-soft)">
          无论是软件开发还是全球投资，请简单描述你的需求，我通常会在 48
          小时内回复。
        </p>

        <div className="relative mt-12">
          {!loaded && (
            <div className="flex items-center gap-2 py-16 text-[0.92rem] text-(--text-muted)">
              <svg
                className="h-4 w-4 animate-spin"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <circle
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeDasharray="31.4 31.4"
                  strokeDashoffset="10"
                />
              </svg>
              正在加载表单…
            </div>
          )}
          <iframe
            data-tally-src={`https://tally.so/embed/${TALLY_FORM_ID}?alignLeft=1&hideTitle=1&transparentBackground=1&dynamicHeight=1`}
            width="100%"
            title="咨询需求表单"
            style={{ border: 'none' }}
            loading="lazy"
            onLoad={() => setLoaded(true)}
          />
        </div>
      </div>
    </main>
  )
}
