import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios'
import { deleteToken } from '@/app/(auth)/action'

interface IFetcherResponse<T> {
  data: T
  status: number
  headers: any
}

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000/api'

const api = axios.create({
  baseURL: `${BASE_URL}`,
  timeout: 15000,
})
export async function fetcher<T>(
  url: string,
  call: (url: string) => Promise<AxiosResponse<T>>,
): Promise<T> {
  try {
    const response = await call(url)
    return response.data
  } catch (error: any) {
    if (error.response && error.response.status === 401) {
      await deleteToken()
      window.location.reload()
    }

    if (error.message === 'Network Error') {
      return Promise.reject(new Error('Network Error'))
    }

    return Promise.reject(error)
  }
}

export function get<T>(url: string): Promise<T> {
  return fetcher<T>(url, api.get)
}

export function post<T, TBody>(url: string, body?: TBody): Promise<T> {
  return fetcher<T>(url, () => api.post(url, body))
}
