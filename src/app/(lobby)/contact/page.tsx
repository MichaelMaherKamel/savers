import React from 'react'
import { Button } from '@/components/ui/button'
import { Mail, Phone, MapPin, Clock } from 'lucide-react'

const ContactUsPage = () => {
  return (
    <div className='container mx-auto px-4 py-16 sm:px-6 lg:px-8 pt-24'>
      {/* Hero Section */}
      <div className='mb-16 text-center'>
        <h1 className='text-4xl font-bold text-gray-900 sm:text-5xl mb-4'>Contact Us</h1>
        <p className='mt-4 text-xl text-gray-600 max-w-3xl mx-auto'>{`"We're here to help with all your security needs"`}</p>
      </div>

      {/* Contact Info and Form Section */}
      <div className='grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16'>
        {/* Contact Information */}
        <div>
          <h2 className='text-2xl font-bold text-gray-900 mb-6'>Get in Touch</h2>

          <div className='space-y-6'>
            <div className='flex items-start'>
              <div className='flex-shrink-0'>
                <Phone className='h-6 w-6 text-blue-600' />
              </div>
              <div className='ml-4'>
                <p className='text-lg font-medium text-gray-900'>Phone</p>
                <p className='text-gray-600'>(555) 123-4567</p>
                <p className='text-gray-600'>Monday - Friday, 9am - 5pm</p>
              </div>
            </div>

            <div className='flex items-start'>
              <div className='flex-shrink-0'>
                <Mail className='h-6 w-6 text-blue-600' />
              </div>
              <div className='ml-4'>
                <p className='text-lg font-medium text-gray-900'>Email</p>
                <p className='text-gray-600'>info@savers-security.com</p>
                <p className='text-gray-600'>support@savers-security.com</p>
              </div>
            </div>

            <div className='flex items-start'>
              <div className='flex-shrink-0'>
                <MapPin className='h-6 w-6 text-blue-600' />
              </div>
              <div className='ml-4'>
                <p className='text-lg font-medium text-gray-900'>Office Location</p>
                <p className='text-gray-600'>123 Security Avenue</p>
                <p className='text-gray-600'>Safetown, ST 12345</p>
              </div>
            </div>

            <div className='flex items-start'>
              <div className='flex-shrink-0'>
                <Clock className='h-6 w-6 text-blue-600' />
              </div>
              <div className='ml-4'>
                <p className='text-lg font-medium text-gray-900'>Business Hours</p>
                <p className='text-gray-600'>Monday - Friday: 9am - 5pm</p>
                <p className='text-gray-600'>Saturday: 10am - 2pm</p>
                <p className='text-gray-600'>Sunday: Closed</p>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div className='bg-white p-8 rounded-lg shadow-md'>
          <h2 className='text-2xl font-bold text-gray-900 mb-6'>Send Us a Message</h2>

          <form className='space-y-6'>
            <div>
              <label htmlFor='name' className='block text-sm font-medium text-gray-700 mb-1'>
                Full Name
              </label>
              <input
                type='text'
                id='name'
                className='w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500'
                placeholder='John Doe'
              />
            </div>

            <div>
              <label htmlFor='email' className='block text-sm font-medium text-gray-700 mb-1'>
                Email Address
              </label>
              <input
                type='email'
                id='email'
                className='w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500'
                placeholder='johndoe@example.com'
              />
            </div>

            <div>
              <label htmlFor='phone' className='block text-sm font-medium text-gray-700 mb-1'>
                Phone Number
              </label>
              <input
                type='tel'
                id='phone'
                className='w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500'
                placeholder='(555) 123-4567'
              />
            </div>

            <div>
              <label htmlFor='message' className='block text-sm font-medium text-gray-700 mb-1'>
                Message
              </label>
              <textarea
                id='message'
                rows={4}
                className='w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500'
                placeholder='How can we help you?'
              ></textarea>
            </div>

            <Button className='w-full bg-blue-600 hover:bg-blue-700'>Submit Message</Button>
          </form>
        </div>
      </div>

      {/* Map Section */}
      <div className='mb-16'>
        <h2 className='text-2xl font-bold text-gray-900 mb-6 text-center'>Find Us</h2>
        <div className='h-96 bg-gray-200 rounded-lg flex items-center justify-center'>
          <p className='text-gray-600 text-lg'>Map placeholder - Replace with your map component</p>
        </div>
      </div>
    </div>
  )
}

export default ContactUsPage
