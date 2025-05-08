"use client";

import { useState } from "react";
import { toast } from "sonner";
import { format } from "date-fns";
import useSWR from "swr";
import {
  Key,
  Lock,
  LockOpen,
  MoreHorizontal,
  Plus,
  Shield,
  ShieldAlert,
  Trash2,
  UserPlus,
  Eye,
} from "lucide-react";
import { User } from "@/db/schema";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { authClient } from "@/lib/better-auth/auth-client";
import { CreateUserDialog } from "./CreateUserDialog";
import { PasswordResetCard } from "./PasswordResetCard";
import { ViewUserCard } from "./ViewUserCard";
import UsersTableSkeleton from "./UsersTableSkeleton";

// Define role types as constants for type safety
const USER_ROLE = "user" as const;
const ADMIN_ROLE = "admin" as const;

// Define union type for roles
type UserRole = typeof USER_ROLE | typeof ADMIN_ROLE;

interface UsersTableProps {
  currentUserId: string;
}

// SWR fetcher function
const fetcher = async () => {
  const response = await authClient.admin.listUsers({
    query: {
      sortBy: "createdAt",
      sortDirection: "desc"
    }
  });
  
  if (response && 'data' in response && response.data && 'users' in response.data) {
    return response.data.users.map((userItem: any) => ({
      id: userItem.id || "",
      name: userItem.name || "",
      email: userItem.email || "",
      emailVerified: Boolean(userItem.emailVerified),
      image: userItem.image || null,
      username: userItem.username || null,
      displayUsername: userItem.displayUsername || null,
      role: userItem.role || "user",
      banned: Boolean(userItem.banned),
      banReason: userItem.banReason || null,
      banExpires: userItem.banExpires || null,
      createdAt: userItem.createdAt ? new Date(userItem.createdAt) : new Date(),
      updatedAt: userItem.updatedAt ? new Date(userItem.updatedAt) : new Date()
    }));
  }
  
  throw new Error('Failed to fetch users');
};

export default function UsersTable({ currentUserId }: UsersTableProps) {
  const { data: users, error, mutate } = useSWR<User[]>('admin/users', fetcher);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [passwordResetUserId, setPasswordResetUserId] = useState<string | null>(null);
  const [viewUserId, setViewUserId] = useState<string | null>(null);
  const [deleteLoading, setDeleteLoading] = useState<string | null>(null);
  const [banLoading, setBanLoading] = useState<string | null>(null);
  const [changeRoleLoading, setChangeRoleLoading] = useState<string | null>(null);

  const isLoading = !users && !error;
  
  // Get the user that's having their password reset
  const userResettingPassword = passwordResetUserId 
    ? users?.find(user => user.id === passwordResetUserId) 
    : null;
    
  // Get the user being viewed
  const userBeingViewed = viewUserId
    ? users?.find(user => user.id === viewUserId)
    : null;
    
  // Check if we're in a detail view (either password reset or user view)
  const isInDetailView = Boolean(passwordResetUserId || viewUserId);

  // Handle user creation
  const handleCreateUser = async () => {
    // Refetch user data using SWR's mutate
    try {
      await mutate();
      toast.success("User created successfully");
    } catch (error) {
      console.error("Error refreshing users after creation:", error);
      toast.success("User created successfully. Refresh the page to see updated list.");
    }
  };

  // Toggle password reset for a user
  const togglePasswordReset = (userId: string | null) => {
    setPasswordResetUserId(userId);
    // Close view mode if open
    if (userId !== null) {
      setViewUserId(null);
    }
  };

  // Toggle user view
  const toggleUserView = (userId: string | null) => {
    setViewUserId(userId);
    // Close password reset if open
    if (userId !== null) {
      setPasswordResetUserId(null);
    }
  };

  // Handle password update success
  const handlePasswordResetSuccess = () => {
    toast.success("Password has been reset successfully");
    setPasswordResetUserId(null);
  };

  const handleDeleteUser = async (userId: string) => {
    if (userId === currentUserId) {
      toast.error("You cannot delete your own account");
      return;
    }

    setDeleteLoading(userId);
    try {
      await authClient.admin.removeUser({
        userId: userId,
      });

      // Update the cache optimistically
      mutate(
        users?.filter((user) => user.id !== userId),
        false
      );
      
      toast.success("User deleted successfully");
    } catch (error: any) {
      console.error("Error deleting user:", error);
      toast.error(error.message || "Failed to delete user");
      // Revalidate to ensure data is accurate
      mutate();
    } finally {
      setDeleteLoading(null);
    }
  };

  const handleBanUser = async (userId: string, isBanned: boolean) => {
    if (userId === currentUserId) {
      toast.error("You cannot ban your own account");
      return;
    }

    setBanLoading(userId);
    try {
      if (isBanned) {
        await authClient.admin.unbanUser({
          userId: userId,
        });
        toast.success("User unbanned successfully");
      } else {
        await authClient.admin.banUser({
          userId: userId,
          banReason: "Administrator action",
        });
        toast.success("User banned successfully");
      }

      // Update the cache optimistically
      mutate(
        users?.map((user) =>
          user.id === userId ? { ...user, banned: !isBanned } : user
        ),
        false
      );
    } catch (error: any) {
      console.error("Error banning/unbanning user:", error);
      toast.error(error.message || `Failed to ${isBanned ? 'unban' : 'ban'} user`);
      // Revalidate to ensure data is accurate
      mutate();
    } finally {
      setBanLoading(null);
    }
  };

  const handleChangeRole = async (userId: string, newRole: UserRole) => {
    if (userId === currentUserId && newRole !== ADMIN_ROLE) {
      toast.error("You cannot remove your admin role");
      return;
    }

    setChangeRoleLoading(userId);
    try {
      await authClient.admin.setRole({
        userId: userId,
        role: newRole,
      });

      // Update the cache optimistically
      mutate(
        users?.map((user) =>
          user.id === userId ? { ...user, role: newRole } : user
        ),
        false
      );
      
      toast.success(`User role changed to ${newRole}`);
    } catch (error: any) {
      console.error("Error changing user role:", error);
      toast.error(error.message || "Failed to change user role");
      // Revalidate to ensure data is accurate
      mutate();
    } finally {
      setChangeRoleLoading(null);
    }
  };

  const getInitials = (name: string) => {
    if (!name) return "??";
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  const getAvatarColor = (userId: string) => {
    const colors = [
      "bg-red-500",
      "bg-green-500",
      "bg-blue-500",
      "bg-yellow-500",
      "bg-purple-500",
      "bg-pink-500",
      "bg-indigo-500",
      "bg-teal-500",
    ];
    if (!userId) return colors[0];
    const index = userId.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0) % colors.length;
    return colors[index];
  };

  // Safely format a date with fallback
  const formatDate = (date: Date | string | null | undefined) => {
    if (!date) return "-";
    try {
      return format(new Date(date), "MMM dd, yyyy");
    } catch (e) {
      return "-";
    }
  };

  // Show proper skeleton loader while loading
  if (isLoading) {
    return <UsersTableSkeleton />;
  }

  // Show error state if there was an error
  if (error) {
    return (
      <div className="container mx-auto py-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-red-600">Users</h1>
          <Button variant="general" disabled>
            <UserPlus className="mr-2 h-4 w-4" /> Add New User
          </Button>
        </div>
        <div className="p-6 bg-red-50 rounded-md text-center">
          <p className="text-red-600 font-medium">{error.message}</p>
          <p className="text-gray-500 mt-2">Please try again later or contact the administrator.</p>
          <Button 
            variant="outline" 
            className="mt-4" 
            onClick={() => mutate()}
          >
            Try Again
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-red-600">Users</h1>
        {!isInDetailView && (
          <Button variant="general" onClick={() => setIsCreateDialogOpen(true)}>
            <UserPlus className="mr-2 h-4 w-4" /> Add New User
          </Button>
        )}
      </div>

      {/* Password Reset Section */}
      {userResettingPassword && (
        <PasswordResetCard
          user={userResettingPassword}
          currentUserId={currentUserId}
          onCancel={() => togglePasswordReset(null)}
          onSuccess={handlePasswordResetSuccess}
        />
      )}
      
      {/* User View Section */}
      {userBeingViewed && (
        <ViewUserCard
          user={userBeingViewed}
          onClose={() => toggleUserView(null)}
        />
      )}

      {/* Users Table - Hide when in detail view */}
      {!isInDetailView && (
        <>
          {users && users.length === 0 ? (
            <div className="text-center py-10">
              <p className="text-gray-500 mb-4">No users found</p>
              <Button variant="default" onClick={() => setIsCreateDialogOpen(true)}>
                <Plus className="mr-2 h-4 w-4" /> Create User
              </Button>
            </div>
          ) : (
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
                  {users && users.map((user) => (
                    <TableRow key={`user-${user.id}`}>
                      <TableCell className="font-medium">
                        <div className="flex items-center gap-3">
                          <Avatar>
                            <AvatarImage src={user.image || undefined} alt={user.name} />
                            <AvatarFallback className={getAvatarColor(user.id)}>
                              {getInitials(user.name)}
                            </AvatarFallback>
                          </Avatar>
                          <span>{user.name}</span>
                          {user.id === currentUserId && (
                            <Badge className="ml-2 bg-blue-50 text-blue-600">You</Badge>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>{user.email}</TableCell>
                      <TableCell>{user.username || "-"}</TableCell>
                      <TableCell>
                        <Badge
                          className={
                            user.role === ADMIN_ROLE
                              ? "bg-purple-100 text-purple-800 hover:bg-purple-100"
                              : "bg-blue-100 text-blue-800 hover:bg-blue-100"
                          }
                        >
                          {user.role}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        {user.banned ? (
                          <Badge variant="destructive">Banned</Badge>
                        ) : (
                          <Badge variant="outline" className="bg-green-100 text-green-800 hover:bg-green-100">
                            Active
                          </Badge>
                        )}
                      </TableCell>
                      <TableCell>
                        {formatDate(user.createdAt)}
                      </TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button
                              variant="ghost"
                              className="h-8 w-8 p-0"
                            >
                              <span className="sr-only">Open menu</span>
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            {/* View User */}
                            <DropdownMenuItem
                              onClick={() => toggleUserView(user.id)}
                              className="cursor-pointer"
                            >
                              <Eye className="mr-2 h-4 w-4" />
                              View details
                            </DropdownMenuItem>
                          
                            {/* Reset Password */}
                            <DropdownMenuItem
                              onClick={() => togglePasswordReset(user.id)}
                              className="cursor-pointer"
                            >
                              <Key className="mr-2 h-4 w-4" />
                              Reset password
                              {user.id === currentUserId && (
                                <span className="ml-2 text-xs text-gray-500">(will sign you out)</span>
                              )}
                            </DropdownMenuItem>
                            
                            {/* Role Toggle - Using type-safe constants */}
                            {user.role === ADMIN_ROLE ? (
                              <DropdownMenuItem
                                onClick={() => handleChangeRole(user.id, USER_ROLE)}
                                disabled={changeRoleLoading === user.id || user.id === currentUserId}
                                className="cursor-pointer"
                              >
                                <ShieldAlert className="mr-2 h-4 w-4" />
                                Make regular user
                              </DropdownMenuItem>
                            ) : (
                              <DropdownMenuItem
                                onClick={() => handleChangeRole(user.id, ADMIN_ROLE)}
                                disabled={changeRoleLoading === user.id}
                                className="cursor-pointer"
                              >
                                <Shield className="mr-2 h-4 w-4" />
                                Make admin
                              </DropdownMenuItem>
                            )}
                            
                            {/* Ban Toggle */}
                            {user.banned ? (
                              <DropdownMenuItem
                                onClick={() => handleBanUser(user.id, true)}
                                disabled={banLoading === user.id}
                                className="cursor-pointer"
                              >
                                <LockOpen className="mr-2 h-4 w-4" />
                                Unban user
                              </DropdownMenuItem>
                            ) : (
                              <DropdownMenuItem
                                onClick={() => handleBanUser(user.id, false)}
                                disabled={banLoading === user.id || user.id === currentUserId}
                                className="cursor-pointer text-amber-600"
                              >
                                <Lock className="mr-2 h-4 w-4" />
                                Ban user
                              </DropdownMenuItem>
                            )}
                            
                            <DropdownMenuSeparator />
                            
                            {/* Delete User */}
                            <AlertDialog>
                              <AlertDialogTrigger asChild>
                                <DropdownMenuItem
                                  onSelect={(e) => e.preventDefault()}
                                  disabled={user.id === currentUserId}
                                  className="cursor-pointer text-red-600 focus:text-red-600"
                                >
                                  <Trash2 className="mr-2 h-4 w-4" />
                                  Delete user
                                </DropdownMenuItem>
                              </AlertDialogTrigger>
                              <AlertDialogContent>
                                <AlertDialogHeader>
                                  <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                                  <AlertDialogDescription>
                                    This will permanently delete the user &quot;{user.name}&quot;.
                                    This action cannot be undone.
                                  </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                                  <AlertDialogAction
                                    onClick={() => handleDeleteUser(user.id)}
                                    className="bg-red-600 hover:bg-red-700 text-white"
                                  >
                                    {deleteLoading === user.id ? "Deleting..." : "Delete"}
                                  </AlertDialogAction>
                                </AlertDialogFooter>
                              </AlertDialogContent>
                            </AlertDialog>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </>
      )}

      {/* Create User Dialog */}
      <CreateUserDialog
        open={isCreateDialogOpen}
        onOpenChange={setIsCreateDialogOpen}
        onSuccess={handleCreateUser}
      />
    </div>
  );
}