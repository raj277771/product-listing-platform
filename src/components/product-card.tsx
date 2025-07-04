'use client'

import Image from 'next/image'
import { ShoppingCart, Eye } from 'lucide-react'
import { Product } from '@/types'
import { useCartStore, useModalStore } from '@/store'
import { formatPrice } from '@/lib/utils'

interface ProductCardProps {
  product: Product
}

export function ProductCard({ product }: ProductCardProps) {
  const { addItem } = useCartStore()
  const { openModal } = useModalStore()

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation()
    addItem(product)
  }

  const handleViewDetails = () => {
    openModal(product)
  }

  return (
    <div className="bg-white rounded-lg shadow-sm border hover:shadow-md transition-shadow cursor-pointer group">
      <div onClick={handleViewDetails} className="p-4">
        <div className="aspect-square relative mb-4 bg-gray-100 rounded-md overflow-hidden">
          <Image
            src={product.imageUrl}
            alt={product.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
          />
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
          <button
            onClick={handleViewDetails}
            className="absolute top-2 right-2 bg-white/90 hover:bg-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          >
            <Eye className="h-4 w-4" />
          </button>
        </div>

        <div className="space-y-2">
          <div className="flex items-start justify-between gap-2">
            <h3 className="font-semibold text-gray-900 line-clamp-2 group-hover:text-primary transition-colors">
              {product.title}
            </h3>
          </div>
          
          <p className="text-sm text-gray-600 line-clamp-2">
            {product.description}
          </p>
          
          <div className="flex items-center justify-between">
            <span className="text-lg font-bold text-primary">
              {formatPrice(product.price)}
            </span>
            <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
              {product.category.name}
            </span>
          </div>
        </div>
      </div>

      <div className="p-4 pt-0">
        <button
          onClick={handleAddToCart}
          className="w-full bg-primary text-primary-foreground py-2 px-4 rounded-md hover:bg-primary/90 transition-colors flex items-center justify-center gap-2"
        >
          <ShoppingCart className="h-4 w-4" />
          Add to Cart
        </button>
      </div>
    </div>
  )
}
