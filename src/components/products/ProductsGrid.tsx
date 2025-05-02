// app/products/ProductsGrid.tsx
import ProductCard from '@/components/products/ProductCard'
import { getAllProducts, getProductsByCategory } from '@/db/actions/products'


// This component is async and will handle the data fetching
export default async function ProductsGrid({ category }: { category: string }) {
  // Fetch products based on category
  const products = category === 'all' 
    ? await getAllProducts()
    : await getProductsByCategory(category);
  
  // Add categories if they don't exist (if getProductsByCategory doesn't already handle this)
  const productsWithCategories = products.map(product => {
    // Only add category if it doesn't already exist
    if (product.category) return product;
    
    // Simple logic to categorize products based on name
    let category = 'other';
    const name = product.name.toLowerCase();
    if (name.includes('safe')) category = 'safes';
    else if (name.includes('lock')) category = 'lockers';
    else if (name.includes('print')) category = 'printers';
    
    return {...product, category};
  });

  if (productsWithCategories.length === 0) {
    return (
      <div className="text-center py-4 flex flex-col justify-center">
        <p className="text-xl text-gray-500">No products found in this category.</p>
        <p className="mt-2 text-gray-500 mb-4">
          Check back soon or explore other categories.
        </p>
      </div>
    );
  }

  return (
    <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8'>
      {productsWithCategories.map((product) => (
        <ProductCard
          key={product.id}
          id={product.id.toString()}
          title={product.name}
          description={product.productDescription}
          image={product.image}
          category={product.category || 'Product'}
        />
      ))}
    </div>
  );
}