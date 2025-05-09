import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MoreHorizontal, PlusCircle } from "lucide-react";

export function CategoryGridSkeleton() {
  // Create an array of 8 skeleton items for the initial loading state
  const skeletonItems = Array.from({ length: 8 }, (_, i) => i);
 
  return (
    <div>
      {/* Title and Button */}
      <div className="flex justify-between items-center mb-6">
        <div className="h-9 w-40 bg-slate-200 rounded-md animate-pulse"></div>
        <Button variant="general" className="opacity-70">
          <PlusCircle className="mr-2 h-4 w-4" /> Add New Category
        </Button>
      </div>

      {/* Grid Skeleton */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {skeletonItems.map((index) => (
          <CategoryCardSkeleton key={index} />
        ))}
      </div>
    </div>
  );
}

function CategoryCardSkeleton() {
  return (
    <Card className="overflow-hidden group border border-gray-200 rounded-lg shadow-sm">
      <div className="relative aspect-[4/3] w-full overflow-hidden">
        {/* Image skeleton */}
        <div className="absolute inset-0 bg-slate-200 animate-pulse"></div>
       
        {/* Desktop hover controls - hidden on mobile */}
        <div className="absolute inset-0 hidden md:flex items-center justify-center opacity-0">
          <div className="flex gap-2 backdrop-blur-sm bg-white/20 p-2 rounded-full">
            <div className="w-9 h-9 rounded-full bg-slate-300 animate-pulse"></div>
            <div className="w-9 h-9 rounded-full bg-slate-300 animate-pulse"></div>
          </div>
        </div>
      </div>
     
      <CardContent className="p-4 bg-white">
        <div className="flex items-center justify-between">
          {/* Title skeleton */}
          <div className="h-6 w-24 bg-slate-200 rounded-md animate-pulse"></div>
         
          {/* Mobile actions dropdown - visible only on mobile */}
          <div className="block md:hidden">
            <Button variant="ghost" size="icon" className="h-8 w-8 opacity-50">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}