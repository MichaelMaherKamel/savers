import React from 'react'
import Link from 'next/link'
import { SaversLogoOnly } from '@/components/site/SaversLogo'

interface AuthLayoutProps {
  children: React.ReactNode
}

export default function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div className="min-h-screen flex flex-col relative bg-gradient-to-br from-slate-900 via-gray-800 to-red-900">
      {/* Decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-red-600 rounded-full opacity-10 blur-3xl"></div>
        <div className="absolute top-1/4 -left-20 w-64 h-64 bg-red-500 rounded-full opacity-10 blur-3xl"></div>
        <div className="absolute bottom-1/3 right-1/4 w-72 h-72 bg-red-400 rounded-full opacity-10 blur-3xl"></div>
      </div>
      
      {/* Header with logo */}
      <header className="relative z-10 p-6 flex justify-center items-center">
        <Link href="/" className="inline-flex items-center space-x-2">
          <SaversLogoOnly />
          <span className="text-xl font-bold text-white">Savers</span>
        </Link>
      </header>
      
      {/* Main content */}
      <main className="flex-1 flex items-center justify-center relative z-10 p-4">
        {children}
      </main>
      
      {/* Subtle footer */}
      <footer className="relative z-10 p-4 text-center text-gray-400 text-xs">
        <p>© 2025 Savers. All rights reserved.</p>
      </footer>
    </div>
  )
}