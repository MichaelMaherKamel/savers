"use client";

import { useState, useEffect } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Category } from "@/db/schema";
import { ImageUpload } from "@/components/site/ImageUpload";
import { toast } from "sonner";
import { createCategory, updateCategory } from "@/db/actions/categories";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  image: z.string().min(1, "Image is required"),
});

type FormValues = z.infer<typeof formSchema>;

interface CategoryDialogProps {
  mode: "create" | "edit";
  open: boolean;
  onOpenChange: (open: boolean) => void;
  category?: Category;
  onSuccess?: (category: Category) => void;
}

export function CategoryDialog({
  mode,
  open,
  onOpenChange,
  category,
  onSuccess,
}: CategoryDialogProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [uploadedImageUrl, setUploadedImageUrl] = useState<string>("");
  const [isImageUploading, setIsImageUploading] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      image: "",
    }
  });

  // Reset form when dialog opens/closes or when category changes
  useEffect(() => {
    if (open) {
      form.reset({
        name: category?.name || "",
        image: category?.image || "",
      });
      
      // If we're editing, set the uploaded image URL to the category's image
      if (mode === "edit" && category?.image) {
        setUploadedImageUrl(category.image);
      } else {
        setUploadedImageUrl("");
      }
    }
  }, [open, category, form, mode]);

  // Update form value when image is uploaded
  useEffect(() => {
    if (uploadedImageUrl) {
      form.setValue("image", uploadedImageUrl, {
        shouldValidate: true,
      });
    }
  }, [uploadedImageUrl, form]);

  const onUploadStart = () => {
    setIsImageUploading(true);
  };

  const onUploadComplete = (url: string) => {
    setUploadedImageUrl(url);
    setIsImageUploading(false);
  };

  const onSubmit = async (values: FormValues) => {
    // Prevent submission if image is still uploading
    if (isImageUploading) {
      toast.error("Please wait for the image to finish uploading");
      return;
    }

    setIsSubmitting(true);
    try {
      if (mode === "create") {
        const result = await createCategory(values.name, values.image);
        if (result.error) {
          toast.error("Failed to create category", {
            description: result.error,
          });
        } else if (result.category) {
          toast.success("Category created successfully");
          // Call onSuccess callback with the new category
          if (onSuccess) {
            onSuccess(result.category);
          }
          onOpenChange(false);
          form.reset({
            name: "",
            image: "",
          });
        }
      } else if (mode === "edit" && category) {
        const result = await updateCategory(category.id, values.name, values.image);
        if (result.error) {
          toast.error("Failed to update category", {
            description: result.error,
          });
        } else if (result.category) {
          toast.success("Category updated successfully");
          // Call onSuccess callback with the updated category
          if (onSuccess) {
            onSuccess(result.category);
          }
          onOpenChange(false);
        }
      }
    } catch (error) {
      console.error("Error submitting category:", error);
      toast.error("An unexpected error occurred");
    } finally {
      setIsSubmitting(false);
    }
  };

  const title = mode === "create" ? "Create New Category" : "Edit Category";
  const description = mode === "create" 
    ? "Add a new product category with name and image."
    : "Update the category details.";
  const submitLabel = mode === "create" ? "Create" : "Update";

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Category name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="image"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Image</FormLabel>
                  <FormControl>
                    <div className="space-y-2">
                      {/* Hidden input to store the image URL */}
                      <input type="hidden" {...field} />
                      
                      {/* Show the current image if one exists */}
                      {field.value && !isImageUploading && (
                        <div className="mt-2 relative w-full aspect-video rounded-md overflow-hidden">
                          <img 
                            src={field.value} 
                            alt="Category preview" 
                            className="object-cover w-full h-full"
                          />
                        </div>
                      )}
                      
                      {/* Image uploader component */}
                      <ImageUpload
                        folder="categories"
                        currentImageUrl={category?.image}
                        onUploadComplete={onUploadComplete}
                        onUploadStart={onUploadStart}
                      />
                      
                      {/* Loading indicator during upload */}
                      {isImageUploading && (
                        <div className="flex items-center justify-center p-4">
                          <Loader2 className="h-6 w-6 animate-spin text-red-600" />
                          <span className="ml-2 text-sm">Uploading image...</span>
                        </div>
                      )}
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={() => onOpenChange(false)}
                disabled={isSubmitting}
              >
                Cancel
              </Button>
              <Button 
                type="submit" 
                disabled={isSubmitting || isImageUploading}
                className="bg-red-600 hover:bg-red-700 text-white"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Submitting...
                  </>
                ) : (
                  submitLabel
                )}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}