import { NextResponse } from "next/server";
import { hash } from "bcryptjs";
import { prisma } from "@/lib/prisma";
import { validateSignupForm } from "@/lib/validation";
import { signIn } from "@/auth";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, password, confirmPassword } = body;

    // Validate form data
    const validation = validateSignupForm({ name, email, password, confirmPassword });
    
    if (!validation.isValid) {
      return NextResponse.json(
        { 
          success: false, 
          message: "Validation failed", 
          errors: validation.errors 
        },
        { status: 400 }
      );
    }

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email: email.toLowerCase() }
    });

    if (existingUser) {
      return NextResponse.json(
        { 
          success: false, 
          message: "User with this email already exists",
          errors: [{ field: "email", message: "Email already registered" }]
        },
        { status: 400 }
      );
    }

    // Hash password
    const hashedPassword = await hash(password, 10);

    // Create user
    const user = await prisma.user.create({
      data: {
        name: name.trim(),
        email: email.toLowerCase(),
        password: hashedPassword,
      },
    });

    // Sign in the user after successful registration
    const signInResult = await signIn("credentials", {
      email: user.email,
      password: password,
      redirect: false,
    });

    if (signInResult?.error) {
      return NextResponse.json(
        { 
          success: false, 
          message: "Failed to sign in after registration" 
        },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { 
        success: true,
        message: "Account created and signed in successfully",
      },
      { status: 201 }
    );

  } catch (error) {
    console.error("Signup error:", error);
    return NextResponse.json(
      { 
        success: false, 
        message: "Internal server error" 
      },
      { status: 500 }
    );
  }
}
