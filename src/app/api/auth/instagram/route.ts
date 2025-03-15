import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { createRouteHandlerClient } from '@supabase/ssr'

// Facebook OAuth configuration for Instagram
const INSTAGRAM_APP_ID = process.env.NEXT_PUBLIC_INSTAGRAM_APP_ID
const REDIRECT_URI = encodeURIComponent(`${process.env.NEXT_PUBLIC_APP_URL}/api/auth/instagram/callback`)

// Handle GET requests to initiate Facebook OAuth for Instagram
export async function GET(request: Request) {
  const scope = encodeURIComponent('instagram_basic,instagram_content_publish,pages_show_list,instagram_manage_comments,instagram_manage_insights')
  
  // Generate the Facebook authorization URL for Instagram
  const authUrl = `https://www.facebook.com/v19.0/dialog/oauth?client_id=${INSTAGRAM_APP_ID}&redirect_uri=${REDIRECT_URI}&scope=${scope}&response_type=code`
  
  // Redirect to Facebook's authorization page
  return NextResponse.redirect(authUrl)
} 