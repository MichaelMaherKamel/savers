// components/products/TabsNav.tsx
import Link from 'next/link';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface TabsNavProps {
  activeTab: string;
  className?: string;
}

export function TabsNav({ activeTab, className = '' }: TabsNavProps) {
  return (
    <Tabs defaultValue={activeTab} value={activeTab} className={className}>
      <div className='flex justify-center mb-8'>
        <TabsList className='bg-white border border-gray-100 shadow-sm p-1 w-full max-w-md mx-auto'>
          <Link href="/products" passHref>
            <TabsTrigger
              value='all'
              className='flex-1 px-4 py-3 data-[state=active]:bg-red-600 data-[state=active]:text-white data-[state=active]:shadow-sm'
              data-state={activeTab === 'all' ? 'active' : 'inactive'}
            >
              All
            </TabsTrigger>
          </Link>
          <Link href="/products?cat=safes" passHref>
            <TabsTrigger
              value='safes'
              className='flex-1 px-4 py-3 data-[state=active]:bg-red-600 data-[state=active]:text-white data-[state=active]:shadow-sm'
              data-state={activeTab === 'safes' ? 'active' : 'inactive'}
            >
              Safes
            </TabsTrigger>
          </Link>
          <Link href="/products?cat=lockers" passHref>
            <TabsTrigger
              value='lockers'
              className='flex-1 px-4 py-3 data-[state=active]:bg-red-600 data-[state=active]:text-white data-[state=active]:shadow-sm'
              data-state={activeTab === 'lockers' ? 'active' : 'inactive'}
            >
              Lockers
            </TabsTrigger>
          </Link>
          <Link href="/products?cat=printers" passHref>
            <TabsTrigger
              value='printers'
              className='flex-1 px-4 py-3 data-[state=active]:bg-red-600 data-[state=active]:text-white data-[state=active]:shadow-sm'
              data-state={activeTab === 'printers' ? 'active' : 'inactive'}
            >
              Printers
            </TabsTrigger>
          </Link>
        </TabsList>
      </div>
    </Tabs>
  )
}