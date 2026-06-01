import { useCallback, useEffect, useState, type ReactNode } from 'react'

import { api, getErrorMessage } from '@/api/http'

type ResourceWithId = {
  _id: string
}

export function ResourceList<TResource extends ResourceWithId>({
  title,
  endpoint,
  responseKey,
  fallback,
  renderItem,
}: {
  title: string
  endpoint: string
  responseKey: string
  fallback: TResource[]
  renderItem: (resource: TResource) => ReactNode
}) {
  const [items, setItems] = useState<TResource[]>(fallback)
  const [error, setError] = useState<string | null>(null)

  const loadItems = useCallback(async () => {
    try {
      const response = await api.get(endpoint)
      setItems(response.data[responseKey] ?? fallback)
    } catch (loadError) {
      setError(getErrorMessage(loadError))
      setItems(fallback)
    }
  }, [endpoint, fallback, responseKey])

  useEffect(() => {
    void loadItems()
  }, [loadItems])

  async function deleteItem(id: string) {
    await api.delete(`${endpoint}/${id}`)
    await loadItems()
  }

  return (
    <div>
      <h1 className="font-serif text-4xl text-white">{title}</h1>
      {error ? <p className="mt-4 text-sm text-red-300">{error}</p> : null}
      <div className="mt-6 grid gap-3">
        {items.map((item) => (
          <article
            key={item._id}
            className="flex items-center justify-between gap-4 rounded-3xl border border-white/10 bg-white/[0.03] p-4"
          >
            <div className="flex items-center gap-4">{renderItem(item)}</div>
            <button
              type="button"
              onClick={() => void deleteItem(item._id)}
              className="rounded-full border border-red-300/30 px-4 py-2 text-sm text-red-200"
            >
              Delete
            </button>
          </article>
        ))}
      </div>
    </div>
  )
}
