import { getProductById } from '@/db/actions/products';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, Mail, Phone, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

type Params = Promise<{ id: string }>;

export default async function ProductPage(props: {
  params: Params;
}) {
  const params = await props.params;
  const productId = parseInt(params.id);
  
  if (isNaN(productId)) {
    notFound();
  }
  
  const product = await getProductById(productId);
  
  if (!product) {
    notFound();
  }

  // Determine category based on product name
  let category = 'Product';
  const name = product.name.toLowerCase();
  if (name.includes('safe')) category = 'Safes';
  else if (name.includes('lock')) category = 'Lockers';
  else if (name.includes('print')) category = 'Printers';

  // Generate similar products (in a real app, these would be fetched from the database)
  const similarProducts = [
    {
      id: 'similar-1',
      title: 'Related Product 1',
      image: '/placeholder.svg',
    },
    {
      id: 'similar-2',
      title: 'Related Product 2',
      image: '/placeholder.svg',
    },
    {
      id: 'similar-3', 
      title: 'Related Product 3',
      image: '/placeholder.svg',
    }
  ];

  return (
    <div className="bg-gradient-to-b from-white to-gray-50 min-h-screen">
      <div className="container mx-auto px-4 py-16 sm:px-6 lg:px-8">
        {/* Breadcrumb Navigation */}
        <nav className="flex items-center text-sm text-gray-500 mb-8">
          <Link href="/" className="hover:text-red-600">Home</Link>
          <span className="mx-2">/</span>
          <Link href="/products" className="hover:text-red-600">Products</Link>
          <span className="mx-2">/</span>
          <span className="text-gray-900 font-medium">{product.name}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          {/* Product Image */}
          <div className="relative rounded-lg overflow-hidden bg-white shadow-md">
            <div className="relative aspect-square w-full">
              {product.image ? (
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-cover"
                  priority
                />
              ) : (
                <div className="flex h-full items-center justify-center bg-gray-100">
                  <span className="text-gray-500">No image available</span>
                </div>
              )}
            </div>
            
            {/* Category Badge */}
            <div className="absolute top-4 right-4">
              <span className="inline-flex items-center rounded-full bg-red-50 px-3 py-1 text-xs font-medium text-red-700 ring-1 ring-inset ring-red-200/50">
                {category}
              </span>
            </div>
          </div>

          {/* Product Details */}
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-4">{product.name}</h1>
            
            <div className="prose max-w-none mb-8 text-gray-700">
              <p className="text-lg">{product.productDescription}</p>
            </div>
            
            <div className="mb-8">
              <h3 className="text-lg font-semibold mb-4 text-gray-800">Key Features</h3>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start">
                  <div className="flex-shrink-0 h-5 w-5 rounded-full bg-red-100 flex items-center justify-center mr-2">
                    <span className="text-red-600 text-xs">✓</span>
                  </div>
                  <span>High-quality materials and construction</span>
                </li>
                <li className="flex items-start">
                  <div className="flex-shrink-0 h-5 w-5 rounded-full bg-red-100 flex items-center justify-center mr-2">
                    <span className="text-red-600 text-xs">✓</span>
                  </div>
                  <span>Professional installation available</span>
                </li>
                <li className="flex items-start">
                  <div className="flex-shrink-0 h-5 w-5 rounded-full bg-red-100 flex items-center justify-center mr-2">
                    <span className="text-red-600 text-xs">✓</span>
                  </div>
                  <span>Extended warranty options</span>
                </li>
                <li className="flex items-start">
                  <div className="flex-shrink-0 h-5 w-5 rounded-full bg-red-100 flex items-center justify-center mr-2">
                    <span className="text-red-600 text-xs">✓</span>
                  </div>
                  <span>Regular maintenance service plans</span>
                </li>
              </ul>
            </div>
            
            {/* Contact Section */}
            <div className="bg-white p-6 rounded-lg border border-gray-100 shadow-sm mb-8">
              <h3 className="text-lg font-semibold mb-4 text-gray-800">Interested in this product?</h3>
              <p className="text-gray-600 mb-4">
                Contact our sales team for more information, custom configurations, or to request a quote.
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <Button className="flex items-center gap-2 bg-red-600 hover:bg-red-700">
                  <Mail className="h-4 w-4" />
                  <span>Request Quote</span>
                </Button>
                <Button variant="outline" className="flex items-center gap-2">
                  <Phone className="h-4 w-4" />
                  <span>Call Sales</span>
                </Button>
                <Button variant="ghost" className="flex items-center gap-2">
                  <Download className="h-4 w-4" />
                  <span>Download Specs</span>
                </Button>
              </div>
            </div>
            
            {/* Additional Information */}
            <div className="text-sm text-gray-500">
              <p>Product ID: {product.id}</p>
              <p>Last Updated: {new Date(product.updatedAt).toLocaleDateString()}</p>
            </div>
          </div>
        </div>
        
        {/* Similar Products Section */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Similar Products</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {similarProducts.map((item) => (
              <Card key={item.id} className="overflow-hidden hover:shadow-md transition-shadow">
                <div className="relative aspect-video w-full bg-gray-50">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <CardContent className="p-4">
                  <h3 className="font-medium text-gray-900">{item.title}</h3>
                  <Button variant="link" className="text-red-600 p-0 h-auto mt-2">
                    View Details
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
        
        {/* Back to Products */}
        <div className="text-center">
          <Link href="/products">
            <Button variant="outline" className="flex items-center gap-2">
              <ArrowLeft className="h-4 w-4" />
              <span>Back to All Products</span>
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}