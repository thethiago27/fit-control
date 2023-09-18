import { ReactNode } from 'react'
import { DefaultNavbar } from '@/components/DefaultNavbar'

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <main className="flex flex-col">
      <DefaultNavbar />
      {children}
    </main>
  )
}
