"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ImageUpload } from "../site/ImageUpload";
import { ChevronLeft, ChevronRight, Save, X, Plus, Trash2, AlertCircle } from "lucide-react";
import { toast } from "sonner";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Progress } from "@/components/ui/progress";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { adminCreateProduct, adminUpdateProduct } from "@/db/actions/products";
import { Category } from "@/db/schema";

// Define product interface based on the database schema
interface Product {
  id: number;
  name: string;
  model: string | null;
  description: string;
  categoryId: number;
  keyFeatures: string[];
  specifications: Record<string, string>;
  image: string;
  brochureUrl: string | null;
  createdAt?: Date;
  updatedAt?: Date;
}

// Form data without IDs and timestamps
type ProductFormData = Omit<Product, 'id' | 'createdAt' | 'updatedAt'>;

interface ProductFormProps {
  initialData?: Product;
  categories: Category[];
  productId?: number;
  isEditing?: boolean;
}

// Step definition
type Step = {
  title: string;
};

// Define steps
const steps: Step[] = [
  { title: "General Information" },
  { title: "Features & Specifications" },
  { title: "Media" },
];

// Type for specification row
interface SpecRow {
  id: number;
  key: string;
  value: string;
}

export default function ProductForm({ 
  initialData, 
  categories,
  productId,
  isEditing = false,
}: ProductFormProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const router = useRouter();
  
  // Initialize with empty data or provided data
  const [formData, setFormData] = useState<ProductFormData>(() => {
    if (initialData) {
      return {
        name: initialData.name,
        model: initialData.model,
        description: initialData.description,
        categoryId: initialData.categoryId,
        keyFeatures: initialData.keyFeatures || [],
        specifications: initialData.specifications || {},
        image: initialData.image,
        brochureUrl: initialData.brochureUrl,
      };
    }
    
    return {
      name: "",
      model: null,
      description: "",
      categoryId: categories.length > 0 ? categories[0].id : 0,
      keyFeatures: [],
      specifications: {},
      image: "",
      brochureUrl: null,
    };
  });
  
  // UI state for dynamic rows
  const [keyFeatureRows, setKeyFeatureRows] = useState<{id: number, value: string}[]>([{id: 1, value: ""}]);
  const [specRows, setSpecRows] = useState<SpecRow[]>([{id: 1, key: "", value: ""}]);

  // Initialize rows from existing data
  useEffect(() => {
    if (initialData) {
      // Initialize key feature rows from existing data
      if (initialData.keyFeatures && initialData.keyFeatures.length > 0) {
        const features = initialData.keyFeatures.map((feature, index) => ({
          id: index + 1,
          value: feature
        }));
        setKeyFeatureRows(features);
      }
      
      // Initialize specification rows from existing data
      if (initialData.specifications && Object.keys(initialData.specifications).length > 0) {
        const specs = Object.entries(initialData.specifications).map(([key, value], index) => ({
          id: index + 1,
          key,
          value
        }));
        setSpecRows(specs);
      }
    }
  }, [initialData]);

  // Validate the form data
  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};
    
    // Step 1 validation
    if (currentStep === 0) {
      if (!formData.name.trim()) {
        newErrors.name = "Product name is required";
      }
      
      if (!formData.description.trim()) {
        newErrors.description = "Product description is required";
      }
      
      if (!formData.categoryId) {
        newErrors.categoryId = "Category is required";
      }
    }
    
    // Step 3 validation (Media)
    if (currentStep === 2 && isLastStep) {
      if (!formData.image) {
        newErrors.image = "Product image is required";
      }
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Form submission handler
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Don't submit if image is currently uploading
    if (uploadingImage) {
      toast.error("Please wait for the image to finish uploading");
      return;
    }
    
    if (!validateForm()) {
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      if (isEditing && productId) {
        // Update existing product
        await adminUpdateProduct(productId, formData);
        toast.success("Product updated successfully");
      } else {
        // Create new product
        await adminCreateProduct(formData);
        toast.success("Product created successfully");
      }
      
      router.push("/admin/products");
      router.refresh();
    } catch (error: any) {
      console.error("Error saving product:", error);
      toast.error(error.message || "Failed to save product");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Generic input change handler for simple text fields
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error for this field if it exists
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  // Handle category select change
  const handleCategoryChange = (value: string) => {
    const categoryId = parseInt(value, 10);
    setFormData(prev => ({
      ...prev,
      categoryId
    }));
    
    // Clear error for this field if it exists
    if (errors.categoryId) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors.categoryId;
        return newErrors;
      });
    }
  };

  // Handle key feature change
  const handleKeyFeatureChange = (id: number, value: string) => {
    setKeyFeatureRows(prev => {
      const updatedRows = prev.map(row => row.id === id ? { ...row, value } : row);
      
      // Update formData immediately with the changed values
      const features = updatedRows
        .map(row => row.value.trim())
        .filter(feature => feature !== "");
        
      setFormData(currentFormData => ({
        ...currentFormData,
        keyFeatures: features
      }));
      
      return updatedRows;
    });
  };

  // Add new key feature row
  const addKeyFeatureRow = () => {
    const newId = keyFeatureRows.length > 0 
      ? Math.max(...keyFeatureRows.map(row => row.id)) + 1 
      : 1;
    
    setKeyFeatureRows(prev => [...prev, { id: newId, value: "" }]);
    
    // No immediate update to formData needed here since the new row is empty
    // We'll wait for the user to input data before updating formData
  };

  // Remove key feature row
  const removeKeyFeatureRow = (id: number) => {
    setKeyFeatureRows(prev => {
      const updatedRows = prev.filter(row => row.id !== id);
      
      // Update formData immediately with the filtered rows
      const features = updatedRows
        .map(row => row.value.trim())
        .filter(feature => feature !== "");
        
      setFormData(currentFormData => ({
        ...currentFormData,
        keyFeatures: features
      }));
      
      return updatedRows;
    });
  };

  // Handle specification key-value pair change
  const handleSpecChange = (id: number, field: 'key' | 'value', newValue: string) => {
    setSpecRows(prev => {
      const updatedRows = prev.map(row => row.id === id ? { ...row, [field]: newValue } : row);
      
      // Update formData immediately with the changed values
      const specs: Record<string, string> = {};
      updatedRows.forEach(row => {
        if (row.key.trim() !== '') {
          specs[row.key.trim()] = row.value.trim();
        }
      });
      
      setFormData(currentFormData => ({
        ...currentFormData,
        specifications: specs
      }));
      
      return updatedRows;
    });
  };

  // Add new specification row
  const addSpecRow = () => {
    const newId = specRows.length > 0 
      ? Math.max(...specRows.map(row => row.id)) + 1 
      : 1;
    
    setSpecRows(prev => [...prev, { id: newId, key: "", value: "" }]);
    
    // No immediate update to formData needed here since the new row is empty
    // We'll wait for the user to input data before updating formData
  };

  // Remove specification row
  const removeSpecRow = (id: number) => {
    setSpecRows(prev => {
      const updatedRows = prev.filter(row => row.id !== id);
      
      // Update formData immediately with the filtered rows
      const specs: Record<string, string> = {};
      updatedRows.forEach(row => {
        if (row.key.trim() !== '') {
          specs[row.key.trim()] = row.value.trim();
        }
      });
      
      setFormData(currentFormData => ({
        ...currentFormData,
        specifications: specs
      }));
      
      return updatedRows;
    });
  };

  const handleCancel = () => {
    router.push("/admin/products");
  };

  const goToNextStep = () => {
    if (validateForm() && currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
      window.scrollTo(0, 0);
    }
  };

  const goToPreviousStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
      window.scrollTo(0, 0);
    }
  };

  // Handle image upload complete
  const handleImageUpload = (url: string) => {
    setFormData(prev => ({
      ...prev,
      image: url
    }));
    
    // Clear image error if it exists
    if (errors.image) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors.image;
        return newErrors;
      });
    }
    
    // Reset uploading state
    setUploadingImage(false);
  };

  const isLastStep = currentStep === steps.length - 1;
  const isFirstStep = currentStep === 0;

  return (
    <div className="container mx-auto py-8 w-full">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <Link href="/admin/products" className="mr-1 md:mr-4">
            <Button variant="outline" size="icon">
              <ChevronLeft className="h-4 w-4" />
            </Button>
          </Link>
          <h1 className="text-2xl font-bold text-red-600">
            {isEditing ? "Edit Product" : "Add New Product"}
          </h1>
        </div>

        {isEditing && (
          <Button
          variant={'general'}
            onClick={handleSubmit} 
            className="flex items-center"
            disabled={isSubmitting || uploadingImage}
          >
            <Save className="mr-2 h-4 w-4" />
            Save Changes
          </Button>
        )}
      </div>

      <Card className="shadow-lg">
        <CardHeader className="pb-0">
          {/* Step progress indicator */}
          <div className="mb-4">
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-lg font-medium">
                Step {currentStep + 1} of {steps.length}: {steps[currentStep].title}
              </h2>
            </div>
            <Progress value={((currentStep + 1) / steps.length) * 100} className="h-2 bg-gray-200 [&>div]:bg-red-600" />
          </div>
        </CardHeader>

        <CardContent className="pt-6">
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Step 1: General Information */}
            {currentStep === 0 && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name" className="flex items-center">
                      Product Name <span className="text-red-500 ml-1">*</span>
                    </Label>
                    <Input
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className={errors.name ? "border-red-500" : ""}
                    />
                    {errors.name && (
                      <p className="text-red-500 text-sm mt-1">{errors.name}</p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="model">Model Number</Label>
                    <Input
                      id="model"
                      name="model"
                      value={formData.model || ""}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="category" className="flex items-center">
                      Category <span className="text-red-500 ml-1">*</span>
                    </Label>
                    <Select
                      value={formData.categoryId.toString()}
                      onValueChange={handleCategoryChange}
                    >
                      <SelectTrigger className={`w-full ${errors.categoryId ? "border-red-500" : ""}`}>
                        <SelectValue placeholder="Select a category" />
                      </SelectTrigger>
                      <SelectContent>
                        {categories.map((category) => (
                          <SelectItem key={category.id} value={category.id.toString()}>
                            {category.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {errors.categoryId && (
                      <p className="text-red-500 text-sm mt-1">{errors.categoryId}</p>
                    )}
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="description" className="flex items-center">
                    Description <span className="text-red-500 ml-1">*</span>
                  </Label>
                  <Textarea
                    id="description"
                    name="description"
                    rows={5}
                    value={formData.description}
                    onChange={handleInputChange}
                    className={errors.description ? "border-red-500" : ""}
                  />
                  {errors.description && (
                    <p className="text-red-500 text-sm mt-1">{errors.description}</p>
                  )}
                </div>
              </div>
            )}
            
            {/* Step 2: Features & Specifications */}
            {currentStep === 1 && (
              <div className="space-y-6">
                <div className="space-y-4">
                  <div className="flex-col justify-between items-start">
                    <Label className="text-lg">Key Features</Label>
                    <span className="text-sm text-gray-500">Add important product features</span>
                  </div>
                  
                  {/* Key features as key-value pairs */}
                  {keyFeatureRows.map((row) => (
                    <div key={row.id} className="flex items-center gap-2 mt-2">
                      <Input
                        placeholder="Key feature"
                        value={row.value}
                        onChange={(e) => handleKeyFeatureChange(row.id, e.target.value)}
                        className="flex-grow"
                      />
                      <Button 
                        type="button" 
                        variant="destructive" 
                        size="icon"
                        onClick={() => removeKeyFeatureRow(row.id)}
                        disabled={keyFeatureRows.length === 1}
                        className="flex-shrink-0"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                  
                  <Button 
                    type="button" 
                    variant="outline" 
                    size="sm" 
                    onClick={addKeyFeatureRow}
                    className="mt-2"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Add Feature
                  </Button>
                </div>
                
                <Separator className="my-6" />
                
                <div className="space-y-4">
                  <div className="flex-col justify-between items-start">
                    <Label className="text-lg">Specifications</Label>
                    <span className="text-sm text-gray-500">Add details like dimensions, weight, materials and colors</span>
                  </div>
                  
                  {/* Specification key-value pairs */}
                  {specRows.map((row) => (
                    <div key={row.id} className="flex items-center gap-2 mt-2">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2 flex-grow">
                        <Input
                          placeholder="Specification name"
                          value={row.key}
                          onChange={(e) => handleSpecChange(row.id, 'key', e.target.value)}
                        />
                        <Input
                          placeholder="Specification value"
                          value={row.value}
                          onChange={(e) => handleSpecChange(row.id, 'value', e.target.value)}
                        />
                      </div>
                      <Button 
                        type="button" 
                        variant="destructive" 
                        size="icon"
                        onClick={() => removeSpecRow(row.id)}
                        disabled={specRows.length === 1}
                        className="flex-shrink-0"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                  
                  <Button 
                    type="button" 
                    variant="outline" 
                    size="sm" 
                    onClick={addSpecRow}
                    className="mt-2"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Add Specification
                  </Button>
                </div>
              </div>
            )}
            
            {/* Step 3: Media */}
            {currentStep === 2 && (
              <div className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="brochureUrl">Brochure URL</Label>
                  <Input
                    id="brochureUrl"
                    name="brochureUrl"
                    value={formData.brochureUrl || ""}
                    onChange={handleInputChange}
                    placeholder="https://example.com/brochures/product-name.pdf"
                  />
                </div>
                
                <Separator className="my-6" />
                
                <div className="space-y-2">
                  <Label className="flex items-center">
                    Product Image <span className="text-red-500 ml-1">*</span>
                  </Label>
                  {errors.image && (
                    <Alert variant="destructive" className="mb-4">
                      <AlertCircle className="h-4 w-4" />
                      <AlertDescription>{errors.image}</AlertDescription>
                    </Alert>
                  )}
                  
                  {formData.image && (
                    <div className="mb-4">
                      <p className="text-sm text-gray-500 mb-2">Current image:</p>
                      <div className="w-40 h-40 relative border rounded-md overflow-hidden">
                        <img 
                          src={formData.image} 
                          alt={formData.name} 
                          className="object-cover w-full h-full"
                        />
                      </div>
                    </div>
                  )}
                  
                  <ImageUpload 
                    folder="products"
                    currentImageUrl={formData.image}
                    onUploadComplete={handleImageUpload}
                    onUploadStart={() => setUploadingImage(true)}
                  />
                </div>
              </div>
            )}
          </form>
        </CardContent>
        
        <CardFooter className="flex justify-between border-t pt-6">
          <Button 
            type="button" 
            variant="outline"
            onClick={isFirstStep ? handleCancel : goToPreviousStep}
            disabled={isSubmitting}
          >
            {isFirstStep ? "Cancel" : "Back"}
          </Button>
          
          <div className="flex gap-2">
            {!isLastStep ? (
              <Button 
                type="button" 
                onClick={goToNextStep} 
                className="flex items-center" 
                variant="general"
                disabled={isSubmitting}
              >
                Next
                <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            ) : (
              <Button 
                type="submit" 
                onClick={handleSubmit} 
                variant="general"
                disabled={isSubmitting || uploadingImage}
              >
                {isSubmitting ? "Saving..." : (isEditing ? "Update Product" : "Create Product")}
              </Button>
            )}
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}