'use client'

import { useEffect } from 'react'
import Image from 'next/image'
import { X, ShoppingCart, Minus, Plus } from 'lucide-react'
import { useModalStore, useCartStore } from '@/store'
import { formatPrice } from '@/lib/utils'
import { useState } from 'react'

export function ProductModal() {
  const { isOpen, selectedProduct, closeModal } = useModalStore()
  const { addItem } = useCartStore()
  const [quantity, setQuantity] = useState(1)

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }

    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  useEffect(() => {
    setQuantity(1) // Reset quantity when modal opens
  }, [selectedProduct])

  if (!isOpen || !selectedProduct) return null

  const handleAddToCart = () => {
    addItem(selectedProduct, quantity)
    closeModal()
  }

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      closeModal()
    }
  }

  return (
    <div 
      className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
      onClick={handleBackdropClick}
    >
      <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b px-6 py-4 flex items-center justify-between">
          <h2 className="text-xl font-semibold text-gray-900">Product Details</h2>
          <button
            onClick={closeModal}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <div className="p-6">
          <div className="grid md:grid-cols-2 gap-8">
            {/* Image */}
            <div className="aspect-square relative bg-gray-100 rounded-lg overflow-hidden">
              <Image
                src={selectedProduct.imageUrl}
                alt={selectedProduct.title}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>

            {/* Details */}
            <div className="space-y-6">
              <div>
                <span className="inline-block bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-medium mb-3">
                  {selectedProduct.category.name}
                </span>
                <h1 className="text-2xl font-bold text-gray-900 mb-2">
                  {selectedProduct.title}
                </h1>
                <p className="text-3xl font-bold text-primary">
                  {formatPrice(selectedProduct.price)}
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Description</h3>
                <p className="text-gray-600 leading-relaxed">
                  {selectedProduct.description}
                </p>
              </div>

              {/* Quantity Selector */}
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Quantity</h3>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-10 h-10 rounded-md border border-gray-300 flex items-center justify-center hover:bg-gray-50 transition-colors"
                  >
                    <Minus className="h-4 w-4" />
                  </button>
                  <span className="w-12 text-center font-medium">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-10 h-10 rounded-md border border-gray-300 flex items-center justify-center hover:bg-gray-50 transition-colors"
                  >
                    <Plus className="h-4 w-4" />
                  </button>
                </div>
              </div>

              {/* Total Price */}
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="flex justify-between items-center">
                  <span className="font-medium text-gray-900">Total:</span>
                  <span className="text-2xl font-bold text-primary">
                    {formatPrice(selectedProduct.price * quantity)}
                  </span>
                </div>
              </div>

              {/* Add to Cart Button */}
              <button
                onClick={handleAddToCart}
                className="w-full bg-primary text-primary-foreground py-3 px-6 rounded-md hover:bg-primary/90 transition-colors flex items-center justify-center gap-2 font-medium"
              >
                <ShoppingCart className="h-5 w-5" />
                Add {quantity} to Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
