'use client'

import { fetchDoc } from '@/app/(app)/(api)/fetchDoc'
import { fetchDocs } from '@/app/(app)/(api)/fetchDocs'
import { User as UserIcon } from 'lucide-react'
import { Cart, User } from 'payload-types'
import React, { createContext, useContext, useState, useEffect } from 'react'
import { set } from 'react-hook-form'

type CartItem = {
  id?: string
  productId: string
  //   user?.id?: string
  user: User
  name: string
  price: number
  color: string
  size: string
  category: string
  quantity: number
  image: string
}

interface CartContextType {
  cartItems: Cart[]
  addToCart: (item: CartItem) => Promise<void>
  removeFromCart: (item: CartItem) => Promise<void>
  updateCartItem: (itemId: string, newQuantity: number) => Promise<void>
  deleteCartItem: (itemId: string) => Promise<void>
  emptyCart: () => Promise<void>
  fetchCartItems: () => Promise<void>
}

export const CartContext = createContext<CartContextType | null>(null)

export const CartProvider = ({
  //   user?.id,
  children,
}: {
  //   user?.id?: string
  children: React.ReactNode
}) => {
  const [cartItems, setCartItems] = useState<Cart[]>([])
  let user = undefined
  try {
    user = JSON.parse(localStorage.getItem('user') || '{}')
  } catch (error) {}

  const fetchCartItems = async () => {
    if (user === JSON.parse('{}')) setCartItems([])
    try {
      if (user?.id) {
        // Fetch cart items for the logged-in user from the database
        const items = await fetchDoc<Cart[]>({ collection: 'cart', id: user?.id })
        setCartItems(items || [])
        // Merge items from localStorage if any exist
        const localStorageCart = localStorage.getItem('cart')
        if (localStorageCart) {
          const localCartItems: CartItem[] = JSON.parse(localStorageCart)
          for (const item of localCartItems) {
            await addToCart({ ...item, user: user })
          }
          localStorage.removeItem('cart')
        }
      } else {
        // Fetch cart items from localStorage for unauthenticated users
        const storedCart = localStorage.getItem('cart')
        setCartItems(storedCart ? JSON.parse(storedCart) : [])
      }
    } catch (error) {
      console.error('Error fetching cart items:', error)
      setCartItems([])
    }
  }

  const syncLocalStorage = () => {
    if (!user?.id) {
      localStorage.setItem('cart', JSON.stringify(cartItems))
    }
  }

  useEffect(() => {
    fetchCartItems()
  }, [user?.id])

  useEffect(() => {
    syncLocalStorage()
  }, [cartItems])

  const addToCart = async (item: CartItem) => {
    try {
      if (user?.id) {
        const response = await fetch('/api/carts', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(item),
          credentials: 'include',
        })
        if (!response.ok) throw new Error('Failed to add cart item')
        fetchCartItems()
      } else {
        setCartItems((prev) => {
          const existingItem = prev.find(
            (cartItem) =>
              cartItem.productId === item.productId &&
              cartItem.color === item.color &&
              cartItem.size === item.size,
          )
          if (existingItem) {
            existingItem.quantity += item.quantity
            return [...prev]
          }
          return [...prev, item]
        })
      }
    } catch (err) {
      console.error('Error in addToCart:', err)
    }
  }

  const removeFromCart = async (item: CartItem) => {
    event?.preventDefault()
    try {
      if (user?.id) {
        // Remove item for authenticated user
        const response = await fetch(`/api/carts/${item.id}`, {
          method: 'DELETE',
          credentials: 'include',
        })
        if (!response.ok) throw new Error('Failed to remove cart item')
        fetchCartItems()
      } else {
        setCartItems((prev) =>
          prev.filter(
            (cartItem) =>
              cartItem.productId !== item.productId ||
              cartItem.color !== item.color ||
              cartItem.size !== item.size,
          ),
        )
      }
    } catch (err) {
      console.error('Error in removeFromCart:', err)
    }
  }

  const updateCartItem = async (itemId: string, newQuantity: number) => {
    event?.preventDefault()
    try {
      if (user?.id) {
        const response = await fetch(`/api/carts/${itemId}`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ quantity: newQuantity }),
          credentials: 'include',
        })
        if (!response.ok) throw new Error('Failed to update cart item')
        fetchCartItems()
      } else {
        setCartItems((prev) =>
          prev.map((cartItem) =>
            cartItem.id === itemId ? { ...cartItem, quantity: newQuantity } : cartItem,
          ),
        )
      }
    } catch (err) {
      console.error('Error in updateCartItem:', err)
    }
  }

  const deleteCartItem = async (itemId: string) => {
    try {
      if (user?.id) {
        const response = await fetch(`/api/carts/${itemId}`, {
          method: 'DELETE',
          credentials: 'include',
        })
        if (!response.ok) throw new Error('Failed to delete cart item')
      } else {
        setCartItems((prev) => prev.filter((cartItem) => cartItem.id !== itemId))
      }
    } catch (err) {
      console.error('Error in deleteCartItem:', err)
    }
  }

  const emptyCart = async () => {
    try {
      if (user?.id) {
        const promises = cartItems.map((item) =>
          fetch(`/api/carts/${item.id}`, {
            method: 'DELETE',
            credentials: 'include',
          }),
        )
        await Promise.all(promises)
      }
      setCartItems([])
      if (!user?.id) {
        localStorage.removeItem('cart')
      }
    } catch (err) {
      console.error('Error in emptyCart:', err)
    }
  }

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateCartItem,
        deleteCartItem,
        emptyCart,
        fetchCartItems,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export const useCart = () => {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error('useCart must be used within a CartProvider')
  }
  return context
}
