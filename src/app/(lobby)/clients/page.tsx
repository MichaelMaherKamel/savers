import React from 'react'
import { Button } from '@/components/ui/button'
import { Building, Building2, HomeIcon } from 'lucide-react'
import Link from 'next/link'

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
      {/* Featured Clients */}
      <div className='mb-16'>
        <h2 className='text-3xl font-bold text-gray-900 text-center mb-12'>Our Featured Clients</h2>

        <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8'>
          {[1, 2, 3, 4, 5, 6].map((item) => (
            <div key={item} className='h-24 bg-white rounded-md shadow-sm flex items-center justify-center'>
              <div className='text-gray-400 font-semibold'>Client Logo</div>
            </div>
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <div className='bg-gray-100 rounded-lg p-8 text-center'>
        <h2 className='text-3xl font-bold text-gray-900 mb-4'>Join Our Satisfied Clients</h2>
        <p className='text-lg text-gray-600 mb-6 max-w-3xl mx-auto'>
          Discover how Savers can help secure your business or home with customized security solutions.
        </p>
        <Link href={'/contact'}>
          <Button className='bg-red-600 hover:bg-red-700 text-lg px-8 py-3 h-auto'>Contact Us Today</Button>
        </Link>
      </div>
    </div>
  )
}

export default OurClientsPage
