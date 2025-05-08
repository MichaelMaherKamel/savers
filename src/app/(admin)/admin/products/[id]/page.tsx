import { Suspense } from "react";
import { adminGetProductById } from "@/db/actions/products";
import { getCategories } from "@/db/actions/categories";
import { getCategoryById } from "@/db/actions/categories";
import { notFound } from "next/navigation";
import dynamic from "next/dynamic";

// Dynamically import the client component
const AdminProductView = dynamic(() => import("@/components/admin/products/AdminProductView"), {
  ssr: true
});

interface ProductPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function ProductPage({ params }: ProductPageProps) {
  // Await the params promise to access the id
  const { id } = await params;
 
  return (
    <main>
      <Suspense fallback={<div className="p-8 text-center">Loading product details...</div>}>
        <ProductViewWrapper id={id} />
      </Suspense>
    </main>
  );
}

// Server component to fetch data
async function ProductViewWrapper({ id }: { id: string }) {
  const productId = parseInt(id, 10);
 
  if (isNaN(productId)) {
    notFound();
  }
 
  // Fetch the product data and categories
  const [product, categories] = await Promise.all([
    adminGetProductById(productId),
    getCategories()
  ]);
 
  if (!product) {
    notFound();
  }
 
  // Get the category details
  const categoryResult = await getCategoryById(product.categoryId);
  
  // Force type to be Category | null to match the expected prop type
  // This handles any case where categoryResult.category might be undefined
  let category = null;
  if (categoryResult && 'category' in categoryResult && categoryResult.category) {
    category = categoryResult.category;
  }
 
  return (
    <AdminProductView
      product={product}
      categories={categories}
      category={category}
    />
  );
}