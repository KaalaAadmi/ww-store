// 'use client'
// import { useEffect, useState } from 'react'
// // import { CartItems } from "@/lib/types";
// import { useStore } from '@/context/store-context'
// // import { useStore } from "@/context/StoreContext"; // Import the cart context
//
// export const useFetchCartItems = (userId: string) => {
//   // const [items, setItems] = useState<ItemCart[]>([]);
//   const { cartItems, setCartItems, refresh } = useStore()
//
//   const fetchCartItems = async () => {
//     if (!userId) return
//     try {
//       const response = await fetch(
//         `${process.env.PAYLOAD_PUBLIC_SERVER_URL}/api/cart?userId=${userId}`,
//       )
//       if (response.ok) {
//         const data = await response.json()
//         setCartItems(data.cartItems)
//       } else {
//         console.log('Failed to fetch cart items')
//       }
//     } catch (error) {
//       console.log('Error fetching cart items:', error)
//     }
//   }
//
//   useEffect(() => {
//     fetchCartItems()
//   }, [userId, refresh]) // Add `refresh` as a dependency
//
//   return { cartItems, fetchCartItems }
// }
