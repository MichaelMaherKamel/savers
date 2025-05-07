'use server';

import { db } from "@/db";
import { products } from "@/db/schema";
import { revalidatePath } from "next/cache";
import { eq, ne, and, asc } from "drizzle-orm";
import { unstable_cache } from "next/cache";

// Type definitions for product
export type Product = {
  id: number;
  name: string;
  model: string | null;
  description: string;
  categoryId: number;
  keyFeatures: string[];
  specifications: Record<string, string>;
  image: string;
  brochureUrl: string | null;
  createdAt: Date;
  updatedAt: Date;
};

// Input types for creation and updates
export type CreateProductInput = Omit<Product, 'id' | 'createdAt' | 'updatedAt'>;
export type UpdateProductInput = Partial<Omit<Product, 'id' | 'createdAt' | 'updatedAt'>>;

// Cache configuration
const CACHE_REVALIDATE_TIME = 3600; // 1 hour in seconds

/**
 * Get all products from the database (cached for 1 hour)
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
 * Get products by Category ID (cached for 1 hour)
 */
export const getProductsByCategory = unstable_cache(
  async (categoryId: number): Promise<Product[]> => {
    try {
      const categoryProducts = await db.select()
        .from(products)
        .where(eq(products.categoryId, categoryId));
      
      return categoryProducts;
    } catch (error) {
      console.error(`Error fetching products with category ID ${categoryId}:`, error);
      throw new Error(`Failed to fetch products with category ID ${categoryId}`);
    }
  },
  ['products-by-category'], // Cache tag prefix
  { revalidate: CACHE_REVALIDATE_TIME }
);

/**
 * Get a product by ID (cached for 1 hour)
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
 * Returns up to 3 similar products (cached for 1 hour)
 */
export const getSimilarProducts = unstable_cache(
  async (productId: number, categoryId: number, limit: number = 3): Promise<Product[]> => {
    try {
      // Get products from the same category, excluding the current product
      const sameCategoryProducts = await db.select()
        .from(products)
        .where(
          and(
            eq(products.categoryId, categoryId),
            ne(products.id, productId)
          )
        );
      
      // If not enough products in the same category, get products from other categories
      if (sameCategoryProducts.length < limit) {
        const otherProducts = await db.select()
          .from(products)
          .where(
            and(
              ne(products.categoryId, categoryId),
              ne(products.id, productId)
            )
          )
          .limit(limit - sameCategoryProducts.length);
        
        // Combine the results
        return [...sameCategoryProducts, ...otherProducts];
      }
      
      // Return a random selection if we have more than the limit
      if (sameCategoryProducts.length > limit) {
        // Shuffle the array to get random products
        const shuffled = [...sameCategoryProducts].sort(() => 0.5 - Math.random());
        return shuffled.slice(0, limit);
      }
      
      return sameCategoryProducts;
    } catch (error) {
      console.error(`Error fetching similar products for product ID ${productId}:`, error);
      throw new Error(`Failed to fetch similar products for product ID ${productId}`);
    }
  },
  ['similar-products'], // Cache tag prefix
  { revalidate: CACHE_REVALIDATE_TIME }
);

/**
 * Admin function to get all products from the database (no cache)
 */
export async function adminGetAllProducts(): Promise<Product[]> {
  try {
    const allProducts = await db.select().from(products).orderBy(asc(products.id));
    return allProducts;
  } catch (error) {
    console.error('Error fetching products:', error);
    throw new Error('Failed to fetch products');
  }
}

/**
 * Admin function to get products by Category ID (no cache)
 */
export async function adminGetProductsByCategory(categoryId: number): Promise<Product[]> {
  try {
    const categoryProducts = await db.select()
      .from(products)
      .where(eq(products.categoryId, categoryId));
    
    return categoryProducts;
  } catch (error) {
    console.error(`Error fetching products with category ID ${categoryId}:`, error);
    throw new Error(`Failed to fetch products with category ID ${categoryId}`);
  }
}

/**
 * Admin function to get a product by ID (no cache)
 */
export async function adminGetProductById(id: number): Promise<Product | null> {
  try {
    const [product] = await db.select().from(products).where(eq(products.id, id));
    return product || null;
  } catch (error) {
    console.error(`Error fetching product with ID ${id}:`, error);
    throw new Error(`Failed to fetch product with ID ${id}`);
  }
}

/**
 * Admin function to get similar products based on the category, excluding the current product
 * Returns up to 3 similar products (no cache)
 */
export async function adminGetSimilarProducts(productId: number, categoryId: number, limit: number = 3): Promise<Product[]> {
  try {
    // Get products from the same category, excluding the current product
    const sameCategoryProducts = await db.select()
      .from(products)
      .where(
        and(
          eq(products.categoryId, categoryId),
          ne(products.id, productId)
        )
      );
    
    // If not enough products in the same category, get products from other categories
    if (sameCategoryProducts.length < limit) {
      const otherProducts = await db.select()
        .from(products)
        .where(
          and(
            ne(products.categoryId, categoryId),
            ne(products.id, productId)
          )
        )
        .limit(limit - sameCategoryProducts.length);
      
      // Combine the results
      return [...sameCategoryProducts, ...otherProducts];
    }
    
    // Return a random selection if we have more than the limit
    if (sameCategoryProducts.length > limit) {
      // Shuffle the array to get random products
      const shuffled = [...sameCategoryProducts].sort(() => 0.5 - Math.random());
      return shuffled.slice(0, limit);
    }
    
    return sameCategoryProducts;
  } catch (error) {
    console.error(`Error fetching similar products for product ID ${productId}:`, error);
    throw new Error(`Failed to fetch similar products for product ID ${productId}`);
  }
}

/**
 * Admin function to CREATE a new product
 */
export async function adminCreateProduct(input: CreateProductInput): Promise<Product> {
  try {
    // Basic validation
    if (!input.name.trim()) {
      throw new Error('Product name is required');
    }
   
    if (!input.description.trim()) {
      throw new Error('Product description is required');
    }
   
    if (!input.categoryId) {
      throw new Error('Category is required');
    }
   
    if (!input.image) {
      throw new Error('Product image is required');
    }
   
    const [newProduct] = await db.insert(products).values({
      name: input.name.trim(),
      model: input.model ? input.model.trim() : null,
      description: input.description.trim(),
      categoryId: input.categoryId,
      keyFeatures: input.keyFeatures || [],
      specifications: input.specifications || {},
      image: input.image.trim(),
      brochureUrl: input.brochureUrl ? input.brochureUrl.trim() : null,
    }).returning();
   
    // Revalidate cache and paths
    revalidatePaths(newProduct.id);
   
    return newProduct;
  } catch (error) {
    console.error('Error creating product:', error);
    throw error instanceof Error ? error : new Error('Failed to create product');
  }
}

/**
 * Admin function to UPDATE an existing product
 */
export async function adminUpdateProduct(id: number, input: UpdateProductInput): Promise<Product | null> {
  try {
    // Basic validation for fields being updated
    if (input.name !== undefined && !input.name.trim()) {
      throw new Error('Product name is required');
    }
    
    if (input.description !== undefined && !input.description.trim()) {
      throw new Error('Product description is required');
    }
    
    if (input.categoryId !== undefined && !input.categoryId) {
      throw new Error('Category is required');
    }
    
    if (input.image !== undefined && !input.image) {
      throw new Error('Product image is required');
    }
    
    // First check if the product exists
    const existingProduct = await adminGetProductById(id);
    if (!existingProduct) {
      return null;
    }
    
    // Prepare update data with proper trimming
    const updateData: UpdateProductInput = {};
    
    if (input.name !== undefined) updateData.name = input.name.trim();
    if (input.model !== undefined) updateData.model = input.model ? input.model.trim() : null;
    if (input.description !== undefined) updateData.description = input.description.trim();
    if (input.categoryId !== undefined) updateData.categoryId = input.categoryId;
    if (input.keyFeatures !== undefined) updateData.keyFeatures = input.keyFeatures;
    if (input.specifications !== undefined) updateData.specifications = input.specifications;
    if (input.image !== undefined) updateData.image = input.image.trim();
    if (input.brochureUrl !== undefined) updateData.brochureUrl = input.brochureUrl ? input.brochureUrl.trim() : null;
    
    const [updatedProduct] = await db.update(products)
      .set(updateData)
      .where(eq(products.id, id))
      .returning();
    
    // Revalidate cache and paths
    revalidatePaths(id);
    
    return updatedProduct;
  } catch (error) {
    console.error(`Error updating product with ID ${id}:`, error);
    throw error instanceof Error ? error : new Error(`Failed to update product with ID ${id}`);
  }
}

/**
 * Admin function to delete a product by ID
 */
export async function adminDeleteProduct(id: number): Promise<boolean> {
  try {
    // First check if the product exists
    const existingProduct = await adminGetProductById(id);
    if (!existingProduct) {
      return false;
    }
    
    await db.delete(products).where(eq(products.id, id));
    
    // Revalidate cache and paths
    revalidatePaths(id);
    
    return true;
  } catch (error) {
    console.error(`Error deleting product with ID ${id}:`, error);
    throw error instanceof Error ? error : new Error(`Failed to delete product with ID ${id}`);
  }
}

/**
 * Helper function to revalidate all product-related paths and caches
 */
function revalidatePaths(id?: number) {
  // Revalidate the products path to update any cached data
  revalidatePath('/products');
  revalidatePath('/admin/products');
  
  // Only revalidate the specific product path if an ID is provided
  if (id !== undefined) {
    revalidatePath(`/products/${id}`)
    revalidatePath(`/admin/products/${id}`);
  }
}