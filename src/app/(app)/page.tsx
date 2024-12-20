// 'use client'
import { ThreeItemGrid } from '@/components/grid/three-items'
import { Carousel } from '@/components/grid/carousel'
import Footer from '@/components/footer'
// import { useSearchParams } from 'next/navigation'
// import { toast } from 'sonner'

export const metadata = {
  description: 'High-performance ecommerce store built with Next.js, Vercel, and Shopware.',
  openGraph: {
    type: 'website',
  },
}

export default function Home() {
  // const searchParams = useSearchParams()
  // const isSignedUp = searchParams.get('signedUp')
  // const isSignedIn = searchParams.get('signedIn')
  // if (isSignedUp) toast.success('You have successfully signed up!')
  // else if (isSignedIn) toast.success('You have successfully signed in!')
  return (
    <>
      {/* <ThreeItemGrid /> */}
      {/* <Carousel /> */}
      <Footer />
    </>
  )
}
