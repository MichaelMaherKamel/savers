"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ChevronLeft, Edit, File } from "lucide-react";
import Link from "next/link";
import { Separator } from "@/components/ui/separator";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger
} from "@/components/ui/tabs";
import ProductForm from "@/components/products/ProductForm";
import { Product } from "@/db/actions/products";
import { Category } from "@/db/schema";
import { Badge } from "@/components/ui/badge";

interface ProductViewProps {
  product: Product;
  categories: Category[];
  category: Category | null;
}

export default function AdminProductView({ product, categories, category }: ProductViewProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [activeTab, setActiveTab] = useState("overview");
  const [currentProduct] = useState<Product>(product);

  // If we're in edit mode, render the ProductForm
  if (isEditing) {
    return (
      <ProductForm 
        initialData={currentProduct} 
        categories={categories}
        productId={currentProduct.id}
        isEditing={true} 
      />
    );
  }

  // Handle opening the brochure safely, ensuring the URL is not null
  const handleOpenBrochure = () => {
    if (currentProduct.brochureUrl) {
      window.open(currentProduct.brochureUrl, '_blank');
    }
  };

  return (
    <div className="container mx-auto py-8 w-full flex flex-col">
      {/* Header with navigation and product name */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <Link href="/admin/products" className="mr-1">
            <Button variant="outline" size="icon">
              <ChevronLeft className="h-4 w-4" />
            </Button>
          </Link>
          <h1 className="text-2xl font-bold text-red-600">{currentProduct.name}</h1>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-2">
          {currentProduct.brochureUrl && (
            <Button
              variant="outline"
              onClick={handleOpenBrochure}
              className="flex items-center"
            >
              <File className="mr-2 h-4 w-4" />
              Brochure
            </Button>
          )}
          <Button
            variant={'destructive'}
            onClick={() => setIsEditing(true)} 
            className="flex items-center"
          >
            <Edit className="mr-2 h-4 w-4" />
            Edit Product
          </Button>
        </div>
      </div>

      {/* Product content area */}
      <div className="flex flex-col md:flex-row gap-8 mb-8">
        {/* Product image - left side */}
        <div className="md:w-1/3">
          <div className="aspect-[4/3] rounded-lg overflow-hidden">
            {currentProduct.image ? (
              <img
                src={currentProduct.image}
                alt={currentProduct.name}
                className="w-full h-full object-contain"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-gray-400">
                No image available
              </div>
            )}
          </div>
        </div>
        
        {/* Product info - right side */}
        <div className="md:w-2/3">
          <div className="flex items-center gap-2 mb-3">
            {category && (
              <Badge variant="secondary">
                {category.name}
              </Badge>
            )}
            {currentProduct.model && (
              <span className="text-gray-500 text-sm">Model: {currentProduct.model}</span>
            )}
          </div>
          
          <p className="text-gray-700 mb-6">{currentProduct.description}</p>
          
          <Separator className="my-6" />
          
          {/* Tab content for detailed information */}
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid grid-cols-2 mb-4 gap-2">
              <TabsTrigger className="data-[state=active]:bg-red-600 data-[state=active]:text-white rounded-md transition-all duration-200" value="overview">Key Features</TabsTrigger>
              <TabsTrigger className="data-[state=active]:bg-red-600 data-[state=active]:text-white rounded-md transition-all duration-200" value="specifications">Specifications</TabsTrigger>
            </TabsList>
            
            {/* Key Features Tab */}
            <TabsContent value="overview" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Key Features</CardTitle>
                </CardHeader>
                <CardContent>
                  {currentProduct.keyFeatures && currentProduct.keyFeatures.length > 0 ? (
                    <ul className="list-disc pl-5 space-y-2">
                      {currentProduct.keyFeatures.map((feature, index) => (
                        <li key={index}>{feature}</li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-gray-500">No key features listed for this product.</p>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
            
            {/* Specifications Tab */}
            <TabsContent value="specifications" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Technical Specifications</CardTitle>
                </CardHeader>
                <CardContent>
                  {Object.keys(currentProduct.specifications).length > 0 ? (
                    <div className="divide-y">
                      {Object.entries(currentProduct.specifications).map(([key, value], index) => (
                        <div key={index} className="py-3 grid grid-cols-2">
                          <div className="font-medium">{key}</div>
                          <div>{value}</div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-gray-500">No specifications listed for this product.</p>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
      
      <Separator className="my-8" />
      
      {/* Footer with product metadata */}
      <div className="text-center py-4">
        <p className="text-gray-500 text-sm">
          Product ID: {currentProduct.id} • Created: {new Date(currentProduct.createdAt).toLocaleDateString()} • 
          Last Updated: {new Date(currentProduct.updatedAt).toLocaleDateString()}
        </p>
      </div>
    </div>
  );
}