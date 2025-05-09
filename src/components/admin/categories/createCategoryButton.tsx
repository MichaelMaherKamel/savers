"use client";

import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";

interface CreateCategoryButtonProps {
  variant?: "default" | "large";
  onCreateClick: () => void;
}

export function CreateCategoryButton({
  variant = "default",
  onCreateClick
}: CreateCategoryButtonProps) {
  if (variant === "large") {
    return (
      <Button
        size="lg"
        variant={'general'}
        onClick={onCreateClick}
      >
        <PlusCircle className="mr-2 h-5 w-5" />
        Create First Category
      </Button>
    );
  }

  return (
    <Button
      variant="general"
      onClick={onCreateClick}
    >
      <PlusCircle className="mr-2 h-4 w-4" />
      Add New Category
    </Button>
  );
}