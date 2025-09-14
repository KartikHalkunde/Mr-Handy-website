import { NextResponse } from 'next/server';
import { hash } from 'bcryptjs';
import { prisma } from '@/lib/prisma';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const {
      name,
      email,
      password,
      phone,
      age,
      experience,
      serviceType,
      location,
      city,
      address,
      bio
    } = body;

    // Check if service provider already exists
    const existingUser = await prisma.serviceProvider.findUnique({
      where: {
        email: email,
      },
    });

    if (existingUser) {
      return NextResponse.json(
        { error: 'Email already exists' },
        { status: 400 }
      );
    }

    // Hash the password
    const hashedPassword = await hash(password, 10);

    // Create service provider
    const serviceProvider = await prisma.serviceProvider.create({
      data: {
        name,
        email,
        password: hashedPassword,
        phone,
        age: parseInt(age),
        experience: parseInt(experience),
        serviceType,
        location,
        city,
        address,
        bio,
      },
    });

    return NextResponse.json(
      { message: 'Service Provider created successfully' },
      { status: 201 }
    );
  } catch (error) {
    console.error('Registration error:', error);
    return NextResponse.json(
      { error: 'Error creating service provider' },
      { status: 500 }
    );
  }
}