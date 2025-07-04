import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  // Create categories
  const electronics = await prisma.category.upsert({
    where: { slug: 'electronics' },
    update: {},
    create: {
      name: 'Electronics',
      slug: 'electronics',
    },
  })

  const clothing = await prisma.category.upsert({
    where: { slug: 'clothing' },
    update: {},
    create: {
      name: 'Clothing',
      slug: 'clothing',
    },
  })

  const books = await prisma.category.upsert({
    where: { slug: 'books' },
    update: {},
    create: {
      name: 'Books',
      slug: 'books',
    },
  })

  const home = await prisma.category.upsert({
    where: { slug: 'home' },
    update: {},
    create: {
      name: 'Home & Garden',
      slug: 'home',
    },
  })

  // Create products
  const products = [
    {
      title: 'Wireless Bluetooth Headphones',
      description: 'High-quality wireless headphones with noise cancellation and 30-hour battery life.',
      price: 199.99,
      imageUrl: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&h=500&fit=crop',
      categoryId: electronics.id,
    },
    {
      title: 'Smartphone Pro Max',
      description: 'Latest flagship smartphone with advanced camera system and 5G connectivity.',
      price: 999.99,
      imageUrl: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=500&h=500&fit=crop',
      categoryId: electronics.id,
    },
    {
      title: 'Laptop Gaming Beast',
      description: 'High-performance gaming laptop with RTX graphics and 32GB RAM.',
      price: 2499.99,
      imageUrl: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=500&h=500&fit=crop',
      categoryId: electronics.id,
    },
    {
      title: 'Classic Cotton T-Shirt',
      description: 'Comfortable 100% cotton t-shirt available in multiple colors.',
      price: 29.99,
      imageUrl: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500&h=500&fit=crop',
      categoryId: clothing.id,
    },
    {
      title: 'Denim Jeans Premium',
      description: 'Premium quality denim jeans with perfect fit and durability.',
      price: 89.99,
      imageUrl: 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=500&h=500&fit=crop',
      categoryId: clothing.id,
    },
    {
      title: 'Winter Jacket Warm',
      description: 'Insulated winter jacket perfect for cold weather conditions.',
      price: 159.99,
      imageUrl: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=500&h=500&fit=crop',
      categoryId: clothing.id,
    },
    {
      title: 'JavaScript: The Good Parts',
      description: 'Essential guide to JavaScript programming and best practices.',
      price: 34.99,
      imageUrl: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=500&h=500&fit=crop',
      categoryId: books.id,
    },
    {
      title: 'Clean Code Handbook',
      description: 'Learn to write clean, maintainable code with practical examples.',
      price: 42.99,
      imageUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&h=500&fit=crop',
      categoryId: books.id,
    },
    {
      title: 'Modern Coffee Maker',
      description: 'Programmable coffee maker with built-in grinder and thermal carafe.',
      price: 299.99,
      imageUrl: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=500&h=500&fit=crop',
      categoryId: home.id,
    },
    {
      title: 'Smart Home Security Camera',
      description: 'WiFi-enabled security camera with night vision and mobile app.',
      price: 149.99,
      imageUrl: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=500&h=500&fit=crop',
      categoryId: home.id,
    },
  ]

  for (const product of products) {
    const existingProduct = await prisma.product.findFirst({
      where: { title: product.title },
    })
    
    if (!existingProduct) {
      await prisma.product.create({
        data: product,
      })
    }
  }

  console.log('Database seeded successfully!')
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
