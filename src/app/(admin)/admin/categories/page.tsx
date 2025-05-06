import { getCategories } from "@/db/actions/categories";
import { CategoriesGrid } from "@/components/categories/categoryGrid";
import { CreateCategoryButton } from "@/components/categories/createCategoryButton";


export default async function AdminCategoriesPage() {
  const { categories = [], error } = await getCategories();
 
  return (
    <div className="container py-10">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold"><span className="hidden md:inline">Product</span> Categories</h1>
        
        {/* Add category button in header */}
        {categories.length > 0 && <CreateCategoryButton />}
      </div>
     
      {error ? (
        <div className="p-4 bg-red-50 text-red-600 rounded-md">
          Failed to load categories: {error}
        </div>
      ) : categories && categories.length > 0 ? (
        <CategoriesGrid initialCategories={categories} />
      ) : (
        <div className="p-10 text-center bg-gray-50 rounded-md">
          <p className="text-gray-500 mb-6">No categories found. Create your first category to get started.</p>
          <CreateCategoryButton variant='large' />
        </div>
      )}
    </div>
  );
}