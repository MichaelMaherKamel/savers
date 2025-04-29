'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { authClient } from '@/lib/auth-client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

// Define TypeScript types for our session and error
type User = {
  id: string;
  name: string;
  email: string;
  emailVerified: boolean;
  createdAt: Date;
  updatedAt: Date;
  image?: string | null;
  username?: string | null;
  displayUsername?: string | null;
};

type SessionData = {
  user: User;
  session: {
    id: string;
    expiresAt: Date;
    [key: string]: any;
  };
};

type BetterAuthError = {
  message: string;
  code?: string;
  [key: string]: any;
};

export default function TestPage() {
  const router = useRouter();
  const [session, setSession] = useState<SessionData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<BetterAuthError | null>(null);
  
  // Fetch session when component mounts
  useEffect(() => {
    const fetchSession = async () => {
      try {
        setLoading(true);
        const { data } = await authClient.getSession();
        setSession(data);
        setError(null);
      } catch (err) {
        const authError = err as BetterAuthError;
        setError(authError);
        setSession(null);
      } finally {
        setLoading(false);
      }
    };
    
    fetchSession();
  }, []);
  
  // Redirect to login if no session
  useEffect(() => {
    if (!loading && (error || !session)) {
      router.push('/auth');
    }
  }, [loading, error, session, router]);
  
  const handleSignOut = async () => {
    try {
      await authClient.signOut({
        fetchOptions: {
          onSuccess: () => {
            router.push('/auth');
          },
        },
      });
    } catch (err) {
      console.error('Error signing out:', err);
    }
  };
  
  const refreshSession = async () => {
    try {
      setLoading(true);
      const { data } = await authClient.getSession();
      setSession(data);
    } catch (err) {
      const authError = err as BetterAuthError;
      console.error('Error refreshing session:', authError);
    } finally {
      setLoading(false);
    }
  };

  // If session is loading, show loading state
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-50">
        <Card className="w-full max-w-2xl">
          <CardHeader>
            <CardTitle className="text-2xl font-bold">Authentication Test</CardTitle>
            <CardDescription>Loading your session...</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-10 w-3/4" />
              <Skeleton className="h-10 w-1/2" />
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  // If no session, return null (will redirect in useEffect)
  if (!session) {
    return null;
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50">
      <Card className="w-full max-w-2xl">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Authentication Test</CardTitle>
          <CardDescription>You're successfully authenticated as {session.user.username || session.user.name}!</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="bg-gray-100 p-4 rounded-md">
            <h3 className="text-lg font-semibold mb-2">Session Information:</h3>
            <pre className="bg-gray-800 text-green-400 p-4 rounded-md overflow-auto text-sm">
              {JSON.stringify(session, null, 2)}
            </pre>
          </div>
        </CardContent>
        <CardFooter className="flex justify-end space-x-2">
          <Button onClick={refreshSession}>Refresh Session</Button>
          <Button variant="destructive" onClick={handleSignOut}>Sign Out</Button>
        </CardFooter>
      </Card>
    </div>
  );
}