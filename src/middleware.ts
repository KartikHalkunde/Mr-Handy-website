import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

/**
 * Lightweight middleware to avoid large Edge bundle sizes.
 * Determines auth status via NextAuth session cookie presence only.
 */
export default function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;

  // NextAuth session cookie names (http vs https)
  const sessionToken =
    request.cookies.get('next-auth.session-token')?.value ||
    request.cookies.get('__Secure-next-auth.session-token')?.value;

  const isAuthenticated = Boolean(sessionToken);

  const protectedPaths = ['/dashboard'];
  const authPaths = ['/login', '/signup', '/auth'];

  // Protect private routes
  if (protectedPaths.some((pp) => path.startsWith(pp))) {
    if (!isAuthenticated) {
      const url = new URL('/login', request.url);
      url.searchParams.set('callbackUrl', encodeURI(request.url));
      return NextResponse.redirect(url);
    }
  }

  // Prevent navigating to auth pages when already authenticated
  if (isAuthenticated && authPaths.some((ap) => path.startsWith(ap))) {
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
