import { CalendarDays } from 'lucide-react';
import { getCurrentUser } from '@/db/actions/auth';

// Changed to named export
export async function WelcomeCard() {
  const user = await getCurrentUser();
  return (
    <div className="col-span-1 md:col-span-2 bg-white rounded-xl shadow-md p-4 md:p-6 lg:p-8 h-32 md:h-40 lg:h-48">
      <div className="flex flex-col md:flex-row md:justify-between md:items-center h-full">
        <div>
          <h1 className="text-xl md:text-2xl font-bold text-slate-800">
            Welcome back, {user?.username ? user.username.charAt(0).toUpperCase() + user.username.slice(1) : 'User'}
          </h1>
          <p className="text-slate-500 mt-1">Manage your company portfolio</p>
        </div>
        <div className="flex items-center space-x-2 text-sm mt-3 md:mt-0">
          <CalendarDays className="h-4 w-4 text-slate-400" />
          <span className="text-slate-500">
            {new Date().toLocaleDateString('en-US', {
              weekday: 'long',
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })}
          </span>
        </div>
      </div>
    </div>
  );
}

// Changed to named export
export function WelcomeCardSkeleton() {
  return (
    <div className="col-span-1 md:col-span-2 bg-white rounded-xl shadow-md p-4 md:p-6 lg:p-8 h-32 md:h-40 lg:h-48">
      <div className="flex flex-col md:flex-row md:justify-between md:items-center h-full">
        <div>
          {/* Username skeleton */}
          <div className="h-8 w-64 bg-slate-200 rounded-md animate-pulse"></div>
          {/* Subtitle skeleton */}
          <div className="h-5 w-48 bg-slate-200 rounded-md animate-pulse mt-1"></div>
        </div>
        <div className="flex items-center space-x-2 text-sm mt-3 md:mt-0">
          <CalendarDays className="h-4 w-4 text-slate-400" />
          {/* Date skeleton */}
          <div className="h-5 w-40 bg-slate-200 rounded-md animate-pulse"></div>
        </div>
      </div>
    </div>
  );
}

// If you need a default export for the file, you can choose one component or export both
export default WelcomeCard;