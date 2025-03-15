import { createServerClient, type CookieOptions } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
  // Check if it's Facebook's crawler
  const userAgent = request.headers.get('user-agent') || ''
  const isFacebookBot = userAgent.includes('facebookexternalhit') || 
                       userAgent.includes('Facebot')

  // Check if it's the privacy policy page
  const isPrivacyPage = request.nextUrl.pathname === '/privacy' || 
                       request.nextUrl.pathname === '/facebook-privacy.html'

  // Always bypass authentication for Facebook crawler and privacy pages
  if (isFacebookBot || isPrivacyPage) {
    return NextResponse.next({
      headers: {
        'Cache-Control': 'public, no-cache, no-store, must-revalidate',
        'Pragma': 'no-cache',
        'Expires': '0',
        'X-Robots-Tag': 'all',
        'Access-Control-Allow-Origin': '*'
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

  const isProtectedRoute = protectedRoutes.some(route => 
    request.nextUrl.pathname.startsWith(route)
  )

  if (isProtectedRoute && !session) {
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
    '/settings'
  ],
} 