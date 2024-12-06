'use client'

import { Dialog, Transition } from '@headlessui/react'
import Link from 'next/link'
import { usePathname, useSearchParams } from 'next/navigation'
import { Fragment, Suspense, useEffect, useState } from 'react'

import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
// import { Menu } from 'lib/shopware/types';
import Search, { SearchSkeleton } from './search'
import { Button } from '../ui/button'

export default function MobileMenu({ menu }) {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const [isOpen, setIsOpen] = useState(false)
  const openMobileMenu = () => setIsOpen(true)
  const closeMobileMenu = () => setIsOpen(false)
  const user = null
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) {
        setIsOpen(false)
      }
    }
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [isOpen])

  useEffect(() => {
    setIsOpen(false)
  }, [pathname, searchParams])

  return (
    <>
      <button
        onClick={openMobileMenu}
        aria-label="Open mobile menu"
        className="flex h-11 w-11 items-center justify-center rounded-md border border-neutral-200 text-black transition-colors md:hidden dark:border-neutral-700 dark:text-white"
      >
        <Bars3Icon className="h-4" />
      </button>
      <Transition show={isOpen}>
        <Dialog onClose={closeMobileMenu} className="relative z-50">
          <Transition.Child
            as={Fragment}
            enter="transition-all ease-in-out duration-300"
            enterFrom="opacity-0 backdrop-blur-none"
            enterTo="opacity-100 backdrop-blur-[.5px]"
            leave="transition-all ease-in-out duration-200"
            leaveFrom="opacity-100 backdrop-blur-[.5px]"
            leaveTo="opacity-0 backdrop-blur-none"
          >
            <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
          </Transition.Child>
          <Transition.Child
            as={Fragment}
            enter="transition-all ease-in-out duration-300"
            enterFrom="translate-x-[-100%]"
            enterTo="translate-x-0"
            leave="transition-all ease-in-out duration-200"
            leaveFrom="translate-x-0"
            leaveTo="translate-x-[-100%]"
          >
            <Dialog.Panel className="fixed bottom-0 left-0 right-0 top-0 flex h-full w-full flex-col bg-white pb-6 dark:bg-black">
              <div className="p-4">
                <button
                  className="mb-4 flex h-11 w-11 items-center justify-center rounded-md border border-neutral-200 text-black transition-colors dark:border-neutral-700 dark:text-white"
                  onClick={closeMobileMenu}
                  aria-label="Close mobile menu"
                >
                  <XMarkIcon className="h-6" />
                </button>

                <div className="mb-4 w-full">
                  <Suspense fallback={<SearchSkeleton />}>
                    <Search />
                  </Suspense>
                </div>
                {menu.length ? (
                  <ul className="flex w-full flex-col">
                    {menu.map((item) => (
                      <li
                        className="py-2 text-xl text-black transition-colors hover:text-neutral-500 dark:text-white"
                        key={item.title}
                      >
                        <Link href={item.path} prefetch={true} onClick={closeMobileMenu}>
                          {item.title}
                        </Link>
                      </li>
                    ))}
                  </ul>
                ) : null}
              </div>
              <div className="space-y-6 border-t border-gray-200 px-4 py-6">
                <div className="flow-root">
                  {user ? (
                    <Link
                      // onClick={() => closeOnCurrent('/profile')}
                      href={'/profile'}
                      className="-m-2 block p-2 font-medium text-gray-900"
                    >
                      Profile
                    </Link>
                  ) : (
                    <Link
                      // onClick={() => closeOnCurrent('/sign-in')}
                      href="/sign-in"
                      className="-m-2 block p-2 font-medium text-gray-900"
                    >
                      Sign in
                    </Link>
                  )}
                </div>
                <div className="flow-root">
                  {user ? (
                    <Button
                      // onClick={
                      //   () => signOut({ redirectUrl: "/" })
                      // }
                      variant="destructive"
                    >
                      Sign Out
                    </Button>
                  ) : (
                    <Link
                      // onClick={() => closeOnCurrent("/sign-up")}
                      href="/sign-up"
                      className="-m-2 block p-2 font-medium text-gray-900"
                    >
                      Sign up
                    </Link>
                  )}
                </div>
              </div>
            </Dialog.Panel>
          </Transition.Child>
        </Dialog>
      </Transition>
    </>
  )
}