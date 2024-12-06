import { NextRequest, NextResponse } from 'next/server'
import payload from 'payload'
import { Product } from 'payload-types'

export const POST = async (req: NextRequest) => {
  const body = await req.json()
  const { query } = body
  const { category } = body
  const Products = payload.db.collections.products
  console.log(Products)
  if (!category) {
    try {
      const result: Product[] = await Products.aggregate([
        {
          $search: {
            index: 'default',
            text: {
              query: query,
              path: {
                wildcard: '*',
              },
              fuzzy: {
                maxEdits: 2,
                prefixLength: 0,
                maxExpansions: 50,
              },
            },
          },
        },
      ])
      return new NextResponse(JSON.stringify(result), { status: 200 })
    } catch (error) {
      console.log(error)
      return new NextResponse(JSON.stringify(error), { status: 500 })
    }
  } else {
    try {
      const result: Product[] = await payload.db.collections['products'].aggregate([
        {
          $search: {
            index: 'default',

            compound: {
              must: [
                {
                  text: {
                    query: category,
                    path: 'category',
                  },
                },
                {
                  text: {
                    query: query,
                    path: { wildcard: '*' },
                    fuzzy: {
                      maxEdits: 2,
                      prefixLength: 0,
                      maxExpansions: 50,
                    },
                  },
                },
              ],
            },
          },
        },
      ])
      return new NextResponse(JSON.stringify(result), { status: 200 })
    } catch (error) {
      console.log(error)
      return new NextResponse(JSON.stringify(error), { status: 500 })
    }
  }
}
