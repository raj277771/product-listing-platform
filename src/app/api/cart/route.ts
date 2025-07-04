import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import { z } from 'zod'

const addToCartSchema = z.object({
  productId: z.string().min(1),
  quantity: z.number().min(1),
  userId: z.string().min(1),
})

const updateCartItemSchema = z.object({
  productId: z.string().min(1),
  quantity: z.number().min(0),
  userId: z.string().min(1),
})

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const userId = searchParams.get('userId')

    if (!userId) {
      return NextResponse.json(
        { error: 'User ID is required' },
        { status: 400 }
      )
    }

    const cart = await prisma.cart.findUnique({
      where: { userId },
      include: {
        items: {
          include: {
            product: {
              include: {
                category: true,
              },
            },
          },
        },
      },
    })

    if (!cart) {
      return NextResponse.json({
        id: '',
        userId,
        items: [],
        createdAt: new Date(),
        updatedAt: new Date(),
      })
    }

    return NextResponse.json(cart)
  } catch (error) {
    console.error('Error fetching cart:', error)
    return NextResponse.json(
      { error: 'Failed to fetch cart' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const validatedData = addToCartSchema.parse(body)

    // Find or create cart
    let cart = await prisma.cart.findUnique({
      where: { userId: validatedData.userId },
    })

    if (!cart) {
      cart = await prisma.cart.create({
        data: { userId: validatedData.userId },
      })
    }

    // Check if item already exists in cart
    const existingItem = await prisma.cartItem.findUnique({
      where: {
        cartId_productId: {
          cartId: cart.id,
          productId: validatedData.productId,
        },
      },
    })

    if (existingItem) {
      // Update quantity
      await prisma.cartItem.update({
        where: { id: existingItem.id },
        data: { quantity: existingItem.quantity + validatedData.quantity },
      })
    } else {
      // Create new cart item
      await prisma.cartItem.create({
        data: {
          cartId: cart.id,
          productId: validatedData.productId,
          quantity: validatedData.quantity,
        },
      })
    }

    // Return updated cart
    const updatedCart = await prisma.cart.findUnique({
      where: { id: cart.id },
      include: {
        items: {
          include: {
            product: {
              include: {
                category: true,
              },
            },
          },
        },
      },
    })

    return NextResponse.json(updatedCart)
  } catch (error) {
    console.error('Error adding to cart:', error)
    
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Invalid input data', details: error.errors },
        { status: 400 }
      )
    }

    return NextResponse.json(
      { error: 'Failed to add to cart' },
      { status: 500 }
    )
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json()
    const validatedData = updateCartItemSchema.parse(body)

    const cart = await prisma.cart.findUnique({
      where: { userId: validatedData.userId },
    })

    if (!cart) {
      return NextResponse.json(
        { error: 'Cart not found' },
        { status: 404 }
      )
    }

    if (validatedData.quantity === 0) {
      // Remove item from cart
      await prisma.cartItem.deleteMany({
        where: {
          cartId: cart.id,
          productId: validatedData.productId,
        },
      })
    } else {
      // Update quantity
      await prisma.cartItem.updateMany({
        where: {
          cartId: cart.id,
          productId: validatedData.productId,
        },
        data: { quantity: validatedData.quantity },
      })
    }

    // Return updated cart
    const updatedCart = await prisma.cart.findUnique({
      where: { id: cart.id },
      include: {
        items: {
          include: {
            product: {
              include: {
                category: true,
              },
            },
          },
        },
      },
    })

    return NextResponse.json(updatedCart)
  } catch (error) {
    console.error('Error updating cart:', error)
    
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Invalid input data', details: error.errors },
        { status: 400 }
      )
    }

    return NextResponse.json(
      { error: 'Failed to update cart' },
      { status: 500 }
    )
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const userId = searchParams.get('userId')

    if (!userId) {
      return NextResponse.json(
        { error: 'User ID is required' },
        { status: 400 }
      )
    }

    await prisma.cart.deleteMany({
      where: { userId },
    })

    return NextResponse.json({ message: 'Cart cleared successfully' })
  } catch (error) {
    console.error('Error clearing cart:', error)
    return NextResponse.json(
      { error: 'Failed to clear cart' },
      { status: 500 }
    )
  }
}
