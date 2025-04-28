'use client'

import { useState, useEffect } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import ProductCard from '@/components/products/ProductCard'
import Link from 'next/link'
import { getAllProducts } from '@/db/actions/products'

// Define the Product type
type Product = {
  id: number;
  name: string;
  productDescription: string;
  image: string;
  createdAt: Date;
  updatedAt: Date;
  category?: string; // We'll add this for filtering
}

export default function ProductsPage() {
  const [activeTab, setActiveTab] = useState('all')
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)

  // Categories for filtering

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const allProducts = await getAllProducts()
        
        // Add a default category if none exists
        const productsWithCategories = allProducts.map(product => {
          // Try to extract category from name or set a default one
          let category = 'other'
          
          // Simple logic to categorize products based on name
          // In a real app, you would have a category field in your database
          const name = product.name.toLowerCase()
          if (name.includes('safe')) category = 'safes'
          else if (name.includes('lock')) category = 'lockers'
          else if (name.includes('print')) category = 'printers'
          
          return {...product, category}
        })
        
        setProducts(productsWithCategories)
      } catch (error) {
        console.error('Error fetching products:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchProducts()
  }, [])

  // Filter products based on active tab
  const filteredProducts = activeTab === 'all' 
    ? products 
    : products.filter(product => product.category?.toLowerCase() === activeTab)

  return (
    <div className='bg-gradient-to-b from-white to-gray-50'>
      <div className='container mx-auto px-4 py-16 sm:px-6 lg:px-8 pt-24'>
        {/* Hero Section */}
        <div className='mb-12 text-center'>
          <span className='inline-block px-4 py-1.5 mb-4 text-sm font-medium text-red-700 bg-red-50 rounded-full'>
            Premium Selection
          </span>
          <h1 className='text-4xl font-bold text-gray-800 sm:text-5xl mb-4'>Our Products</h1>
          <p className='mt-4 text-xl text-gray-600 max-w-2xl mx-auto'>
            Browse our selection of premium safes, lockers, and printers designed to meet your security and office
            needs.
          </p>
        </div>

        {/* Tabs Section */}
        <Tabs defaultValue='all' value={activeTab} onValueChange={setActiveTab} className='mb-16'>
          <div className='flex justify-center mb-8'>
            <TabsList className='bg-white border border-gray-100 shadow-sm p-1 w-full max-w-md mx-auto'>
              <TabsTrigger
                value='all'
                className='flex-1 px-4 py-3 data-[state=active]:bg-red-600 data-[state=active]:text-white data-[state=active]:shadow-sm'
              >
                All
              </TabsTrigger>
              <TabsTrigger
                value='safes'
                className='flex-1 px-4 py-3 data-[state=active]:bg-red-600 data-[state=active]:text-white data-[state=active]:shadow-sm'
              >
                Safes
              </TabsTrigger>
              <TabsTrigger
                value='lockers'
                className='flex-1 px-4 py-3 data-[state=active]:bg-red-600 data-[state=active]:text-white data-[state=active]:shadow-sm'
              >
                Lockers
              </TabsTrigger>
              <TabsTrigger
                value='printers'
                className='flex-1 px-4 py-3 data-[state=active]:bg-red-600 data-[state=active]:text-white data-[state=active]:shadow-sm'
              >
                Printers
              </TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value={activeTab} className='mt-0'>
            {loading ? (
              <div className="flex justify-center items-center py-20">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-600"></div>
              </div>
            ) : filteredProducts.length > 0 ? (
              <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8'>
                {filteredProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    id={product.id.toString()}
                    title={product.name}
                    description={product.productDescription}
                    image={product.image}
                    category={product.category || 'Product'}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-20">
                <p className="text-xl text-gray-500">No products found in this category.</p>
                <p className="mt-4 text-gray-500">
                  Check back soon or explore other categories.
                </p>
              </div>
            )}
          </TabsContent>
        </Tabs>

        {/* Call to Action */}
        <div className='bg-gradient-to-r from-red-600 to-red-700 rounded-xl p-8 text-white text-center shadow-lg'>
          <div className='max-w-3xl mx-auto'>
            <h2 className='text-2xl font-bold mb-4'>Looking for a specific solution?</h2>
            <p className='mb-6 text-red-50'>
              Our team of experts is ready to help you find the perfect product for your needs.
              <br />
              Contact us today for personalized assistance or to request a custom quote.
            </p>
            <Link
              href='/contact'
              className='inline-block bg-white text-red-700 hover:bg-red-50 px-8 py-3 rounded-md font-medium transition-colors shadow-sm'
            >
              Contact Our Team
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}