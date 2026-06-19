import { NextRequest, NextResponse } from 'next/server';

const PUBLIC_PATHS = ['/login'];

export function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const accessToken = req.cookies.get('access_token')?.value;

  const isPublic = PUBLIC_PATHS.some((p) => pathname.startsWith(p));

  if (!accessToken && !isPublic) {
    return NextResponse.redirect(new URL('/login', req.url));
  }

  if (accessToken && pathname === '/login') {
    return NextResponse.redirect(new URL('/dashboard', req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
