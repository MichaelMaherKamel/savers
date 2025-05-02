// components/products/ProductsSkeletonLoader.tsx
import { Card, CardContent } from '@/components/ui/card'
const ProductsSkeletonLoader = () => {
  // Create an array of 6 items to show skeleton cards
  const skeletonItems = Array.from({ length: 3 }, (_, i) => i)
 
  return (
    <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8'>
      {skeletonItems.map((index) => (
        <Card key={index} className='h-full overflow-hidden border border-gray-100'>
          <div className='relative aspect-[4/3] w-full bg-gray-200 animate-pulse'></div>
          <CardContent className='flex flex-col justify-between p-5 bg-white'>
            <div>
              <div className='h-6 bg-gray-200 rounded w-3/4 mb-2 animate-pulse'></div>
              <div className='h-4 bg-gray-100 rounded w-full mb-1 animate-pulse'></div>
              <div className='h-4 bg-gray-100 rounded w-2/3 mb-4 animate-pulse'></div>
            </div>
            <div className='flex items-center'>
              <div className='h-4 bg-gray-200 rounded w-1/3 animate-pulse'></div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
export default ProductsSkeletonLoader