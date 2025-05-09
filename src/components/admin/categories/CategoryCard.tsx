"use client";

import { useState, useEffect } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Category } from "@/db/schema";
import { ImageUpload } from "@/components/site/ImageUpload";
import { toast } from "sonner";
import { createCategory, updateCategory } from "@/db/actions/categories";
import { ArrowLeft, X, Loader2 } from "lucide-react";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

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

const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  image: z.string().min(1, "Image is required"),
});

type FormValues = z.infer<typeof formSchema>;

interface CategoryCardProps {
  mode: "create" | "edit";
  category?: Category;
  onCancel: () => void;
  onSuccess?: (category: Category) => void;
}

export function CategoryCard({
  mode,
  category,
  onCancel,
  onSuccess,
}: CategoryCardProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [uploadedImageUrl, setUploadedImageUrl] = useState<string>("");
  const [isImageUploading, setIsImageUploading] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: category?.name || "",
      image: category?.image || "",
    }
  });

  // Initialize form with category data if in edit mode
  useEffect(() => {
    if (mode === "edit" && category) {
      form.reset({
        name: category.name,
        image: category.image,
      });
      
      // Set the uploaded image URL to the category's image
      setUploadedImageUrl(category.image);
    }
  }, [category, form, mode]);

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
    <Card className="w-full mb-6">
      <CardHeader className="pb-3">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={onCancel} 
              className="mr-2"
            >
              <ArrowLeft className="h-4 w-4" />
              <span className="sr-only">Back</span>
            </Button>
            <div>
              <CardTitle className="text-xl font-medium">{title}</CardTitle>
              <CardDescription>{description}</CardDescription>
            </div>
          </div>
          <Button variant="ghost" size="icon" onClick={onCancel}>
            <X className="h-4 w-4" />
            <span className="sr-only">Close</span>
          </Button>
        </div>
      </CardHeader>
      
      <CardContent>
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
          </form>
        </Form>
      </CardContent>

      <CardFooter className="flex justify-end space-x-2 pt-4">
        <Button
          type="button"
          variant="outline"
          onClick={onCancel}
          disabled={isSubmitting}
        >
          Cancel
        </Button>
        <Button 
          type="submit" 
          disabled={isSubmitting || isImageUploading}
          variant={'general'}
          onClick={form.handleSubmit(onSubmit)}
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
      </CardFooter>
    </Card>
  );
}