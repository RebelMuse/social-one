import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const response = await fetch(
      'https://graph.facebook.com/v19.0/me?fields=id,name&access_token=' + process.env.INSTAGRAM_TEST_ACCESS_TOKEN
    )
    
    const data = await response.json()
    return NextResponse.json({ success: true, data })
  } catch (error) {
    console.error('Instagram test API call failed:', error)
    return NextResponse.json({ success: false, error: 'Failed to make test API call' }, { status: 500 })
  }
} 