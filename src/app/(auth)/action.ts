'use server'

import { cookies } from 'next/headers'

export async function createToken(token: string) {
  return cookies().set('token', token)
}

export async function getToken(): Promise<string | undefined> {
  return cookies().get('token')?.value
}

export async function deleteToken() {
  return cookies().delete('token')
}
