import Link from 'next/link'
import { GridTileImage } from '@/components/grid/tile'
import { Product } from 'payload-types'
import { fetchDocs } from '@/app/(app)/(api)/fetchDocs'

function ThreeItemGridItem({
  item,
  size,
  priority,
}: {
  item: Product | null
  size: 'full' | 'half'
  priority?: boolean
}) {
  return (
    <div
      className={size === 'full' ? 'md:col-span-4 md:row-span-2' : 'md:col-span-2 md:row-span-1'}
    >
      <Link className="relative block aspect-square h-full w-full" href={`/product/${item?.id}`}>
        <GridTileImage
          src={
            typeof item?.images?.[0]?.image === 'object' && item.images[0].image.url
              ? item.images[0].image.url
              : ''
          }
          fill
          sizes={
            size === 'full' ? '(min-width: 768px) 66vw, 100vw' : '(min-width: 768px) 33vw, 100vw'
          }
          priority={priority}
          alt={item?.name || ''}
          label={{
            position: size === 'full' ? 'center' : 'bottom',
            title: item?.name as string,
            amount: item?.price.toString() || '0',
            // currencyCode: item.
          }}
        />
      </Link>
    </div>
  )
}

export async function ThreeItemGrid() {
  const productsArray = await fetchDocs<Product[]>('featured_tile_products')
  const products = productsArray.flat()
  return (
    <section className="mx-auto grid max-w-screen-2xl gap-4 px-4 pb-4 md:grid-cols-6 md:grid-rows-2 lg:max-h-[calc(100vh-200px)]">
      <ThreeItemGridItem size="full" item={products?.[0]} priority={true} />
      <ThreeItemGridItem size="half" item={products?.[1]} priority={true} />
      <ThreeItemGridItem size="half" item={products?.[2]} />
    </section>
  )
}
