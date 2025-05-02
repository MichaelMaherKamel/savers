import React from 'react'
import { Button } from '@/components/ui/button'
import { ShieldCheck, Users, Clock, Award } from 'lucide-react'
import Link from 'next/link'

const AboutUsPage = () => {
  return (
    <div className='container mx-auto px-4 py-16 sm:px-6 lg:px-8 pt-24'>
      {/* Hero Section */}
      <div className='mb-16 text-center'>
        <h1 className='text-4xl font-bold text-gray-900 sm:text-5xl mb-4'>About SAVERS</h1>
        <p className='mt-2 text-xl font-semibold text-red-600'>SAVERS delight you always</p>
      </div>

      {/* Company Description */}
      <div className='grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16'>
        <div className='bg-gray-100 rounded-lg p-8'>
          <h2 className='text-3xl font-bold text-gray-900 mb-6'>Our Story</h2>
          <p className='text-lg text-gray-600 mb-4'>
            Established in February 2005, SAVERS is a solidarity company founded and managed by Eng. MAGED HADDAD and
            Eng. DAVID MAGDY.
          </p>
          <p className='text-lg text-gray-600 mb-4'>
            Our primary mission is to provide cutting-edge technology systems to the hospitality market, encompassing
            Communications, Security, and printing solutions.
          </p>
          <p className='text-lg text-gray-600'>
            Our journey has been marked by integrity, commitment, and a steadfast dedication to excellence, which has
            led to SAVERS securing a leading position in the Egyptian market, earning the trust of both customers and
            suppliers.
          </p>
        </div>
        <div className='bg-gray-100 rounded-lg p-8'>
          <h2 className='text-3xl font-bold text-gray-900 mb-6'>Our Mission</h2>
          <p className='text-lg text-gray-600 mb-4'>
            At SAVERS, our mission is to continuously deliver cutting-edge technology solutions to the hospitality
            industry, focusing on Communications, Security, and printing solutions.
          </p>
          <p className='text-lg text-gray-600 mb-4'>
            We are dedicated to providing top-quality service, setting new standards in an ever-competitive market.
          </p>
          <p className='text-lg text-gray-600'>
            With unwavering commitment, integrity, and excellence, we aim to maintain our leading position in the
            Egyptian market, earning the trust of both our valued customers and suppliers.
          </p>
        </div>
      </div>

      {/* Vision Section */}
      <div className='mb-16 bg-gradient-to-br from-red-600 to-red-800 rounded-lg p-8 text-white'>
        <h2 className='text-3xl font-bold text-center mb-6'>Our Vision</h2>
        <p className='text-lg text-center max-w-4xl mx-auto'>
          Our vision at SAVERS is to remain at the forefront of technology innovation for the hospitality sector. We
          aspire to be the most trusted and sought-after provider of comprehensive technology solutions. Through ongoing
          partnerships and word-of-mouth advocacy, we see ourselves expanding our reach and making a lasting impact in
          the industry. Our commitment to quality, integrity, and customer-centric excellence will continue to drive us
          towards a future of sustained growth and success.
        </p>
      </div>

      {/* Values Section */}
      <div className='mb-16'>
        <h2 className='text-3xl font-bold text-gray-900 text-center mb-12'>Our Core Values</h2>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8'>
          <div className='bg-white p-6 rounded-lg shadow-md text-center'>
            <div className='inline-flex items-center justify-center h-16 w-16 rounded-full bg-red-100 text-red-600 mb-4'>
              <ShieldCheck size={32} />
            </div>
            <h3 className='text-xl font-bold text-gray-900 mb-2'>Integrity</h3>
            <p className='text-gray-600'>
              We conduct our business with unwavering honesty, transparency, and ethical standards.
            </p>
          </div>
          <div className='bg-white p-6 rounded-lg shadow-md text-center'>
            <div className='inline-flex items-center justify-center h-16 w-16 rounded-full bg-red-100 text-red-600 mb-4'>
              <Award size={32} />
            </div>
            <h3 className='text-xl font-bold text-gray-900 mb-2'>Quality</h3>
            <p className='text-gray-600'>
              We offer only the best products that meet our rigorous standards for durability and reliability.
            </p>
          </div>
          <div className='bg-white p-6 rounded-lg shadow-md text-center'>
            <div className='inline-flex items-center justify-center h-16 w-16 rounded-full bg-red-100 text-red-600 mb-4'>
              <Users size={32} />
            </div>
            <h3 className='text-xl font-bold text-gray-900 mb-2'>Partnership</h3>
            <p className='text-gray-600'>
              We build enduring relationships with our customers who become our most cherished advocates.
            </p>
          </div>
          <div className='bg-white p-6 rounded-lg shadow-md text-center'>
            <div className='inline-flex items-center justify-center h-16 w-16 rounded-full bg-red-100 text-red-600 mb-4'>
              <Clock size={32} />
            </div>
            <h3 className='text-xl font-bold text-gray-900 mb-2'>Innovation</h3>
            <p className='text-gray-600'>
              We continuously strive to remain at the forefront of technology, offering cutting-edge solutions.
            </p>
          </div>
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
          <h2 className="text-3xl font-bold mb-4">Ready to elevate your business experience?</h2>
          <p className="mb-8 text-red-50 text-lg">
            Whether you're looking to enhance your communications systems, strengthen security, or optimize your printing
            solutions, our team is ready to help.
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

export default AboutUsPage