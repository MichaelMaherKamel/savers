import type React from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { ArrowRight } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

interface ProductCardProps {
  id: string
  title: string
  description: string
  image: string
  category: number
}

const ProductCard: React.FC<ProductCardProps> = ({ id, title, description, image, category }) => {
  return (
    <Link href={`/products/${id}`}>
      <Card className='group h-full overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-red-100 border border-gray-100 hover:border-red-200 '>
        <div className='relative aspect-[4/3] w-full bg-gray-50'>
          {image ? (
            <Image
              fill
              alt={title}
              loading={'lazy'}
              priority={false}
              src={image || '/placeholder.svg'}
              className='object-cover transition-transform duration-300 group-hover:scale-105'
            />
          ) : (
            <div className='flex h-full items-center justify-center bg-gray-100'>
              <span className='text-gray-500'>No image available</span>
            </div>
          )}
        </div>
        <CardContent className='flex flex-col justify-between p-5 bg-white'>
          <div>
            <h3 className='text-lg font-semibold mb-2 line-clamp-1 text-gray-800 group-hover:text-red-700 transition-colors'>
              {title}
            </h3>
            <p className='text-gray-600 text-sm mb-4 line-clamp-2'>{description}</p>
          </div>
          <div className='flex items-center text-red-700 text-sm font-medium group-hover:translate-x-1 transition-transform'>
            <span>View Details</span>
            <ArrowRight className='ml-1.5 h-4 w-4 transition-transform group-hover:translate-x-0.5' />
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}

export default ProductCard
