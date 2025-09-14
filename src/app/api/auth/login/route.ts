import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { compare } from 'bcryptjs';
import { validateLoginForm } from '@/lib/validation';
import { signIn } from '@/auth';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, password } = body;

    // Validate form data
    const validation = validateLoginForm({ email, password });
    
    if (!validation.isValid) {
      return NextResponse.json(
        { 
          success: false, 
          message: 'Validation failed', 
          errors: validation.errors 
        },
        { status: 400 }
      );
    }

    // Find user by email
    const user = await prisma.user.findUnique({
      where: { email: email.toLowerCase() }
    });

    if (!user) {
      return NextResponse.json(
        { 
          success: false, 
          message: 'Invalid email or password',
          errors: [{ field: 'email', message: 'Invalid email or password' }]
        },
        { status: 401 }
      );
    }

    // Compare password
    const isPasswordValid = await compare(password, user.password);

    if (!isPasswordValid) {
      return NextResponse.json(
        { 
          success: false, 
          message: 'Invalid email or password',
          errors: [{ field: 'password', message: 'Invalid email or password' }]
        },
        { status: 401 }
      );
    }

    // Sign in the user using NextAuth
    const signInResult = await signIn('credentials', {
      email: user.email,
      password: password,
      redirect: false,
    });

    if (signInResult?.error) {
      return NextResponse.json(
        { 
          success: false, 
          message: 'Authentication failed' 
        },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Login successful',
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
    });

  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { 
        success: false, 
        message: 'Internal server error' 
      },
      { status: 500 }
    );
  }
}
