import { Suspense } from "react";
import { getCategories } from "@/db/actions/categories";
import { CategoriesGrid } from "@/components/categories/categoryGrid";
import { CreateCategoryButton } from "@/components/categories/createCategoryButton";
import { CategoryGridSkeleton } from "@/components/categories/CategoryGridSkeleton";

// This is the server component that loads the categories data
async function CategoriesData() {
  try {
    const categories = await getCategories();
    
    // Empty state
    if (!categories || categories.length === 0) {
      return (
        <div className="p-10 text-center bg-gray-50 rounded-md">
          <p className="text-gray-500 mb-6">No categories found. Create your first category to get started.</p>
          <CreateCategoryButton variant="large" />
        </div>
      );
    }
    
    // Categories found state
    return (
      <CategoriesGrid initialCategories={categories} />
    );
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    return (
      <div className="p-4 bg-red-50 text-red-600 rounded-md">
        Failed to load categories: {errorMessage}
      </div>
    );
  }
}

export default function AdminCategoriesPage() {
  return (
    <div className="container py-10">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-red-600">
          Categories
        </h1>
        <div>
          <CreateCategoryButton />
        </div>
      </div>
     
      <Suspense fallback={<CategoryGridSkeleton />}>
        <CategoriesData />
      </Suspense>
    </div>
  );
}