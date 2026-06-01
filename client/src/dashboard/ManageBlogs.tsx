import { fallbackBlogs } from '@/data/fallback'
import { ResourceList } from '@/dashboard/ResourceList'
import type { Blog } from '@/types'

export function ManageBlogs() {
  return (
    <ResourceList<Blog>
      title="Manage Blogs"
      endpoint="/blogs"
      responseKey="blogs"
      fallback={fallbackBlogs}
      renderItem={(blog) => (
        <>
          <img
            src={blog.thumbnail}
            alt={blog.title}
            className="h-16 w-16 rounded-xl object-cover"
          />
          <div>
            <p className="font-semibold text-white">{blog.title}</p>
            <p className="text-sm text-stone-500">{blog.category}</p>
          </div>
        </>
      )}
    />
  )
}
