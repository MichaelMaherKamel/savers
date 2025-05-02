import { Suspense } from "react";
import ProductForm from "@/components/products/ProductForm";

export default function NewProductPage() {
  return (
    <main>
      <Suspense fallback={<div className="p-8 text-center">Loading form...</div>}>
        <ProductForm />
      </Suspense>
    </main>
  );
}