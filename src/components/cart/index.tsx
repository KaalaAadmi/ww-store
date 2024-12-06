'use client'
import { useAuth } from '@/context/auth-context'
// import { getCart } from 'components/cart/actions';
// import { useFetchCartItems } from '@/hooks/use-cart'
import CartModal from './modal'
import { useCart } from '@/context/cart-context'
// import CartModal from './modal';

export default function Cart() {
  let cart
  const { user } = useAuth()
  // const {id} = useUser()
  //   const resCart = await getCart();
  // const resCart = useFetchCartItems(userId)
  const { cartItems } = useCart()
  if (cartItems) {
    cart = cartItems
  }
  if (!cart) {
    return null
  }
  // @ts-expect-error cart is not null
  return <CartModal cart={cart} />
}
