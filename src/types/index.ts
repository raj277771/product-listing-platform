export interface Product {
  id: string
  title: string
  description: string
  price: number
  imageUrl: string
  categoryId: string
  category: Category
  createdAt: Date
  updatedAt: Date
}

export interface Category {
  id: string
  name: string
  slug: string
  createdAt: Date
  updatedAt: Date
}

export interface CartItem {
  id: string
  productId: string
  quantity: number
  product: Product
}

export interface Cart {
  id: string
  userId: string
  items: CartItem[]
  createdAt: Date
  updatedAt: Date
}

export interface CreateProductInput {
  title: string
  description: string
  price: number
  imageUrl: string
  categoryId: string
}

export interface UpdateProductInput extends Partial<CreateProductInput> {
  id: string
}

export interface AddToCartInput {
  productId: string
  quantity: number
  userId: string
}
