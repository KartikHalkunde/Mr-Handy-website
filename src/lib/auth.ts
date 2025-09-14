import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { prisma } from './prisma';

const JWT_SECRET = process.env.NEXTAUTH_SECRET || 'fallback-secret';
const COOKIE_NAME = 'auth-token';

export interface User {
  id: string;
  name: string;
  email: string;
}

export interface JWTPayload {
  userId: string;
  email: string;
}

// Hash password
export async function hashPassword(password: string): Promise<string> {
  const saltRounds = 12;
  return bcrypt.hash(password, saltRounds);
}

// Compare password
export async function comparePassword(password: string, hashedPassword: string): Promise<boolean> {
  return bcrypt.compare(password, hashedPassword);
}

// Generate JWT token
export function generateToken(payload: JWTPayload): string {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: '7d' });
}

// Verify JWT token
export function verifyToken(token: string): JWTPayload | null {
  try {
    return jwt.verify(token, JWT_SECRET) as JWTPayload;
  } catch {
    return null;
  }
}

// Set auth cookie (for API routes)
export function setAuthCookie(response: NextResponse, token: string) {
  response.cookies.set(COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 7 * 24 * 60 * 60, // 7 days
    path: '/',
  });
}

// Get auth cookie
export async function getAuthCookie(): Promise<string | undefined> {
  const cookieStore = await cookies();
  return cookieStore.get(COOKIE_NAME)?.value;
}

// Clear auth cookie
export function clearAuthCookie(response: NextResponse) {
  response.cookies.delete(COOKIE_NAME);
}

// Get user from request (for API routes)
export async function getUserFromRequest(request: NextRequest): Promise<User | null> {
  const token = request.cookies.get(COOKIE_NAME)?.value;
  
  if (!token) {
    return null;
  }

  const payload = verifyToken(token);
  if (!payload) {
    return null;
  }

  // In a real app, you'd fetch from database
  // For now, return the payload as user
  return {
    id: payload.userId,
    email: payload.email,
    name: '', // You'd fetch this from database
  };
}

// Get user from server component
export async function getCurrentUser(): Promise<User | null> {
  const token = await getAuthCookie();
  
  if (!token) {
    return null;
  }

  const payload = verifyToken(token);
  if (!payload) {
    return null;
  }

  // In a real app, you'd fetch from database
  return {
    id: payload.userId,
    email: payload.email,
    name: '', // You'd fetch this from database
  };
}