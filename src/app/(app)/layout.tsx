import { ReactNode } from 'react'
import { Navbar } from '@/components/Navbar'

export default function StageLayout({ children }: { children: ReactNode }) {
  return (
    <main className="flex flex-col">
      <Navbar />
      {children}
    </main>
  )
}
