import './globals.css'
import type { Metadata } from 'next'
import localFont from 'next/font/local'
import React from 'react'
import Navbar from '@/components/navbar'
import { Providers } from '@/providers'
import { Toaster, toast } from 'sonner'
import Banner from '@/components/banner'

const geistSans = localFont({
  src: './fonts/GeistVF.woff',
  variable: '--font-geist-sans',
  weight: '100 900',
})
const geistMono = localFont({
  src: './fonts/GeistMonoVF.woff',
  variable: '--font-geist-mono',
  weight: '100 900',
})

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <Providers>
      <html lang="en">
        <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
          <Banner />
          <Navbar />
          {children}
          <Toaster position="bottom-center" richColors />
        </body>
      </html>
    </Providers>
  )
}
