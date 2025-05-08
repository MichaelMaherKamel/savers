import { Suspense } from "react";
import ProductsTable from "@/components/admin/products/ProductsTable";
import ProductsTableSkeleton from "@/components/admin/products/ProductsTableSkeleton";
import { adminGetAllProducts } from "@/db/actions/products";
import { getCategories } from "@/db/actions/categories";

export default function AdminProductsPage() {
  return (
    <main>
      <Suspense fallback={<ProductsTableSkeleton />}>
        <ProductsTableContent />
      </Suspense>
    </main>
  );
}

// Separate server component to fetch data
async function ProductsTableContent() {
  const [products, categories] = await Promise.all([
    adminGetAllProducts(),
    getCategories()
  ]);
  
  return (
    <ProductsTable
      initialProducts={products}
      categories={categories}
    />
  );
}