"use client";

import { useState } from "react";
import { toast } from "sonner";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { User } from "@/db/schema";
import { 
  Dialog, 
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/better-auth/auth-client";

interface CreateUserDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess: (user: User) => void;
}

// Define role types as constants for type safety
const USER_ROLE = "user" as const;
const ADMIN_ROLE = "admin" as const;
type UserRole = typeof USER_ROLE | typeof ADMIN_ROLE;

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

const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  password: passwordSchema,
  username: z.string().min(3, "Username must be at least 3 characters").optional(),
  role: z.enum([USER_ROLE, ADMIN_ROLE]),
});

type FormValues = z.infer<typeof formSchema>;

export function CreateUserDialog({ open, onOpenChange, onSuccess }: CreateUserDialogProps) {
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      username: "",
      role: USER_ROLE,
    },
  });

  const onSubmit = async (values: FormValues) => {
    setIsLoading(true);
    try {
      // Create user with Better Auth
      const response = await authClient.admin.createUser({
        name: values.name,
        email: values.email,
        password: values.password,
        role: values.role,
        data: {
          username: values.username,
          displayUsername: values.username,
          emailVerified: true,
        }
      });

      // Check if the response indicates success
      if (response && 'data' in response && response.data && 'user' in response.data) {
        // Access the user data from the correct response structure
        const userData = response.data.user;
        
        // Call onSuccess callback to trigger refetch in parent component
        onSuccess({
          // Create a valid User object that matches our schema
          id: userData.id || "",
          name: values.name, // Use the values from the form to ensure we have them
          email: values.email,
          emailVerified: true,
          image: null,
          username: values.username || null,
          displayUsername: values.username || null,
          role: values.role,
          banned: false,
          banReason: null,
          banExpires: null,
          createdAt: new Date(),
          updatedAt: new Date()
        });
        
        // Reset form and close dialog
        form.reset();
        onOpenChange(false);
      } else {
        // Handle error response
        if ('error' in response && response.error) {
          toast.error(`Error: ${response.error.message || 'Failed to create user'}`);
        } else {
          toast.error("User creation failed with an unexpected response format");
        }
        console.error("Unexpected response format:", response);
      }
    } catch (error: any) {
      console.error("Error creating user:", error);
      toast.error(error.message || "Failed to create user");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Create New User</DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 pt-2">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Full Name</FormLabel>
                  <FormControl>
                    <Input placeholder="John Doe" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input type="email" placeholder="user@example.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username (Optional)</FormLabel>
                  <FormControl>
                    <Input placeholder="johndoe" {...field} />
                  </FormControl>
                  <FormDescription>
                    A unique username for the user.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="••••••••" {...field} />
                  </FormControl>
                  <FormDescription>
                    Must be at least 6 characters with one uppercase letter and one number.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="role"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Role</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a role" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value={USER_ROLE}>Regular User</SelectItem>
                      <SelectItem value={ADMIN_ROLE}>Admin</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormDescription>
                    The role determines what permissions the user will have.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter className="pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => onOpenChange(false)}
                disabled={isLoading}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={isLoading}>
                {isLoading ? "Creating..." : "Create User"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}