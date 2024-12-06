import payloadConfig from '@payload-config'
import { NextResponse } from 'next/server'
import { NextRequest } from 'next/server'
import { getPayload } from 'payload'

// API Route to fetch all products
export const GET = async (req: NextRequest) => {
  const payload = await getPayload({ config: payloadConfig })
  try {
    const result = await payload.find({
      collection: 'products', // required
      //   depth: 2,
      //   page: 1,
      //   limit: 10,
      pagination: false, // If you want to disable pagination count, etc.
      //   where: {}, // pass a `where` query here
      sort: '-title',
      overrideAccess: false,
      showHiddenFields: true,
    })
    if (result.docs.length !== 0) {
      return new NextResponse(JSON.stringify(result.docs), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      })
    }
  } catch (error) {
    console.log(error)
  }
}
