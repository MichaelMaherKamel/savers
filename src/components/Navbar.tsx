'use client'

import React, { useState, useRef, useEffect } from 'react'
import Link from 'next/link'
import SaversLogo from './SaversLogo'
import { Menu, X, ChevronDown } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { usePathname } from 'next/navigation'

const Navbar: React.FC = () => {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [isProductsOpen, setIsProductsOpen] = useState<boolean>(false)
  const [hasScrolled, setHasScrolled] = useState<boolean>(false)
  const productsRef = useRef<HTMLDivElement>(null)
  const isHomePage = pathname === '/'

  const toggleMenu = () => {
    setIsOpen(!isOpen)
  }

  const toggleProductsMenu = () => {
    setIsProductsOpen(!isProductsOpen)
  }

  // Handle scroll events to change navbar appearance only on home page
  useEffect(() => {
    const handleScroll = () => {
      // Only track scroll on home page
      if (!isHomePage) return

      const scrollPosition = window.scrollY
      if (scrollPosition > 20) {
        setHasScrolled(true)
      } else {
        setHasScrolled(false)
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [isHomePage])

  // Close the products menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (productsRef.current && !productsRef.current.contains(event.target as Node)) {
        setIsProductsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [productsRef])

  // Determine navbar background style based on route and scroll position
  const getNavbarBackgroundClass = () => {
    if (!isHomePage) {
      // Default style for non-home pages
      return 'bg-white shadow-sm'
    }

    // Home page styles based on scroll position
    return hasScrolled ? 'bg-white/80 backdrop-blur-md shadow-sm' : 'bg-gradient-to-r from-red-50 to-white'
  }

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${getNavbarBackgroundClass()}`}>
      <div className='w-full max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='flex justify-between h-16'>
          {/* Logo - Left */}
          <Link href='/' className='flex-shrink-0 flex items-center'>
            <SaversLogo />
          </Link>

          {/* Navigation - Center */}
          <div className='hidden md:flex md:items-center md:justify-center flex-1 mx-10'>
            <div className='flex space-x-8'>
              <Link
                href='/about'
                className='inline-flex items-center px-4 pt-1 text-sm font-medium text-gray-900 hover:text-red-600'
              >
                About
              </Link>

              <Link
                href='/clients'
                className='inline-flex items-center px-4 pt-1 text-sm font-medium text-gray-900 hover:text-red-600'
              >
                Our Clients
              </Link>

              <div className='relative' ref={productsRef}>
                <button
                  onClick={toggleProductsMenu}
                  className='inline-flex items-center px-4 pt-1 text-sm font-medium text-gray-900 hover:text-red-600'
                  aria-expanded={isProductsOpen}
                  aria-haspopup='true'
                >
                  Products
                  <ChevronDown
                    className={`ml-1 h-4 w-4 transition-transform duration-200 ${isProductsOpen ? 'rotate-180' : ''}`}
                  />
                </button>

                {isProductsOpen && (
                  <div className='absolute left-0 mt-2 w-[500px] bg-white rounded-md shadow-lg z-50 border border-gray-200'>
                    <div className='grid gap-3 p-4 lg:grid-cols-2'>
                      <div className='row-span-3'>
                        <Link
                          href='/products'
                          className='flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-red-500 to-red-700 p-6 no-underline outline-none focus:shadow-md'
                        >
                          <div className='mt-4 mb-2 text-lg font-medium text-white'>View All Products</div>
                          <p className='text-sm leading-tight text-white/90'>
                            Explore our full range of office and home supplies
                          </p>
                        </Link>
                      </div>

                      <div>
                        <Link
                          href='/products/office'
                          className='block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-gray-100 focus:bg-gray-100'
                        >
                          <div className='text-sm font-medium leading-none'>Office Supplies</div>
                          <p className='line-clamp-2 text-sm leading-snug text-gray-500'>
                            Printers, scanners, and other office essentials
                          </p>
                        </Link>
                      </div>

                      <div>
                        <Link
                          href='/products/safes'
                          className='block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-gray-100 focus:bg-gray-100'
                        >
                          <div className='text-sm font-medium leading-none'>Safes & Security</div>
                          <p className='line-clamp-2 text-sm leading-snug text-gray-500'>
                            Secure your valuables with our range of safes
                          </p>
                        </Link>
                      </div>

                      <div>
                        <Link
                          href='/products/home'
                          className='block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-gray-100 focus:bg-gray-100'
                        >
                          <div className='text-sm font-medium leading-none'>Home Supplies</div>
                          <p className='line-clamp-2 text-sm leading-snug text-gray-500'>
                            Lockers and storage solutions for your home
                          </p>
                        </Link>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Button - Right */}
          <Link href={'/contact'} className='hidden md:flex md:items-center'>
            <Button className='bg-red-700 hover:bg-red-800'>Contact Us</Button>
          </Link>

          <div className='flex items-center md:hidden'>
            <button
              onClick={toggleMenu}
              className='inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-red-500'
              aria-expanded={isOpen}
              aria-label='Toggle menu'
            >
              <span className='sr-only'>Open main menu</span>
              {isOpen ? (
                <X className='block h-6 w-6' aria-hidden='true' />
              ) : (
                <Menu className='block h-6 w-6' aria-hidden='true' />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className='md:hidden'>
          <div className='pt-2 pb-3 space-y-1'>
            <Link
              href='/about'
              className={`block pl-3 pr-4 py-2 border-l-4 text-base font-medium ${
                pathname === '/about'
                  ? 'border-red-500 text-red-700 bg-red-50'
                  : 'border-transparent text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800'
              }`}
              onClick={toggleMenu}
            >
              About
            </Link>
            <Link
              href='/clients'
              className={`block pl-3 pr-4 py-2 border-l-4 text-base font-medium ${
                pathname === '/clients'
                  ? 'border-red-500 text-red-700 bg-red-50'
                  : 'border-transparent text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800'
              }`}
              onClick={toggleMenu}
            >
              Our Clients
            </Link>
            <Link
              href='/products'
              className={`block pl-3 pr-4 py-2 border-l-4 text-base font-medium ${
                pathname === '/products'
                  ? 'border-red-500 text-red-700 bg-red-50'
                  : 'border-transparent text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800'
              }`}
              onClick={toggleMenu}
            >
              Products
            </Link>
            <div className='pl-3 pr-4 py-2'>
              <Button className='w-full bg-red-700 hover:bg-red-800'>Contact Us</Button>
            </div>
          </div>
        </div>
      )}
    </nav>
  )
}

export default Navbar
