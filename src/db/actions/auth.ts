'use server';

import { auth } from "@/lib/better-auth/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { db } from "..";
import { User, Session, user } from "../schema";
import { asc } from "drizzle-orm";

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
        image: response.user.image ?? null,
        username: response.user.username ?? null,
        displayUsername: response.user.displayUsername ?? null,
        role: response.user.role ?? 'user',
        banned: response.user.banned ?? false,
        banReason: response.user.banReason ?? null,
        banExpires: banExpires ?? null,
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
        ipAddress: response.session.ipAddress ?? null,
        userAgent: response.session.userAgent ?? null
      }
    };
  } catch (error) {
    return null;
  }
}

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

export const adminGetAllUsers = async (): Promise<User[]> => {
  try {
    const users = await db
      .select()
      .from(user)
      .orderBy(asc(user.id));
    
    return users;
  } catch (error) {
    console.error("Failed to fetch users:", error);
    throw new Error("Failed to fetch users");
  }
};