'use server'

import { cookies } from 'next/headers'

export async function createToken(token: string) {
  return cookies().set({
    name: 'token',
    value: token,
    httpOnly: true,
    secure: true,
    path: '/',
    expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7),
  })
}

export async function getToken(): Promise<string | undefined> {
  return cookies().get('token')?.value
}

export async function deleteToken() {
  return cookies().delete('token')
}
