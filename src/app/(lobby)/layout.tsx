import React from 'react'
import { Inter } from 'next/font/google'
import Navbar from '@/components/site/Navbar'
import Footer from '@/components/site/Footer'

const inter = Inter({ subsets: ['latin'] })

interface MainLayoutProps {
  children: React.ReactNode
}

const LobbyLayout = async ({ children }: MainLayoutProps) => {
  return (
    <div className='scroll-smooth overflow-x-hidden'>
      <div className={`${inter.className} antialiased overflow-x-hidden`}>
        <Navbar />
        <main className='overflow-hidden w-full'>{children}</main>
        <Footer />
      </div>
    </div>
  )
}

export default LobbyLayout
