"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export function CategoryGridSkeleton() {
  // Create an array of 8 items to show as skeleton placeholders
  const skeletonItems = Array.from({ length: 4 }, (_, i) => i);
  
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {skeletonItems.map((item) => (
        <Card key={item} className="overflow-hidden border border-gray-200 rounded-lg shadow-sm">
          <div className="relative aspect-[4/3] w-full overflow-hidden">
            <Skeleton className="absolute inset-0" />
          </div>
          
          <CardContent className="p-4 bg-white">
            <div className="flex items-center justify-between">
              <Skeleton className="h-6 w-3/4" />
              <Skeleton className="h-8 w-8 rounded-full" />
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
