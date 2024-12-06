'use client'
import Link from 'next/link'
import { Suspense } from 'react'
import LogoSquare from './logo-square'
import FooterMenu from './footer-menu'
import { footer_menu } from 'test-data'
import MaxWidthWrapper from './max-width-wrapper'
import { useForm } from 'react-hook-form'
import { cn } from '@/lib/utils'
import { toast } from 'sonner'

const { COMPANY_NAME, SITE_NAME } = process.env

type FormData = {
  email: string
}

export default function Footer() {
  const currentYear = new Date().getFullYear()
  const copyrightDate = 2024 + (currentYear > 2024 ? `-${currentYear}` : '')
  const skeleton = 'w-full h-6 animate-pulse rounded bg-neutral-200 dark:bg-neutral-700'
  const copyrightName = COMPANY_NAME || SITE_NAME || 'WEEB WEAR'
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    mode: 'onTouched',
  })
  const onSubmit = async (data: any) => {
    console.log(data.email)
    const { email } = data
    event?.preventDefault()
    try {
      // Send email to the server
      await fetch('/api/newsletter', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: email }),
      }).then((res) => {
        if (res.ok) {
          toast.success('You have successfully subscribed to our newsletter!')
          // alert('You have successfully subscribed to our newsletter!')
        } else {
          toast.error('An error occurred. Please try again.')
          // alert('An error occurred. Please try again.')
        }
      })
    } catch (error) {
      console.error(error)
    }
  }
  return (
    <footer className="text-sm text-neutral-500 dark:text-neutral-400">
      <MaxWidthWrapper>
        <div className="border-t border-neutral-200 px-6 py-12 dark:border-neutral-700">
          <div className="flex flex-col gap-8 md:flex-row md:gap-12">
            {/* Logo Section */}
            <div className="flex-shrink-0">
              <Link className="flex items-center gap-2 text-black dark:text-white" href="/">
                <LogoSquare size="sm" />
                <span className="uppercase font-bold">{SITE_NAME}</span>
              </Link>
            </div>
            {/* Footer Menu and Newsletter Section */}
            <div className="flex flex-col gap-8 md:flex-row md:gap-12 w-full">
              {/* Footer Menu */}
              <Suspense
                fallback={
                  <div className="flex flex-wrap gap-2">
                    {[...Array(6)].map((_, i) => (
                      <div key={i} className={skeleton} />
                    ))}
                  </div>
                }
              >
                <FooterMenu menu={footer_menu} />
              </Suspense>
              {/* Newsletter Section */}
              <div className="flex flex-col gap-4 max-w-md">
                <h4 className="text-lg font-semibold text-black dark:text-white">
                  Stay in the loop!
                </h4>
                <p className="text-sm text-neutral-600 dark:text-neutral-400">
                  Subscribe to our newsletter for updates on new products and exclusive offers.
                </p>
                <form
                  onSubmit={handleSubmit(onSubmit)}
                  className="flex w-full max-w-sm flex-col gap-2 md:flex-row"
                >
                  <input
                    type="email"
                    required
                    {...register('email', {
                      required: 'Email is required',
                    })}
                    placeholder="you@example.com"
                    className={cn(
                      'w-full rounded-md border border-neutral-300 bg-white px-4 py-2 text-sm text-black placeholder-neutral-500 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-neutral-700 dark:bg-neutral-800 dark:text-white dark:placeholder-neutral-400',
                      {
                        'focus-visible:ring-red-500': errors.email,
                      },
                    )}
                  />
                  <button
                    type="submit"
                    className="rounded-md bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                  >
                    Subscribe
                  </button>
                  {errors?.email && (
                    <p className="text-sm text-red-500">{errors.email.message as string}</p>
                  )}
                </form>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-8 border-t border-neutral-200 py-6 text-center dark:border-neutral-700">
          <div className="mx-auto flex w-full max-w-7xl flex-col items-center gap-4 md:flex-row md:justify-between">
            <p>
              &copy; {copyrightDate} {copyrightName}
              {copyrightName.length && !copyrightName.endsWith('.') ? '.' : ''} All rights reserved.
            </p>
            <div className="md:ml-auto">
              <a
                rel="noopener noreferrer"
                href="https://frontends.shopware.com/"
                aria-label="Shopware Composable Frontends Link"
                target="_blank"
                className="text-black dark:text-white"
              >
                <div className="ml-4 h-auto w-10">
                  <LogoSquare size="sm" />
                </div>
              </a>
            </div>
          </div>
        </div>
      </MaxWidthWrapper>
    </footer>
  )
}
