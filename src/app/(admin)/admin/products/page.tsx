import { Suspense } from "react";
import ProductsList from "@/components/products/ProductsList";
import { adminGetAllProducts } from "@/db/actions/products";
import { getCategories } from "@/db/actions/categories";

export default async function AdminProductsPage() {
  const [products, categories] = await Promise.all([
    adminGetAllProducts(),
    getCategories()
  ]);
  return (
    <main>
      <Suspense fallback={<div className="p-8 text-center">Loading products...</div>}>
      <ProductsList 
      initialProducts={products}
      categories={categories}
    />
      </Suspense>
    </main>
  );
}