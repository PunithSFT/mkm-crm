import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const auth = request.cookies.get('auth')?.value;

  // Public routes that don't need login
  if (request.nextUrl.pathname === '/login' || 
      request.nextUrl.pathname.startsWith('/api')) {
    return NextResponse.next();
  }

  // If no auth cookie → redirect to login
  if (!auth) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)'],
};