// app/product/[id]/page.tsx
import { getProductById, getSimilarProducts } from "@/db/actions/products"
import Image from "next/image"
import Link from "next/link"
import { Suspense } from "react"
import {
  ChevronRight,
  Home,
  Package,
  FileText,
  Star,
  Settings
} from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Skeleton } from "@/components/ui/skeleton"
import ProductCard from "@/components/products/ProductCard"
import { getCategoryById } from "@/db/actions/categories"

type Params = Promise<{ id: string }>

export default async function ProductPage(props: {
  params: Params
}) {
  const params = await props.params
  const productId = Number.parseInt(params.id)

  // Handle invalid product ID immediately
  if (isNaN(productId)) {
    return <ProductErrorPage errorType="invalid" />
  }

  return (
    <div className="bg-gradient-to-b from-white to-gray-50 min-h-screen">
      <div className="container mx-auto px-4 py-12 sm:px-6 lg:px-8 pt-20">
        {/* Breadcrumbs integrated in a card - will be rendered by each component appropriately */}
        <div className="mb-8">
          <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-4">
            <div className="flex items-center text-sm">
              <Link href="/" prefetch={true} className="flex items-center text-gray-500 hover:text-red-600 transition-colors">
                <Home size={16} className="mr-1" />
                <span>Home</span>
              </Link>
              <ChevronRight size={16} className="mx-2 text-gray-400" />
              <Link href="/products" prefetch={true} className="flex items-center text-gray-500 hover:text-red-600 transition-colors">
                <Package size={16} className="mr-1" />
                <span>Products</span>
              </Link>
              <ChevronRight size={16} className="mx-2 text-gray-400" />
              <Suspense fallback={<span className="font-medium text-gray-400">Loading...</span>}>
                <ProductBreadcrumb productId={productId} />
              </Suspense>
            </div>
          </div>
        </div>

        {/* Product Details with Suspense */}
        <Suspense fallback={<ProductDetailsSkeleton />}>
          <ProductDetails productId={productId} />
        </Suspense>

        {/* CTA Section */}
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
            <h2 className="text-3xl font-bold mb-4">Need help choosing the right product?</h2>
            <p className="mb-8 text-red-50 text-lg">
              Our team of experts is ready to help you find the perfect solution for your needs.
              <br />
              Contact us today for personalized assistance or to request a custom quote.
            </p>
            <div className="flex justify-center">
              <Link
                href="/contact"
                prefetch={true}
                className="inline-block bg-white text-red-700 hover:bg-red-50 px-8 py-3 rounded-md font-medium transition-colors shadow-sm"
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

// New component for product breadcrumb that shows product name or error
async function ProductBreadcrumb({ productId }: { productId: number }) {
  // Handle invalid product ID
  if (isNaN(productId)) {
    return <span className="font-medium text-red-600">Not Found</span>;
  }

  // Fetch the product data
  const product = await getProductById(productId);
  
  // Handle product not found
  if (!product) {
    return <span className="font-medium text-red-600">Not Found</span>;
  }
  
  // Display the product name
  return <span className="font-medium text-red-600">{product.name}</span>;
}

// Skeleton loader for product details
function ProductDetailsSkeleton() {
  return (
    <div className="mb-16">
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-2">
          {/* Product Image Skeleton - Left side */}
          <div className="relative">
            <div className="relative aspect-square">
              <Skeleton className="h-full w-full" />
            </div>
          </div>

          {/* Product Details Skeleton - Right side */}
          <div className="p-8">
            <div className="sticky top-24">
              <div className="mb-6">
                <Skeleton className="h-10 w-3/4 mb-2" />
                <Skeleton className="h-5 w-1/2" />
              </div>

              {/* Skeleton for tabs */}
              <div className="mb-8">
                <div className="bg-gray-50 rounded-lg border border-gray-100 p-0.5 w-full gap-1 flex">
                  <Skeleton className="flex-1 h-5 rounded-md m-1" />
                  <Skeleton className="flex-1 h-5 rounded-md m-1" />
                  <Skeleton className="flex-1 h-5 rounded-md m-1" />
                </div>
                
                <div className="pt-6">
                  <div className="space-y-4">
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-3/4" />
                    <Skeleton className="h-4 w-5/6" />
                    <Skeleton className="h-4 w-full" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Skeleton for Similar Products section */}
      <div className="mb-16">
        <div className="flex items-center justify-between mb-8">
          <Skeleton className="h-8 w-48" />
          <Skeleton className="h-6 w-24" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 3 }).map((_, index) => (
            <div key={index} className="bg-white rounded-lg border border-gray-100 overflow-hidden shadow-sm">
              <Skeleton className="h-48 w-full" />
              <div className="p-6">
                <Skeleton className="h-6 w-3/4 mb-2" />
                <Skeleton className="h-4 w-full mb-4" />
                <Skeleton className="h-4 w-full mb-2" />
                <Skeleton className="h-4 w-2/3" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

// Async Product Details Component
async function ProductDetails({ productId }: { productId: number }) {
  // Fetch the product data
  const product = await getProductById(productId)
  
  // Handle product not found
  if (!product) {
    return <ProductErrorPage errorType="notfound" />
  }
  
  // Fetch the category name from the database
  const categoryResponse = await getCategoryById(product.categoryId);
  const categoryName = categoryResponse.category ? categoryResponse.category.name : "Product";
  
  // Fetch similar products based on the product's categoryId
  const similarProducts = await getSimilarProducts(productId, product.categoryId, 3);

  // Product specifications - use the actual product specifications from the database if available
  const productSpecs = product.specifications || {};
  const specifications = Object.entries(productSpecs).map(([name, value]) => ({ name, value }));
  
  // If there are no specifications in the database, show some defaults
  if (specifications.length === 0) {
    specifications.push(
      { name: "Dimensions", value: "60 × 40 × 30 cm" },
      { name: "Weight", value: "25 kg" },
      { name: "Material", value: "Steel, Reinforced" },
      { name: "Warranty", value: "5 years" }
    );
  }

  return (
    <div className="mb-16">
      {/* Main Product Section */}
      <div className="mb-16">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2">
            {/* Product Gallery - Left side */}
            <div className="relative">
              <div className="relative aspect-square">
                <Image
                  src={product.image || "/placeholder.svg"}
                  alt={product.name}
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            </div>

            {/* Product Details - Right side */}
            <div className="p-8">
              <div className="sticky top-24">
                <div className="mb-6">
                  <h1 className="text-3xl font-bold text-red-600">{product.name}</h1>
                  {product.model && (
                    <p className="text-gray-600 mt-1">Model: {product.model}</p>
                  )}
                </div>

                <Tabs defaultValue="description" className="mb-8">
                  <TabsList className="bg-gray-50 border border-gray-100 p-1 w-full gap-1">
                    <TabsTrigger
                      value="description"
                      className="flex-1 px-3 py-2 data-[state=active]:bg-red-600 data-[state=active]:text-white rounded-md transition-all duration-200"
                    >
                      <div className="flex items-center justify-center sm:justify-start">
                        <FileText size={16} className="sm:mr-2 hidden sm:inline" />
                        <span className="hidden sm:inline">Description</span>
                        <span className="inline sm:hidden">Description</span>
                      </div>
                    </TabsTrigger>
                    <TabsTrigger
                      value="features"
                      className="flex-1 px-3 py-2 data-[state=active]:bg-red-600 data-[state=active]:text-white rounded-md transition-all duration-200"
                    >
                      <div className="flex items-center justify-center sm:justify-start">
                        <Star size={16} className="sm:mr-2 hidden sm:inline" />
                        <span className="hidden sm:inline">Features</span>
                        <span className="inline sm:hidden">Features</span>
                      </div>
                    </TabsTrigger>
                    <TabsTrigger
                      value="specs"
                      className="flex-1 px-3 py-2 data-[state=active]:bg-red-600 data-[state=active]:text-white rounded-md transition-all duration-200"
                    >
                      <div className="flex items-center justify-center sm:justify-start">
                        <Settings size={16} className="sm:mr-2 hidden sm:inline" />
                        <span className="hidden sm:inline">Specifications</span>
                        <span className="inline sm:hidden">Specs</span>
                      </div>
                    </TabsTrigger>
                  </TabsList>

                  <TabsContent value="description" className="pt-6">
                    <div className="prose max-w-none text-gray-700">
                      <p>{product.description}</p>
                    </div>
                  </TabsContent>

                  <TabsContent value="features" className="pt-6">
                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-700">
                      {product.keyFeatures && product.keyFeatures.length > 0 ? (
                        // Display actual key features from the database
                        product.keyFeatures.map((feature, index) => (
                          <li key={index} className="flex items-start">
                            <div className="flex-shrink-0 h-6 w-6 rounded-full bg-red-100 flex items-center justify-center mr-3">
                              <span className="text-red-600 text-xs">✓</span>
                            </div>
                            <span>{feature}</span>
                          </li>
                        ))
                      ) : (
                        // Fallback to default features
                        <>
                          <li className="flex items-start">
                            <div className="flex-shrink-0 h-6 w-6 rounded-full bg-red-100 flex items-center justify-center mr-3">
                              <span className="text-red-600 text-xs">✓</span>
                            </div>
                            <span>High-quality materials</span>
                          </li>
                          <li className="flex items-start">
                            <div className="flex-shrink-0 h-6 w-6 rounded-full bg-red-100 flex items-center justify-center mr-3">
                              <span className="text-red-600 text-xs">✓</span>
                            </div>
                            <span>Professional installation</span>
                          </li>
                          <li className="flex items-start">
                            <div className="flex-shrink-0 h-6 w-6 rounded-full bg-red-100 flex items-center justify-center mr-3">
                              <span className="text-red-600 text-xs">✓</span>
                            </div>
                            <span>Extended warranty options</span>
                          </li>
                          <li className="flex items-start">
                            <div className="flex-shrink-0 h-6 w-6 rounded-full bg-red-100 flex items-center justify-center mr-3">
                              <span className="text-red-600 text-xs">✓</span>
                            </div>
                            <span>Maintenance service plans</span>
                          </li>
                          <li className="flex items-start">
                            <div className="flex-shrink-0 h-6 w-6 rounded-full bg-red-100 flex items-center justify-center mr-3">
                              <span className="text-red-600 text-xs">✓</span>
                            </div>
                            <span>24/7 customer support</span>
                          </li>
                          <li className="flex items-start">
                            <div className="flex-shrink-0 h-6 w-6 rounded-full bg-red-100 flex items-center justify-center mr-3">
                              <span className="text-red-600 text-xs">✓</span>
                            </div>
                            <span>Customization options</span>
                          </li>
                        </>
                      )}
                    </ul>
                  </TabsContent>

                  <TabsContent value="specs" className="pt-6">
                    <div className="border rounded-lg overflow-hidden">
                      <table className="min-w-full divide-y divide-gray-200">
                        <tbody className="divide-y divide-gray-200">
                          {specifications.map((spec, index) => (
                            <tr key={index} className={index % 2 === 0 ? "bg-gray-50" : "bg-white"}>
                              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                {spec.name}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{spec.value}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </TabsContent>
                </Tabs>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Similar Products Section */}
      <div className="mb-16">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold text-gray-800">Similar Products</h2>
          <Link href="/products" prefetch={true} className="text-red-600 hover:text-red-700 font-medium flex items-center">
            View All
            <ChevronRight size={16} className="ml-1" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {similarProducts.length > 0 ? (
            similarProducts.map((item) => {
              // For each similar product, fetch its category
              return (
                <ProductCard
                  key={item.id.toString()}
                  id={item.id.toString()}
                  title={item.name}
                  description={item.description}
                  image={item.image || "/placeholder.svg"}
                  category={item.categoryId}
                />
              );
            })
          ) : (
            <div className="col-span-3 text-center py-8 bg-gray-50 rounded-lg">
              <Package size={48} className="mx-auto text-gray-400 mb-4" />
              <p className="text-gray-600">No similar products found.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
// Error page component
function ProductErrorPage({ errorType }: { errorType: 'invalid' | 'notfound' }) {
  const title = errorType === 'invalid' ? 'Invalid Product ID' : 'Product Not Found'
  const message = errorType === 'invalid' 
    ? "The product ID format you've entered is not valid. Please check the URL and try again."
    : "We couldn't find the product you're looking for. It may have been removed or is temporarily unavailable."

  return (
    <div className="mb-16">
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-8 flex flex-col items-center justify-center text-center">
          <div className="w-24 h-24 bg-red-50 rounded-full flex items-center justify-center mb-6">
            <Package size={48} className="text-red-600" />
          </div>
          <h1 className="text-3xl font-bold text-red-600 mb-4">{title}</h1>
          <p className="text-gray-600 mb-6 max-w-md">
            {message}
          </p>
          <div className="flex gap-4">
            <Link
              href="/products"
              prefetch={true}
              className="inline-block bg-red-600 text-white hover:bg-red-700 px-6 py-3 rounded-md font-medium transition-colors shadow-sm"
            >
              Browse Products
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}