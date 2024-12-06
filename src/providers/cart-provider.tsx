'use client'

import React, { useEffect, useState } from 'react'
import { useAuth } from '@/context/auth-context'
import { CartProvider } from '@/context/cart-context'

const CartProviderWithUser: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user } = useAuth()
  const [userId, setUserId] = useState<string | undefined>(undefined)
  const [isHydrated, setIsHydrated] = useState(false)

  // Ensure hydration is complete
  useEffect(() => {
    setIsHydrated(true)
  }, [])

  // Set userId when a user is logged in
  useEffect(() => {
    setUserId(user?.id || undefined)
  }, [user])

  // Render after hydration to avoid SSR mismatch
  if (!isHydrated) {
    return null // Ensure no UI is rendered until hydration completes
  }

  return <CartProvider>{children}</CartProvider>
}

export default CartProviderWithUser
