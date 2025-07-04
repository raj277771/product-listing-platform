import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import { z } from 'zod'

const createProductSchema = z.object({
  title: z.string().min(1),
  description: z.string().min(1),
  price: z.number().positive(),
  imageUrl: z.string().url(),
  categoryId: z.string().min(1),
})

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const search = searchParams.get('search') || ''
    const category = searchParams.get('category') || ''
    const limit = parseInt(searchParams.get('limit') || '20')
    const offset = parseInt(searchParams.get('offset') || '0')

    const where = {
      AND: [
        search ? {
          OR: [
            { title: { contains: search, mode: 'insensitive' as const } },
            { description: { contains: search, mode: 'insensitive' as const } },
          ]
        } : {},
        category ? { category: { slug: category } } : {},
      ]
    }

    const products = await prisma.product.findMany({
      where,
      include: {
        category: true,
      },
      take: limit,
      skip: offset,
      orderBy: {
        createdAt: 'desc',
      },
    })

    const total = await prisma.product.count({ where })

    return NextResponse.json({
      products,
      pagination: {
        total,
        limit,
        offset,
        hasMore: offset + limit < total,
      },
    })
  } catch (error) {
    console.error('Error fetching products:', error)
    return NextResponse.json(
      { error: 'Failed to fetch products' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const validatedData = createProductSchema.parse(body)

    const product = await prisma.product.create({
      data: validatedData,
      include: {
        category: true,
      },
    })

    return NextResponse.json(product, { status: 201 })
  } catch (error) {
    console.error('Error creating product:', error)
    
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Invalid input data', details: error.errors },
        { status: 400 }
      )
    }

    return NextResponse.json(
      { error: 'Failed to create product' },
      { status: 500 }
    )
  }
}
