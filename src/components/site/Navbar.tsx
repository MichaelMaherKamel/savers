'use client'

import React, { useState, useRef, useEffect } from 'react'
import Link from 'next/link'
import { SaversLogo } from './SaversLogo'
import { Menu, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { usePathname } from 'next/navigation'

const Navbar: React.FC = () => {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [hasScrolled, setHasScrolled] = useState<boolean>(false)
  const mobileMenuRef = useRef<HTMLDivElement>(null)
  const isHomePage = pathname === '/'

  const toggleMenu = () => {
    setIsOpen(!isOpen)
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

  // Close mobile menu when clicking outside or pressing Escape key
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      // Check if the mobile menu is open and the click is outside of the menu and the toggle button
      if (
        isOpen &&
        mobileMenuRef.current &&
        !mobileMenuRef.current.contains(event.target as Node) &&
        !(event.target as Element)?.closest('button[aria-label="Toggle menu"]')
      ) {
        setIsOpen(false)
      }
    }

    const handleEscapeKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isOpen) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    document.addEventListener('keydown', handleEscapeKey)

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
      document.removeEventListener('keydown', handleEscapeKey)
    }
  }, [isOpen])

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
          <Link href='/' prefetch={true} className='flex-shrink-0 flex items-center'>
            <SaversLogo />
          </Link>

          {/* Navigation - Center */}
          <div className='hidden md:flex md:items-center md:justify-center flex-1 mx-10'>
            <div className='flex space-x-8'>
              <Link
                href='/about'
                prefetch={true}
                className='inline-flex items-center px-4 pt-1 text-sm font-medium text-gray-900 hover:text-red-600'
              >
                About
              </Link>

              <Link
                href='/clients'
                prefetch={true}
                className='inline-flex items-center px-4 pt-1 text-sm font-medium text-gray-900 hover:text-red-600'
              >
                Our Clients
              </Link>

              <Link
                href='/products'
                prefetch={true}
                className='inline-flex items-center px-4 pt-1 text-sm font-medium text-gray-900 hover:text-red-600'
              >
                Products
              </Link>
            </div>
          </div>

          {/* Button - Right */}
          <Link href={'/contact'} prefetch={true} className='hidden md:flex md:items-center'>
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
        <div className='md:hidden' ref={mobileMenuRef}>
          <div className='pt-2 pb-3 space-y-1'>
            <Link
              href='/about'
              prefetch={true}
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
              prefetch={true}
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
              prefetch={true}
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
              <Link href={'/contact'} prefetch={true}>
                <Button onClick={toggleMenu} className='w-full bg-red-700 hover:bg-red-800'>
                  Contact Us
                </Button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  )
}

export default Navbar