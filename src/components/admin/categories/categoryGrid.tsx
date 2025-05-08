"use client";

import { useState } from "react";
import { Category } from "@/db/schema";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Edit, Trash, MoreHorizontal } from "lucide-react";
import { CategoryDialog } from "@/components/admin/categories/categoryDialog";
import { DeleteCategoryDialog } from "@/components/admin/categories/categoryDeleteDialog";
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
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  const [categoryList, setCategoryList] = useState<Category[]>(initialCategories || []);

  const handleEditCategory = (category: Category) => {
    setSelectedCategory(category);
    setIsEditDialogOpen(true);
  };

  const handleDeleteCategory = (category: Category) => {
    setSelectedCategory(category);
    setIsDeleteDialogOpen(true);
  };

  const handleCategoryUpdated = (updatedCategory: Category) => {
    setCategoryList((prev) =>
      prev.map((cat) =>
        cat.id === updatedCategory.id ? updatedCategory : cat
      )
    );
  };

  const handleCategoryDeleted = (categoryId: number) => {
    setCategoryList((prev) => prev.filter((cat) => cat.id !== categoryId));
  };

  // Ensure we're rendering an empty grid if no categories exist
  if (!categoryList || categoryList.length === 0) {
    return null;
  }

  return (
    <>
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

      {/* Edit Dialog */}
      {selectedCategory && (
        <CategoryDialog
          mode="edit"
          open={isEditDialogOpen}
          onOpenChange={setIsEditDialogOpen}
          category={selectedCategory}
          onSuccess={handleCategoryUpdated}
        />
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
    </>
  );
}