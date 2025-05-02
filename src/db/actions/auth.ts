'use server';

import { auth } from "@/lib/better-auth/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

// Types
export type User = {
  id: string;
  name: string;
  email: string;
  emailVerified: boolean;
  image?: string;
  username?: string;
  displayUsername?: string;
  role: string;
  banned: boolean;
  banReason?: string;
  banExpires?: number; // Changed to number to match your integer column
  createdAt: Date;
  updatedAt: Date;
};

export type Session = {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  userId: string;
  expiresAt: Date;
  token: string;
  ipAddress?: string;
  userAgent?: string;
  impersonatedBy?: string;
};

export type SessionData = {
  user: User;
  session: Session;
};

/**
 * Get the current session from the server
 * @returns The session data or null if no session exists
 */
export async function getServerSession(): Promise<SessionData | null> {
  try {
    const response = await auth.api.getSession({
      headers: await headers()
    });

    if (!response) return null;

    // Convert banExpires from Date to number (Unix timestamp) if it exists
    const banExpires = response.user.banExpires 
      ? new Date(response.user.banExpires).getTime() 
      : undefined;

    return {
      user: {
        id: response.user.id,
        name: response.user.name,
        email: response.user.email,
        emailVerified: response.user.emailVerified,
        image: response.user.image ?? undefined,
        username: response.user.username ?? undefined,
        displayUsername: response.user.displayUsername ?? undefined,
        role: response.user.role ?? 'user',
        banned: response.user.banned ?? false,
        banReason: response.user.banReason ?? undefined,
        banExpires: banExpires,
        createdAt: new Date(response.user.createdAt),
        updatedAt: new Date(response.user.updatedAt)
      },
      session: {
        id: response.session.id,
        createdAt: new Date(response.session.createdAt),
        updatedAt: new Date(response.session.updatedAt),
        userId: response.session.userId,
        expiresAt: new Date(response.session.expiresAt),
        token: response.session.token,
        ipAddress: response.session.ipAddress ?? undefined,
        userAgent: response.session.userAgent ?? undefined,
        impersonatedBy: response.session.impersonatedBy ?? undefined
      }
    };
  } catch (error) {
    return null;
  }
}

// Rest of your functions remain exactly the same
export async function requireAuth(): Promise<SessionData> {
  const session = await getServerSession();
  if (!session) {
    redirect('/auth');
  }
  return session;
}

export async function requireAdmin(): Promise<SessionData> {
  const session = await requireAuth();
  if (session.user.role !== 'admin') {
    redirect('/auth');
  }
  return session;
}

export async function getCurrentUser(): Promise<User | null> {
  const session = await getServerSession();
  return session?.user ?? null;
}