'use server';

import { db } from "@/db";
import { categories, Category } from "@/db/schema";
import { revalidatePath, unstable_cache } from "next/cache";
import { asc, eq, like } from "drizzle-orm";

/**
 * Create a new category
 */
export async function createCategory(name: string, image: string) {
  try {
    // Normalize the category name
    const normalizedName = name.trim();
    const normalizedImage = image.trim();
    
    if (!normalizedName) {
      return { error: "Category name is required" };
    }
    
    if (!normalizedImage) {
      return { error: "Category image is required" };
    }
    
    // Insert the new category
    const newCategory = await db.insert(categories)
      .values({ 
        name: normalizedName,
        image: normalizedImage
      })
      .returning()
      .execute();
    
    // // Revalidate paths to update UI
     revalidatePath('/admin/categories');
     revalidatePath('/');
     revalidatePath('/products');
    
    return { category: newCategory[0] };
  } catch (error: any) {
    // Handle unique constraint violation
    if (error.code === '23505') {
      return { error: "A category with this name already exists" };
    }
    
    console.error("Failed to create category:", error);
    return { error: "Failed to create category" };
  }
}

/**
 * Get all categories
 */
export const getCategories = unstable_cache(
  async (): Promise<Category[]> => {
    try {
      return await db.select().from(categories).orderBy(asc(categories.id));
    } catch (error) {
      console.error("Failed to fetch categories:", error);
      throw new Error("Failed to fetch categories");
    }
  },
  ['all-categories'], // Cache tag
  { revalidate: 3600 } // 1 hour cache
);

/**
 * Get a single category by ID
 */
export async function getCategoryById(id: number) {
  try {
    if (!id) {
      return { error: "Category ID is required" };
    }
    
    const category = await db.select()
      .from(categories)
      .where(eq(categories.id, id))
      .execute();
    
    if (!category.length) {
      return { error: "Category not found" };
    }
    
    return { category: category[0] };
  } catch (error) {
    console.error("Failed to fetch category:", error);
    return { error: "Failed to fetch category" };
  }
}

/**
 * Search categories by name
 */
export async function searchCategories(query: string) {
  try {
    const searchResults = await db.select()
      .from(categories)
      .where(like(categories.name, `%${query}%`))
      .orderBy(categories.name)
      .execute();
    
    return { categories: searchResults };
  } catch (error) {
    console.error("Failed to search categories:", error);
    return { error: "Failed to search categories" };
  }
}

/**
 * Update an existing category
 */
export async function updateCategory(id: number, name: string, image: string) {
  try {
    // Normalize the inputs
    const normalizedName = name.trim();
    const normalizedImage = image.trim();
    
    if (!id) {
      return { error: "Category ID is required" };
    }
    
    if (!normalizedName) {
      return { error: "Category name is required" };
    }
    
    if (!normalizedImage) {
      return { error: "Category image is required" };
    }
    
    // Find the category first to ensure it exists
    const existingCategory = await db.select()
      .from(categories)
      .where(eq(categories.id, id))
      .execute();
    
    if (!existingCategory.length) {
      return { error: "Category not found" };
    }
    
    // Update the category
    const updatedCategory = await db.update(categories)
      .set({ 
        name: normalizedName,
        image: normalizedImage,
        updatedAt: new Date()
      })
      .where(eq(categories.id, id))
      .returning()
      .execute();
    
    // Revalidate paths to update UI
    revalidatePath('/admin/categories');
    revalidatePath('/');
    revalidatePath('/products');
    
    return { category: updatedCategory[0] };
  } catch (error: any) {
    // Handle unique constraint violation
    if (error.code === '23505') {
      return { error: "A category with this name already exists" };
    }
    
    console.error("Failed to update category:", error);
    return { error: "Failed to update category" };
  }
}

/**
 * Update category image only
 */
export async function updateCategoryImage(id: number, image: string) {
  try {
    const normalizedImage = image.trim();
    
    if (!id) {
      return { error: "Category ID is required" };
    }
    
    if (!normalizedImage) {
      return { error: "Category image is required" };
    }
    
    // Find the category first to ensure it exists
    const existingCategory = await db.select()
      .from(categories)
      .where(eq(categories.id, id))
      .execute();
    
    if (!existingCategory.length) {
      return { error: "Category not found" };
    }
    
    // Update only the image
    const updatedCategory = await db.update(categories)
      .set({ 
        image: normalizedImage,
        updatedAt: new Date()
      })
      .where(eq(categories.id, id))
      .returning()
      .execute();
    
    // Revalidate paths to update UI
    revalidatePath('/admin/categories');
    revalidatePath('/');
    revalidatePath('/products');
    
    return { category: updatedCategory[0] };
  } catch (error) {
    console.error("Failed to update category image:", error);
    return { error: "Failed to update category image" };
  }
}

/**
 * Delete a category
 */
export async function deleteCategory(id: number) {
  try {
    if (!id) {
      return { error: "Category ID is required" };
    }
    
    // Find the category first to ensure it exists
    const existingCategory = await db.select()
      .from(categories)
      .where(eq(categories.id, id))
      .execute();
    
    if (!existingCategory.length) {
      return { error: "Category not found" };
    }
    
    // Delete the category
    await db.delete(categories)
      .where(eq(categories.id, id))
      .execute();
    
    // Revalidate paths to update UI
    revalidatePath('/admin/categories');
    revalidatePath('/');
    revalidatePath('/products');
    
    return { success: true };
  } catch (error) {
    console.error("Failed to delete category:", error);
    return { error: "Failed to delete category" };
  }
}

/**
 * Batch delete multiple categories
 */
export async function batchDeleteCategories(ids: number[]) {
  try {
    if (!ids.length) {
      return { error: "No category IDs provided" };
    }
    
    // Delete the categories one by one to ensure they exist
    const results = await Promise.all(
      ids.map(async (id) => {
        try {
          const result = await deleteCategory(id);
          return { id, success: !result.error, error: result.error };
        } catch (error) {
          return { id, success: false, error: "Failed to delete category" };
        }
      })
    );
    
    // Revalidate paths to update UI
    revalidatePath('/admin/categories');
    revalidatePath('/');
    revalidatePath('/products');
    
    return { results };
  } catch (error) {
    console.error("Failed to batch delete categories:", error);
    return { error: "Failed to batch delete categories" };
  }
}