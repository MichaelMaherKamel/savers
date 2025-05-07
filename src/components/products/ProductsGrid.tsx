// app/products/ProductsGrid.tsx
import ProductCard from '@/components/products/ProductCard'
import { getAllProducts } from '@/db/actions/products'
import { getCategories } from '@/db/actions/categories';
import { Category } from '@/db/schema'; // Import the Category type

// This component is async and will handle the data fetching
export default async function ProductsGrid({ category }: { category: string }) {
  try {
    // Get all products
    const allProducts = await getAllProducts();
   
    // Get all categories
    const allCategories: Category[] = await getCategories();
   
    if (allCategories.length === 0) {
      console.warn('No categories were found in the database');
    }
   
    // Filter products based on category
    let filteredProducts = allProducts;
   
    if (category !== 'all') {
      // Find the category ID by name
      const categoryObj = allCategories.find(
        cat => cat.name.toLowerCase() === category.toLowerCase()
      );
     
      if (categoryObj) {
        // Filter products by the found category ID
        filteredProducts = allProducts.filter(product => product.categoryId === categoryObj.id);
      } else {
        // If category name doesn't exist, return empty array
        filteredProducts = [];
      }
    }
   
    // Map products to include a category name property for display
    const productsWithCategories = filteredProducts.map(product => {
      // Find the category name for this product's categoryId
      const categoryObj = allCategories.find(cat => cat.id === product.categoryId);
      const categoryName = categoryObj ? categoryObj.name : 'Other';
     
      return {
        ...product,
        category: categoryName
      };
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
            description={product.description} // Changed from productDescription to description
            image={product.image}
            category={product.categoryId}
          />
        ))}
      </div>
    );
  } catch (error) {
    console.error('Error in ProductsGrid:', error instanceof Error ? error.message : "Unknown error");
    return (
      <div className="text-center py-4 flex flex-col justify-center">
        <p className="text-xl text-red-500">Error loading products</p>
        <p className="mt-2 text-gray-500 mb-4">
          We're having trouble loading the products. Please try again later.
        </p>
      </div>
    );
  }
}