import { useEffect, useState } from 'react'

import { api, getErrorMessage } from '@/api/http'

export function useApiResource<T>(
  path: string,
  responseKey: string,
  fallback: T,
) {
  const [data, setData] = useState<T>(fallback)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let isMounted = true

    async function load() {
      try {
        setIsLoading(true)
        const response = await api.get(path)
        const nextData = response.data?.[responseKey] as T | undefined

        if (isMounted && nextData) {
          setData(nextData)
        }
      } catch (resourceError) {
        if (isMounted) {
          setError(getErrorMessage(resourceError))
          setData(fallback)
        }
      } finally {
        if (isMounted) {
          setIsLoading(false)
        }
      }
    }

    void load()

    return () => {
      isMounted = false
    }
  }, [fallback, path, responseKey])

  return { data, isLoading, error, setData }
}
