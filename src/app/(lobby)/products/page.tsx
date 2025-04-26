'use client'

import { useState } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import ProductCard from '@/components/products/ProductCard'
import Link from 'next/link'

// Sample product data (in a real app this would come from an API or CMS)
const productsData = {
  safes: [
    {
      id: 'safe-1',
      title: 'Executive Vault Safe',
      description:
        'Heavy-duty fireproof safe with biometric lock for top executives. Fire-resistant for up to 2 hours with advanced biometric fingerprint scanner and digital keypad with backup key.',
      image: '/pics/Safe1.jpg',
      category: 'Safes',
    },
    {
      id: 'safe-2',
      title: 'Office Documents Safe',
      description:
        'Medium-sized safe for important company documents and small valuables. Water-resistant construction with programmable electronic lock and interior LED lighting.',
      image: '/pics/Safe2.jpg',
      category: 'Safes',
    },
    {
      id: 'safe-3',
      title: 'Compact Drawer Safe',
      description:
        'Discreet safe designed to fit in standard desk drawers. Steel construction with key lock system and mounting hardware included.',
      image: '/safe-3.jpg',
      category: 'Safes',
    },
    {
      id: 'safe-4',
      title: 'Wall-Mounted Security Safe',
      description:
        'Concealable wall safe with electronic combination lock, perfect for hotels and offices seeking discreet security solutions.',
      image: '/safe-4.jpg',
      category: 'Safes',
    },
    {
      id: 'safe-5',
      title: 'Fire-Resistant Data Safe',
      description:
        'Specialized safe for digital media protection, providing 2-hour fire protection for hard drives, USB drives, and other electronic storage devices.',
      image: '/safe-5.jpg',
      category: 'Safes',
    },
    {
      id: 'safe-6',
      title: 'Biometric Floor Safe',
      description:
        'Heavy-duty floor safe with dual authentication - fingerprint and PIN code access. Designed for maximum security with anti-drill plates.',
      image: '/safe-6.jpg',
      category: 'Safes',
    },
  ],
  lockers: [
    {
      id: 'locker-1',
      title: 'Employee Locker System',
      description:
        'Modular locker system for employee personal belongings and equipment. Customizable configurations with digital or key lock options and ventilated design.',
      image: '/pics/Lock1.webp',
      category: 'Lockers',
    },
    {
      id: 'locker-2',
      title: 'Mail Distribution Lockers',
      description:
        'Secure compartments for internal mail and package delivery. Multiple size compartments with master key access and durable powder-coated finish.',
      image: '/pics/Lock2.JPG',
      category: 'Lockers',
    },
    {
      id: 'locker-3',
      title: 'Tech Storage Lockers',
      description:
        'Specialized lockers with charging capabilities for electronic devices. Built-in charging ports with RFID lock system and asset tracking integration.',
      image: '/locker-3.jpg',
      category: 'Lockers',
    },
    {
      id: 'locker-4',
      title: 'Multi-Compartment Storage Locker',
      description:
        'Versatile multi-sized compartment system perfect for varying storage needs in workplaces and educational institutions.',
      image: '/locker-4.jpg',
      category: 'Lockers',
    },
    {
      id: 'locker-5',
      title: 'Heavy-Duty Industrial Lockers',
      description:
        'Reinforced steel lockers designed for industrial environments where durability and security are paramount.',
      image: '/locker-5.jpg',
      category: 'Lockers',
    },
    {
      id: 'locker-6',
      title: 'Smart Access Parcel Lockers',
      description: 'Modern solution for package deliveries with smartphone app integration and notification system.',
      image: '/locker-6.jpg',
      category: 'Lockers',
    },
  ],
  printers: [
    {
      id: 'printer-1',
      title: 'Enterprise Multifunction Printer',
      description:
        'High-volume multifunction printer for busy office environments. Print, scan, copy, fax functionality with wireless connectivity and advanced security features.',
      image: '/pics/CanonPrinter1.jpg',
      category: 'Printers',
    },
    {
      id: 'printer-2',
      title: 'Departmental Laser Printer',
      description:
        'Reliable color laser printer for departmental use. Duplex printing, network-ready with high-capacity toner options.',
      image: '/pics/CanonPrinter2.jpg',
      category: 'Printers',
    },
    {
      id: 'printer-3',
      title: 'Secure Document Printer',
      description:
        'Specialized printer with enhanced security features for sensitive documents. PIN-protected printing with encryption capabilities and audit trail logging.',
      image: '/printer-3.jpg',
      category: 'Printers',
    },
    {
      id: 'printer-4',
      title: 'High-Speed Production Printer',
      description:
        'Industrial-grade printer for high-volume printing needs with exceptional speed and quality for large organizations.',
      image: '/printer-4.jpg',
      category: 'Printers',
    },
    {
      id: 'printer-5',
      title: 'Compact Office Printer',
      description:
        'Space-saving design with all essential functions for small offices and workgroups, offering excellent value.',
      image: '/printer-5.jpg',
      category: 'Printers',
    },
    {
      id: 'printer-6',
      title: 'Mobile-Ready Business Printer',
      description:
        'Advanced network printer with intuitive mobile printing capabilities for the modern, connected workplace.',
      image: '/printer-6.jpg',
      category: 'Printers',
    },
  ],
}

export default function ProductsPage() {
  const [activeTab, setActiveTab] = useState('safes')

  return (
    <div className='bg-gradient-to-b from-white to-gray-50'>
      <div className='container mx-auto px-4 py-16 sm:px-6 lg:px-8 pt-24'>
        {/* Hero Section */}
        <div className='mb-12 text-center'>
          <span className='inline-block px-4 py-1.5 mb-4 text-sm font-medium text-red-700 bg-red-50 rounded-full'>
            Premium Selection
          </span>
          <h1 className='text-4xl font-bold text-gray-800 sm:text-5xl mb-4'>Our Products</h1>
          <p className='mt-4 text-xl text-gray-600 max-w-2xl mx-auto'>
            Browse our selection of premium safes, lockers, and printers designed to meet your security and office
            needs.
          </p>
        </div>

        {/* Tabs Section */}
        <Tabs defaultValue='safes' value={activeTab} onValueChange={setActiveTab} className='mb-16'>
          <div className='flex justify-center mb-8'>
            <TabsList className='bg-white border border-gray-100 shadow-sm p-1 w-full max-w-md mx-auto'>
              <TabsTrigger
                value='safes'
                className='flex-1 px-4 py-3 data-[state=active]:bg-red-600 data-[state=active]:text-white data-[state=active]:shadow-sm'
              >
                Safes
              </TabsTrigger>
              <TabsTrigger
                value='lockers'
                className='flex-1 px-4 py-3 data-[state=active]:bg-red-600 data-[state=active]:text-white data-[state=active]:shadow-sm'
              >
                Lockers
              </TabsTrigger>
              <TabsTrigger
                value='printers'
                className='flex-1 px-4 py-3 data-[state=active]:bg-red-600 data-[state=active]:text-white data-[state=active]:shadow-sm'
              >
                Printers
              </TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value='safes' className='mt-0'>
            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8'>
              {productsData.safes.map((product) => (
                <ProductCard
                  key={product.id}
                  id={product.id}
                  title={product.title}
                  description={product.description}
                  image={product.image}
                  category={product.category}
                />
              ))}
            </div>
          </TabsContent>

          <TabsContent value='lockers' className='mt-0'>
            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8'>
              {productsData.lockers.map((product) => (
                <ProductCard
                  key={product.id}
                  id={product.id}
                  title={product.title}
                  description={product.description}
                  image={product.image}
                  category={product.category}
                />
              ))}
            </div>
          </TabsContent>

          <TabsContent value='printers' className='mt-0'>
            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8'>
              {productsData.printers.map((product) => (
                <ProductCard
                  key={product.id}
                  id={product.id}
                  title={product.title}
                  description={product.description}
                  image={product.image}
                  category={product.category}
                />
              ))}
            </div>
          </TabsContent>
        </Tabs>

        {/* Call to Action */}
        <div className='bg-gradient-to-r from-red-600 to-red-700 rounded-xl p-8 text-white text-center shadow-lg'>
          <div className='max-w-3xl mx-auto'>
            <h2 className='text-2xl font-bold mb-4'>Looking for a specific solution?</h2>
            <p className='mb-6 text-red-50'>
              Our team of experts is ready to help you find the perfect product for your needs.
              <br />
              Contact us today for personalized assistance or to request a custom quote.
            </p>
            <Link
              href='/contact'
              className='inline-block bg-white text-red-700 hover:bg-red-50 px-8 py-3 rounded-md font-medium transition-colors shadow-sm'
            >
              Contact Our Team
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
