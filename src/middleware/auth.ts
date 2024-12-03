import { NextRequest, NextResponse } from 'next/server';
import { verifyToken } from './auth-utils'; // Utility to verify JWT or session

export function middleware(req: NextRequest) {
  const token = req.cookies.get('authToken') || req.headers.get('Authorization')?.split(' ')[1];

  if (!token || !verifyToken(token)) {
    return NextResponse.redirect(new URL('/login', req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/:path*",  // Protect all routes
    "/api/:path*" // You can also protect API routes here
  ]
};
