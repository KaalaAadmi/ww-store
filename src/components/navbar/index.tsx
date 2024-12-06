'use client'
import Link from 'next/link'
import { Suspense } from 'react'
import MobileMenu from './mobile-menu'
import { menu } from 'test-data'
import Search, { SearchSkeleton } from './search'
import OpenCart from '../cart/open-cart'
import Cart from '../cart'
import { buttonVariants } from '../ui/button'
import { useAuth } from '@/context/auth-context'
import UserAccountNav from '../user-account-nav'
import LogoSquare from '../logo-square'

export default function Navbar() {
  const { user } = useAuth()

  return (
    <nav className="relative flex items-center justify-between p-4 lg:px-6">
      <div className="block flex-none md:hidden">
        <Suspense fallback={null}>
          <MobileMenu menu={menu} />
        </Suspense>
      </div>
      <div className="flex w-full items-center">
        <div className="flex w-full md:w-4/6">
          <Link href="/" className="mr-2 flex w-full items-center justify-center md:w-auto lg:mr-6">
            <LogoSquare />
            {/* <Icons.logo className="h-10 w-10" /> */}
            <p className="ml-2 flex-none text-sm font-bold uppercase md:hidden lg:block">
              Weeb Wear
            </p>
          </Link>
          {menu.length ? (
            <ul className="hidden gap-6 text-sm md:flex md:items-center">
              {menu.map((item) => (
                <li key={item.title}>
                  <Link
                    href={item.path}
                    prefetch={true}
                    className="text-neutral-500 underline-offset-4 hover:text-black hover:underline dark:text-neutral-400 dark:hover:text-neutral-300"
                  >
                    {item.title}
                  </Link>
                </li>
              ))}
            </ul>
          ) : null}
        </div>
        <div className="hidden justify-center md:flex md:w-4/6">
          <Suspense fallback={<SearchSkeleton />}>
            <Search />
          </Suspense>
        </div>
        <div className="flex justify-end md:w-4/6">
          <div className="hidden md:flex items-center justify-center ">
            {user ? null : (
              <Link
                href="/sign-in"
                className={buttonVariants({
                  variant: 'ghost',
                })}
              >
                Sign in
              </Link>
            )}

            {user ? null : <span className="h-6 w-px bg-gray-200" aria-hidden="true" />}

            {user ? (
              <UserAccountNav user={user} />
            ) : (
              <Link
                href="/sign-up"
                className={buttonVariants({
                  variant: 'ghost',
                })}
              >
                Create account
              </Link>
            )}

            {user ? <span className="h-6 w-px bg-gray-200" aria-hidden="true" /> : null}

            {user ? null : (
              <div className="flex lg:ml-6">
                <span className="h-6 w-px bg-gray-200" aria-hidden="true" />
              </div>
            )}
          </div>
          <div className="flex justify-end r-0">
            <Suspense fallback={<OpenCart />}>
              <Cart />
            </Suspense>
          </div>
        </div>
      </div>
    </nav>
  )
}
