import { withPayload } from '@payloadcms/next/withPayload'

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Your Next.js config here
  images: {
    domains: [
      'res.cloudinary.com',
      'images.pexels.com',
      'via.placeholder.com',
      'img.clerk.com',
      'ui-avatars.com',
      'firebasestorage.googleapis.com',
    ],
  },
  experimental: {
    reactCompiler: false,
  },
  env: {
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_SERVER_URL,
  },
  output: 'standalone',
}

export default withPayload(nextConfig)
