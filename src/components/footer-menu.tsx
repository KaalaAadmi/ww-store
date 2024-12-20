'use client'

import clsx from 'clsx'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import type { FooterMenu as FooterMenuType } from 'test-data'

interface MenuItem {
  title: string
  type: string
  path?: string
  children: MenuItem[]
}

export function FooterMenuItem({ item }: { item: MenuItem }) {
  const pathname = usePathname()
  const [active, setActive] = useState(pathname === item.path)

  useEffect(() => {
    setActive(pathname === item.path)
  }, [pathname, item.path])

  return (
    <li>
      <Link
        href={item.path || '#'}
        className={clsx(
          'block py-2 text-lg underline-offset-4 hover:text-black hover:underline md:inline-block md:text-sm dark:hover:text-neutral-300',
          {
            'text-black dark:text-neutral-300': active,
          },
        )}
      >
        {item.title}
      </Link>
    </li>
  )
}

export default function FooterMenu({ menu }: { menu: FooterMenuType }) {
  if (!menu.length) return null

  return (
    <div className="grid grid-cols-2 gap-4 md:grid-cols-4 lg:grid-cols-4">
      {menu.map((item) => (
        <nav className="col-span-1" key={item.title + item.type}>
          {item.type === 'headline' ? (
            <span className="font-bold text-lg md:text-sm">{item.title}</span>
          ) : null}
          {item.children.length > 0 ? (
            <ul className="py-3 md:py-0 md:pt-4">
              {item.children.map((item) => (
                <FooterMenuItem
                  key={item.title}
                  // @ts-ignore

                  item={item}
                />
              ))}
            </ul>
          ) : (
            <Link
              key={item.title}
              // @ts-ignore
              href={item.path}
              className="text-gray-800 transition duration-150 ease-in-out hover:text-gray-300 dark:text-gray-100"
            >
              {item.title}
            </Link>
          )}
        </nav>
      ))}
    </div>
  )
}
