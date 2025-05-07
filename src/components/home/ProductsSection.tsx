// components/ProductsSection.tsx
import { Button } from '@/components/ui/button'
import { ArrowRight } from 'lucide-react'
import Link from 'next/link'
import { getCategories } from '@/db/actions/categories'

const ProductsSection = async () => {
  try {
    // Fetch categories from the database
    const categories = await getCategories()
    
    // Handle empty categories case
    if (categories.length === 0) {
      console.error("No categories found")
      // Return a simplified version or error state
      return (
        <section id="products" className="py-16">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Products</h2>
            <p className="text-gray-600">No product categories are available at this time. Please check back later.</p>
          </div>
        </section>
      )
    }
   
    return (
      <section id="products" className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Products</h2>
            <p className="text-gray-600 max-w-2xl mx-auto mb-6">
              Browse our selection of premium safes, lockers, and printers designed to meet your security and office needs.
            </p>
            <Link href="/products" prefetch={true}>
              <Button className="bg-red-700 hover:bg-red-800 text-white px-8 py-2 mb-8">View All Products</Button>
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {categories.map((category) => (
                <div
                  key={category.id}
                  className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100"
                >
                  <div className="h-48 relative">
                    <img src={category.image} alt={category.name} className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                    <h3 className="absolute bottom-4 left-6 text-2xl font-bold text-white">{category.name}</h3>
                  </div>
                 
                  <div className="p-6">
                    <Link href={`/products?cat=${category.name}`} prefetch={true} className="w-full block">
                      <Button className="w-full bg-red-700 hover:bg-red-800 text-white flex items-center justify-center">
                        <span>View {category.name}</span>
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </Link>
                  </div>
                </div>
            ))}
          </div>
        </div>
      </section>
    )
  } catch (error) {
    console.error("Failed to load categories:", error instanceof Error ? error.message : "Unknown error")
    // Return error state
    return (
      <section id="products" className="py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Products</h2>
          <p className="text-red-600">Unable to load product categories. Please try again later.</p>
        </div>
      </section>
    )
  }
}

export default ProductsSection