import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

import { GridTileImage } from '@/components/grid/tile'
// import Footer from '@/components/layout/footer';
import { Gallery } from '@/components/product/gallery'
import { ProductProvider } from '@/components/product/product-context'
import { ProductDescription } from '@/components/product/product-description'
// import { HIDDEN_PRODUCT_TAG } from '@/lib/constants'
// import { getProduct, getProductRecommendations } from 'lib/shopware';
// import { Image } from 'lib/shopware/types';
// import Link from 'next/link'
import { Suspense } from 'react'
import Footer from '@/components/footer'
import { Product, Review } from 'payload-types'
import { fetchDoc } from '@/app/(app)/(api)/fetchDoc'
import Link from 'next/link'

export async function generateMetadata(props: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const params = await props.params
  const { slug } = params
  const product = await fetchDoc<Product>({ collection: 'product', id: slug })

  // @ToDo: create a simpler function and do not do the heavy options/variant stuff here

  if (!product) return notFound()

  const image =
    typeof product?.images?.[0]?.image === 'object' ? product.images[0].image : undefined
  const { url, height, width, text } = image || {}
  // const indexable = !product.tags.includes(HIDDEN_PRODUCT_TAG)

  return {
    title: product?.name,
    description: product?.descriptionPara1,
    // robots: {
    //   index: indexable,
    //   follow: indexable,
    //   googleBot: {
    //     index: indexable,
    //     follow: indexable,
    //   },
    // },
    openGraph: url
      ? {
          images: [
            {
              url,
              width: width ?? undefined,
              height: height ?? undefined,
              alt: text || '',
            },
          ],
        }
      : null,
  }
}
export type Image = {
  url: string
  text: string
}
export default async function ProductPage(props: { params: Promise<{ slug: string }> }) {
  const params = await props.params
  const { slug } = params
  // console.log(slug)
  // const product = await getProduct(params.handle);
  // const prodId = '673b8ad739464bdc9a59bea4'
  let product = await fetchDoc<Product>({ collection: 'product', id: slug })
  // console.log('PRODUCT IN PAGE:', product)
  product = { ...product, id: slug }
  if (!product) return notFound()
  // convert tags into a string array
  const tags =
    product.tags?.flatMap((tag) => (tag?.tag ? [tag.tag] : [])) || // Ensure only valid strings are added
    []
  console.log('PRODUCT ID:', product.id)
  const reviews = await fetchDoc<Review[]>({
    collection: 'reviews',
    id: product.id,
  })
  console.log('REVIEWS', reviews)
  // console.log('Processed Tags:', tags) // Debug to confirm
  // const pt = product.tags!
  // let tags: string[] = []

  // for (let i = 0; i < pt.length; i++) {
  //   if (pt[i].tag) {
  //     tags.push(pt[i].tag as string)
  //   }
  // }

  // const productJsonLd = {
  //   '@context': 'https://schema.org',
  //   '@type': 'Product',
  //   name: product?.name,
  //   description: product?.descriptionPara1,
  //   image:
  //     typeof product?.images?.[0]?.image === 'object' ? product?.images[0].image.url : undefined,
  //   offers: {
  //     // "@type": "AggregateOffer",
  //     // availability: product.availableForSale
  //     // ? "https://schema.org/InStock"
  //     // : "https://schema.org/OutOfStock",
  //     priceCurrency: product?.price,
  //     // highPrice: product.priceRange.maxVariantPrice.amount,
  //     // lowPrice: product.priceRange.minVariantPrice.amount,
  //   },
  // }

  return (
    <ProductProvider>
      {/* <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(productJsonLd),
        }}
      /> */}
      <div className="mx-auto max-w-screen-2xl px-4">
        <div className="flex flex-col rounded-lg border border-neutral-200 bg-white p-8 md:p-12 lg:flex-row lg:gap-8 dark:border-neutral-800 dark:bg-black">
          <div className="h-full w-full basis-full lg:basis-4/6">
            <Suspense
              fallback={
                <div className="relative aspect-square h-full max-h-[550px] w-full overflow-hidden" />
              }
            >
              <Gallery
                images={
                  product?.images?.slice(0, 5).map((image) => ({
                    src: typeof image.image === 'object' && image.image.url ? image.image.url : '',
                    altText:
                      typeof image.image === 'object' && image.image.text ? image.image.text : '',
                  })) || []
                }
              />
            </Suspense>
          </div>

          <div className="basis-full lg:basis-2/6">
            <Suspense fallback={null}>
              <ProductDescription product={product} />
            </Suspense>
          </div>
        </div>
        <RelatedProducts id={product.id} tags={product.tags ?? []} />
      </div>
      <Footer />
    </ProductProvider>
  )
}
// TODO: Add related products
async function RelatedProducts({
  id,
  tags,
}: {
  id: string
  tags: { tag?: string | null | undefined; id?: string | null | undefined }[]
}) {
  let relatedProducts: Product[] = []
  const tag = tags.map((tag) => tag.tag).filter((t): t is string => t !== null && t !== undefined)
  // console.log('tag:', tag)
  const body = { id: id, tags: tag }
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/related-products`, {
      method: 'POST',
      body: JSON.stringify(body),
    })
    relatedProducts = await response.json()
  } catch (error) {
    console.log(error)
    return null
  }
  // console.log('relatedProducts:', relatedProducts)
  if (relatedProducts.length === 0) return null

  return (
    <div className="py-8">
      <h2 className="mb-4 text-2xl font-bold">Related Products</h2>
      <ul className="flex w-full gap-4 overflow-x-auto pt-1">
        {relatedProducts.map((product) => (
          <li
            key={product.id}
            className="aspect-square w-full flex-none min-[475px]:w-1/2 sm:w-1/3 md:w-1/4 lg:w-1/5"
          >
            <Link
              className="relative h-full w-full"
              prefetch={true}
              role="link"
              href={`/product/${product.id}`}
            >
              <GridTileImage
                alt={product.name}
                label={{
                  title: product.name,
                  amount: product.price.toString(),
                  // currencyCode: product.priceRange.maxVariantPrice.currencyCode,
                }}
                src={
                  typeof product.images?.[0]?.image === 'object' && product.images[0].image.url
                    ? product.images[0].image.url
                    : ''
                }
                fill
                sizes="(min-width: 1024px) 20vw, (min-width: 768px) 25vw, (min-width: 640px) 33vw, (min-width: 475px) 50vw, 100vw"
              />
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}
