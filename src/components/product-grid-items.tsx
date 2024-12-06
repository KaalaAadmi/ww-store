import Grid from '@/components/grid'
import { GridTileImage } from '@/components/grid/tile'

import Link from 'next/link'
import { Product } from 'payload-types'

export default function ProductGridItems({ products }: { products: Product[] }) {
  return (
    <>
      {products.map((product: Product) => (
        <Grid.Item key={product.id} className="animate-fadeIn">
          <Link className="relative inline-block h-full w-full" href={`/product/${product.id}`}>
            <GridTileImage
              alt={product.name}
              label={{
                title: product.name,
                amount: product.price.toString(),
                // currencyCode: product.priceRange.maxVariantPrice.currencyCode
              }}
              src={
                typeof product?.images?.[0]?.image === 'object'
                  ? (product.images[0].image.url as string)
                  : '/placeholder-image.webp'
              }
              fill
              sizes="(min-width: 768px) 33vw, (min-width: 640px) 50vw, 100vw"
            />
          </Link>
        </Grid.Item>
      ))}
    </>
  )
}
