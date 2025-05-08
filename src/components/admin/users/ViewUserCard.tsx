"use client";

import { format } from "date-fns";
import { User } from "@/db/schema";
import { Button } from "@/components/ui/button";
import { X, ArrowLeft, Mail, CalendarCheck, CalendarClock, UserCog, Shield, Lock } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

// Define role types as constants for type safety
const ADMIN_ROLE = "admin" as const;

interface ViewUserCardProps {
  user: User;
  onClose: () => void;
}

export function ViewUserCard({ user, onClose }: ViewUserCardProps) {
  // Generate avatar initials from the user name
  const getInitials = (name: string) => {
    if (!name) return "??";
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  // Generate a consistent color for user avatar
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

  // Format a date with fallback
  const formatDate = (date: Date | string | number | null | undefined) => {
    if (date === null || date === undefined) return "Not available";
    
    try {
      // Convert number (timestamp) to Date object
      if (typeof date === 'number') {
        return format(new Date(date), "MMMM dd, yyyy 'at' h:mm a");
      }
      
      // Handle string or Date types
      return format(new Date(date), "MMMM dd, yyyy 'at' h:mm a");
    } catch (e) {
      console.error("Error formatting date:", e);
      return "Invalid date";
    }
  };

  return (
    <Card className="w-full mb-6">
      <CardHeader className="pb-3">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={onClose} 
              className="mr-2"
            >
              <ArrowLeft className="h-4 w-4" />
              <span className="sr-only">Back</span>
            </Button>
            <div>
              <CardTitle className="text-xl font-medium">User Details</CardTitle>
              <CardDescription>
                Viewing detailed information for this {user.name}
              </CardDescription>
            </div>
          </div>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-4 w-4" />
            <span className="sr-only">Close</span>
          </Button>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {/* User Header with Avatar */}
        <div className="flex items-center">
          <Avatar className="h-20 w-20 mr-4">
            <AvatarImage src={user.image || undefined} alt={user.name} />
            <AvatarFallback className={`text-xl ${getAvatarColor(user.id)}`}>
              {getInitials(user.name)}
            </AvatarFallback>
          </Avatar>
          <div>
            <h2 className="text-2xl font-bold">{user.name}</h2>
            <div className="flex items-center mt-1 space-x-2">
              <Badge
                className={
                  user.role === ADMIN_ROLE
                    ? "bg-purple-100 text-purple-800"
                    : "bg-blue-100 text-blue-800"
                }
              >
                {user.role}
              </Badge>
              
              {user.banned ? (
                <Badge variant="destructive">Banned</Badge>
              ) : (
                <Badge variant="outline" className="bg-green-100 text-green-800">
                  Active
                </Badge>
              )}
            </div>
          </div>
        </div>
        
        {/* User Information Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t">
          <div className="space-y-3">
            <div className="flex items-start">
              <Mail className="h-5 w-5 mr-2 text-gray-500 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-gray-500">Email Address</p>
                <p className="text-base">{user.email}</p>
              </div>
            </div>
            
            <div className="flex items-start">
              <UserCog className="h-5 w-5 mr-2 text-gray-500 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-gray-500">Username</p>
                <p className="text-base">{user.username || "Not set"}</p>
              </div>
            </div>
            
            <div className="flex items-start">
              <Shield className="h-5 w-5 mr-2 text-gray-500 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-gray-500">Role</p>
                <p className="text-base">{user.role}</p>
              </div>
            </div>
          </div>
          
          <div className="space-y-3">
            <div className="flex items-start">
              <CalendarCheck className="h-5 w-5 mr-2 text-gray-500 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-gray-500">Created</p>
                <p className="text-base">{formatDate(user.createdAt)}</p>
              </div>
            </div>
            
            <div className="flex items-start">
              <CalendarClock className="h-5 w-5 mr-2 text-gray-500 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-gray-500">Last Updated</p>
                <p className="text-base">{formatDate(user.updatedAt)}</p>
              </div>
            </div>
            
            {user.banned && (
              <div className="flex items-start">
                <Lock className="h-5 w-5 mr-2 text-gray-500 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-gray-500">Ban Reason</p>
                  <p className="text-base">{user.banReason || "No reason provided"}</p>
                  {user.banExpires && (
                    <>
                      <p className="text-sm font-medium text-gray-500 mt-1">Ban Expires</p>
                      <p className="text-base">{formatDate(user.banExpires)}</p>
                    </>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
        
        {/* Additional User Information */}
        <div className="pt-4 border-t">
          <h3 className="font-medium mb-2">Email Verification Status</h3>
          <p className="text-sm">
            {user.emailVerified 
              ? "Email verified" 
              : "Email not verified"}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}