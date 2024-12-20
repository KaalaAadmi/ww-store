export type SortFilterItem = {
  title: string
  slug: string | null
  sortKey: 'RELEVANCE' | 'BEST_SELLING' | 'CREATED_AT' | 'PRICE'
  reverse: boolean
}

export interface ContactInfoProps {
  title: string
  description: string
}

export interface ContactMethodProps {
  icon?: string
  value: string
  label: string
}

export interface FormFieldProps {
  id: string
  type: string
  placeholder: string
  className?: string
}

export const defaultSort: SortFilterItem = {
  title: 'Relevance',
  slug: null,
  sortKey: 'RELEVANCE',
  reverse: false,
}

export const sorting: SortFilterItem[] = [
  defaultSort,
  {
    title: 'Trending',
    slug: 'trending-desc',
    sortKey: 'BEST_SELLING',
    reverse: false,
  }, // asc
  {
    title: 'Latest arrivals',
    slug: 'latest-desc',
    sortKey: 'CREATED_AT',
    reverse: true,
  },
  {
    title: 'Price: Low to high',
    slug: 'price-asc',
    sortKey: 'PRICE',
    reverse: false,
  }, // asc
  {
    title: 'Price: High to low',
    slug: 'price-desc',
    sortKey: 'PRICE',
    reverse: true,
  },
]

export const TAGS = {
  collections: 'collections',
  products: 'products',
  cart: 'cart',
}

// ToDo: Should work with visability from product data
export const HIDDEN_PRODUCT_TAG = 'nextjs-frontend-hidden'
export const DEFAULT_OPTION = 'Default Title'
