import { CART } from '../graphQL/Cart'
import {
  // CATEGORY_PRODUCTS,
  FEATURED_PRODUCTS,
  FEATURED_TILE_PRODUCTS,
  // PRODUCT,
  SEARCH_PRODUCTS,
  SEARCH_VALUE_PRODUCTS,
} from '../graphQL/Product'
// import { Config } from 'payload'

const queryMap: Record<string, { query: string; key: string }> = {
  search_products: {
    query: SEARCH_PRODUCTS,
    key: 'Products',
  },
  // category_products: {
  //   query: CATEGORY_PRODUCTS,
  //   key: 'Products',
  // },
  featured_tile_products: {
    query: FEATURED_TILE_PRODUCTS,
    key: 'Products',
  },
  featured_products: {
    query: FEATURED_PRODUCTS,
    key: 'Products',
  },
  cart: {
    query: CART,
    key: 'Carts',
  },
  // product: {
  //   query: PRODUCT,
  //   key: 'Products',
  // },
}

export const fetchDocs = async <T>(
  collection: keyof typeof queryMap,
  id?: string,
): Promise<T[]> => {
  if (!queryMap[collection]) throw new Error(`Collection ${collection} not found`)
  // console.log(queryMap[collection].query)
  const docs: T[] = await fetch(`${process.env.NEXT_PUBLIC_PAYLOAD_SERVER_URL}/api/graphql`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    cache: 'no-store',
    credentials: 'include',
    next: { tags: [collection] },
    body: JSON.stringify({
      query: queryMap[collection].query,
      variables: {
        depth: 3,
        id, // Pass the ID directly
      },
    }),
  })
    ?.then((res) => res.json())
    ?.then((res) => {
      if (res.errors) throw new Error(res?.errors?.[0]?.message ?? 'Error fetching docs')
      // console.log('RESPONSE FROM FETCHDOCS: ', res?.data?.[queryMap[collection].key])
      return res?.data?.[queryMap[collection].key]?.docs
    })

  return docs
}
