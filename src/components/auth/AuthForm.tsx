'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { authClient } from '@/lib/better-auth/auth-client';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent } from '@/components/ui/tabs';
import { Alert, AlertDescription } from '@/components/ui/alert';

export default function AuthForm() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  
  // Login form state
  const [loginData, setLoginData] = useState({
    username: "",
    password: "",
  });

  // Signup form state - Kept but not used
  // const [signupData, setSignupData] = useState({
  //   username: "",
  //   email: "",
  //   name: "",
  //   password: "",
  //   confirmPassword: "",
  // });

  // Handle login form submission
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      // Login with username - following the documented approach
      await authClient.signIn.username({
        username: loginData.username,
        password: loginData.password,
      });
      
      // If successful, redirect to admin instead of test
      router.push("/admin");
    } catch (err: any) {
      setError(err.message || "Failed to login. Please check your credentials.");
    } finally {
      setLoading(false);
    }
  };

  // Handle signup form submission - Kept but commented out
  // const handleSignup = async (e: React.FormEvent) => {
  //   e.preventDefault();
  //   setError(null);
  //   setLoading(true);

  //   // Check if passwords match
  //   if (signupData.password !== signupData.confirmPassword) {
  //     setError("Passwords do not match");
  //     setLoading(false);
  //     return;
  //   }

  //   try {
  //     // Sign up with email, name, password, and username - following the documented approach
  //     await authClient.signUp.email({
  //       email: signupData.email,
  //       name: signupData.name,
  //       password: signupData.password,
  //       username: signupData.username,
  //     }); 
      
  //     // If successful, redirect
  //     router.push("/admin");
  //   } catch (err: any) {
  //     setError(err.message || "Failed to sign up. Please try again.");
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  return (
    <div className="w-full max-w-md mx-auto">
      <Card className="w-full backdrop-blur-sm bg-white/10 border border-white/20 shadow-2xl rounded-xl overflow-hidden">
        <CardHeader className="pb-2">
          <CardTitle className="text-2xl font-bold text-white text-center">
            Welcome Back
          </CardTitle>
          <CardDescription className="text-gray-200 text-center">
            Login to access your account
          </CardDescription>
        </CardHeader>
        
        <Tabs 
          defaultValue="login" 
          value="login" 
          // onValueChange={(value) => setActiveTab(value as "login" | "signup")}
          className="w-full"
        >
          {/* Commenting out the tab list since we're only showing login
          <div className="px-6">
            <TabsList className="grid grid-cols-2 w-3/4 mx-auto bg-gray-800/50 rounded-lg">
              <TabsTrigger 
                value="login"
                className="data-[state=active]:bg-red-600 data-[state=active]:text-white"
              >
                Login
              </TabsTrigger>
              <TabsTrigger 
                value="signup"
                className="data-[state=active]:bg-red-600 data-[state=active]:text-white"
              >
                Sign Up
              </TabsTrigger>
            </TabsList>
          </div>
          */}
          
          {/* Login Form */}
          <TabsContent value="login">
            <form onSubmit={handleLogin}>
              <CardContent className="space-y-4 pt-4">
                <div className="space-y-2">
                  <Label htmlFor="username" className="text-gray-200">Username</Label>
                  <Input 
                    id="username" 
                    type="text" 
                    placeholder="Enter your username"
                    value={loginData.username}
                    onChange={(e) => setLoginData({ ...loginData, username: e.target.value })}
                    required
                    className="bg-gray-800/50 border-gray-700 text-white placeholder:text-gray-400 focus:ring-red-500 focus:border-red-500"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password" className="text-gray-200">Password</Label>
                  <Input 
                    id="password" 
                    type="password" 
                    placeholder="Enter your password"
                    value={loginData.password}
                    onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                    required
                    className="bg-gray-800/50 border-gray-700 text-white placeholder:text-gray-400 focus:ring-red-500 focus:border-red-500"
                  />
                </div>
                
                {error && (
                  <Alert variant="destructive" className="bg-red-900/50 border-red-800 text-white">
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                )}
              </CardContent>
              
              <CardFooter className="flex flex-col space-y-2 pt-6 pb-6">
                <Button 
                  type="submit" 
                  className="w-full bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white shadow-lg" 
                  disabled={loading}
                >
                  {loading ? "Logging in..." : "Login"}
                </Button>
                <p className="text-center text-gray-400 text-xs mt-2">
                  Forgot your password? <a href="#" className="text-red-400 hover:text-red-300">Reset it here</a>
                </p>
              </CardFooter>
            </form>
          </TabsContent>
          
          {/* Sign Up Form - Commented out but kept in the code for future reference */}
          {/* 
          <TabsContent value="signup">
            <form onSubmit={handleSignup}>
              <CardContent className="space-y-4 pt-4">
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-gray-200">Full Name</Label>
                  <Input 
                    id="name" 
                    type="text" 
                    placeholder="Enter your full name"
                    value={signupData.name}
                    onChange={(e) => setSignupData({ ...signupData, name: e.target.value })}
                    required
                    className="bg-gray-800/50 border-gray-700 text-white placeholder:text-gray-400 focus:ring-red-500 focus:border-red-500"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-gray-200">Email</Label>
                  <Input 
                    id="email" 
                    type="email" 
                    placeholder="Enter your email"
                    value={signupData.email}
                    onChange={(e) => setSignupData({ ...signupData, email: e.target.value })}
                    required
                    className="bg-gray-800/50 border-gray-700 text-white placeholder:text-gray-400 focus:ring-red-500 focus:border-red-500"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="signupUsername" className="text-gray-200">Username</Label>
                  <Input 
                    id="signupUsername" 
                    type="text" 
                    placeholder="Choose a username"
                    value={signupData.username}
                    onChange={(e) => setSignupData({ ...signupData, username: e.target.value })}
                    required
                    className="bg-gray-800/50 border-gray-700 text-white placeholder:text-gray-400 focus:ring-red-500 focus:border-red-500"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="signupPassword" className="text-gray-200">Password</Label>
                  <Input 
                    id="signupPassword" 
                    type="password" 
                    placeholder="Choose a password"
                    value={signupData.password}
                    onChange={(e) => setSignupData({ ...signupData, password: e.target.value })}
                    required
                    className="bg-gray-800/50 border-gray-700 text-white placeholder:text-gray-400 focus:ring-red-500 focus:border-red-500"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword" className="text-gray-200">Confirm Password</Label>
                  <Input 
                    id="confirmPassword" 
                    type="password" 
                    placeholder="Confirm your password"
                    value={signupData.confirmPassword}
                    onChange={(e) => setSignupData({ ...signupData, confirmPassword: e.target.value })}
                    required
                    className="bg-gray-800/50 border-gray-700 text-white placeholder:text-gray-400 focus:ring-red-500 focus:border-red-500"
                  />
                </div>
                
                {error && (
                  <Alert variant="destructive" className="bg-red-900/50 border-red-800 text-white">
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                )}
              </CardContent>
              
              <CardFooter className="flex flex-col space-y-2 pt-6 pb-6">
                <Button 
                  type="submit" 
                  className="w-full bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white shadow-lg" 
                  disabled={loading}
                >
                  {loading ? "Creating account..." : "Sign Up"}
                </Button>
              </CardFooter>
            </form>
          </TabsContent>
          */}
        </Tabs>
      </Card>
    </div>
  );
}