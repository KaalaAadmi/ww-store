// import { useEffect } from 'react'
// import { GraphQLClient } from 'graphql-request'
// import useProductStore, { ProductStoreState } from '../store/useProducts'
// import { PRODUCTS } from '../graphQL/Product'
// // import { ALL_PRODUCTS } from '@/graphQL/queries'
// // import useProductStore from './useProductStore';

// const GRAPHQL_ENDPOINT = `${process.env.NEXT_PUBLIC_API_URL}/api/graphql` // Replace with your GraphQL endpoint
// console.log(GRAPHQL_ENDPOINT)
// const client = new GraphQLClient(GRAPHQL_ENDPOINT)

// export const useFetchProducts = () => {
//   const { products, setProducts } = useProductStore() as ProductStoreState

//   useEffect(() => {
//     const fetchProducts = async () => {
//       try {
//         const data: { products: any[] } = await client.request(PRODUCTS)
//         console.log('RESPONSE DATA: ', data)
//         setProducts(data?.products || [])
//       } catch (error) {
//         console.error('Failed to fetch products:', error)
//       }
//     }

//     fetchProducts()
//   }, [])
// }
