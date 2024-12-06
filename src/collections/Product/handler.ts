// import { NextApiRequest } from 'next'
import { NextRequest, NextResponse } from 'next/server'
import { PayloadHandler } from 'payload'
import payload from 'payload'

const searchProductsHandler: PayloadHandler = async (req: NextRequest, res: NextResponse) => {
  // Extract Search Query
  // const searchString =
  //   req.query?.where?.or?.[0]?.name?.like ||
  //   req.query?.where?.and?.[0]?.category ||
  //   req.query?.where?.name ||
  //   req.query?.where?.category

  // console.log(searchString)

  // if (!searchString || !req.query.limit || !req.query.page) {
  //   console.log('using fallback regex search')
  //   // return next()
  //   return
  // }

  // Extract Contact Model from Payload
  const Products = payload //.collections['products']
  console.log(Products)
  // Perform Atlas Search & generate List of IDs
  let ids = []
  try {
    const searchQuery = {
      text: {
        query: 'Hello',
        path: {
          wildcard: '*',
        },
        // You're free to implement anything that is supported by atlas search
        fuzzy: { maxEdits: 4 },
      },
    }

    const searchResult = await Products.aggregate([
      { $search: searchQuery },
      {
        $project: {
          _id: 1,
        },
      },
    ])

    ids = searchResult.map((product) => product._id.toString())
  } catch (error) {
    console.error('Error performing Atlas search:', error)
  }

  // Fetch Contacts by IDs
  let results = []
  try {
    results = await payload.find({
      collection: 'products',
      where: {
        id: {
          in: ids,
        },
      },
      limit: Number(req.query.limit),
      page: Number(req.query.page),
      user: req.user,
      overrideAccess: false,
    })
    res.json(results)
  } catch (error: any) {
    console.error(error)
    return res.status(error.status).json({
      error: error.message,
    })
  }
}

export default searchProductsHandler
