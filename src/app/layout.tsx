import './globals.css'
import type { Metadata } from 'next'
import { Poppins } from 'next/font/google'
import { ReactNode } from 'react'
import 'react-toastify/dist/ReactToastify.css'
import { ToastContainer } from 'react-toastify'

const poppins = Poppins({ subsets: ['latin'], weight: ['400', '700'] })

export const metadata: Metadata = {
  title: 'Fit Control',
  description: 'Monitor your workouts and track your progress.',
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body
        className={`${poppins.className} bg-zinc-950 text-zinc-50 antialiased`}
      >
        {children}
        <ToastContainer />
      </body>
    </html>
  )
}
