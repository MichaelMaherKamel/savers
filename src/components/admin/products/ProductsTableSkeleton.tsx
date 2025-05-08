import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import Link from "next/link";

export default function ProductsTableSkeleton() {
  // Generate an array for skeleton rows (showing 5 rows in the loading state)
  const skeletonRows = Array.from({ length: 5 }, (_, i) => i);

  return (
    <div className="container mx-auto py-8">
      <div className="flex justify-between items-center mb-6">
        <div className="h-9 w-36 bg-slate-200 rounded-md animate-pulse"></div>
        <Link href="/admin/products/new">
          <Button variant="general" className="opacity-70">
            <Plus className="mr-2 h-4 w-4" /> Add New Product
          </Button>
        </Link>
      </div>

      {/* Products Table Skeleton */}
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
            {skeletonRows.map((index) => (
              <TableRow key={index}>
                <TableCell>
                  <div className="h-14 w-16 rounded bg-slate-200 animate-pulse"></div>
                </TableCell>
                <TableCell>
                  <div className="h-5 w-32 bg-slate-200 rounded-md animate-pulse"></div>
                </TableCell>
                <TableCell>
                  <div className="h-5 w-20 bg-slate-200 rounded-md animate-pulse"></div>
                </TableCell>
                <TableCell>
                  <div className="h-6 w-24 bg-slate-200 rounded-md animate-pulse"></div>
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <div className="h-8 w-8 bg-slate-200 rounded-md animate-pulse"></div>
                    <div className="h-8 w-8 bg-slate-200 rounded-md animate-pulse"></div>
                    <div className="h-8 w-8 bg-slate-200 rounded-md animate-pulse"></div>
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