'use client'

import { Dialog, Transition } from '@headlessui/react'
import { ExclamationTriangleIcon, ShoppingCartIcon } from '@heroicons/react/24/outline'
import { DEFAULT_OPTION } from '@/lib/constants'
// import { createUrl } from '@/lib/utils'
import Image from 'next/image'
import Link from 'next/link'
import { Fragment, useEffect, useRef, useState } from 'react'
import OpenCart from './open-cart'
import Price from '../price'
import CloseCart from './close-cart'
import { EditItemQuantityButton } from './edit-item-quantity-button'
// import { cart } from 'test-data'
// import { DeleteItemButton } from './delete-item-button'
// import { useStore } from '@/context/store-context'
import { DeleteItemButton } from './delete-item-button'
import { useCart } from '@/context/cart-context'
// import { useStore } from '@/context/StoreContext'

// type MerchandiseSearchParams = {
//   [key: string]: string
// }

export default function CartModal() {
  const { cartItems, updateCartItem, removeFromCart } = useCart()
  console.log('CARTITEMS:', cartItems)
  // const cart = cartItems
  // const [cart, setCart] = useState(cartItems)
  // const { cartItems } = useStore()
  // const cart = []

  const [isOpen, setIsOpen] = useState<boolean>(false)
  const quantityRef = useRef(cartItems?.length || 0)
  const openCart = () => setIsOpen(true)
  const closeCart = () => setIsOpen(false)
  let totalQuantity = 0
  cartItems.forEach((item) => (totalQuantity += item.quantity))
  //   useEffect(() => {
  //     if (!cart) {
  //       createCartAndSetCookie();
  //     }
  //   }, [cart]);
  // console.log('CART:', cart)
  // useEffect(() => {
  //   if (cartItems?.length && cartItems?.length !== quantityRef.current && cartItems?.length > 0) {
  //     if (!isOpen) {
  //       setIsOpen(true)
  //     }
  //     quantityRef.current = cartItems?.length
  //   }
  // }, [isOpen, quantityRef, totalQuantity, cartItems])
  let cartTotal = 0
  if (cartItems) cartTotal = cartItems?.reduce((total, item) => total + item?.price, 0)
  return (
    <>
      <button aria-label="Open cart" onClick={openCart}>
        <OpenCart quantity={totalQuantity} />
      </button>
      <Transition show={isOpen}>
        <Dialog onClose={closeCart} className="relative z-50">
          <Transition.Child
            as={Fragment}
            enter="transition-all ease-in-out duration-300"
            enterFrom="opacity-0 backdrop-blur-none"
            enterTo="opacity-100 backdrop-blur-[.5px]"
            leave="transition-all ease-in-out duration-200"
            leaveFrom="opacity-100 backdrop-blur-[.5px]"
            leaveTo="opacity-0 backdrop-blur-none"
          >
            <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
          </Transition.Child>
          <Transition.Child
            as={Fragment}
            enter="transition-all ease-in-out duration-300"
            enterFrom="translate-x-full"
            enterTo="translate-x-0"
            leave="transition-all ease-in-out duration-200"
            leaveFrom="translate-x-0"
            leaveTo="translate-x-full"
          >
            <Dialog.Panel className="fixed bottom-0 right-0 top-0 flex h-full w-full flex-col border-l border-neutral-200 bg-white/80 p-6 text-black backdrop-blur-xl md:w-[390px] dark:border-neutral-700 dark:bg-black/80 dark:text-white">
              <div className="flex items-center justify-between">
                <p className="text-lg font-semibold">My Cart</p>
                <button aria-label="Close cart" onClick={closeCart}>
                  <CloseCart />
                </button>
              </div>

              {!cartItems || cartItems.length === 0 ? (
                <div className="mt-20 flex w-full flex-col items-center justify-center overflow-hidden">
                  <div className="relative mb-4 h-60 w-60 text-muted-foreground">
                    {/* <ShoppingCartIcon className="h-16" /> */}
                    <Image
                      src="/hippo-empty-cart.png"
                      fill
                      alt="empty shopping cart hippo"
                      className="bg-inherit"
                    />
                  </div>
                  <p className="mt-6 text-center text-2xl font-bold">Your cart is empty.</p>
                </div>
              ) : (
                <div className="flex h-full flex-col justify-between overflow-hidden p-1">
                  <ul className="flex-grow overflow-auto py-4">
                    {cartItems
                      ?.sort((a, b) => a?.productId?.id.localeCompare(b?.productId?.id))
                      ?.map((item, i) => {
                        return (
                          <li
                            key={i}
                            className="flex w-full flex-col border-b border-neutral-300 dark:border-neutral-700"
                          >
                            <div className="relative flex w-full flex-row justify-between px-1 py-4">
                              <div className="absolute z-40 -ml-1 -mt-2">
                                <DeleteItemButton item={item} optimisticUpdate={removeFromCart} />
                              </div>
                              <div className="flex flex-row">
                                <div className="relative h-16 w-16 overflow-hidden rounded-md border border-neutral-300 bg-neutral-300 dark:border-neutral-700 dark:bg-neutral-900 dark:hover:bg-neutral-800">
                                  <Image
                                    className="h-full w-full object-cover"
                                    width={64}
                                    height={64}
                                    alt={item?.productId?.name}
                                    src={item?.image as string}
                                  />
                                </div>
                                <Link
                                  //   href={merchandiseUrl}
                                  href={'#'}
                                  onClick={closeCart}
                                  className="z-30 ml-2 flex flex-row space-x-4"
                                >
                                  <div className="flex flex-1 flex-col text-base">
                                    <span className="leading-tight">{item?.productId?.name}</span>
                                    {item.name !== DEFAULT_OPTION ? (
                                      <p className="text-sm text-neutral-500 dark:text-neutral-400">
                                        {item.name}
                                      </p>
                                    ) : null}
                                  </div>
                                </Link>
                              </div>
                              <div className="flex h-16 flex-col justify-between">
                                <Price
                                  className="flex justify-end space-y-2 text-right text-sm"
                                  amount={item.price.toString()}
                                  //   currencyCode={
                                  //     item.cost.totalAmount.currencyCode
                                  //   }
                                />
                                <div className="ml-auto flex h-9 flex-row items-center rounded-full border border-neutral-200 dark:border-neutral-700">
                                  <EditItemQuantityButton
                                    item={item}
                                    type="minus"
                                    optimisticUpdate={updateCartItem}
                                  />
                                  <p className="w-6 text-center">
                                    <span className="w-full text-sm">{item.quantity}</span>
                                  </p>
                                  <EditItemQuantityButton
                                    item={item}
                                    type="plus"
                                    optimisticUpdate={updateCartItem}
                                  />
                                </div>
                              </div>
                            </div>
                          </li>
                        )
                      })}
                  </ul>
                  <div className="py-4 text-sm text-neutral-500 dark:text-neutral-400">
                    <div className="mb-3 flex items-center justify-between border-b border-neutral-200 pb-1 dark:border-neutral-700">
                      <p>Taxes</p>
                      <Price
                        className="text-right text-base text-black dark:text-white"
                        amount={cartTotal.toString()}
                        // currencyCode={cart?.cost?.totalTaxAmount.currencyCode}
                      />
                    </div>
                    <div className="mb-3 flex items-center justify-between border-b border-neutral-200 pb-1 pt-1 dark:border-neutral-700">
                      <p>Shipping</p>
                      <p className="text-right">Calculated at checkout</p>
                    </div>
                    <div className="mb-3 flex items-center justify-between border-b border-neutral-200 pb-1 pt-1 dark:border-neutral-700">
                      <p>Total</p>
                      {/* TODO */}
                      <Price
                        className="text-right text-base text-black dark:text-white"
                        amount={cartItems?.cost?.totalAmount.amount}
                        currencyCode={cartItems?.cost?.totalAmount.currencyCode}
                      />
                    </div>
                  </div>
                  <div className="mb-4 h-8 text-center">
                    <ExclamationTriangleIcon className="mr-2 inline h-8 text-red-600" />
                    <span className="inline">
                      Checkout not included.{' '}
                      <a
                        className="underline"
                        target="_blank"
                        rel="noopener"
                        href="https://github.com/shopwareLabs/vercel-commerce#checkout-functionality"
                      >
                        Read more.
                      </a>
                    </span>
                  </div>
                  <a
                    href={cartItems.checkoutUrl}
                    className="block w-full rounded-full bg-blue-600 p-3 text-center text-sm font-medium text-white opacity-90 hover:opacity-100"
                  >
                    Proceed to Checkout
                  </a>
                </div>
              )}
            </Dialog.Panel>
          </Transition.Child>
        </Dialog>
      </Transition>
    </>
  )
}

// function CheckoutButton() {
//   const { pending } = useFormStatus();

//   return (
//     <button
//       className="block w-full rounded-full bg-blue-600 p-3 text-center text-sm font-medium text-white opacity-90 hover:opacity-100"
//       type="submit"
//       disabled={pending}
//     >
//       {pending ? <LoadingDots className="bg-white" /> : 'Proceed to Checkout'}
//     </button>
//   );
// }
