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
import { Eye, File, Plus, Trash2 } from "lucide-react";
import { toast } from "sonner";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { adminDeleteProduct, Product } from "@/db/actions/products";
import { Category } from "@/db/schema";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

interface ProductsTableProps {
  initialProducts: Product[];
  categories: Category[];
}

export default function ProductsTable({ 
  initialProducts, 
  categories 
}: ProductsTableProps) {
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [deleteLoading, setDeleteLoading] = useState<number | null>(null);
  const router = useRouter();

  // Create a map of category IDs to names for display
  const categoryMap = new Map(
    categories.map(category => [category.id, category.name])
  );

  // Handle deleting a product
  const handleDeleteProduct = async (productId: number) => {
    setDeleteLoading(productId);
    
    try {
      const success = await adminDeleteProduct(productId);
      
      if (success) {
        // Update local state
        const updatedProducts = products.filter(
          (product) => product.id !== productId
        );
        setProducts(updatedProducts);
        toast.success("Product deleted successfully");
      } else {
        toast.error("Failed to delete product");
      }
    } catch (error: any) {
      console.error("Error deleting product:", error);
      toast.error(error.message || "Failed to delete product");
    } finally {
      setDeleteLoading(null);
      router.refresh(); // Refresh the server component
    }
  };

  return (
    <div className="container mx-auto py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-red-600">Products</h1>
        {products.length > 0 && (
          <Link href="/admin/products/new">
            <Button variant="general">
              <Plus className="mr-2 h-4 w-4" /> Add New Product
            </Button>
          </Link>
        )}
      </div>

      {/* Products Table */}
      {products.length === 0 ? (
        <div className="text-center py-10">
          <p className="text-gray-500 mb-4">No products found</p>
          <Link href="/admin/products/new">
            <Button variant='general'>Add your first product</Button>
          </Link>
        </div>
      ) : (
        <div className="rounded-md border border-gray-200">
            <Table className="bg-white rounded-md">
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
                      {product.image ? (
                        <img
                          src={product.image}
                          alt={product.name}
                          loading="lazy"
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        <span className="text-xs text-gray-400">No image</span>
                      )}
                    </div>
                  </TableCell>
                  <TableCell className="font-medium">{product.name}</TableCell>
                  <TableCell>{product.model || "-"}</TableCell>
                  <TableCell>
                    <span className={`px-2 py-1 rounded text-xs font-medium ${
                      categoryMap.get(product.categoryId) ? "bg-blue-100 text-blue-800" : "bg-gray-100 text-gray-800"
                    }`}>
                      {categoryMap.get(product.categoryId) || `Category ${product.categoryId}`}
                    </span>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      {product.brochureUrl && (
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => window.open(product.brochureUrl || '', '_blank')}
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
                          <Eye className="h-4 w-4" />
                        </Button>
                      </Link>
                      
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button
                            variant="destructive"
                            size="icon"
                            disabled={deleteLoading === product.id}
                            title="Delete Product"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                            <AlertDialogDescription>
                              This will permanently delete the product "{product.name}".
                              This action cannot be undone.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction
                              onClick={() => handleDeleteProduct(product.id)}
                              className="bg-red-600 hover:bg-red-700 text-white"
                            >
                              {deleteLoading === product.id ? "Deleting..." : "Delete"}
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
}