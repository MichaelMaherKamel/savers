// app/page.jsx

import HeroSection from '@/components/HeroSection'
import ServicesSection from '@/components/ServicesSection'
import ProductsSection from '@/components/ProductsSection'
import ContactSection from '@/components/ContactSection'

export default function Home() {
  return (
    <main className='min-h-screen'>
      <HeroSection />
      <ServicesSection />
      <ProductsSection />
      <ContactSection />
    </main>
  )
}
