import Link from 'next/link';
import { Boxes } from 'lucide-react';
import { adminGetAllProducts } from '@/db/actions/products';

export default async function ProductStatsCard() {
  // Fetch products directly in the server component
  const products = await adminGetAllProducts();
  const productsCount = products.length;

  return (
    <div className="bg-white rounded-xl shadow-md md:row-span-3">
      <div className="p-4 md:p-6 h-full flex flex-col">
        <div className="flex items-center justify-between mb-4 md:mb-6">
          <h2 className="text-lg font-semibold text-slate-800">Products</h2>
          <Boxes className="h-6 w-6 text-purple-600" />
        </div>
        
        {/* Fixed height container to prevent layout shift */}
        <div className="flex items-center justify-center flex-grow py-6 min-h-32">
          <div className="text-center">
            <div className="text-4xl md:text-5xl font-bold text-purple-600">{productsCount}</div>
            <p className="text-slate-500 mt-2">Total Products</p>
          </div>
        </div>
        
        <div className="mt-4 md:mt-6 border-t pt-4">
          <Link 
            href="/admin/products" 
            className="block w-full bg-purple-50 hover:bg-purple-100 text-purple-700 font-medium py-2 md:py-3 px-4 rounded-lg transition text-center"
          >
            Manage Products
          </Link>
        </div>
      </div>
    </div>
  );
}