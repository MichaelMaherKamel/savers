"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Edit, File, Plus, Trash2 } from "lucide-react";
import { toast } from "sonner";
import Link from "next/link";

// Product type definition
export interface Product {
  id: string;
  name: string;
  category: "Safes" | "Printers" | "Lockers";
  model: string;
  description: string;
  keyFeatures: string[];
  specifications: Record<string, string>;
  certificatesAndProtection?: {
    certificates?: string[];
    protection?: string[];
  };
  colors?: string[];
  brochureUrl?: string;
  imageUrls: string[];
}

// Mock data - this would be replaced with API calls in a real application
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

export default function ProductsList() {
  const [products, setProducts] = useState<Product[]>(mockProducts);

  // Handle deleting a product
  const handleDeleteProduct = (productId: string) => {
    // In a real application, this would be an API call
    const updatedProducts = products.filter(
      (product) => product.id !== productId
    );
    setProducts(updatedProducts);
    toast.success("Product deleted successfully");
  };

  return (
    <div className="container mx-auto py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Products Management</h1>
        <Link href="/admin/products/new">
          <Button variant="outline">
            <Plus className="mr-2 h-4 w-4" /> Add New Product
          </Button>
        </Link>
      </div>

      {/* Products Table */}
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Image</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Model</TableHead>
              <TableHead>Category</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {products.map((product) => (
              <TableRow key={product.id}>
                <TableCell>
                  <div className="h-14 w-16 rounded bg-gray-100 flex items-center justify-center overflow-hidden">
                    {product.imageUrls.length > 0 ? (
                      <img
                        src={product.imageUrls[0]}
                        alt={product.name}
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <span className="text-xs text-gray-400">No image</span>
                    )}
                  </div>
                </TableCell>
                <TableCell className="font-medium">{product.name}</TableCell>
                <TableCell>{product.model}</TableCell>
                <TableCell>
                  <span className={`px-2 py-1 rounded text-xs font-medium ${
                    product.category === "Printers" 
                      ? "bg-blue-100 text-blue-800" 
                      : product.category === "Safes" 
                        ? "bg-green-100 text-green-800" 
                        : "bg-purple-100 text-purple-800"
                  }`}>
                    {product.category}
                  </span>
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    {product.brochureUrl && (
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => window.open(product.brochureUrl, '_blank')}
                        title="View Brochure"
                      >
                        <File className="h-4 w-4" />
                      </Button>
                    )}
                    <Link href={`/admin/products/${product.id}`}>
                      <Button
                        variant="outline"
                        size="icon"
                        title="Edit Product"
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                    </Link>
                    <Button
                      variant="destructive"
                      size="icon"
                      onClick={() => handleDeleteProduct(product.id)}
                      title="Delete Product"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}