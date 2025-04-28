'use server';

import { db } from '..';
import { products } from '../schema';
import { revalidatePath } from 'next/cache';
import { eq } from 'drizzle-orm';

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

type CreateProductInput = Omit<Product, 'id' | 'createdAt' | 'updatedAt'>;
type UpdateProductInput = Partial<Omit<Product, 'id' | 'createdAt' | 'updatedAt'>>;

/**
 * Get all products from the database
 */
export async function getAllProducts(): Promise<Product[]> {
  try {
    const allProducts = await db.select().from(products);
    return allProducts;
  } catch (error) {
    console.error('Error fetching products:', error);
    throw new Error('Failed to fetch products');
  }
}

/**
 * Get a product by ID
 */
export async function getProductById(id: number): Promise<Product | null> {
  try {
    const [product] = await db.select().from(products).where(eq(products.id, id));
    return product || null;
  } catch (error) {
    console.error(`Error fetching product with ID ${id}:`, error);
    throw new Error(`Failed to fetch product with ID ${id}`);
  }
}

/**
 * Create a new product
 */
export async function createProduct(input: CreateProductInput): Promise<Product> {
  try {
    const [newProduct] = await db.insert(products).values({
      name: input.name,
      productDescription: input.productDescription,
      image: input.image,
    }).returning();

    // Revalidate the products path to update any cached data
    revalidatePath('/products');
    
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

    // Revalidate the products path to update any cached data
    revalidatePath('/products');
    revalidatePath(`/products/${id}`);
    
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

    // Revalidate the products path to update any cached data
    revalidatePath('/products');
    
    return true;
  } catch (error) {
    console.error(`Error deleting product with ID ${id}:`, error);
    throw new Error(`Failed to delete product with ID ${id}`);
  }
}