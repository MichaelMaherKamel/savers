'use client'
import React, { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

const HeroSection = () => {
  const [currentImage, setCurrentImage] = useState(0)
  // Demo images for carousel with actual links
  const images = [
    {
      alt: 'High security business safe',
      src: '/pics/Safe1.jpg',
    },
    {
      alt: 'Modern office printers',
      src: '/pics/CanonPrinter1.jpg',
    },
    {
      alt: 'Digital security locker',
      src: '/pics/Lock1.webp',
    },
  ]
  // Auto-rotate images every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length)
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  return (
    <section
      id='hero'
      className='min-h-screen flex items-center w-full relative overflow-hidden py-20 md:py-12 lg:py-16'
    >
      <div className='absolute inset-0 bg-gradient-to-r from-red-50 to-white z-0'></div>
      <div className='w-full max-w-screen-xl mx-auto px-4 relative z-10'>
        <div className='flex flex-col md:flex-row items-center justify-between gap-8'>
          <div className='w-full md:w-1/2'>
            <h1 className='text-4xl md:text-5xl lg:text-6xl font-bold leading-tight tracking-tight text-gray-900 mb-6 text-center md:text-left'>
              <div className='mb-2'>
                <span className='text-red-700'>Secure</span> <span>your future</span>
              </div>
              <div>
                <span className='text-red-700'>Document</span> <span>your success</span>
              </div>
            </h1>
            <p className='text-lg text-muted-foreground mb-0 md:mb-8 lg:mb-8 max-w-lg leading-relaxed text-center md:text-left sm:mx-auto md:mx-0 hidden md:block lg:block'>
              Premium safes, lockers, and printers with cutting-edge security features to protect your valuable assets
              and transform your office efficiency.
            </p>
            <div className='hidden md:block md:text-left'>
             <Link href={'/products'}>
             <Button size='lg' className='bg-red-700 hover:bg-red-800 text-white w-full mb-12'>
                Explore Products
              </Button>
             </Link>
            </div>
          </div>
          <div className='w-full md:w-1/2'>
            <div className='relative mx-auto max-w-md md:max-w-full'>
              <div className='bg-gradient-to-br from-red-500 to-indigo-600 rounded-lg overflow-hidden shadow-xl'>
                <div className='aspect-[4/3] relative'>
                  {/* Image carousel */}
                  <div className='absolute inset-0 w-full h-full'>
                    {images.map((img, index) => (
                      <div
                        key={index}
                        className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ${
                          index === currentImage ? 'opacity-100' : 'opacity-0'
                        }`}
                      >
                        <img src={img.src} alt={img.alt} className='w-full h-full object-cover' />
                        <div className='absolute inset-0 bg-gradient-to-br from-red-300/20 to-indigo-400/20'></div>
                      </div>
                    ))}
                  </div>
                  {/* Carousel indicators */}
                  <div className='absolute bottom-4 left-0 right-0 flex justify-center gap-2'>
                    {images.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentImage(index)}
                        className={`w-3 h-3 rounded-full ${index === currentImage ? 'bg-white' : 'bg-white/50'}`}
                        aria-label={`Go to slide ${index + 1}`}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Button below carousel on small screens */}
        <div className='md:hidden text-center mt-8'>
          <Button size='lg' className='bg-red-700 hover:bg-red-800 text-white w-full'>
            Explore Products
          </Button>
        </div>
      </div>
    </section>
  )
}

export default HeroSection
