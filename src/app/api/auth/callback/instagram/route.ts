import { createRouteHandlerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'
import { InstagramService } from '@/lib/services/instagram'

export const dynamic = 'force-dynamic'

export async function GET(request: Request) {
  const searchParams = new URL(request.url).searchParams
  const code = searchParams.get('code')
  const state = searchParams.get('state')
  const error = searchParams.get('error')
  const cookieStore = cookies()
  
  // Get stored state from cookie
  const storedState = cookieStore.get('instagram_oauth_state')?.value
  
  // Clear the state cookie
  const response = NextResponse.redirect(new URL('/settings', request.url))
  response.cookies.delete('instagram_oauth_state')
  
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
    const tokenResponse = await fetch('https://api.instagram.com/oauth/access_token', {
      method: 'POST',
      body: new URLSearchParams({
        client_id: process.env.INSTAGRAM_APP_ID!,
        client_secret: process.env.INSTAGRAM_APP_SECRET!,
        grant_type: 'authorization_code',
        redirect_uri: process.env.INSTAGRAM_REDIRECT_URI!,
        code
      })
    })
    
    if (!tokenResponse.ok) {
      throw new Error('Failed to exchange code for tokens')
    }
    
    const { access_token, user_id } = await tokenResponse.json()
    
    // Get long-lived token
    const longLivedTokenResponse = await fetch(
      `https://graph.instagram.com/access_token?` +
      `grant_type=ig_exchange_token&` +
      `client_secret=${process.env.INSTAGRAM_APP_SECRET}&` +
      `access_token=${access_token}`
    )
    
    if (!longLivedTokenResponse.ok) {
      throw new Error('Failed to get long-lived token')
    }
    
    const { access_token: longLivedToken, expires_in } = await longLivedTokenResponse.json()
    
    // Get the user's Supabase session
    const supabase = createRouteHandlerClient({ cookies: () => cookieStore })
    const { data: { session } } = await supabase.auth.getSession()
    
    if (!session?.user) {
      return NextResponse.redirect(
        new URL('/auth/signin?error=not_authenticated', request.url)
      )
    }
    
    // Store the tokens
    const instagramService = new InstagramService(session.user.id)
    await instagramService.storeTokens({
      access_token: longLivedToken,
      user_id,
      expires_in
    })
    
    return NextResponse.redirect(
      new URL('/settings?success=instagram_connected', request.url)
    )
  } catch (error) {
    console.error('Instagram OAuth error:', error)
    return NextResponse.redirect(
      new URL('/settings?error=token_exchange_failed', request.url)
    )
  }
} 