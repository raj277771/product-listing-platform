import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { CartItem, Product } from '@/types'

interface SearchState {
  searchTerm: string
  selectedCategory: string
  setSearchTerm: (term: string) => void
  setSelectedCategory: (category: string) => void
  clearFilters: () => void
}

interface CartState {
  items: CartItem[]
  addItem: (product: Product, quantity?: number) => void
  removeItem: (productId: string) => void
  updateQuantity: (productId: string, quantity: number) => void
  clearCart: () => void
  getTotalItems: () => number
  getTotalPrice: () => number
}

interface ModalState {
  isOpen: boolean
  selectedProduct: Product | null
  openModal: (product: Product) => void
  closeModal: () => void
}

export const useSearchStore = create<SearchState>((set) => ({
  searchTerm: '',
  selectedCategory: '',
  setSearchTerm: (term) => set({ searchTerm: term }),
  setSelectedCategory: (category) => set({ selectedCategory: category }),
  clearFilters: () => set({ searchTerm: '', selectedCategory: '' }),
}))

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      addItem: (product, quantity = 1) => {
        const items = get().items
        const existingItem = items.find(item => item.productId === product.id)
        
        if (existingItem) {
          set({
            items: items.map(item =>
              item.productId === product.id
                ? { ...item, quantity: item.quantity + quantity }
                : item
            )
          })
        } else {
          set({
            items: [...items, {
              id: `${product.id}-${Date.now()}`,
              productId: product.id,
              quantity,
              product
            }]
          })
        }
      },
      removeItem: (productId) => {
        set({
          items: get().items.filter(item => item.productId !== productId)
        })
      },
      updateQuantity: (productId, quantity) => {
        if (quantity <= 0) {
          get().removeItem(productId)
          return
        }
        set({
          items: get().items.map(item =>
            item.productId === productId
              ? { ...item, quantity }
              : item
          )
        })
      },
      clearCart: () => set({ items: [] }),
      getTotalItems: () => {
        return get().items.reduce((total, item) => total + item.quantity, 0)
      },
      getTotalPrice: () => {
        return get().items.reduce((total, item) => total + (item.product.price * item.quantity), 0)
      },
    }),
    {
      name: 'cart-storage',
    }
  )
)

export const useModalStore = create<ModalState>((set) => ({
  isOpen: false,
  selectedProduct: null,
  openModal: (product) => set({ isOpen: true, selectedProduct: product }),
  closeModal: () => set({ isOpen: false, selectedProduct: null }),
}))
