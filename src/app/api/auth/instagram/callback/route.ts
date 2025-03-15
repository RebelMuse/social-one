import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { cookies } from 'next/headers'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

// Log environment variables for debugging (without exposing sensitive data)
console.log('Instagram callback - Supabase URL available:', !!supabaseUrl)
console.log('Instagram callback - Supabase Anon Key available:', !!supabaseAnonKey)

const supabase = createClient(
  supabaseUrl || '',
  supabaseAnonKey || ''
)

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3003'
    
    // Get the access token from the URL
    const accessToken = searchParams.get('access_token')
    
    if (!accessToken) {
      console.error('No access token received')
      return NextResponse.redirect(`${baseUrl}/auth/signin?error=No access token received`)
    }
    
    // Get user info from Facebook Graph API
    const userResponse = await fetch(
      `https://graph.facebook.com/v19.0/me?fields=id,name,email&access_token=${accessToken}`
    )
    
    if (!userResponse.ok) {
      console.error('Failed to get user info')
      return NextResponse.redirect(`${baseUrl}/auth/signin?error=Failed to get user info`)
    }
    
    const userData = await userResponse.json()
    console.log('User data:', userData)
    
    // Get Instagram accounts
    const accountsResponse = await fetch(
      `https://graph.facebook.com/v19.0/me/accounts?fields=instagram_business_account{id,name,username,profile_picture_url}&access_token=${accessToken}`
    )
    
    if (!accountsResponse.ok) {
      console.error('Failed to get Instagram accounts')
      return NextResponse.redirect(`${baseUrl}/auth/signin?error=Failed to get Instagram accounts`)
    }
    
    const accountsData = await accountsResponse.json()
    console.log('Accounts data:', accountsData)
    
    // Find the Instagram business account
    let instagramId = null
    let instagramUsername = null
    
    if (accountsData.data && accountsData.data.length > 0) {
      for (const account of accountsData.data) {
        if (account.instagram_business_account) {
          instagramId = account.instagram_business_account.id
          instagramUsername = account.instagram_business_account.username
          break
        }
      }
    }
    
    if (!instagramId) {
      console.error('No Instagram business account found')
      return NextResponse.redirect(`${baseUrl}/auth/signin?error=No Instagram business account found`)
    }
    
    // Sign in or create user in Supabase
    const email = userData.email || `${userData.id}@facebook.com`
    const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
      email,
      password: userData.id, // Using Facebook ID as password
    })
    
    if (authError && authError.message.includes('Invalid login credentials')) {
      // User doesn't exist, create them
      const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
        email,
        password: userData.id,
        options: {
          data: {
            full_name: userData.name,
            provider: 'instagram',
          },
        },
      })
      
      if (signUpError) {
        console.error('Error creating user:', signUpError)
        return NextResponse.redirect(`${baseUrl}/auth/signin?error=Failed to create user`)
      }
    } else if (authError) {
      console.error('Error signing in:', authError)
      return NextResponse.redirect(`${baseUrl}/auth/signin?error=Authentication failed`)
    }
    
    // Store Instagram token in Supabase
    const { error: tokenError } = await supabase
      .from('instagram_accounts')
      .upsert({
        user_id: authData?.user?.id || email,
        instagram_id: instagramId,
        instagram_username: instagramUsername,
        access_token: accessToken,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      })
    
    if (tokenError) {
      console.error('Error storing token:', tokenError)
      return NextResponse.redirect(`${baseUrl}/auth/signin?error=Failed to store token`)
    }
    
    // Set cookie with Instagram token
    const cookieStore = cookies()
    cookieStore.set('instagram_token', accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 60 * 24 * 30, // 30 days
      path: '/',
    })
    
    // Redirect to dashboard
    return NextResponse.redirect(`${baseUrl}/dashboard`)
  } catch (error) {
    console.error('Error in Instagram callback:', error)
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3003'
    return NextResponse.redirect(`${baseUrl}/auth/signin?error=Failed to complete authentication`)
  }
} 