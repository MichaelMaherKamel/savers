"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import { CategoryDialog } from "./categoryDialog";
import { Category } from "@/db/schema";

interface CreateCategoryButtonProps {
  variant?: "default" | "large";
  onCategoryCreated?: (category: Category) => void;
}

export function CreateCategoryButton({ 
  variant = "default",
  onCategoryCreated 
}: CreateCategoryButtonProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleSuccess = (category: Category) => {
    if (onCategoryCreated) {
      onCategoryCreated(category);
    } else {
      // Use a short timeout to prevent immediate reload
      // This helps avoid React state update errors
      setTimeout(() => {
        window.location.reload();
      }, 300);
    }
  };

  if (variant === "large") {
    return (
      <>
        <Button
          size="lg"
          className="bg-red-600 hover:bg-red-700 text-white px-6 py-6"
          onClick={() => setIsDialogOpen(true)}
        >
          <PlusCircle className="mr-2 h-5 w-5" />
          Create First Category
        </Button>
        
        <CategoryDialog
          mode="create"
          open={isDialogOpen}
          onOpenChange={setIsDialogOpen}
          onSuccess={handleSuccess}
        />
      </>
    );
  }

  return (
    <>
      <Button
        variant="default"
        className="bg-red-700 hover:bg-red-800 text-white"
        onClick={() => setIsDialogOpen(true)}
      >
        <PlusCircle className="mr-2 h-4 w-4" />
        Add New Category
      </Button>
      
      <CategoryDialog
        mode="create"
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        onSuccess={handleSuccess}
      />
    </>
  );
}