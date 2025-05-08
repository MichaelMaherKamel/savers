import Link from 'next/link';
import { Users } from 'lucide-react';
import { adminGetAllUsers } from '@/db/actions/auth';


export default async function UserStatsCard() {
  const users = await adminGetAllUsers();
  const usersCount = users.length;
 
  return (
    <div className="bg-white rounded-xl shadow-md">
      <div className="p-4 md:p-6 h-full flex flex-col">
        <div className="flex items-center justify-between mb-4 md:mb-6">
          <h2 className="text-lg font-semibold text-slate-800">Users</h2>
          <Users className="h-6 w-6 text-green-600" />
        </div>
       
        {/* Fixed height container to prevent layout shift */}
        <div className="flex items-center justify-center flex-grow py-6 min-h-32">
          <div className="text-center">
            <div className="text-4xl md:text-5xl font-bold text-green-600">{usersCount}</div>
            <p className="text-slate-500 mt-2">Total Users</p>
          </div>
        </div>
       
        {/* Emphasized link section with border and increased padding */}
        <div className="mt-4 md:mt-6 border-t pt-4">
        <Link
            href="/admin/users"
            className="block w-full bg-green-50 hover:bg-green-100 text-green-700 font-medium py-2 md:py-3 px-4 rounded-lg transition text-center"
           >
            Manage Users
          </Link>
        </div>
      </div>
    </div>
  );
}