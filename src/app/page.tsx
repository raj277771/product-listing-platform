'use client'

import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'
import { Header } from '@/components/header'
import { ProductGrid } from '@/components/product-grid'
import { ProductModal } from '@/components/product-modal'
import { SearchAndFilter } from '@/components/search-and-filter'
import { AddProductForm } from '@/components/add-product-form'
import { useSearchStore } from '@/store'
import { Product, Category } from '@/types'

export default function HomePage() {
  const [showAddForm, setShowAddForm] = useState(false)
  const { searchTerm, selectedCategory } = useSearchStore()

  // Fetch products with search and filter
  const { data: productsData, isLoading: productsLoading, refetch: refetchProducts } = useQuery({
    queryKey: ['products', searchTerm, selectedCategory],
    queryFn: async () => {
      const params = new URLSearchParams()
      if (searchTerm) params.append('search', searchTerm)
      if (selectedCategory) params.append('category', selectedCategory)
      
      const response = await fetch(`/api/products?${params}`)
      if (!response.ok) throw new Error('Failed to fetch products')
      return response.json()
    },
  })

  // Fetch categories
  const { data: categories = [] } = useQuery<Category[]>({
    queryKey: ['categories'],
    queryFn: async () => {
      const response = await fetch('/api/categories')
      if (!response.ok) throw new Error('Failed to fetch categories')
      return response.json()
    },
  })

  const products: Product[] = productsData?.products || []

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Products</h1>
              <p className="text-gray-600 mt-1">
                Discover our amazing collection of products
              </p>
            </div>
            <button
              onClick={() => setShowAddForm(!showAddForm)}
              className="bg-primary text-primary-foreground px-4 py-2 rounded-md hover:bg-primary/90 transition-colors"
            >
              {showAddForm ? 'Cancel' : 'Add Product'}
            </button>
          </div>

          {showAddForm && (
            <div className="mb-8">
              <AddProductForm
                categories={categories}
                onSuccess={() => {
                  setShowAddForm(false)
                  refetchProducts()
                }}
              />
            </div>
          )}

          <SearchAndFilter categories={categories} />
        </div>

        {productsLoading ? (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
          </div>
        ) : (
          <ProductGrid products={products} />
        )}

        {!productsLoading && products.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No products found.</p>
            <p className="text-gray-400 mt-2">Try adjusting your search criteria.</p>
          </div>
        )}
      </main>

      <ProductModal />
    </div>
  )
}
