import { Product } from 'payload-types'
import { create } from 'zustand'
export interface ProductStoreState {
  products: Product[]
  setProducts: (products: Product[]) => void
}
const useProductStore = create(
  (set): ProductStoreState => ({
    products: [], // Initial state for products
    setProducts: (products: Product[]) => set({ products }), // Action to set products
  }),
)

export default useProductStore
