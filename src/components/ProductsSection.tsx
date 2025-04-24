// components/ProductsSection.jsx
'use client'

import { Button } from '@/components/ui/button'
import { ArrowRight } from 'lucide-react'

const ProductsSection = () => {
  const categories = [
    {
      id: 'safes',
      label: 'Safes',
      description: 'Secure storage solutions for your valuable assets and documents',
      image: '/pics/Safe2.jpg',
    },
    {
      id: 'lockers',
      label: 'Lockers',
      description: 'Organized storage systems for employees and mail distribution',
      image: '/pics/Lock2.JPG',
    },
    {
      id: 'printers',
      label: 'Printers',
      description: 'High-performance printing solutions for your office needs',
      image: '/pics/CanonPrinter2.jpg',
    },
  ]

  const products = {
    safes: [
      {
        id: 1,
        name: 'Executive Vault Safe',
        description: 'Heavy-duty fireproof safe with biometric lock for top executives.',
        features: [
          'Fire-resistant for up to 2 hours',
          'Biometric fingerprint scanner',
          'Digital keypad with backup key',
        ],
      },
      {
        id: 2,
        name: 'Office Documents Safe',
        description: 'Medium-sized safe for important company documents and small valuables.',
        features: ['Water-resistant construction', 'Programmable electronic lock', 'Interior LED lighting'],
      },
      {
        id: 3,
        name: 'Compact Drawer Safe',
        description: 'Discreet safe designed to fit in standard desk drawers.',
        features: ['Steel construction', 'Key lock system', 'Mounting hardware included'],
      },
    ],
    lockers: [
      {
        id: 4,
        name: 'Employee Locker System',
        description: 'Modular locker system for employee personal belongings and equipment.',
        features: ['Customizable configurations', 'Digital or key lock options', 'Ventilated design'],
      },
      {
        id: 5,
        name: 'Mail Distribution Lockers',
        description: 'Secure compartments for internal mail and package delivery.',
        features: ['Multiple size compartments', 'Master key access', 'Durable powder-coated finish'],
      },
      {
        id: 6,
        name: 'Tech Storage Lockers',
        description: 'Specialized lockers with charging capabilities for electronic devices.',
        features: ['Built-in charging ports', 'RFID lock system', 'Asset tracking integration'],
      },
    ],
    printers: [
      {
        id: 7,
        name: 'Enterprise Multifunction Printer',
        description: 'High-volume multifunction printer for busy office environments.',
        features: ['Print, scan, copy, fax', 'Wireless connectivity', 'Advanced security features'],
      },
      {
        id: 8,
        name: 'Departmental Laser Printer',
        description: 'Reliable color laser printer for departmental use.',
        features: ['Duplex printing', 'Network-ready', 'High-capacity toner options'],
      },
      {
        id: 9,
        name: 'Secure Document Printer',
        description: 'Specialized printer with enhanced security features for sensitive documents.',
        features: ['PIN-protected printing', 'Encryption capabilities', 'Audit trail logging'],
      },
    ],
  }

  return (
    <section id='products' className='py-16'>
      <div className='container mx-auto px-4'>
        <div className='text-center mb-12'>
          <h2 className='text-3xl md:text-4xl font-bold mb-4'>Our Products</h2>
          <p className='text-gray-600 max-w-2xl mx-auto'>
            Browse our selection of premium safes, lockers, and printers designed to meet your security and office
            needs.
          </p>
        </div>

        <div className='grid grid-cols-1 md:grid-cols-3 gap-8 mb-16'>
          {categories.map((category) => (
            <div
              key={category.id}
              className='bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow border border-gray-100'
            >
              <div className='h-48 relative'>
                <img src={category.image} alt={category.label} className='w-full h-full object-cover' />
                <div className='absolute inset-0 bg-gradient-to-t from-black/60 to-transparent'></div>
                <h3 className='absolute bottom-4 left-6 text-2xl font-bold text-white'>{category.label}</h3>
              </div>
              <div className='p-6'>
                <p className='text-gray-600 mb-4'>{category.description}</p>

                <Button className='w-full bg-red-700 hover:bg-red-800 text-white flex items-center justify-center'>
                  <span>View {category.label}</span>
                  <ArrowRight className='ml-2 h-4 w-4' />
                </Button>

                <div className='mt-6'>
                  <h4 className='text-sm font-semibold text-gray-700 mb-3'>Popular Products:</h4>
                  <ul className='space-y-2'>
                    {products[category.id].map((product) => (
                      <li key={product.id} className='text-sm text-gray-600 flex items-start'>
                        <span className='mr-2 text-red-700 mt-0.5'>•</span>
                        <span>{product.name}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className='text-center'>
          <Button className='bg-red-700 hover:bg-red-800 text-white px-8 py-2'>View All Products</Button>
        </div>
      </div>
    </section>
  )
}

export default ProductsSection
