import { Suspense } from "react";
import ProductsList from "@/components/products/ProductsList";

export default function AdminProductsPage() {
  return (
    <main>
      <Suspense fallback={<div className="p-8 text-center">Loading products...</div>}>
        <ProductsList />
      </Suspense>
    </main>
  );
}