'use client'

import Price from '@/components/price'
import Prose from '@/components/prose'
import { Suspense, useState, ReactNode, useEffect } from 'react'
import { VariantSelector } from './variant-selector'
import { Product } from 'payload-types'
import { AddToCart } from '../cart/add-to-cart'
import { useAuth } from '@/context/auth-context'
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from '@/components/ui/accordion'

type Highlight = {
  highlight?: string | null
  id?: string | null
}
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
  highlights?: Highlight[] | null
}

export function ProductDescription({ product }: { product: Product }) {
  const [activeColor, setActiveColor] = useState<string | null>(null)
  const [activeSize, setActiveSize] = useState<string | null>(null)
  const { user } = useAuth()

  const productData: ProductVariant = {
    productId: product?.id as string,
    userId: user?.id as string,
    name: product?.name,
    price: product?.price,
    color: activeColor ?? '',
    size: activeSize ?? '',
    category: product?.category,
    quantity: 1,
    image:
      typeof product?.images?.[0]?.image === 'object' && product.images[0].image.url
        ? product.images[0].image.url
        : '',
    highlights: product?.highlights,
  }

  return (
    <>
      <div className="mb-6 flex flex-col border-b pb-6 dark:border-neutral-700">
        <h1 className="mb-2 text-5xl font-medium">{product.name}</h1>
        <div className="mr-auto w-auto rounded-full bg-blue-600 p-2 text-sm text-white">
          <Price amount={product.price.toString()} />
        </div>
      </div>

      <Suspense fallback={null}>
        <VariantSelector
          colors={product?.colors ?? []}
          sizes={product?.sizes ?? []}
          category={product?.category ?? ''}
          activeColor={activeColor}
          activeSize={activeSize}
          setActiveColor={setActiveColor}
          setActiveSize={setActiveSize}
        />
      </Suspense>

      <Suspense fallback={null}>
        <AddToCart product={productData} />
      </Suspense>

      {/* Accordion Section */}
      <Accordion type="single" defaultValue="description" collapsible>
        <AccordionItem value="description">
          <AccordionTrigger>Description</AccordionTrigger>
          <AccordionContent>
            {product.descriptionPara1 && (
              <Prose
                className="m-6 mt-3 max-h-96 overflow-y-auto text-sm leading-tight dark:text-white/[60%]"
                html={product.descriptionPara1}
              />
            )}
            {product.descriptionPara2 && (
              <Prose
                className="m-6 mt-3 max-h-96 overflow-y-auto text-sm leading-tight dark:text-white/[60%]"
                html={product.descriptionPara2}
              />
            )}
            {product.descriptionPara3 && (
              <Prose
                className="m-6 mt-3 max-h-96 overflow-y-auto text-sm leading-tight dark:text-white/[60%]"
                html={product.descriptionPara3}
              />
            )}
          </AccordionContent>
        </AccordionItem>

        {product.highlights !== null &&
          product.highlights !== undefined &&
          product.highlights.length !== 0 && (
            <AccordionItem value="highlights">
              <AccordionTrigger>Highlights</AccordionTrigger>
              <AccordionContent>
                {/* Replace with actual highlights content */}
                <ul className=" list-inside list-disc">
                  {product.highlights?.map((highlight) => (
                    <li key={highlight.id}>{highlight.highlight}</li>
                  ))}
                </ul>
                {/* <p>Highlights about the product go here.</p> */}
              </AccordionContent>
            </AccordionItem>
          )}

        {product.category.toLowerCase() !== 'poster' && (
          <AccordionItem value="fabric-and-care">
            <AccordionTrigger>Fabric and Care</AccordionTrigger>
            <AccordionContent>
              {/* Replace with actual fabric and care content */}
              <p>Fabric and care instructions go here.</p>
            </AccordionContent>
          </AccordionItem>
        )}
      </Accordion>
    </>
  )
}
