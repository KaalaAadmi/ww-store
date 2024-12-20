// 'use client'
import Grid from '@/components/grid'
import ProductGridItems from '@/components/product-grid-items'
import FilterList from '@/components/search/filter'
// import client from '@/graphQL/client'
// import { ALL_PRODUCTS } from '@/graphQL/queries'
import { defaultSort, sorting } from '@/lib/constants'
import { fetchDocs } from '../../(api)/fetchDocs'
import { Product } from 'payload-types'
import { fetchDoc } from '../../(api)/fetchDoc'
import { menu } from 'test-data'
import Link from 'next/link'
import { getPayload } from 'payload'
import payloadConfig from '@payload-config'
import { Suspense } from 'react'
export const dynamic = 'force-dynamic'

const SearchPage = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SearchContent />
    </Suspense>
  )
}

async function SearchContent(props: {
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  const searchParams = await props.searchParams
  console.log('SEARCHPARAMS: ', searchParams)
  const { sort, category, q: searchValue } = searchParams as { [key: string]: string }
  const { sortKey, reverse } = sorting.find((item) => item.slug === sort) || defaultSort
  // const products = await getSearchCollectionProducts({ sortKey, reverse, query: searchValue });
  // const resultsText = products.length > 1 ? 'results' : 'result';
  console.log(
    'SORT KEY:',
    sortKey,
    'REVERSE:',
    reverse,
    'SEARCHVALUE:',
    searchValue,
    'CATEGORY:',
    category,
  )
  let products: Product[] = []
  // searchValue has the category

  if (searchValue === undefined && category === undefined) {
    const productsArray = await fetchDocs<Product[]>('search_products')
    products = productsArray.flat()
  } else if (category !== undefined && searchValue === undefined) {
    console.log('Categoty Here: ', category)
    products = await fetchDoc<Product[]>({
      collection: 'category_products',
      id: category,
    })
    // products = productsArray.flat()
  } else if (searchValue !== undefined && category === undefined) {
    products = await fetchDoc<Product[]>({
      collection: 'searchValue_products',
      id: searchValue,
      // slug: category,
    })
  } else if (category !== undefined && searchValue !== undefined) {
    products = await fetchDoc<Product[]>({
      collection: 'searchValue_category_products',
      id: searchValue,
      slug: category,
    })
  } else {
    products = []
  }
  const resultsText = products?.length > 1 ? 'results' : 'result'
  // console.log('products:', products)
  return (
    <>
      {' '}
      {searchValue && products?.length === 0 ? (
        <div className="mx-auto flex max-w-screen-2xl flex-col gap-8 px-4 pb-4 text-black md:flex-row dark:text-white">
          <p className="mb-4">
            {'There are no products that match '}
            {/* <span className="font-bold">&quot;{searchValue}&quot;</span> */}
          </p>
        </div>
      ) : null}
      {products?.length > 0 ? (
        <div className="mx-auto flex max-w-screen-2xl flex-col gap-8 px-4 pb-4 text-black md:flex-row dark:text-white">
          <div className="order-first w-full flex-none md:max-w-[125px]">
            <p className="pt-4 text-xs text-neutral-500">
              {/* Good place to add other suggested search terms ;) */}
              <p className="hidden text-xs text-neutral-500 md:block dark:text-neutral-400">
                Collections
              </p>
              {/* {menu.length ? ( */}
              <ul className="hidden md:block">
                {menu.map((item) => (
                  <li key={item.title} className="mt-2 flex text-black dark:text-white">
                    <Link
                      href={item.path}
                      prefetch={true}
                      className="w-full text-sm underline-offset-4 hover:underline dark:hover:text-neutral-100"
                    >
                      {item.title}
                    </Link>
                  </li>
                ))}
              </ul>
              {/* ) : null} */}
            </p>
          </div>
          <div className="order-last min-h-screen w-full md:order-none">
            {searchValue ? (
              <p className="mb-4 text-sm text-neutral-500">
                {`Showing ${products.length} ${resultsText} for `}
                <span className="font-bold">&quot;{searchValue}&quot;</span>
              </p>
            ) : null}
            <Grid className="grid-cols-2 lg:grid-cols-3">
              <ProductGridItems products={products} />
            </Grid>
          </div>
          {/* <div className="order-none flex-none md:order-last md:w-[125px]">
            <FilterList list={menu} title="Sort by" />
          </div> */}
          <div className="order-none flex-none md:order-last md:w-[125px]">
            <FilterList list={sorting} title="Sort by" />
          </div>
        </div>
      ) : null}
    </>
  )
}

export default SearchPage
