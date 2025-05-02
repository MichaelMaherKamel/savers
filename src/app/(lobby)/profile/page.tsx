// app/profile/page.tsx
import { requireAuth } from '@/db/actions/auth';

export default async function ProfilePage() {
  const session = await requireAuth(); // Redirects if not authenticated
  const { user } = session;

  // Format ban expiration if exists
  const banInfo = user.banned
    ? {
        isBanned: true,
        expires: user.banExpires ? new Date(user.banExpires) : null,
        reason: user.banReason || 'No reason provided'
      }
    : null;

  return (
    <div className="max-w-4xl mx-auto py-8 px-4">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
        {/* Profile Header */}
        <div className="bg-gradient-to-r from-blue-500 to-indigo-600 p-6 text-white">
          <div className="flex items-center space-x-4">
            {user.image && (
              <img
                src={user.image}
                alt="Profile"
                className="w-20 h-20 rounded-full border-4 border-white/50"
              />
            )}
            <div>
              <h1 className="text-2xl font-bold">{user.name}</h1>
              <p className="text-blue-100">{user.email}</p>
              {user.username && (
                <p className="text-blue-100">@{user.username}</p>
              )}
            </div>
          </div>
        </div>

        {/* Profile Details */}
        <div className="p-6 space-y-6">
          {/* Account Info Section */}
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200">
              Account Information
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Email Status</p>
                <p className="flex items-center">
                  {user.emailVerified ? (
                    <>
                      <span className="text-green-500 mr-2">✓</span>
                      <span>Verified</span>
                    </>
                  ) : (
                    <>
                      <span className="text-yellow-500 mr-2">!</span>
                      <span>Not Verified</span>
                    </>
                  )}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Account Role</p>
                <p className="capitalize">{user.role}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Member Since</p>
                <p>{user.createdAt.toLocaleDateString()}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Last Updated</p>
                <p>{user.updatedAt.toLocaleDateString()}</p>
              </div>
            </div>
          </div>

          {/* Ban Status Section */}
          {banInfo && (
            <div className="bg-red-50 dark:bg-red-900/20 p-4 rounded-lg">
              <h3 className="text-lg font-medium text-red-800 dark:text-red-200">
                Account Restrictions
              </h3>
              <div className="mt-2 space-y-2">
                <p className="text-red-700 dark:text-red-300">
                  Your account is currently {banInfo.expires ? 'suspended' : 'banned'}.
                </p>
                {banInfo.expires && (
                  <p className="text-sm text-red-600 dark:text-red-400">
                    Suspension ends: {banInfo.expires.toLocaleString()}
                  </p>
                )}
                <p className="text-sm text-red-600 dark:text-red-400">
                  Reason: {banInfo.reason}
                </p>
              </div>
            </div>
          )}

          {/* Session Info Section */}
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200">
              Session Information
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Session Started</p>
                <p>{session.session.createdAt.toLocaleString()}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Session Expires</p>
                <p>{session.session.expiresAt.toLocaleString()}</p>
              </div>
              {session.session.ipAddress && (
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">IP Address</p>
                  <p>{session.session.ipAddress}</p>
                </div>
              )}
              {session.session.userAgent && (
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Device</p>
                  <p className="truncate">{session.session.userAgent}</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Admin Badge */}
        {user.role === 'admin' && (
          <div className="bg-indigo-50 dark:bg-indigo-900/20 p-4 border-t border-indigo-100 dark:border-indigo-800">
            <div className="flex items-center justify-center space-x-2">
              <span className="bg-indigo-100 dark:bg-indigo-800 text-indigo-800 dark:text-indigo-100 px-3 py-1 rounded-full text-sm font-medium">
                Administrator
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}