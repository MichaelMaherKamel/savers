'use server';
import { db } from '..';
import { products } from '../schema';
import { revalidatePath } from 'next/cache';
import { eq, ne, and } from 'drizzle-orm';
import { unstable_cache } from 'next/cache';

// Type definitions for product
type Product = {
  id: number;
  name: string;
  productDescription: string;
  category: string;
  image: string;
  createdAt: Date;
  updatedAt: Date;
};

// Helper function to simulate network delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

type CreateProductInput = Omit<Product, 'id' | 'createdAt' | 'updatedAt'>;
type UpdateProductInput = Partial<Omit<Product, 'id' | 'createdAt' | 'updatedAt'>>;

// Cache configuration with 1-minute revalidation
const CACHE_REVALIDATE_TIME = 60; // 1 minute in seconds

/**
 * Get all products from the database (cached for 1 minute)
 */
export const getAllProducts = unstable_cache(
  async (): Promise<Product[]> => {
    try {
      const allProducts = await db.select().from(products);
      return allProducts;
    } catch (error) {
      console.error('Error fetching products:', error);
      throw new Error('Failed to fetch products');
    }
  },
  ['all-products'], // Cache tag
  { revalidate: CACHE_REVALIDATE_TIME }
);

/**
 * Get products by Category (cached for 1 minute)
 */
export const getProductsByCategory = unstable_cache(
  async (category: string): Promise<Product[]> => {
    try {
      // Convert the provided category to lowercase
      const normalizedCategory = category.toLowerCase();
      
      // Fetch all products
      const allProducts = await db.select().from(products);
      
      // Filter products by case-insensitive category matching
      const matchedProducts = allProducts.filter(product => 
        product.category.toLowerCase() === normalizedCategory
      );
      
      return matchedProducts;
    } catch (error) {
      console.error(`Error fetching products with category ${category}:`, error);
      throw new Error(`Failed to fetch products with category ${category}`);
    }
  },
  ['products-by-category'], // Cache tag prefix
  { revalidate: CACHE_REVALIDATE_TIME }
);

/**
 * Get a product by ID (cached for 1 minute)
 */
export const getProductById = unstable_cache(
  async (id: number): Promise<Product | null> => {
    try {
      const [product] = await db.select().from(products).where(eq(products.id, id));
      return product || null;
    } catch (error) {
      console.error(`Error fetching product with ID ${id}:`, error);
      throw new Error(`Failed to fetch product with ID ${id}`);
    }
  },
  ['product-by-id'], // Cache tag prefix
  { revalidate: CACHE_REVALIDATE_TIME }
);

/**
 * Get similar products based on the category, excluding the current product
 * Returns up to 3 similar products (cached for 1 minute)
 */
export const getSimilarProducts = unstable_cache(
  async (productId: number, category: string, limit: number = 3): Promise<Product[]> => {
    try {
      // Convert the provided category to lowercase
      const normalizedCategory = category.toLowerCase();
      
      // Fetch all products
      const allProducts = await db.select().from(products);
      
      // Filter products by case-insensitive category matching and exclude current product
      const similarProducts = allProducts.filter(product => 
        product.category.toLowerCase() === normalizedCategory && 
        product.id !== productId
      );
      
      // If not enough products in the same category, get products from other categories
      if (similarProducts.length < limit) {
        const otherProducts = allProducts.filter(product => 
          product.category.toLowerCase() !== normalizedCategory && 
          product.id !== productId
        );
        
        // Combine and limit the results
        return [...similarProducts, ...otherProducts].slice(0, limit);
      }
      
      // Return a random selection if we have more than the limit
      if (similarProducts.length > limit) {
        // Shuffle the array to get random products
        const shuffled = [...similarProducts].sort(() => 0.5 - Math.random());
        return shuffled.slice(0, limit);
      }
      
      return similarProducts;
    } catch (error) {
      console.error(`Error fetching similar products for product ID ${productId}:`, error);
      throw new Error(`Failed to fetch similar products for product ID ${productId}`);
    }
  },
  ['similar-products'], // Cache tag prefix
  { revalidate: CACHE_REVALIDATE_TIME }
);

/**
 * Create a new product
 */
export async function createProduct(input: CreateProductInput): Promise<Product> {
  try {
    const [newProduct] = await db.insert(products).values({
      name: input.name,
      productDescription: input.productDescription,
      category: input.category,
      image: input.image,
    }).returning();
    
    // Revalidate cache and paths
    revalidatePaths();
    
    return newProduct;
  } catch (error) {
    console.error('Error creating product:', error);
    throw new Error('Failed to create product');
  }
}

/**
 * Update an existing product
 */
export async function updateProduct(id: number, input: UpdateProductInput): Promise<Product | null> {
  try {
    // First check if the product exists
    const existingProduct = await getProductById(id);
    if (!existingProduct) {
      return null;
    }
    
    const [updatedProduct] = await db.update(products)
      .set({
        ...input,
        updatedAt: new Date(),
      })
      .where(eq(products.id, id))
      .returning();
    
    // Revalidate cache and paths
    revalidatePaths();
    
    return updatedProduct;
  } catch (error) {
    console.error(`Error updating product with ID ${id}:`, error);
    throw new Error(`Failed to update product with ID ${id}`);
  }
}

/**
 * Delete a product by ID
 */
export async function deleteProduct(id: number): Promise<boolean> {
  try {
    // First check if the product exists
    const existingProduct = await getProductById(id);
    if (!existingProduct) {
      return false;
    }
    
    await db.delete(products).where(eq(products.id, id));
    
    // Revalidate cache and paths
    revalidatePaths();
    
    return true;
  } catch (error) {
    console.error(`Error deleting product with ID ${id}:`, error);
    throw new Error(`Failed to delete product with ID ${id}`);
  }
}

/**
 * Helper function to revalidate all product-related paths and caches
 */
function revalidatePaths() {
  // Revalidate the products path to update any cached data
  revalidatePath('/products');
  revalidatePath('/admin/products');
  
  // The following is an alternative way to invalidate the cache tags
  // if needed in more complex scenarios
  /*
  revalidateTag('all-products');
  revalidateTag('products-by-category');
  revalidateTag('product-by-id');
  revalidateTag('similar-products');
  */
}