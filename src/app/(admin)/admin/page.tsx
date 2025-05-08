import { Suspense } from 'react';
import { Users, Layers, Boxes } from 'lucide-react';
import WelcomeCard from '@/components/admin/WelcomeCard';
import UserStatsCard from '@/components/admin/users/UserStatsCard';
import StatsCardSkeleton from '@/components/admin/StatsCardSkeleton';
import { WelcomeCardSkeleton } from '@/components/admin/WelcomeCard';
import ProductStatsCard from '@/components/admin/products/ProductsStatsCard';
import CategoryStatsCard from '@/components/admin/categories/CategoryStatsCard';

export default function AdminPage() {
  return (
    <div className="flex flex-col min-h-screen p-4 md:p-6">
      {/* Bento Grid Layout - Using grid with auto rows for better responsiveness */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 h-full">
        {/* Welcome Card with Suspense */}
        <Suspense fallback={<WelcomeCardSkeleton />}>
          <WelcomeCard />
        </Suspense>
       
        {/* Cards Container - Preserve original grid layout */}
        <div className="grid grid-cols-1 gap-4 md:gap-6 md:row-span-3">
          {/* Users Card with Suspense */}
          <Suspense fallback={<StatsCardSkeleton title="Users" icon={Users} color="green" linkText="Manage Users" />}>
            <UserStatsCard />
          </Suspense>
         
          {/* Categories Card with Suspense */}
          <Suspense fallback={<StatsCardSkeleton title="Categories" icon={Layers} color="amber" linkText="Manage Categories" />}>
            <CategoryStatsCard />
          </Suspense>
        </div>
       
        {/* Products Card with Suspense - Added isProductCard prop */}
        <Suspense fallback={<StatsCardSkeleton title="Products" icon={Boxes} color="purple" linkText="Manage Products" isProductCard={true} />}>
          <ProductStatsCard />
        </Suspense>
      </div>
    </div>
  );
}