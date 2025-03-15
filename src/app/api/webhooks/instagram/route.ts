import { NextResponse } from 'next/server'
import { headers } from 'next/headers'
import { createRouteHandlerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'

export const dynamic = 'force-dynamic'

// Handle GET requests for webhook verification
export async function GET(request: Request) {
  const searchParams = new URL(request.url).searchParams
  
  const mode = searchParams.get('hub.mode')
  const token = searchParams.get('hub.verify_token')
  const challenge = searchParams.get('hub.challenge')
  
  // Verify the webhook
  if (mode === 'subscribe' && token === process.env.INSTAGRAM_WEBHOOK_VERIFY_TOKEN) {
    console.log('Instagram webhook verified')
    return new NextResponse(challenge, {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, ngrok-skip-browser-warning'
      }
    })
  }
  
  return new NextResponse('Verification failed', { 
    status: 403,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, ngrok-skip-browser-warning'
    }
  })
}

// Handle POST requests for webhook updates
export async function POST(request: Request) {
  try {
    const signature = headers().get('x-hub-signature')
    if (!signature) {
      return new NextResponse('No signature', { 
        status: 401,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type, ngrok-skip-browser-warning'
        }
      })
    }
    
    const body = await request.json()
    console.log('Instagram webhook received:', body)
    
    // Handle different types of updates
    if (body.object === 'instagram') {
      for (const entry of body.entry) {
        const { time, changes } = entry
        
        for (const change of changes) {
          switch (change.field) {
            case 'media':
              // Handle media updates
              await handleMediaUpdate(change.value)
              break
              
            case 'comments':
              // Handle comment updates
              await handleCommentUpdate(change.value)
              break
              
            case 'mentions':
              // Handle mention updates
              await handleMentionUpdate(change.value)
              break
          }
        }
      }
    }
    
    return new NextResponse('OK', {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, ngrok-skip-browser-warning'
      }
    })
  } catch (error) {
    console.error('Error processing Instagram webhook:', error)
    return new NextResponse('Internal Server Error', { 
      status: 500,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, ngrok-skip-browser-warning'
      }
    })
  }
}

async function handleMediaUpdate(value: any) {
  const cookieStore = cookies()
  const supabase = createRouteHandlerClient({ cookies: () => cookieStore })
  await supabase.from('instagram_updates').insert({
    type: 'media',
    data: value,
    created_at: new Date().toISOString()
  })
}

async function handleCommentUpdate(value: any) {
  const cookieStore = cookies()
  const supabase = createRouteHandlerClient({ cookies: () => cookieStore })
  await supabase.from('instagram_updates').insert({
    type: 'comment',
    data: value,
    created_at: new Date().toISOString()
  })
}

async function handleMentionUpdate(value: any) {
  const cookieStore = cookies()
  const supabase = createRouteHandlerClient({ cookies: () => cookieStore })
  await supabase.from('instagram_updates').insert({
    type: 'mention',
    data: value,
    created_at: new Date().toISOString()
  })
} 