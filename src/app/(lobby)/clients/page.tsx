import { Building, Building2, HomeIcon } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'

const OurClientsPage = () => {
  return (
    <div className='container mx-auto px-4 py-16 sm:px-6 lg:px-8 pt-24'>
      {/* Hero Section */}
      <div className='mb-16 text-center'>
        <h1 className='text-4xl font-bold text-gray-900 sm:text-5xl mb-4'>Our Clients</h1>
        <p className='mt-2 text-xl font-semibold text-red-600'>Trusted by businesses and homeowners nationwide</p>
      </div>

      {/* Client Categories */}
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16'>
        <div className='bg-white p-6 rounded-lg shadow-md text-center'>
          <div className='inline-flex items-center justify-center h-16 w-16 rounded-full bg-red-100 text-red-600 mb-4'>
            <Building size={32} />
          </div>
          <h3 className='text-xl font-bold text-gray-900 mb-2'>Corporate Offices</h3>
          <p className='text-gray-600 mb-4'>
            Protecting sensitive data and assets for businesses of all sizes with our high-security safes and storage
            solutions.
          </p>
        </div>
        <div className='bg-white p-6 rounded-lg shadow-md text-center'>
          <div className='inline-flex items-center justify-center h-16 w-16 rounded-full bg-red-100 text-red-600 mb-4'>
            <Building2 size={32} />
          </div>
          <h3 className='text-xl font-bold text-gray-900 mb-2'>Financial Institutions</h3>
          <p className='text-gray-600 mb-4'>
            Providing maximum security for banks, credit unions, and financial service providers with our vault systems.
          </p>
        </div>
        <div className='bg-white p-6 rounded-lg shadow-md text-center'>
          <div className='inline-flex items-center justify-center h-16 w-16 rounded-full bg-red-100 text-red-600 mb-4'>
            <HomeIcon size={32} />
          </div>
          <h3 className='text-xl font-bold text-gray-900 mb-2'>Residential Clients</h3>
          <p className='text-gray-600 mb-4'>
            Helping homeowners protect their valuables, important documents, and irreplaceable possessions.
          </p>
        </div>
      </div>

      {/* Featured Clients - Photo Collage with adjusted aspect ratio */}
      <div className='mb-16'>
        <h2 className='text-3xl font-bold text-gray-900 text-center'>Our Featured Clients</h2>
        <div className='relative w-full aspect-[16/8] rounded-lg overflow-hidden shadow-md'>
          <Image 
            src="/pics/LogosAll.png" 
            alt="Collage of our client logos" 
            fill 
            className='object-contain'
            priority
          />
        </div>
      </div>

      {/* CTA Section - Updated with gradient background */}
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
          <h2 className="text-3xl font-bold mb-4">Join Our Satisfied Clients</h2>
          <p className="mb-8 text-red-50 text-lg">
            Discover how Savers can help secure your business or home with customized security solutions.
          </p>
          <div className="flex justify-center">
          <Link
              href='/contact'
              prefetch={true}
              className='inline-block bg-white text-red-700 hover:bg-red-50 px-8 py-3 rounded-md font-medium transition-colors shadow-sm'
            >
              Contact Us
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default OurClientsPage