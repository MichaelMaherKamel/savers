import HeroSection from '@/components/home/HeroSection'
import ServicesSection from '@/components/home/ServicesSection'
import ProductsSection from '@/components/home/ProductsSection'
import ContactSection from '@/components/home/ContactSection'
import ClientsSection from '@/components/home/ClientsSection'

export default function Home() {
  return (
    <main className='min-h-screen'>
      <HeroSection />
      <ServicesSection />
      <ClientsSection />
      <ProductsSection />
      <ContactSection />
    </main>
  )
}
