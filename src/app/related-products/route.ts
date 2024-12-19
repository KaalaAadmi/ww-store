import { getPayloadHMR } from '@payloadcms/next/utilities'
import configPromise from '@payload-config'
import { NextRequest, NextResponse } from 'next/server'

export const GET = async () => {
  const payload = await getPayloadHMR({
    config: configPromise,
  })

  const data = await payload.find({
    collection: 'users',
  })

  return Response.json(data)
}

export const POST = async (req: NextRequest) => {
  try {
    // Parse request JSON
    const { id, tags } = await req.json()

    if (!id || !tags || !Array.isArray(tags) || tags.length === 0) {
      return new NextResponse(
        JSON.stringify({ error: 'Invalid or missing `id` or `tags` in the request body' }),
        { status: 400 },
      )
    }

    // Initialize Payload
    const payload = await getPayloadHMR({
      config: configPromise,
    })

    // Fetch products
    const data = await payload.find({
      collection: 'products',
      where: {
        and: [
          { id: { not_equals: id } },
          { or: tags.map((tag) => ({ tags__tag: { equals: tag } })) }, // Dynamically build OR conditions for each tag
        ],
      },
    })

    // Return the response
    return new NextResponse(JSON.stringify(data.docs), { status: 200 })
  } catch (error) {
    console.error('Error fetching related products:', error)
    return new NextResponse(JSON.stringify({ error: 'Error fetching related products' }), {
      status: 500,
    })
  }
}
