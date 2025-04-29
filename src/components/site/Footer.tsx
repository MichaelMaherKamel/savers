import React from 'react'
import Link from 'next/link'
import { Facebook, Instagram, Linkedin, Heart } from 'lucide-react'

const Footer = () => {
  return (
    <footer className='py-2 bg-gradient-to-r from-red-50 to-white'>
      <div className='container mx-auto px-4'>
        <div className='flex flex-col md:flex-row justify-between items-center'>
          <div className='mb-4 md:mb-0'>
            <p className='text-sm text-gray-700 mt-1'>© {new Date().getFullYear()} Savers. All rights reserved.</p>
          </div>

          <div className='flex space-x-6 mb-4 md:mb-0'>
            <Link
              href='https://www.facebook.com/canonsavers?mibextid=LQQJ4d'
              className='text-gray-900 hover:text-red-600 transition-colors'
              aria-label='Facebook'
              target='_blank'
              rel='noopener noreferrer'
            >
              <Facebook size={20} />
            </Link>
            <Link
              href='https://www.linkedin.com/in/savers-office-supplies-891a002b1/'
              className='text-gray-900 hover:text-red-600 transition-colors'
              aria-label='LinkedIn'
              target='_blank'
              rel='noopener noreferrer'
            >
              <Linkedin size={20} />
            </Link>
            <Link
              href='https://www.instagram.com/savers_eg/'
              className='text-gray-900 hover:text-red-600 transition-colors'
              aria-label='Instagram'
              target='_blank'
              rel='noopener noreferrer'
            >
              <Instagram size={20} />
            </Link>
          </div>

          <div className='text-sm text-gray-900 flex items-center'>
             Designed by{' '}
            <Link
              href='https://michael.macrotech.dev/'
              className='text-red-600 md:text-red-500 font-medium hover:text-red-600 transition-colors ml-1'
              target='_blank'
              rel='noopener noreferrer'
            >
              Mike
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
