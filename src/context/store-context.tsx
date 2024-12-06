// 'use client'
// // import { CartItems, Product } from "@/types";
// import React, { createContext, ReactNode, useContext, useState } from 'react'
//
// interface StoreContextType {
//   cartItems: CartItems[]
//   setCartItems: React.Dispatch<React.SetStateAction<CartItems[]>>
//   products: Product[]
//   setProducts: React.Dispatch<React.SetStateAction<Product[]>>
//   addToCart: (item: CartItems) => void
//   refresh: boolean
//   setRefresh: React.Dispatch<React.SetStateAction<boolean>>
// }
//
// const StoreContext = createContext<StoreContextType | undefined>(undefined)
//
// export const StoreProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
//   const [cartItems, setCartItems] = useState<CartItems[]>([])
//   const [refresh, setRefresh] = useState(false)
//   const [products, setProducts] = useState<Product[]>([])
//
//   const addToCart = (item: CartItems) => {
//     setCartItems((prevItems) => [...prevItems, item])
//     setRefresh((prev) => !prev) // Toggle refresh to signal a re-fetch
//   }
//
//   return (
//     <StoreContext.Provider
//       value={{
//         cartItems,
//         setCartItems,
//         products,
//         setProducts,
//         addToCart,
//         refresh,
//         setRefresh,
//       }}
//     >
//       {children}
//     </StoreContext.Provider>
//   )
// }
//
// export const useStore = () => {
//   const context = useContext(StoreContext)
//   if (!context) {
//     throw new Error('useStore must be used within a StoreProvider')
//   }
//   return context
// }
