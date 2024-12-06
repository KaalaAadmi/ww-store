'use client'
import { usePathname } from 'next/navigation'
// import React from 'react'

const Banner = () => {
  const path = usePathname()
  let banner = ''
  if (path === '/') {
    banner = 'h-full text-white text-center bg-[#0a0a0a] p-1 text-lg'
  } else {
    banner = 'h-full text-white text-center bg-[#0a0a0a] p-1 text-lg hidden'
  }
  return (
    <div className={banner}>
      10% sale on all products. Use code: <b>10OFF2024</b>
    </div>
  )
}

export default Banner
