import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { onboardingRedirects, OnboardingTypeKey } from './app/onboarding/types';

// Add paths that require specific roles
const protectedPaths: Record<string, OnboardingTypeKey[]> = {
  '/company': ['COMPANY'],
  '/jobseeker': ['JOBSEEKER'],
  '/email': ['EMPLOYEE'],
};

// Add paths that should be accessible without a role
const publicPaths = [
  '/',
  '/onboarding',
  '/enterprise',
  '/enterprise/metrics',
  '/enterprise/positions',
  '/enterprise/profile',
  '/swiper',
  '/swiper/results',
  '/applicant',
  '/email',
];

export function middleware(request: NextRequest) {
  const role = request.cookies.get('user-role')?.value as OnboardingTypeKey | undefined;
  const path = request.nextUrl.pathname;

  // Allow access to public paths
  if (publicPaths.includes(path)) {
    return NextResponse.next();
  }

  // If no role is set, redirect to onboarding
  if (!role) {
    return NextResponse.redirect(new URL('/onboarding', request.url));
  }

  // Check if the current path is protected
  const requiredRoles = Object.entries(protectedPaths).find(([protectedPath]) =>
    path.startsWith(protectedPath),
  )?.[1];

  // If the path is protected and the user's role isn't allowed, redirect to their base path
  if (requiredRoles && !requiredRoles.includes(role)) {
    const baseRedirect = onboardingRedirects[role];
    return NextResponse.redirect(new URL(baseRedirect, request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next|_vercel|monitoring|.*\\..*).*)'],
};
