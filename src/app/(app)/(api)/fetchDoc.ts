import { CART } from '../graphQL/Cart'
import {
  CATEGORY_PRODUCTS,
  PRODUCT,
  SEARCH_VALUE_CATEGORY_PRODUCTS,
  SEARCH_VALUE_PRODUCTS,
  RELATED_PRODUCTS,
  REVIEWS,
} from '../graphQL/Product'
import { ME_USER } from '../graphQL/User'

const queryMap: Record<string, { query: string; key: string }> = {
  product: {
    query: PRODUCT,
    key: 'Product',
  },
  user: {
    query: ME_USER,
    key: 'meUser',
  },
  cart: {
    query: CART,
    key: 'Carts',
  },
  category_products: {
    query: CATEGORY_PRODUCTS,
    key: 'Products',
  },
  searchValue_products: {
    query: SEARCH_VALUE_PRODUCTS,
    key: 'Products',
  },
  searchValue_category_products: {
    query: SEARCH_VALUE_CATEGORY_PRODUCTS,
    key: 'Products',
  },
  related_products: {
    query: RELATED_PRODUCTS,
    key: 'Products',
  },
  reviews: {
    query: REVIEWS,
    key: 'Reviews',
  },
}

export const fetchDoc = async <T>(args: {
  collection: keyof typeof queryMap
  slug?: string
  id?: string
  category?: string
  t?: string[]
}): Promise<T> => {
  const { collection, slug, id, category, t } = args || {}
  if (!queryMap[collection]) throw new Error(`Collection ${collection} not found`)
  if (!id) throw new Error(`ID is required for collection ${collection}`)

  // const url = `${process.env.PAYLOAD_PUBLIC_SERVER_URL}/api/graphql`
  // console.log(process.env.GRAPHQL_ENDPOINT)
  if (slug !== undefined) {
    const doc: T = await fetch(`${process.env.NEXT_PUBLIC_PAYLOAD_SERVER_URL}/api/graphql`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      cache: 'no-store',
      next: { tags: [`${collection}`] },
      body: JSON.stringify({
        query: queryMap[collection].query,
        variables: {
          id, // Pass the ID directly
          slug,
          category,
          t,
        },
      }),
    })
      ?.then((res) => res.json())
      ?.then((res) => {
        console.log(res.data)
        if (res.errors) throw new Error(res.errors[0]?.message || 'Error fetching doc')
        if (collection === 'product') return res?.data?.[queryMap[collection].key]
        if (collection === 'review') return res?.data?.[queryMap[collection].key]
        return res?.data?.[queryMap[collection].key]?.docs
      })
    return doc
  } else {
    const doc: T = await fetch(`http://localhost:3000/api/graphql`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      cache: 'no-store',
      next: { tags: [`${collection}`] },
      body: JSON.stringify({
        query: queryMap[collection].query,
        variables: {
          id, // Pass the ID directly
          slug,
        },
      }),
    })
      ?.then((res) => res.json())
      ?.then((res) => {
        if (res.errors) throw new Error(res.errors[0]?.message || 'Error fetching doc')
        if (collection === 'product') return res?.data?.[queryMap[collection].key]
        if (collection === 'reviews') return res?.data?.[queryMap[collection].key]
        return res?.data?.[queryMap[collection].key]?.docs
      })
    return doc
  }
}
