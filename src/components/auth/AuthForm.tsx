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
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  
  // Login form state
  const [loginData, setLoginData] = useState({
    username: "",
    password: "",
  });

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
          className="w-full"
        >
          
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
                <div className="text-center space-y-1">
                  <button 
                    type="button" 
                    className="text-gray-400 hover:text-gray-300 text-xs bg-transparent border-none p-0 underline cursor-pointer"
                    onClick={() => setShowForgotPassword(!showForgotPassword)}
                  >
                    Forgot your password?
                  </button>
                  {showForgotPassword && (
                    <p className="text-red-400 text-xs">
                      Please contact the admin to reset your password.
                    </p>
                  )}
                </div>
              </CardFooter>
            </form>
          </TabsContent>
        </Tabs>
      </Card>
    </div>
  );
}