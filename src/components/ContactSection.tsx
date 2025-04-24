// components/ContactSection.jsx
'use client'

import { Phone, Mail, MapPin, ArrowRight } from 'lucide-react'
import Link from 'next/link'

const ContactSection = () => {
  return (
    <section id='contact' className='py-16'>
      <div className='container mx-auto px-4'>
        <div className='text-center mb-12'>
          <h2 className='text-3xl md:text-4xl font-bold mb-4'>Contact Us</h2>
          <p className='text-gray-600 max-w-2xl mx-auto'>
            We're excited to meet you! Feel free to get in touch with us within our working hours.
          </p>
        </div>

        <div className='max-w-3xl mx-auto'>
          <div className='bg-red-700 text-white rounded-xl p-8 shadow-lg'>
            <h3 className='text-2xl font-bold mb-6 text-center'>Get In Touch</h3>

            <div className='grid grid-cols-1 md:grid-cols-3 gap-8 mb-8'>
              <div className='flex flex-col items-center text-center'>
                <Phone className='h-8 w-8 mb-3' />
                <h4 className='font-semibold mb-1'>Phone</h4>
                <p>+201288311421</p>
                <p className='mt-1'>+20 1000775219</p>
              </div>

              <div className='flex flex-col items-center text-center'>
                <Mail className='h-8 w-8 mb-3' />
                <h4 className='font-semibold mb-1'>Email</h4>
                <p>savers@savers-eg.com</p>
              </div>

              <div className='flex flex-col items-center text-center'>
                <MapPin className='h-8 w-8 mb-3' />
                <h4 className='font-semibold mb-1'>Address</h4>
                <p>
                  20 Youssef El-Gendy,
                  <br />
                  Bab Al Louq, Abdeen,
                  <br />
                  Cairo, Egypt
                </p>
              </div>
            </div>

            <div className='border-t border-red-600 pt-6' />

            <div className='mt-8 text-center'>
              <p className='text-xl font-semibold mb-6'>Ready to connect with our team? Let's get started!</p>
              <Link
                href='/contact'
                className='bg-white text-red-700 hover:bg-gray-100 px-8 py-2 rounded-md font-medium inline-flex items-center justify-center mx-auto transition-colors'
              >
                <span>View More Details</span>
                <ArrowRight className='ml-2 h-4 w-4' />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ContactSection
