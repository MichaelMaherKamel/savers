// components/FeaturedProducts.tsx
import { Card } from '@/components/ui/card'

export default function FeaturedProducts() {
  const products = [
    {
      title: 'Digital Safes',
      description: 'Biometric & PIN-protected security solutions',
      image: '/safe.jpg',
    },
    // Add more products
  ]

  return (
    <section id='products' className='py-20'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <h2 className='text-3xl font-bold text-center mb-12'>Featured Products</h2>
        <div className='grid md:grid-cols-3 gap-8'>
          {products.map((product, index) => (
            <Card key={index} className='p-6 hover:shadow-lg transition-shadow'>
              <div className='aspect-video bg-gray-100 rounded-lg mb-4' />
              <h3 className='text-xl font-semibold mb-2'>{product.title}</h3>
              <p className='text-gray-600'>{product.description}</p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
