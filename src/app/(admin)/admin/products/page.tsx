import ProductsList from "@/components/products/ProductsList";
import { Suspense } from "react";

export default function AdminProductsPage() {
  return (
    <main>
      <Suspense fallback={<div className="p-8 text-center">Loading products...</div>}>
        <ProductsList />
      </Suspense>
    </main>
  );
}