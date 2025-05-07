import { Suspense } from "react";
import { getCategories } from "@/db/actions/categories";
import dynamic from "next/dynamic";

// Dynamically import the ProductForm to prevent hydration errors
const ProductForm = dynamic(() => import("@/components/products/ProductForm"), {
  ssr: true
});

export default function NewProductPage() {
  return (
    <main>
      <Suspense fallback={<div className="p-8 text-center">Loading form...</div>}>
        <ProductFormWrapper />
      </Suspense>
    </main>
  );
}

// Server component to fetch data
async function ProductFormWrapper() {
  // Fetch categories
  const categories = await getCategories();
  
  // Check if categories exist
  if (!categories || categories.length === 0) {
    return (
      <div className="p-8 text-center">
        <p className="mb-4">You need to create a category before adding products.</p>
        <a href="/admin/categories/new" className="text-blue-600 hover:underline">
          Create a category
        </a>
      </div>
    );
  }
  
  return <ProductForm categories={categories} isEditing={false} />;
}