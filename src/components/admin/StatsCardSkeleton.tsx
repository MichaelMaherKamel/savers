import { LucideIcon } from 'lucide-react';

interface StatsCardSkeletonProps {
  title: string;
  icon: LucideIcon;
  color: string;
  linkText: string;
  isProductCard?: boolean; // New prop to identify if this is the product card
}

export default function StatsCardSkeleton({ 
  title, 
  icon: Icon, 
  color, 
  linkText,
  isProductCard = false 
}: StatsCardSkeletonProps) {
  // Map color strings to Tailwind classes
  const colorClasses = {
    green: {
      icon: "text-green-600",
      count: "text-green-600",
      button: "bg-green-50 hover:bg-green-100 text-green-700"
    },
    amber: {
      icon: "text-amber-600",
      count: "text-amber-600",
      button: "bg-amber-50 hover:bg-amber-100 text-amber-700"
    },
    purple: {
      icon: "text-purple-600",
      count: "text-purple-600",
      button: "bg-purple-50 hover:bg-purple-100 text-purple-700"
    }
  };

  const classes = colorClasses[color as keyof typeof colorClasses];
  
  // Add md:row-span-3 class only for the product card
  const cardClassName = isProductCard 
    ? "bg-white rounded-xl shadow-md md:row-span-3" 
    : "bg-white rounded-xl shadow-md";

  return (
    <div className={cardClassName}>
      <div className="p-4 md:p-6 h-full flex flex-col">
        <div className="flex items-center justify-between mb-4 md:mb-6">
          <h2 className="text-lg font-semibold text-slate-800">{title}</h2>
          <Icon className={`h-6 w-6 ${classes.icon}`} />
        </div>
        
        {/* Fixed height container with skeleton animation */}
        <div className="flex items-center justify-center flex-grow py-6 min-h-32">
          <div className="text-center">
            {/* Count skeleton with color-matching pulse animation */}
            <div className={`w-24 h-14 rounded-md mx-auto flex items-center justify-center bg-opacity-20 animate-pulse`}
                 style={{backgroundColor: color === 'green' ? '#10B981' : color === 'amber' ? '#D97706' : '#8B5CF6'}}>
              <div className="w-16 h-10 bg-slate-200 rounded-md"></div>
            </div>
            {/* Text skeleton */}
            <div className="w-32 h-6 bg-slate-200 rounded-md animate-pulse mx-auto mt-2"></div>
          </div>
        </div>
        
        <div className="mt-4 md:mt-6 border-t pt-4">
          <div
            className={`block w-full ${classes.button} font-medium py-2 md:py-3 px-4 rounded-lg text-center`}
          >
            {linkText}
          </div>
        </div>
      </div>
    </div>
  );
}