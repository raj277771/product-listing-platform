'use client'

import { ShoppingCart, Store } from 'lucide-react'
import { useCartStore } from '@/store'
import { formatPrice } from '@/lib/utils'

export function Header() {
  const { items, getTotalItems, getTotalPrice } = useCartStore()
  const totalItems = getTotalItems()
  const totalPrice = getTotalPrice()

  return (
    <header className="bg-white shadow-sm border-b">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Store className="h-8 w-8 text-primary" />
            <h1 className="text-xl font-bold text-gray-900">
              Product Store
            </h1>
          </div>

          <div className="flex items-center gap-4">
            <div className="relative">
              <button className="flex items-center gap-2 bg-gray-100 hover:bg-gray-200 px-3 py-2 rounded-md transition-colors">
                <ShoppingCart className="h-5 w-5" />
                <span className="font-medium">{totalItems}</span>
                {totalItems > 0 && (
                  <span className="absolute -top-2 -right-2 bg-primary text-primary-foreground text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {totalItems}
                  </span>
                )}
              </button>
            </div>
            
            {totalItems > 0 && (
              <div className="hidden sm:block text-right">
                <div className="text-sm text-gray-600">Cart Total</div>
                <div className="font-semibold text-primary">
                  {formatPrice(totalPrice)}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Cart items preview - only show if items exist */}
        {items.length > 0 && (
          <div className="mt-4 bg-gray-50 rounded-lg p-4">
            <h3 className="font-medium text-gray-900 mb-2">Cart Items:</h3>
            <div className="space-y-2">
              {items.slice(0, 3).map((item) => (
                <div key={item.id} className="flex justify-between items-center text-sm">
                  <span className="text-gray-700">
                    {item.product.title} x {item.quantity}
                  </span>
                  <span className="font-medium">
                    {formatPrice(item.product.price * item.quantity)}
                  </span>
                </div>
              ))}
              {items.length > 3 && (
                <div className="text-sm text-gray-500">
                  ...and {items.length - 3} more items
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  )
}
