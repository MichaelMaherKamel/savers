"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ImageUpload } from "./ImageUpload";
import { ChevronLeft, ChevronRight, Save, X, Plus, Trash2 } from "lucide-react";
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
import { Product } from "./ProductsList";
import { Separator } from "@/components/ui/separator";
import { Progress } from "@/components/ui/progress";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";

interface ProductFormProps {
  initialData?: Product;
  isEditing?: boolean;
  onCancel?: () => void;
  onSave?: (product: Product) => void;
}

const emptyProduct: Product = {
  id: "",
  name: "",
  model: "",
  category: "Printers",
  description: "",
  keyFeatures: [],
  specifications: {},
  imageUrls: []
};

// Step definition
type Step = {
  title: string;
};

// Define steps (removed description property)
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
  isEditing = false,
  onCancel,
  onSave
}: ProductFormProps) {
  const [currentStep, setCurrentStep] = useState(0);
  // Removed loading state as it's not needed
  const [formData, setFormData] = useState<Product>(initialData || emptyProduct);
  const [keyFeatureRows, setKeyFeatureRows] = useState<{id: number, value: string}[]>([{id: 1, value: ""}]);
  const [specRows, setSpecRows] = useState<SpecRow[]>([{id: 1, key: "", value: ""}]);
  const router = useRouter();

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
      
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
          value: value as string
        }));
        setSpecRows(specs);
      }
    }
  }, [initialData]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // If this is being used as a child component with callbacks
    if (onSave) {
      onSave(formData);
    } else {
      // In a real application, this would be an API call
      console.log("Submitting product:", formData);
      
      toast.success(isEditing ? "Product updated successfully" : "Product created successfully");
      // This would navigate back to the products page if not using callbacks
      // router.push("/admin/products");
    }
  };

  // Generic input change handler for simple text fields
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle category select change
  const handleCategoryChange = (value: string) => {
    setFormData(prev => ({
      ...prev,
      category: value as "Printers" | "Safes" | "Lockers"
    }));
  };

  // Handle key feature change
  const handleKeyFeatureChange = (id: number, value: string) => {
    setKeyFeatureRows(prev => 
      prev.map(row => row.id === id ? { ...row, value } : row)
    );
    
    // Update formData with all current features
    updateKeyFeaturesInFormData();
  };

  // Update formData with current key features
  const updateKeyFeaturesInFormData = () => {
    const features = keyFeatureRows
      .map(row => row.value.trim())
      .filter(feature => feature !== "");
      
    setFormData(prev => ({
      ...prev,
      keyFeatures: features
    }));
  };

  // Add new key feature row
  const addKeyFeatureRow = () => {
    const newId = keyFeatureRows.length > 0 
      ? Math.max(...keyFeatureRows.map(row => row.id)) + 1 
      : 1;
    setKeyFeatureRows(prev => [...prev, { id: newId, value: "" }]);
  };

  // Remove key feature row
  const removeKeyFeatureRow = (id: number) => {
    setKeyFeatureRows(prev => prev.filter(row => row.id !== id));
    
    // Update formData after removing the row
    setTimeout(updateKeyFeaturesInFormData, 0);
  };

  // Handle specification key-value pair change
  const handleSpecChange = (id: number, field: 'key' | 'value', newValue: string) => {
    setSpecRows(prev => 
      prev.map(row => row.id === id ? { ...row, [field]: newValue } : row)
    );
    
    // Update formData specifications
    updateSpecificationsInFormData();
  };

  // Update formData with current specifications
  const updateSpecificationsInFormData = () => {
    // FIX: Changed from empty object to Record<string, string> for proper type safety
    const specs: Record<string, string> = {};
    
    specRows.forEach(row => {
      if (row.key.trim() !== '') {
        specs[row.key] = row.value;
      }
    });
    
    setFormData(prev => ({
      ...prev,
      specifications: specs
    }));
  };

  // Add new specification row
  const addSpecRow = () => {
    const newId = specRows.length > 0 
      ? Math.max(...specRows.map(row => row.id)) + 1 
      : 1;
    setSpecRows(prev => [...prev, { id: newId, key: "", value: "" }]);
  };

  // Remove specification row
  const removeSpecRow = (id: number) => {
    setSpecRows(prev => prev.filter(row => row.id !== id));
    
    // Update formData after removing the row
    setTimeout(updateSpecificationsInFormData, 0);
  };

  const handleCancel = () => {
    if (onCancel) {
      onCancel();
    } else {
      router.push("/admin/products");
    }
  };

  const goToNextStep = () => {
    if (currentStep < steps.length - 1) {
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

  const isLastStep = currentStep === steps.length - 1;
  const isFirstStep = currentStep === 0;

  return (
    <div className="container mx-auto py-8 w-full">
      <div className="flex items-center justify-between mb-6">
        {onCancel ? (
          <div className="flex items-center">
            <Button variant="outline" size="icon" onClick={handleCancel} className="mr-4">
              <X className="h-4 w-4" />
            </Button>
            <h1 className="text-2xl font-bold">
              {isEditing ? "Edit Product" : "Add New Product"}
            </h1>
          </div>
        ) : (
          <div className="flex items-center">
            <Link href="/admin/products" className="mr-4">
              <Button variant="outline" size="icon">
                <ChevronLeft className="h-4 w-4" />
              </Button>
            </Link>
            <h1 className="text-2xl font-bold">
              {isEditing ? "Edit Product" : "Add New Product"}
            </h1>
          </div>
        )}

        {isEditing && onSave && (
          <Button 
            onClick={handleSubmit} 
            className="flex items-center"
          >
            <Save className="mr-2 h-4 w-4" />
            Save Changes
          </Button>
        )}
      </div>

      <Card className="shadow-lg">
        <CardHeader className="pb-0">
          {/* Step progress indicator - removed description */}
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
                    <Label htmlFor="name">Product Name</Label>
                    <Input
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="model">Model Number</Label>
                    <Input
                      id="model"
                      name="model"
                      value={formData.model}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="category">Category</Label>
                    <Select
                      name="category" 
                      value={formData.category}
                      onValueChange={handleCategoryChange}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select a category" />
                      </SelectTrigger>
                      <SelectContent className='w-full'>
                        <SelectItem value="Printers">Printers</SelectItem>
                        <SelectItem value="Safes">Safes</SelectItem>
                        <SelectItem value="Lockers">Lockers</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    name="description"
                    rows={5}
                    value={formData.description || ''}
                    onChange={handleInputChange}
                    required
                  />
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
            
            {/* Step 3: Media (former Step 4) */}
            {currentStep === 2 && (
              <div className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="brochureUrl">Brochure URL</Label>
                  <Input
                    id="brochureUrl"
                    name="brochureUrl"
                    value={formData.brochureUrl || ''}
                    onChange={handleInputChange}
                    placeholder="https://example.com/brochures/product-name.pdf"
                  />
                </div>
                
                <Separator className="my-6" />
                
                <div className="space-y-2">
                  <Label>Product Images</Label>
                  <ImageUpload />
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
          >
            {isFirstStep ? "Cancel" : "Back"}
          </Button>
          
          <div className="flex gap-2">
            {!isLastStep ? (
              <Button type="button" onClick={goToNextStep} className="flex items-center" variant="destructive">
                Next
                <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            ) : (
              <>
                {!onSave && (
                  <Button type="submit" onClick={handleSubmit} variant="destructive">
                    {isEditing ? "Update Product" : "Create Product"}
                  </Button>
                )}
              </>
            )}
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}