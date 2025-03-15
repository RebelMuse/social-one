import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { createRouteHandlerClient } from '@supabase/ssr'

export const dynamic = 'force-dynamic'

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

    // Remove the Instagram account from your database
    const cookieStore = cookies()
    const supabase = createRouteHandlerClient({ cookies: () => cookieStore })
    await supabase.from('instagram_accounts')
      .delete()
      .eq('user_id', userId)

    return new NextResponse('OK')
  } catch (error) {
    console.error('Error handling deauthorization:', error)
    return new NextResponse('Internal Server Error', { status: 500 })
  }
} 