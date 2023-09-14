import Link from 'next/link'
import { ReactNode } from 'react'

interface NavbarLinkProps {
  href: string
  children: ReactNode
}
export function NavbarLink({ href, children }: NavbarLinkProps) {
  return (
    <Link
      href={href}
      className="hover:bg-gray-700 text-white block px-3 py-2 rounded-md text-base font-medium"
    >
      {children}
    </Link>
  )
}
