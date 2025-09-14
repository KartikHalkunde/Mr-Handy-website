import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const type = searchParams.get('type');
  const city = searchParams.get('city');

  if (!type || !city) {
    return NextResponse.json(
      { error: 'Missing required parameters' },
      { status: 400 }
    );
  }

  try {
    const providers = await prisma.serviceProvider.findMany({
      where: {
        serviceType: type,
        city: {
          contains: city,
          mode: 'insensitive'
        }
      },
      select: {
        id: true,
        name: true,
        experience: true,
        rating: true,
        location: true,
        city: true
      }
    });

    return NextResponse.json(providers);
  } catch (error) {
    console.error('Error fetching providers:', error);
    return NextResponse.json(
      { error: 'Error fetching service providers' },
      { status: 500 }
    );
  }
}