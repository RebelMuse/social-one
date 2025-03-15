import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { signed_request } = body

    if (!signed_request) {
      return new NextResponse('Missing signed request', { status: 400 })
    }

    // Extract user ID from the signed request
    const [encodedSignature, payload] = signed_request.split('.')
    const decodedPayload = JSON.parse(Buffer.from(payload, 'base64').toString('utf-8'))
    const userId = decodedPayload.user_id

    // Delete all user data from your database
    const supabase = createRouteHandlerClient({ cookies })
    
    // Delete Instagram account data
    await supabase.from('instagram_accounts')
      .delete()
      .eq('user_id', userId)
      
    // Delete any associated posts or media
    await supabase.from('instagram_updates')
      .delete()
      .eq('user_id', userId)

    return new NextResponse(JSON.stringify({
      url: `https://f337-142-113-213-209.ngrok-free.app/api/auth/instagram/data-deletion/status`,
      confirmation_code: userId
    }))
  } catch (error) {
    console.error('Error handling data deletion:', error)
    return new NextResponse('Internal Server Error', { status: 500 })
  }
} 