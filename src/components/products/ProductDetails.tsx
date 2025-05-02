"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ChevronLeft, Edit, File } from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";
import { Product } from "./ProductsList";
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
import { Separator } from "@/components/ui/separator";

interface ProductDetailProps {
  productId: string;
}

// Mock function to fetch product - would be replaced with an API call
const fetchProduct = async (id: string): Promise<Product | null> => {
  // This simulates an API call
  await new Promise(resolve => setTimeout(resolve, 500));
  
  // Mock products from ProductsList.tsx
  const mockProducts: Product[] = [
    {
      id: "1",
      name: "IR ADV C Series",
      model: "IR ADV C 5235/52240/5250/5255",
      category: "Printers",
      description: "Advanced color multifunction printer with high-speed scanning and printing capabilities.",
      keyFeatures: [
        "High-speed color printing",
        "Advanced scanning capabilities",
        "Multiple paper handling options",
        "Energy efficient operation",
        "Enterprise security features"
      ],
      specifications: {
        "Operation Panel": "8.4\" SVGA Full-Color TFT Screen",
        "Memory": "Standard: 2GB RAM",
        "Hard Disk Drive": "Standard: 160GB",
        "Network Interface Connection": "Standard: 1000Base-T/100Base-TX/10Base-T",
        "Other Interface": "Standard: USB 2.0 (Host) x 2, USB 2.0 (Device)",
        "Copy/Print Speed": "C5255: Up to 55/51 ppm, C5250: Up to 50/45 ppm, C5240: Up to 40/35 ppm, C5235: Up to 35/30 ppm",
        "Dimensions (H x W x D)": "C5255/C5250: 37-3/8\" x 24-3/8\" x 28-1/8\" (950mm x 620mm x 715mm)"
      },
      brochureUrl: "https://copiersonsale.com/brochures/canon-ir-adv-c5200.pdf",
      imageUrls: ["/printer-canon-ir-adv.jpg"]
    },
    {
      id: "2",
      name: "Yale Maximum Security Fingerprint Safe",
      model: "YSEM/400/EG1",
      category: "Safes",
      description: "Gain access not only through a fingerprint sensor but also a PIN or mechanical key so that you can enjoy the convenience of three different opening credentials.",
      keyFeatures: [
        "Reinforced with anti-drill plate and laser-cut door",
        "Lock down for 1 minute after 3 incorrect attempts",
        "LCD keypad displays PIN code",
        "Internal lighting to give clear visibility",
        "Internal hooks and shelf"
      ],
      specifications: {
        "Access Methods": "Fingerprint, PIN code, Mechanical key",
        "Locking Mechanism": "Motorised with two anti-saw locking bolts (20mm)",
        "Emergency Access": "9V battery port (battery not included)",
        "Additional Features": "Automatic door opening mechanism",
        "Installation": "Floor/wall mountable"
      },
      certificatesAndProtection: {
        certificates: [
          "Sold Secure Silver",
          "SKG**",
          "Secure Design"
        ],
        protection: [
          "Motorised locking mechanism with two anti-saw locking bolts (20mm)",
          "Maximum security mechanical override lock that includes 1 double bitted key",
          "Emergency access with 9V battery",
          "Automatic door opening mechanism",
          "Floor/wall mountable"
        ]
      },
      colors: ["Black", "Grey"],
      imageUrls: ["/yale-fingerprint-safe.jpg"]
    },
  ];
  
  return mockProducts.find(p => p.id === id) || null;
};

export default function ProductDetail({ productId }: ProductDetailProps) {
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("overview");

  useEffect(() => {
    const loadProduct = async () => {
      try {
        const fetchedProduct = await fetchProduct(productId);
        if (fetchedProduct) {
          setProduct(fetchedProduct);
        } else {
          toast.error("Product not found");
        }
      } catch (error) {
        toast.error("Failed to load product");
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    loadProduct();
  }, [productId]);

  if (loading) {
    return (
      <div className="container mx-auto py-12 flex justify-center">
        <div className="animate-pulse text-center">
          <div className="h-8 bg-gray-200 rounded w-48 mb-4 mx-auto"></div>
          <div className="h-4 bg-gray-200 rounded w-64 mb-2 mx-auto"></div>
          <div className="h-4 bg-gray-200 rounded w-56 mx-auto"></div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="container mx-auto py-12 text-center">
        <h2 className="text-2xl font-bold">Product not found</h2>
        <p className="mt-2 text-gray-500">
          The product you are looking for does not exist or has been removed.
        </p>
        <Link href="/admin/products" className="mt-4 inline-block">
          <Button variant="outline">
            <ChevronLeft className="mr-2 h-4 w-4" />
            Back to Products
          </Button>
        </Link>
      </div>
    );
  }

  const categoryColorClass = {
    Printers: "bg-blue-100 text-blue-800",
    Safes: "bg-green-100 text-green-800",
    Lockers: "bg-purple-100 text-purple-800"
  }[product.category];

  return (
    <div className="container mx-auto py-8 max-w-4xl">
      {/* Header with navigation and actions */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <Link href="/admin/products" className="mr-4">
            <Button variant="outline" size="icon">
              <ChevronLeft className="h-4 w-4" />
            </Button>
          </Link>
          <h1 className="text-2xl font-bold">{product.name}</h1>
        </div>
        
        <div className="flex gap-2">
          {product.brochureUrl && (
            <Button
              variant="outline"
              onClick={() => window.open(product.brochureUrl, '_blank')}
              className="flex items-center"
            >
              <File className="mr-2 h-4 w-4" />
              Brochure
            </Button>
          )}
          <Link href={`/admin/products/${productId}/edit`}>
            <Button className="flex items-center">
              <Edit className="mr-2 h-4 w-4" />
              Edit Product
            </Button>
          </Link>
        </div>
      </div>

      {/* Product header info */}
      <div className="flex flex-col md:flex-row gap-6 mb-8">
        {/* Product image */}
        <div className="md:w-1/3">
          <div className="aspect-square rounded-lg bg-gray-100 overflow-hidden">
            {product.imageUrls.length > 0 ? (
              <img
                src={product.imageUrls[0]}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-gray-400">
                No image available
              </div>
            )}
          </div>
        </div>
        
        {/* Product info */}
        <div className="md:w-2/3">
          <div className="flex items-center mb-2">
            <span className={`px-2 py-1 rounded text-xs font-medium ${categoryColorClass}`}>
              {product.category}
            </span>
            <span className="text-gray-500 text-sm ml-2">Model: {product.model}</span>
          </div>
          
          <h2 className="text-xl font-bold mb-4">{product.name}</h2>
          <p className="text-gray-700 mb-4">{product.description}</p>
          
          <Separator className="my-4" />
          
          {product.colors && product.colors.length > 0 && (
            <div className="mb-4">
              <span className="text-sm font-medium text-gray-500">Available Colors:</span>
              <div className="flex gap-2 mt-1">
                {product.colors.map((color, index) => (
                  <span key={index} className="px-3 py-1 bg-gray-100 rounded-md text-sm">
                    {color}
                  </span>
                ))}
              </div>
            </div>
          )}
          
          <Separator className="my-4" />
          
          {/* Key features preview */}
          {product.keyFeatures && product.keyFeatures.length > 0 && (
            <div className="mt-4">
              <h3 className="text-md font-medium mb-2">Key Features</h3>
              <ul className="list-disc pl-5 space-y-1">
                {product.keyFeatures.slice(0, 3).map((feature, index) => (
                  <li key={index} className="text-sm text-gray-700">{feature}</li>
                ))}
                {product.keyFeatures.length > 3 && (
                  <li className="text-sm text-gray-500">+ {product.keyFeatures.length - 3} more features</li>
                )}
              </ul>
            </div>
          )}
        </div>
      </div>
      
      {/* Tab content for detailed information */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full mt-8">
        <TabsList className="grid grid-cols-3 mb-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="specifications">Specifications</TabsTrigger>
          <TabsTrigger value="certificates">Certificates & Protection</TabsTrigger>
        </TabsList>
        
        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Description</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>{product.description}</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Key Features</CardTitle>
            </CardHeader>
            <CardContent>
              {product.keyFeatures && product.keyFeatures.length > 0 ? (
                <ul className="list-disc pl-5 space-y-2">
                  {product.keyFeatures.map((feature, index) => (
                    <li key={index}>{feature}</li>
                  ))}
                </ul>
              ) : (
                <p className="text-gray-500">No key features listed for this product.</p>
              )}
            </CardContent>
          </Card>
          
          {product.colors && product.colors.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle>Available Colors</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {product.colors.map((color, index) => (
                    <span key={index} className="px-3 py-1 bg-gray-100 rounded-md">
                      {color}
                    </span>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>
        
        {/* Specifications Tab */}
        <TabsContent value="specifications" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Technical Specifications</CardTitle>
            </CardHeader>
            <CardContent>
              {Object.keys(product.specifications).length > 0 ? (
                <div className="divide-y">
                  {Object.entries(product.specifications).map(([key, value], index) => (
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
        
        {/* Certificates Tab */}
        <TabsContent value="certificates" className="space-y-6">
          {product.certificatesAndProtection?.certificates && product.certificatesAndProtection.certificates.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle>Certificates</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="list-disc pl-5 space-y-2">
                  {product.certificatesAndProtection.certificates.map((cert, index) => (
                    <li key={index}>{cert}</li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          )}
          
          {product.certificatesAndProtection?.protection && product.certificatesAndProtection.protection.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle>Protection Features</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="list-disc pl-5 space-y-2">
                  {product.certificatesAndProtection.protection.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          )}
          
          {(!product.certificatesAndProtection?.certificates || product.certificatesAndProtection.certificates.length === 0) &&
           (!product.certificatesAndProtection?.protection || product.certificatesAndProtection.protection.length === 0) && (
            <div className="text-center py-8">
              <p className="text-gray-500">No certificates or protection information available for this product.</p>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}