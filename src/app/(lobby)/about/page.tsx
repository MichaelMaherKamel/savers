import React from 'react'
import { Button } from '@/components/ui/button'
import { ShieldCheck, Users, Clock, Award } from 'lucide-react'

const AboutUsPage = () => {
  return (
    <div className='container mx-auto px-4 py-16 sm:px-6 lg:px-8 pt-24'>
      {/* Hero Section */}
      <div className='mb-16 text-center'>
        <h1 className='text-4xl font-bold text-gray-900 sm:text-5xl mb-4'>About Savers</h1>
        <p className='mt-4 text-xl text-gray-600 max-w-3xl mx-auto'>
          Securing your valuables with innovative solutions since 1995
        </p>
      </div>

      {/* Company Description */}
      <div className='grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16'>
        <div>
          <h2 className='text-3xl font-bold text-gray-900 mb-6'>Our Story</h2>
          <p className='text-lg text-gray-600 mb-4'>
            Founded over 25 years ago, Savers has grown from a small local shop to one of the leading providers of
            security solutions for both homes and businesses across the country.
          </p>
          <p className='text-lg text-gray-600 mb-4'>
            Our commitment to quality, innovation, and customer satisfaction has made us the trusted choice for those
            looking to protect their most valuable assets.
          </p>
          <p className='text-lg text-gray-600'>
            We take pride in offering personalized solutions that meet the specific needs of each client, ensuring that
            their security concerns are addressed with the utmost care and professionalism.
          </p>
        </div>
        <div className='bg-gradient-to-br from-blue-600 to-blue-800 rounded-lg p-8 text-white'>
          <h2 className='text-3xl font-bold mb-6'>Our Mission</h2>
          <p className='text-lg mb-4'>
            At Savers, our mission is to provide peace of mind through reliable, innovative security solutions that
            protect what matters most to our clients.
          </p>
          <p className='text-lg mb-4'>
            We strive to stay at the forefront of security technology while maintaining our commitment to exceptional
            customer service and support.
          </p>
          <p className='text-lg'>
            We believe that security should be accessible to everyone, which is why we offer a wide range of products to
            suit various needs and budgets.
          </p>
        </div>
      </div>

      {/* Values Section */}
      <div className='mb-16'>
        <h2 className='text-3xl font-bold text-gray-900 text-center mb-12'>Our Core Values</h2>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8'>
          <div className='bg-white p-6 rounded-lg shadow-md text-center'>
            <div className='inline-flex items-center justify-center h-16 w-16 rounded-full bg-blue-100 text-blue-600 mb-4'>
              <ShieldCheck size={32} />
            </div>
            <h3 className='text-xl font-bold text-gray-900 mb-2'>Security</h3>
            <p className='text-gray-600'>
              {`" We are dedicated to providing the highest level of security for our clients' valuables."`}
            </p>
          </div>
          <div className='bg-white p-6 rounded-lg shadow-md text-center'>
            <div className='inline-flex items-center justify-center h-16 w-16 rounded-full bg-blue-100 text-blue-600 mb-4'>
              <Award size={32} />
            </div>
            <h3 className='text-xl font-bold text-gray-900 mb-2'>Quality</h3>
            <p className='text-gray-600'>
              We offer only the best products that meet our rigorous standards for durability and reliability.
            </p>
          </div>
          <div className='bg-white p-6 rounded-lg shadow-md text-center'>
            <div className='inline-flex items-center justify-center h-16 w-16 rounded-full bg-blue-100 text-blue-600 mb-4'>
              <Users size={32} />
            </div>
            <h3 className='text-xl font-bold text-gray-900 mb-2'>Service</h3>
            <p className='text-gray-600'>
              We prioritize customer satisfaction through exceptional service and support.
            </p>
          </div>
          <div className='bg-white p-6 rounded-lg shadow-md text-center'>
            <div className='inline-flex items-center justify-center h-16 w-16 rounded-full bg-blue-100 text-blue-600 mb-4'>
              <Clock size={32} />
            </div>
            <h3 className='text-xl font-bold text-gray-900 mb-2'>Reliability</h3>
            <p className='text-gray-600'>
              Our products and services are designed to provide consistent protection you can count on.
            </p>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className='bg-gray-100 rounded-lg p-8 text-center'>
        <h2 className='text-3xl font-bold text-gray-900 mb-4'>Ready to secure what matters most?</h2>
        <p className='text-lg text-gray-600 mb-6 max-w-3xl mx-auto'>
          {`" Whether you're looking to protect your home, business, or valuable assets, our team is ready to help you find
          the perfect security solution."`}
        </p>
        <Button className='bg-blue-600 hover:bg-blue-700 text-lg px-8 py-3 h-auto'>Contact Us Today</Button>
      </div>
    </div>
  )
}

export default AboutUsPage
