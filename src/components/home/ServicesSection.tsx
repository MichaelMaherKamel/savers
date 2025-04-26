// components/ServicesSection.jsx
'use client'

import { SlidersHorizontal, Hammer, ShoppingCart, Key, Cog, Shield } from 'lucide-react'

const ServicesSection = () => {
  const services = [
    {
      icon: <SlidersHorizontal className='h-10 w-10 text-red-700' />,
      title: 'Installation Services',
      description: 'Professional installation of safes, lockers, and security systems for your business.',
    },
    {
      icon: <Hammer className='h-10 w-10 text-red-700' />,
      title: 'Repair Services',
      description:
        'Expert troubleshooting and fixing of malfunctioning safes, broken locks, and damaged security equipment.',
    },
    {
      icon: <ShoppingCart className='h-10 w-10 text-red-700' />,
      title: 'Selling Services',
      description: 'Wide selection of premium safes, lockers, and security products for purchase.',
    },
    {
      icon: <Key className='h-10 w-10 text-red-700' />,
      title: 'Renting Services',
      description: 'Flexible rental options for temporary or long-term security equipment needs.',
    },
    {
      icon: <Cog className='h-10 w-10 text-red-700' />,
      title: 'Maintenance Services',
      description:
        'Scheduled preventive care, including cleaning, lubrication, and regular inspections to prevent breakdowns.',
    },
    {
      icon: <Shield className='h-10 w-10 text-red-700' />,
      title: 'Office Consultation',
      description:
        'Expert assessment of your office needs, from security solutions to supplies and equipment for optimal workplace efficiency.',
    },
  ]

  return (
    <section id='services' className='py-16'>
      <div className='container mx-auto px-4'>
        <div className='text-center mb-16'>
          <h2 className='text-3xl md:text-4xl font-bold mb-4'>Our Services</h2>
          <p className='text-gray-600 max-w-2xl mx-auto'>
            We offer comprehensive security solutions to meet all your business needs, from installation to maintenance.
          </p>
        </div>

        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
          {services.map((service, index) => (
            <div
              key={index}
              className='bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow border border-gray-100'
            >
              <div className='mb-4'>{service.icon}</div>
              <h3 className='text-xl font-semibold mb-2'>{service.title}</h3>
              <p className='text-gray-600'>{service.description}</p>
            </div>
          ))}
        </div>

        <div className='mt-16 bg-white rounded-xl shadow-md overflow-hidden border border-gray-100'>
          <div className='flex flex-col md:flex-row'>
            <div className='w-full bg-red-700 text-white p-8 md:p-12'>
              <h3 className='text-2xl md:text-3xl font-bold mb-6 text-center'>Why Choose Our Services</h3>
              <p className='mb-4 text-lg'>
                We are the pioneers in rental contracts in Egypt! With an impeccable reputation in the market, we have
                had the privilege of serving esteemed clients across various industries.
              </p>
              <p className='mb-4 text-lg'>
                Our maintenance team, the strongest in the market, ensures that our products are in top-notch condition
                at all times. We pride ourselves on providing the highest quality customer service, tailored to meet the
                unique needs of our valued customers.
              </p>
              <p className='mb-4 text-lg'>
                Our products, unrivaled in the market, offer an unparalleled experience in terms of reliability,
                security, and performance. And rest assured, our fair offers are a perfect reflection of the exceptional
                quality and service we provide.
              </p>
              <p className='text-xl font-semibold mt-6 text-center'>
                All our services are available for you — just one call away!
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ServicesSection
