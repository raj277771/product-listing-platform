'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useMutation } from '@tanstack/react-query'
import { Category } from '@/types'
import { useState } from 'react'

const createProductSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  description: z.string().min(1, 'Description is required'),
  price: z.number().positive('Price must be positive'),
  imageUrl: z.string().url('Invalid URL'),
  categoryId: z.string().min(1, 'Category is required'),
})

type CreateProductInput = z.infer<typeof createProductSchema>

interface AddProductFormProps {
  categories: Category[]
  onSuccess: () => void
}

export function AddProductForm({ categories, onSuccess }: AddProductFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<CreateProductInput>({
    resolver: zodResolver(createProductSchema),
  })

  const createProductMutation = useMutation({
    mutationFn: async (data: CreateProductInput) => {
      const response = await fetch('/api/products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })
      
      if (!response.ok) {
        throw new Error('Failed to create product')
      }
      
      return response.json()
    },
    onSuccess: () => {
      reset()
      onSuccess()
    },
  })

  const onSubmit = async (data: CreateProductInput) => {
    setIsSubmitting(true)
    try {
      await createProductMutation.mutateAsync(data)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="bg-white rounded-lg shadow-sm border p-6">
      <h2 className="text-xl font-semibold text-gray-900 mb-6">Add New Product</h2>
      
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid md:grid-cols-2 gap-6">
          {/* Title */}
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
              Title *
            </label>
            <input
              {...register('title')}
              type="text"
              id="title"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary focus:border-transparent"
              placeholder="Enter product title"
            />
            {errors.title && (
              <p className="mt-1 text-sm text-red-600">{errors.title.message}</p>
            )}
          </div>

          {/* Price */}
          <div>
            <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-2">
              Price *
            </label>
            <input
              {...register('price', { valueAsNumber: true })}
              type="number"
              id="price"
              step="0.01"
              min="0"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary focus:border-transparent"
              placeholder="0.00"
            />
            {errors.price && (
              <p className="mt-1 text-sm text-red-600">{errors.price.message}</p>
            )}
          </div>
        </div>

        {/* Description */}
        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
            Description *
          </label>
          <textarea
            {...register('description')}
            id="description"
            rows={4}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary focus:border-transparent"
            placeholder="Enter product description"
          />
          {errors.description && (
            <p className="mt-1 text-sm text-red-600">{errors.description.message}</p>
          )}
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Category */}
          <div>
            <label htmlFor="categoryId" className="block text-sm font-medium text-gray-700 mb-2">
              Category *
            </label>
            <select
              {...register('categoryId')}
              id="categoryId"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary focus:border-transparent"
            >
              <option value="">Select a category</option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
            {errors.categoryId && (
              <p className="mt-1 text-sm text-red-600">{errors.categoryId.message}</p>
            )}
          </div>

          {/* Image URL */}
          <div>
            <label htmlFor="imageUrl" className="block text-sm font-medium text-gray-700 mb-2">
              Image URL *
            </label>
            <input
              {...register('imageUrl')}
              type="url"
              id="imageUrl"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary focus:border-transparent"
              placeholder="https://example.com/image.jpg"
            />
            {errors.imageUrl && (
              <p className="mt-1 text-sm text-red-600">{errors.imageUrl.message}</p>
            )}
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex justify-end">
          <button
            type="submit"
            disabled={isSubmitting}
            className="bg-primary text-primary-foreground px-6 py-2 rounded-md hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? 'Creating...' : 'Create Product'}
          </button>
        </div>

        {createProductMutation.error && (
          <div className="bg-red-50 border border-red-200 rounded-md p-4">
            <p className="text-red-800">
              {createProductMutation.error instanceof Error 
                ? createProductMutation.error.message 
                : 'An error occurred'}
            </p>
          </div>
        )}
      </form>
    </div>
  )
}
