import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { auth } from './auth';

export default async function middleware(request: NextRequest) {
  const session = await auth();
  const protectedPaths = ['/dashboard'];
  const authPaths = ['/login', '/signup'];
  const path = request.nextUrl.pathname;

  // Check if the path is protected
  if (protectedPaths.some(pp => path.startsWith(pp))) {
    if (!session) {
      const url = new URL('/login', request.url);
      url.searchParams.set('callbackUrl', encodeURI(request.url));
      return NextResponse.redirect(url);
    }
  }

  // Redirect authenticated users away from auth pages
  if (session && authPaths.some(ap => path.startsWith(ap))) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};
