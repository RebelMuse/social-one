import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'

// Facebook OAuth configuration
const INSTAGRAM_APP_ID = process.env.NEXT_PUBLIC_INSTAGRAM_APP_ID
const REDIRECT_URI = encodeURIComponent(`${process.env.NEXT_PUBLIC_APP_URL}/api/auth/facebook/callback`)

// Handle GET requests to initiate Facebook OAuth
export async function GET(request: Request) {
  const scope = encodeURIComponent('email,pages_show_list,instagram_basic,instagram_content_publish,instagram_manage_comments,instagram_manage_insights')
  
  // Generate the Facebook authorization URL
  const authUrl = `https://www.facebook.com/v19.0/dialog/oauth?client_id=${INSTAGRAM_APP_ID}&redirect_uri=${REDIRECT_URI}&scope=${scope}&response_type=code`
  
  // Redirect to Facebook's authorization page
  return NextResponse.redirect(authUrl)
} 