import Link from 'next/link';
import { Layers } from 'lucide-react';
import { getCategories } from '@/db/actions/categories';

export default async function CategoryStatsCard() {
  // Fetch categories directly in the server component
  const categories = await getCategories();
  const categoriesCount = categories.length;

  return (
    <div className="bg-white rounded-xl shadow-md">
      <div className="p-4 md:p-6 h-full flex flex-col">
        <div className="flex items-center justify-between mb-4 md:mb-6">
          <h2 className="text-lg font-semibold text-slate-800">Categories</h2>
          <Layers className="h-6 w-6 text-amber-600" />
        </div>
        
        {/* Fixed height container to prevent layout shift */}
        <div className="flex items-center justify-center flex-grow py-6 min-h-32">
          <div className="text-center">
            <div className="text-4xl md:text-5xl font-bold text-amber-600">{categoriesCount}</div>
            <p className="text-slate-500 mt-2">Total Categories</p>
          </div>
        </div>
        
        <div className="mt-4 md:mt-6 border-t pt-4">
          <Link 
            href="/admin/categories" 
            className="block w-full bg-amber-50 hover:bg-amber-100 text-amber-700 font-medium py-2 md:py-3 px-4 rounded-lg transition text-center"
          >
            Manage Categories
          </Link>
        </div>
      </div>
    </div>
  );
}