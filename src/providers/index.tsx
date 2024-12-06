'use client'

import React from 'react'
import { AuthProvider, useAuth } from '@/context/auth-context'
import CartProviderWithUser from './cart-provider'
import { CartProvider } from '@/context/cart-context'
// import { CartProvider } from '@/context/cart-context'

export const Providers: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <AuthProvider>
      {/* <CartProviderWithUser> */}
      <CartProvider>{children}</CartProvider>
      {/* </CartProviderWithUser> */}
    </AuthProvider>
  )
}
