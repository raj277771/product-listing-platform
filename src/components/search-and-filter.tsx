'use client'

import { Search, X } from 'lucide-react'
import { useSearchStore } from '@/store'
import { Category } from '@/types'

interface SearchAndFilterProps {
  categories: Category[]
}

export function SearchAndFilter({ categories }: SearchAndFilterProps) {
  const { 
    searchTerm, 
    selectedCategory, 
    setSearchTerm, 
    setSelectedCategory, 
    clearFilters 
  } = useSearchStore()

  const hasActiveFilters = searchTerm || selectedCategory

  return (
    <div className="bg-white rounded-lg shadow-sm border p-6">
      <div className="flex flex-col lg:flex-row gap-4">
        {/* Search */}
        <div className="flex-1">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary focus:border-transparent"
            />
          </div>
        </div>

        {/* Category Filter */}
        <div className="lg:w-64">
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary focus:border-transparent"
          >
            <option value="">All Categories</option>
            {categories.map((category) => (
              <option key={category.id} value={category.slug}>
                {category.name}
              </option>
            ))}
          </select>
        </div>

        {/* Clear Filters */}
        {hasActiveFilters && (
          <button
            onClick={clearFilters}
            className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-gray-900 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
          >
            <X className="h-4 w-4" />
            Clear
          </button>
        )}
      </div>

      {/* Active filters display */}
      {hasActiveFilters && (
        <div className="mt-4 flex flex-wrap gap-2">
          {searchTerm && (
            <span className="inline-flex items-center gap-1 px-2 py-1 bg-primary/10 text-primary rounded-md text-sm">
              Search: &quot;{searchTerm}&quot;
              <button
                onClick={() => setSearchTerm('')}
                className="hover:bg-primary/20 rounded-full p-0.5"
              >
                <X className="h-3 w-3" />
              </button>
            </span>
          )}
          {selectedCategory && (
            <span className="inline-flex items-center gap-1 px-2 py-1 bg-primary/10 text-primary rounded-md text-sm">
              Category: {categories.find(c => c.slug === selectedCategory)?.name}
              <button
                onClick={() => setSelectedCategory('')}
                className="hover:bg-primary/20 rounded-full p-0.5"
              >
                <X className="h-3 w-3" />
              </button>
            </span>
          )}
        </div>
      )}
    </div>
  )
}
