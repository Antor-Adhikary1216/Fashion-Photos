import { Link } from 'react-router-dom'

import { PageHeader } from '@/components/PageHeader'
import { fallbackBlogs } from '@/data/fallback'
import { useApiResource } from '@/hooks/useApiResource'
import type { Blog as BlogPost } from '@/types'
import { formatDate, shortText } from '@/utils/format'

export function Blog() {
  const { data: blogs } = useApiResource<BlogPost[]>(
    '/blogs',
    'blogs',
    fallbackBlogs,
  )

  return (
    <main>
      <PageHeader
        eyebrow="Journal"
        title="Photography notes, planning guides, and behind-the-frame stories."
        copy="A practical journal for clients, creatives, and anyone planning a visual story."
      />
      <section className="mx-auto grid max-w-7xl gap-6 px-5 pb-20 md:grid-cols-2">
        {blogs.map((blog) => (
          <Link
            key={blog._id}
            to={`/blog/${blog.slug}`}
            className="overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03]"
          >
            <img
              src={blog.thumbnail}
              alt={blog.title}
              className="h-72 w-full object-cover"
            />
            <div className="p-6">
              <p className="text-sm uppercase tracking-[0.3em] text-gold-300">
                {blog.category} / {formatDate(blog.createdAt)}
              </p>
              <h2 className="mt-3 font-serif text-3xl text-white">
                {blog.title}
              </h2>
              <p className="mt-4 leading-7 text-stone-400">
                {shortText(blog.content, 180)}
              </p>
            </div>
          </Link>
        ))}
      </section>
    </main>
  )
}
