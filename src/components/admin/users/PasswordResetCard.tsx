"use client";

import { useState } from "react";
import { toast } from "sonner";
import { User } from "@/db/schema";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/better-auth/auth-client";
import { Key, X } from "lucide-react";
import { useRouter } from "next/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

// Define a stronger password validation schema
const passwordSchema = z
  .string()
  .min(6, "Must be at least 6 characters with one uppercase letter and one number.")
  .refine(
    (password) => /[A-Z]/.test(password),
    "Password must contain at least one uppercase letter"
  )
  .refine(
    (password) => /[0-9]/.test(password),
    "Password must contain at least one number"
  );

// Define the form schema with Zod
const formSchema = z.object({
  password: passwordSchema,
});

type FormValues = z.infer<typeof formSchema>;

interface PasswordResetCardProps {
  user: User;
  currentUserId: string;
  onCancel: () => void;
  onSuccess: () => void;
}

export function PasswordResetCard({ 
  user, 
  currentUserId, 
  onCancel, 
  onSuccess 
}: PasswordResetCardProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();
  
  // Check if user is resetting their own password
  const isResettingOwnPassword = user.id === currentUserId;

  // Initialize form
  const { register, handleSubmit, formState: { errors } } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      password: "",
    },
  });

  const onSubmit = async (data: FormValues) => {
    setIsSubmitting(true);
    
    try {
      // Call the API to update user's password
      await authClient.admin.setUserPassword({
        userId: user.id,
        newPassword: data.password,
      });
      
      toast.success("Password updated successfully");
      
      // If user reset their own password, sign them out
      if (isResettingOwnPassword) {
        toast.info("You've changed your own password. You'll be signed out now.");
        
        try {
          // Sign out the user and redirect to Login
          await authClient.signOut({
            fetchOptions: {
              onSuccess: () => {
                // Redirect to Auth page
                router.push("/auth");
              },
            },
          });
        } catch (error) {
          console.error("Error signing out:", error);
          // Force redirect to login even if signOut fails
          router.push("/auth");
        }
      } else {
        // If changing someone else's password, just call onSuccess
        onSuccess();
      }
    } catch (error: any) {
      console.error("Error updating password:", error);
      toast.error(error.message || "Failed to update password");
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="w-full mb-6">
      <CardHeader className="pb-3">
        <div className="flex justify-between items-center">
          <div>
            <CardTitle className="text-lg font-medium">Reset Password</CardTitle>
            <CardDescription>
              {isResettingOwnPassword 
                ? "You are about to reset your own password. You will be signed out after this change."
                : `Set a new password for ${user.name}`}
            </CardDescription>
          </div>
          <Button variant="ghost" size="icon" onClick={onCancel} disabled={isSubmitting}>
            <X className="h-4 w-4" />
            <span className="sr-only">Close</span>
          </Button>
        </div>
      </CardHeader>
      <form onSubmit={handleSubmit(onSubmit)}>
        <CardContent>
          <div className="space-y-1">
            <label htmlFor="password" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
              New Password
            </label>
            <Input
              id="password"
              type="password"
              placeholder="Enter new password"
              {...register("password")}
              className={errors.password ? "border-red-500" : ""}
            />
            {errors.password && (
              <p className="text-sm text-red-500 mt-1">{errors.password.message}</p>
            )}
            <p className="text-sm text-gray-500 mt-1">
              Password must be at least 6 characters with one uppercase letter and one number.
            </p>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between pt-0">
          <Button variant="outline" onClick={onCancel} disabled={isSubmitting} type="button">
            Cancel
          </Button>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Saving..." : "Reset Password"}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}