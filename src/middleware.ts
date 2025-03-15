import { createServerClient, type CookieOptions } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
  // If it's the privacy page, skip authentication entirely
  if (request.nextUrl.pathname === '/privacy') {
    return NextResponse.next({
      headers: {
        'Cache-Control': 'public, max-age=3600',
        'X-Robots-Tag': 'all',
        'X-Frame-Options': 'ALLOW-FROM https://www.facebook.com'
      }
    })
  }

  let response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  })

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return request.cookies.get(name)?.value
        },
        set(name: string, value: string, options: CookieOptions) {
          response.cookies.set({
            name,
            value,
            ...options,
          })
        },
        remove(name: string, options: CookieOptions) {
          response.cookies.set({
            name,
            value: '',
            ...options,
          })
        },
      },
    }
  )

  const { data: { session } } = await supabase.auth.getSession()

  // Protected routes that require authentication
  const protectedRoutes = [
    '/',
    '/find-inspiration',
    '/prompts',
    '/sources',
    '/published-posts',
    '/videos',
    '/dashboard',
    '/profile',
    '/settings'
  ]

  // Public routes that don't require authentication
  const publicRoutes = ['/privacy', '/auth']
  
  const isProtectedRoute = protectedRoutes.some(route => 
    request.nextUrl.pathname.startsWith(route)
  )

  const isPublicRoute = publicRoutes.some(route =>
    request.nextUrl.pathname.startsWith(route)
  )

  if (isProtectedRoute && !isPublicRoute && !session) {
    return NextResponse.redirect(new URL('/auth/signin', request.url))
  }

  return response
}

export const config = {
  matcher: [
    '/',
    '/find-inspiration',
    '/prompts',
    '/sources',
    '/published-posts',
    '/videos',
    '/dashboard',
    '/profile',
    '/settings',
    '/privacy'
  ],
} 