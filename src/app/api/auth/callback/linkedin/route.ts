import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'
import { LinkedInService } from '@/lib/services/linkedin'

export async function GET(request: Request) {
  const searchParams = new URL(request.url).searchParams
  const code = searchParams.get('code')
  const state = searchParams.get('state')
  const error = searchParams.get('error')
  const cookieStore = cookies()
  
  // Get stored state from cookie
  const storedState = cookieStore.get('linkedin_oauth_state')?.value
  
  // Clear the state cookie
  const response = NextResponse.redirect(new URL('/settings', request.url))
  response.cookies.delete('linkedin_oauth_state')
  
  // Validate state and check for errors
  if (error) {
    return NextResponse.redirect(
      new URL(`/settings?error=${encodeURIComponent(error)}`, request.url)
    )
  }
  
  if (!code || !state || !storedState || state !== storedState) {
    return NextResponse.redirect(
      new URL('/settings?error=invalid_state', request.url)
    )
  }
  
  try {
    // Exchange code for tokens
    const tokenResponse = await fetch('https://www.linkedin.com/oauth/v2/accessToken', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: new URLSearchParams({
        grant_type: 'authorization_code',
        code,
        redirect_uri: process.env.LINKEDIN_REDIRECT_URI!,
        client_id: process.env.LINKEDIN_CLIENT_ID!,
        client_secret: process.env.LINKEDIN_CLIENT_SECRET!
      })
    })
    
    if (!tokenResponse.ok) {
      throw new Error('Failed to exchange code for tokens')
    }
    
    const tokens = await tokenResponse.json()
    
    // Get the user's Supabase session
    const supabase = createRouteHandlerClient({ cookies: () => cookieStore })
    const { data: { session } } = await supabase.auth.getSession()
    
    if (!session?.user) {
      return NextResponse.redirect(
        new URL('/auth/signin?error=not_authenticated', request.url)
      )
    }
    
    // Store the tokens
    const linkedInService = new LinkedInService(session.user.id)
    await linkedInService.storeTokens(tokens)
    
    return NextResponse.redirect(
      new URL('/settings?success=linkedin_connected', request.url)
    )
  } catch (error) {
    console.error('LinkedIn OAuth error:', error)
    return NextResponse.redirect(
      new URL('/settings?error=token_exchange_failed', request.url)
    )
  }
} 