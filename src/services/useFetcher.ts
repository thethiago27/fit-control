import { get } from '@/services/api'
import useSWR from 'swr'

export function useFetch<T, R>(url: string) {
  const { data, error, mutate, isLoading } = useSWR<T, R>(url, async (url) => {
    return await get(url)
  })

  return { data, error, isLoading, mutate }
}
