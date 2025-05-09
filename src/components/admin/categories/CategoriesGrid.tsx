"use client";

import { useState } from "react";
import { Category } from "@/db/schema";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Edit, Trash, MoreHorizontal } from "lucide-react";
import { DeleteCategoryDialog } from "@/components/admin/categories/CategoriesDeleteDialog";
import { CategoryCard } from "@/components/admin/categories/CategoryCard";
import { CreateCategoryButton } from "@/components/admin/categories/CreateCategoriesButton";
import Image from "next/image";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface CategoriesGridProps {
  initialCategories: Category[];
}

export function CategoriesGrid({ initialCategories }: CategoriesGridProps) {
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isCreatingCategory, setIsCreatingCategory] = useState(false);
  const [isEditingCategory, setIsEditingCategory] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  const [categoryList, setCategoryList] = useState<Category[]>(initialCategories || []);

  // Check if we're in a detail view (either editing or creating a category)
  const isInDetailView = isCreatingCategory || isEditingCategory;

  const handleEditCategory = (category: Category) => {
    setSelectedCategory(category);
    setIsEditingCategory(true);
  };

  const handleDeleteCategory = (category: Category) => {
    setSelectedCategory(category);
    setIsDeleteDialogOpen(true);
  };

  const handleCreateCategory = () => {
    setIsCreatingCategory(true);
  };

  const handleCancelEdit = () => {
    setIsEditingCategory(false);
    setSelectedCategory(null);
  };

  const handleCancelCreate = () => {
    setIsCreatingCategory(false);
  };

  const handleCategoryCreated = (newCategory: Category) => {
    setCategoryList((prev) => [newCategory, ...prev]);
    setIsCreatingCategory(false);
  };

  const handleCategoryUpdated = (updatedCategory: Category) => {
    setCategoryList((prev) =>
      prev.map((cat) =>
        cat.id === updatedCategory.id ? updatedCategory : cat
      )
    );
    setIsEditingCategory(false);
    setSelectedCategory(null);
  };

  const handleCategoryDeleted = (categoryId: number) => {
    setCategoryList((prev) => prev.filter((cat) => cat.id !== categoryId));
  };

  return (
    <div>
      {/* Page Title with Create Button */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-red-600">Categories</h1>
        {!isInDetailView && (
          <CreateCategoryButton 
            onCreateClick={handleCreateCategory} 
          />
        )}
      </div>

      {/* Create Category Form */}
      {isCreatingCategory && (
        <CategoryCard
          mode="create"
          onCancel={handleCancelCreate}
          onSuccess={handleCategoryCreated}
        />
      )}

      {/* Edit Category Form */}
      {isEditingCategory && selectedCategory && (
        <CategoryCard
          mode="edit"
          category={selectedCategory}
          onCancel={handleCancelEdit}
          onSuccess={handleCategoryUpdated}
        />
      )}

      {/* Categories Grid - Hide when in detail view */}
      {!isInDetailView && (
        <>
          {categoryList.length === 0 ? (
            <div className="flex flex-col items-center justify-center p-10 text-center bg-gray-50 rounded-md">
              <h3 className="text-lg font-medium text-gray-700 mb-3">No categories yet</h3>
              <p className="text-gray-500 mb-6">Create your first category to organize your products</p>
              <CreateCategoryButton variant="large" onCreateClick={handleCreateCategory} />
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {categoryList.map((category) => (
                <Card key={category.id} className="overflow-hidden group border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                  <div className="relative aspect-[4/3] w-full overflow-hidden">
                    <Image
                      src={category.image}
                      alt={category.name}
                      fill
                      loading={'lazy'}
                      sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                      className="object-cover object-center transform group-hover:scale-105 transition-transform duration-300"
                    />
                    
                    {/* Desktop hover controls - hidden on mobile */}
                    <div className="absolute inset-0 hidden md:flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                      <div className="flex gap-2 backdrop-blur-sm bg-white/20 p-2 rounded-full">
                        <Button
                          size="icon"
                          variant="secondary"
                          onClick={() => handleEditCategory(category)}
                          className="bg-white/80 hover:bg-white text-gray-800 w-9 h-9"
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          size="icon"
                          variant="destructive"
                          onClick={() => handleDeleteCategory(category)}
                          className="w-9 h-9"
                        >
                          <Trash className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                  
                  <CardContent className="p-4 bg-white">
                    <div className="flex items-center justify-between">
                      <h3 className="font-medium text-lg text-gray-800">{category.name}</h3>
                      
                      {/* Mobile actions dropdown - visible only on mobile */}
                      <div className="block md:hidden">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <MoreHorizontal className="h-4 w-4" />
                              <span className="sr-only">Actions</span>
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => handleEditCategory(category)}>
                              <Edit className="mr-2 h-4 w-4" />
                              <span>Edit</span>
                            </DropdownMenuItem>
                            <DropdownMenuItem 
                              onClick={() => handleDeleteCategory(category)}
                              className="text-red-600 focus:text-red-600"
                            >
                              <Trash className="text-red-600 focus:text-red-600 mr-2 h-4 w-4" />
                              <span>Delete</span>
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </>
      )}

      {/* Delete Dialog */}
      {selectedCategory && (
        <DeleteCategoryDialog
          open={isDeleteDialogOpen}
          onOpenChange={setIsDeleteDialogOpen}
          category={selectedCategory}
          onSuccess={() => handleCategoryDeleted(selectedCategory.id)}
        />
      )}
    </div>
  );
}