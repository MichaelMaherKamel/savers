import { SaversLogoOnly } from '@/components/site/SaversLogo'
import Link from 'next/link'
import { AlertCircle } from 'lucide-react'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'

export default function NotFound() {
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
        <Card className="border-red-200 bg-red-50 w-full max-w-md">
          <CardHeader>
            <div className="flex items-center gap-2">
              <AlertCircle className="h-5 w-5 text-red-500" />
              <CardTitle className="text-red-700">Not Found</CardTitle>
            </div>
            <CardDescription className="text-red-600">
              Could not find requested resource
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-red-700 mb-4">
              The page you're looking for doesn't exist or has been moved.
            </p>
            <Link
              href="/"
              className="inline-flex items-center justify-center px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
            >
              Return to Home
            </Link>
          </CardContent>
        </Card>
      </main>
     
      {/* Subtle footer */}
      <footer className="relative z-10 p-4 text-center text-gray-400 text-xs">
        <p>© 2025 Savers. All rights reserved.</p>
      </footer>
    </div>
  )
}