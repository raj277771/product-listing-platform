# Product Listing Platform

A modern, full-stack e-commerce platform built with Next.js, TypeScript, Prisma, and Tailwind CSS. Features real-time product management, advanced search and filtering, responsive design, and seamless cart functionality.

## 🚀 Features

### Frontend
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Product Listing**: Grid layout with product cards showing images, titles, prices, and categories
- **Search & Filter**: Real-time search by name and category filtering with Zustand state management
- **Product Modal**: Detailed product view with quantity selector and add-to-cart functionality
- **Cart Management**: Persistent cart with local storage, quantity updates, and total calculations
- **Form Validation**: React Hook Form with Zod schema validation for product creation

### Backend
- **REST API**: Full CRUD operations for products, categories, and cart management
- **Database**: SQLite with Prisma ORM for development, easily configurable for PostgreSQL/MySQL
- **Type Safety**: End-to-end TypeScript with strict type checking
- **Validation**: Server-side validation with Zod schemas
- **Error Handling**: Comprehensive error handling and status codes

## 🛠 Tech Stack

### Frontend
- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **State Management**: Zustand
- **Form Handling**: React Hook Form + Zod
- **Data Fetching**: React Query (TanStack Query)
- **Icons**: Lucide React

### Backend
- **Runtime**: Node.js
- **Framework**: Next.js API Routes
- **Database**: SQLite (dev) / PostgreSQL (production)
- **ORM**: Prisma
- **Validation**: Zod

## 📦 Installation & Setup

### Prerequisites
- Node.js 18+ 
- npm, yarn, or pnpm

### 1. Clone the Repository
```bash
git clone <repository-url>
cd product-listing-platform
```

### 2. Install Dependencies
```bash
npm install
# or
yarn install
# or
pnpm install
```

### 3. Environment Setup
```bash
cp .env.example .env.local
```

### 4. Database Setup
```bash
# Generate Prisma client
npx prisma generate

# Push database schema
npm run db:push

# Seed the database with sample data
npm run db:seed
```

### 5. Start Development Server
```bash
npm run dev
```

Visit `http://localhost:3000` to see the application.

## 📊 Database Schema

### Models
- **Category**: Product categories with name and slug
- **Product**: Products with title, description, price, image, and category relationship
- **Cart**: User carts with items
- **CartItem**: Individual cart items with quantity and product relationship

## 🎯 API Endpoints

### Products
- `GET /api/products` - List products with search and filter
- `POST /api/products` - Create new product

### Categories  
- `GET /api/categories` - List all categories
- `POST /api/categories` - Create new category

### Cart
- `GET /api/cart?userId={userId}` - Get user's cart
- `POST /api/cart` - Add item to cart
- `PUT /api/cart` - Update cart item quantity
- `DELETE /api/cart?userId={userId}` - Clear cart

## 🎨 UI Components

### Core Components
- **Header**: Navigation with cart summary
- **SearchAndFilter**: Search input and category filter
- **ProductGrid**: Responsive grid of product cards
- **ProductCard**: Individual product display with add-to-cart
- **ProductModal**: Detailed product view with quantity selector
- **AddProductForm**: Admin form for creating products

### State Management
- **Search Store**: Global search term and category filter
- **Cart Store**: Persistent cart state with local storage
- **Modal Store**: Product modal open/close state

## 🔧 Scripts

```bash
# Development
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint

# Database
npm run db:push      # Push schema to database
npm run db:studio    # Open Prisma Studio
npm run db:seed      # Seed database with sample data
```

## 🏗 Project Structure

```
src/
├── app/                 # Next.js app router
│   ├── api/            # API routes
│   ├── globals.css     # Global styles
│   ├── layout.tsx      # Root layout
│   └── page.tsx        # Home page
├── components/         # React components
├── lib/               # Utility functions
├── store/             # Zustand stores
└── types/             # TypeScript type definitions

prisma/
├── schema.prisma      # Database schema
└── seed.ts           # Database seed file
```

## 🚀 Deployment

### Vercel (Recommended)
1. Push code to GitHub
2. Connect repository to Vercel
3. Configure environment variables
4. Deploy automatically

### Railway/Render
1. Create new project
2. Connect GitHub repository
3. Configure build settings
4. Set environment variables
5. Deploy

### Environment Variables for Production
```
DATABASE_URL="postgresql://..."  # PostgreSQL connection string
NEXT_PUBLIC_APP_URL="https://your-domain.com"
```

## 🔥 Features in Detail

### Search & Filtering
- Real-time search across product titles and descriptions
- Category-based filtering
- Clear filters functionality
- Active filter indicators

### Cart Management
- Add products with custom quantities
- Update quantities in cart
- Remove items from cart
- Persistent storage across sessions
- Real-time total calculations

### Product Management
- Admin form for adding new products
- Image URL validation
- Category assignment
- Form validation with error messages

### Responsive Design
- Mobile-first approach
- Responsive grid layouts
- Touch-friendly interactions
- Optimized for all screen sizes

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📝 License

This project is licensed under the MIT License.

## 🆘 Support

For support, please create an issue in the GitHub repository or contact the development team.

---

Built with ❤️ using Next.js, TypeScript, and modern web technologies.
