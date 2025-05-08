import { UserPlus } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default function UsersTableSkeleton() {
  // Generate an array for skeleton rows (showing 5 rows in the loading state)
  const skeletonRows = Array.from({ length: 5 }, (_, i) => i);

  return (
    <div className="container mx-auto py-8">
      <div className="flex justify-between items-center mb-6">
        <div className="h-9 w-32 bg-slate-200 rounded-md animate-pulse"></div>
        <Button variant="default" disabled className="opacity-70">
          <UserPlus className="mr-2 h-4 w-4" /> Add New User
        </Button>
      </div>

      {/* Users Table Skeleton */}
      <div className="rounded-md border border-gray-200">
        <Table className="bg-white rounded-md">
          <TableHeader>
            <TableRow>
              <TableHead>User</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Username</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Created</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {skeletonRows.map((index) => (
              <TableRow key={index}>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <div className="h-8 w-8 rounded-full bg-slate-200 animate-pulse"></div>
                    <div className="h-5 w-28 bg-slate-200 rounded-md animate-pulse"></div>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="h-5 w-32 bg-slate-200 rounded-md animate-pulse"></div>
                </TableCell>
                <TableCell>
                  <div className="h-5 w-24 bg-slate-200 rounded-md animate-pulse"></div>
                </TableCell>
                <TableCell>
                  <div className="h-6 w-16 bg-slate-200 rounded-md animate-pulse"></div>
                </TableCell>
                <TableCell>
                  <div className="h-6 w-16 bg-slate-200 rounded-md animate-pulse"></div>
                </TableCell>
                <TableCell>
                  <div className="h-5 w-24 bg-slate-200 rounded-md animate-pulse"></div>
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end">
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