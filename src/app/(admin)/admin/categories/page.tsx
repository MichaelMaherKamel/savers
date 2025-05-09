import { Suspense } from "react";
import { adminGetCategories } from "@/db/actions/categories";
import { CategoriesGrid } from "@/components/admin/categories/CategoriesGrid";
import { CategoryGridSkeleton } from "@/components/admin/categories/CategoryGridSkeleton";

// This is the server component that loads the categories data
async function CategoriesData() {
  try {
    const categories = await adminGetCategories();
    
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
      <Suspense fallback={<CategoryGridSkeleton />}>
        <CategoriesData />
      </Suspense>
    </div>
  );
}