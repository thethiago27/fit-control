'use client'

import { Menu, X } from 'lucide-react'
import { useReducer, useState } from 'react'
import { NavbarLink } from '@/components/Navbar/NavbarLink'
import { AnimatePresence, motion } from 'framer-motion'
import Image from 'next/image'

export function Navbar() {
  const [isOpen, setIsOpen] = useReducer((state) => !state, false)

  return (
    <div>
      <nav className="bg-zinc-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <img
                  className="h-8 w-8"
                  src="https://tailwindui.com/img/logos/workflow-mark-indigo-500.svg"
                  alt="Workflow"
                />
              </div>
              <div className="hidden md:block">
                <div className="ml-10 flex items-baseline space-x-4">
                  <NavbarLink href="/">Home</NavbarLink>
                </div>
              </div>
            </div>
            <div className="-mr-2 flex md:hidden">
              <motion.button
                onClick={setIsOpen}
                type="button"
                className="bg-zinc-850 inline-flex items-center justify-center p-2 rounded-md hover:text-white hover:bg-gray-800 focus:outline-none"
                aria-controls="mobile-menu"
                aria-expanded="false"
              >
                <span className="sr-only">Open main menu</span>
                <AnimatePresence initial={isOpen}>
                  <motion.span
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    {isOpen ? <X /> : <Menu />}
                  </motion.span>
                </AnimatePresence>
              </motion.button>
            </div>
          </div>
        </div>
        <AnimatePresence initial={isOpen}>
          {isOpen && (
            <motion.div
              className="md:hidden"
              id="mobile-menu"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                <NavbarLink href="/">Home</NavbarLink>
                <NavbarLink href="/history">Histórico de Treino</NavbarLink>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </div>
  )
}
