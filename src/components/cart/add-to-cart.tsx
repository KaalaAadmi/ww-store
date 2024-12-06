'use client'

import { PlusIcon } from '@heroicons/react/24/outline'
import clsx from 'clsx'
// import { addItem } from 'components/cart/actions';
// import LoadingDots from 'components/loading-dots';
// import { Product, ProductVariant } from 'lib/shopware/types';
import { redirect, useSearchParams } from 'next/navigation'
import { useActionState } from 'react'
import { useFormStatus } from 'react-dom'
import LoadingDots from '../loading-dots'
import { useCart } from '@/context/cart-context'
import { Media, Product } from 'payload-types'
import { useAuth } from '@/context/auth-context'
type ProductVariant = {
  productId: string
  userId: string
  name: string
  price: number
  color: string
  size: string
  category: string
  quantity: number
  image: string
}

function SubmitButton({
  product,
  availableForSale,
  selectedVariantId,
}: {
  product: ProductVariant
  availableForSale?: boolean
  selectedVariantId?: string | undefined
}) {
  const { pending } = useFormStatus()
  const buttonClasses =
    'relative flex w-full items-center justify-center rounded-full bg-blue-600 p-4 tracking-wide text-white'
  const disabledClasses = 'cursor-not-allowed opacity-60 hover:opacity-60'
  const { addToCart } = useCart()
  const { user } = useAuth()
  const handleAddToCart = (product: ProductVariant) => {
    event?.preventDefault()
    if (!user) {
      redirect('/sign-in')
    } else {
      const p = { ...product, user: user }
      addToCart(p)
    }
  }
  //   if (!availableForSale) {
  //     return (
  //       <button aria-disabled className={clsx(buttonClasses, disabledClasses)}>
  //         Out Of Stock
  //       </button>
  //     )
  //   }

  //   if (!selectedVariantId) {
  //     return (
  //       <button aria-label="Please select an option" aria-disabled className={clsx(buttonClasses)}>
  //         <div className="absolute left-0 ml-4">
  //           <PlusIcon className="h-5" />
  //         </div>
  //         Add To Cart
  //       </button>
  //     )
  //   }

  return (
    <button
      onClick={() => handleAddToCart(product)}
      aria-label="Add to cart"
      aria-disabled={pending}
      className={clsx(buttonClasses, {
        'hover:opacity-90': true,
        [disabledClasses]: pending,
      })}
    >
      <div className="absolute left-0 ml-4">
        {pending ? <LoadingDots className="mb-3 bg-white" /> : <PlusIcon className="h-5" />}
      </div>
      Add To Cart
    </button>
  )
}

export function AddToCart({
  product,
  //   variants,
  availableForSale,
}: {
  product: ProductVariant
  //   variants: ProductVariant[]
  availableForSale?: boolean
}) {
  //   const [message, formAction] = useActionState(addItem, null)
  //   const searchParams = useSearchParams()
  //   const defaultVariantId = variants.length === 1 ? variants[0]?.id : product.id
  //   const variant = variants.find((variant) =>
  //     variant.selectedOptions.every(
  //       (option) => option.value === searchParams.get(option.name.toLowerCase()),
  //     ),
  //   )
  //   const selectedVariantId = variant?.id || defaultVariantId
  //   const actionWithVariant = formAction.bind(null, selectedVariantId)

  return (
    <form>
      <SubmitButton product={product} />
      {/* <div className="flex items-center px-4 py-3 text-sm font-bold text-black">
        <p aria-live="polite" className="h-6" role="status">
          {message}
        </p>
      </div> */}
    </form>
  )
}
