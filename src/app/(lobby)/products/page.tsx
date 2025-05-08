// app/products/page.tsx
import { Suspense } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import Link from 'next/link'
import ProductsGrid from '@/components/products/ProductsGrid'
import ProductsSkeletonLoader from '@/components/products/ProductsSkeletonLoader'
import { adminGetCategories } from '@/db/actions/categories'

// Main Products Page component
export default async function ProductsPage({
  searchParams
}: {
  searchParams: Promise<{ cat?: string }>
}) {
  // Get category from URL params or default to 'all'
  const params = await searchParams;
  const category = params.cat?.toLowerCase() || 'all';
  
  // Fetch categories from the database
  const categoriesList = await adminGetCategories();

  return (
    <div className='bg-gradient-to-b from-white to-gray-50 min-h-screen flex flex-col'>
      {/* Main content section that will grow to fill available space */}
      <div className='flex-grow'>
        <div className='container mx-auto px-4 py-16 sm:px-6 lg:px-8 pt-24'>
          {/* Hero Section - Simplified as in your example */}
          <div className='mb-6 text-center'>
            <h1 className='text-4xl font-bold text-gray-800 sm:text-5xl mb-4'>Our Products</h1>
            <p className='mt-2 text-xl font-semibold text-red-600'>
              Browse our premium products designed to meet your needs
            </p>
          </div>

          {/* Tabs Section - Now using dynamic categories from the database */}
          <Tabs defaultValue={category} className='mb-16'>
            <div className='flex justify-center mb-8'>
              <TabsList className='bg-white border border-gray-100 shadow-sm p-1 w-full max-w-md mx-auto'>
                <TabsTrigger
                  value='all'
                  asChild
                  className='flex-1 px-4 py-3 data-[state=active]:bg-red-600 data-[state=active]:text-white data-[state=active]:shadow-sm'
                >
                  <Link href="/products" prefetch={true}>All</Link>
                </TabsTrigger>
                
                {/* Map through the categories from the database */}
                {categoriesList.map((cat) => (
                  <TabsTrigger
                    key={cat.id}
                    value={cat.name.toLowerCase()}
                    asChild
                    className='flex-1 px-4 py-3 data-[state=active]:bg-red-600 data-[state=active]:text-white data-[state=active]:shadow-sm'
                  >
                    <Link href={`/products?cat=${cat.name.toLowerCase()}`} prefetch={true}>
                      {cat.name}
                    </Link>
                  </TabsTrigger>
                ))}
              </TabsList>
            </div>

            <TabsContent value={category} className='mt-0 min-h-[300px]'>
              <Suspense fallback={<ProductsSkeletonLoader />}>
                <ProductsGrid category={category} />
              </Suspense>
            </TabsContent>
          </Tabs>
        </div>
      </div>

      {/* Call to Action Section with gradient background and pattern */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="relative overflow-hidden bg-gradient-to-r from-red-600 to-red-700 rounded-2xl p-8 text-white text-center shadow-lg">
          <div className="absolute inset-0 opacity-10">
            <div
              className="absolute inset-0"
              style={{
                backgroundImage:
                  "url(\"data:image/svg+xml,%3Csvg width='52' height='26' viewBox='0 0 52 26' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fillRule='evenodd'%3E%3Cg fill='%23ffffff' fillOpacity='0.4'%3E%3Cpath d='M10 10c0-2.21-1.79-4-4-4-3.314 0-6-2.686-6-6h2c0 2.21 1.79 4 4 4 3.314 0 6 2.686 6 6 0 2.21 1.79 4 4 4 3.314 0 6 2.686 6 6 0 2.21 1.79 4 4 4v2c-3.314 0-6-2.686-6-6 0-2.21-1.79-4-4-4-3.314 0-6-2.686-6-6zm25.464-1.95l8.486 8.486-1.414 1.414-8.486-8.486 1.414-1.414z' /%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")",
                backgroundSize: "30px 30px",
              }}
            ></div>
          </div>
          <div className="relative z-10 max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold mb-4">Looking for a specific solution?</h2>
            <p className="mb-8 text-red-50 text-lg">
              Our team of experts is ready to help you find the perfect product for your needs.
              <br />
              Contact us today for personalized assistance or to request a custom quote.
            </p>
            <div className="flex justify-center">
              <Link
                href='/contact'
                prefetch={true}
                className='inline-block bg-white text-red-700 hover:bg-red-50 px-8 py-3 rounded-md font-medium transition-colors shadow-sm'
              >
                Contact Our Team
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}