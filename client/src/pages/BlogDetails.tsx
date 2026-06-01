import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

import { api } from '@/api/http'
import { PageHeader } from '@/components/PageHeader'
import { fallbackBlogs } from '@/data/fallback'
import type { Blog } from '@/types'
import { formatDate } from '@/utils/format'

export function BlogDetails() {
  const { slug } = useParams()
  const [blog, setBlog] = useState<Blog | null>(
    fallbackBlogs.find((item) => item.slug === slug) ?? fallbackBlogs[0],
  )

  useEffect(() => {
    async function loadBlog() {
      try {
        const response = await api.get(`/blogs/${slug}`)
        setBlog(response.data.blog)
      } catch {
        setBlog(fallbackBlogs.find((item) => item.slug === slug) ?? null)
      }
    }

    if (slug) {
      void loadBlog()
    }
  }, [slug])

  if (!blog) {
    return (
      <main className="min-h-screen px-5 pt-36 text-center text-stone-300">
        Blog post not found.
      </main>
    )
  }

  return (
    <main>
      <PageHeader
        eyebrow={`${blog.category} / ${formatDate(blog.createdAt)}`}
        title={blog.title}
        copy={`Written by ${blog.author}`}
      />
      <article className="mx-auto max-w-4xl px-5 pb-20">
        <img
          src={blog.thumbnail}
          alt={blog.title}
          className="mb-10 h-[48vh] w-full rounded-[2rem] object-cover"
        />
        <p className="whitespace-pre-line text-lg leading-9 text-stone-300">
          {blog.content}
        </p>
      </article>
    </main>
  )
}
