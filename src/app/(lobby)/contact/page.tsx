import React from 'react'
import { Mail, Phone, MapPin } from 'lucide-react'
import Link from 'next/link'

const ContactUsPage = () => {
  return (
    <div className='container mx-auto px-4 py-16 sm:px-6 lg:px-8 pt-24'>
      {/* Hero Section */}
      <div className='mb-16 text-center'>
        <h1 className='text-4xl font-bold text-gray-900 sm:text-5xl mb-4'>Contact Us</h1>
        <p className='mt-2 text-xl font-semibold text-red-600'>
          {`We're excited to meet you! Feel free to get in touch with us within these working hours.`}
        </p>
      </div>

      {/* Contact Info and Working Hours Section */}
      <div className='grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16'>
        {/* Contact Information */}
        <div className='bg-gray-100 rounded-lg p-8'>
          <h2 className='text-2xl font-bold text-gray-900 mb-6'>Get in Touch</h2>

          <div className='space-y-6'>
            <div className='flex items-center'>
              <div className='flex-shrink-0 flex items-center justify-center'>
                <Phone className='h-6 w-6 text-red-600' />
              </div>
              <div className='ml-4'>
                <p className='text-lg font-medium text-gray-900'>Phone</p>
                <p className='text-gray-600'>+201288311421</p>
                <p className='text-gray-600'>+20 1000775219</p>
              </div>
            </div>

            <div className='flex items-center'>
              <div className='flex-shrink-0 flex items-center justify-center'>
                <Mail className='h-6 w-6 text-red-600' />
              </div>
              <div className='ml-4'>
                <p className='text-lg font-medium text-gray-900'>Email</p>
                <p className='text-gray-600'>savers@savers-eg.com</p>
              </div>
            </div>

            <div className='flex items-center'>
              <div className='flex-shrink-0 flex items-center justify-center'>
                <MapPin className='h-6 w-6 text-red-600' />
              </div>
              <div className='ml-4'>
                <p className='text-lg font-medium text-gray-900'>Address</p>
                <p className='text-gray-600'>20 Youssef El-Gendy, Bab Al Louq,</p>
                <p className='text-gray-600'>Abdeen, Cairo, Egypt</p>
              </div>
            </div>
          </div>
        </div>

        {/* Working Hours */}
        <div className='bg-gray-100 rounded-lg p-8'>
          <h2 className='text-2xl font-bold text-gray-900 mb-6'>Working Hours</h2>

          <div className='space-y-3'>
            <div className='flex justify-between items-center py-2'>
              <p className='text-gray-700 font-medium'>Sunday</p>
              <p className='text-gray-600'>09:00am - 05:00pm</p>
            </div>
            <div className='flex justify-between items-center py-2 border-b border-gray-200'>
              <p className='text-gray-700 font-medium'>Monday</p>
              <p className='text-gray-600'>09:00am - 05:00pm</p>
            </div>
            <div className='flex justify-between items-center py-2 border-b border-gray-200'>
              <p className='text-gray-700 font-medium'>Tuesday</p>
              <p className='text-gray-600'>09:00am - 05:00pm</p>
            </div>
            <div className='flex justify-between items-center py-2 border-b border-gray-200'>
              <p className='text-gray-700 font-medium'>Wednesday</p>
              <p className='text-gray-600'>09:00am - 05:00pm</p>
            </div>
            <div className='flex justify-between items-center py-2 border-b border-gray-200'>
              <p className='text-gray-700 font-medium'>Thursday</p>
              <p className='text-gray-600'>09:00am - 05:00pm</p>
            </div>
            <div className='flex justify-between items-center py-2 border-b border-gray-200'>
              <p className='text-gray-700 font-medium'>Friday</p>
              <p className='text-red-600'>Closed</p>
            </div>
            <div className='flex justify-between items-center py-2 border-b border-gray-200'>
              <p className='text-gray-700 font-medium'>Saturday</p>
              <p className='text-red-600'>Closed</p>
            </div>
          </div>
        </div>
      </div>

      {/* Map Section */}
      <div className='mb-16'>
        <h2 className='text-2xl font-bold text-gray-900 mb-6 text-center'>Find Us</h2>
        <div className='h-96 rounded-lg overflow-hidden'>
          <iframe
            src='https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3453.7698258903684!2d31.236820466554375!3d30.046058817282395!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzDCsDAyJzQ1LjgiTiAzMcKwMTQnMjAuNCJF!5e0!3m2!1sen!2sus!4v1713976321159!5m2!1sen!2sus'
            width='100%'
            height='100%'
            style={{ border: 0 }}
            allowFullScreen={true}
            loading='lazy'
            referrerPolicy='no-referrer-when-downgrade'
            title='Savers Location in Cairo'
            className='rounded-lg'
          ></iframe>
        </div>
        <div className='mt-4 text-center'>
          <Link
            href='https://www.google.com/maps/dir//30.0460588,31.2390089/@30.0460588,31.2390089,16z'
            target='_blank'
            rel='noopener noreferrer'
            className='inline-flex items-center justify-center px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-medium rounded-lg transition duration-300 w-full'
          >
            <MapPin className='h-5 w-5 mr-2' />
            Get Directions
          </Link>
        </div>
      </div>
    </div>
  )
}

export default ContactUsPage
