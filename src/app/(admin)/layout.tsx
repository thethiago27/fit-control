import { ReactNode } from 'react'
import { AdminNavbar } from '@/components/AdminNavbar'

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <main className="flex flex-col">
      <AdminNavbar />
      {children}
    </main>
  )
}
