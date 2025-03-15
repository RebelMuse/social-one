import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'

export async function GET() {
  try {
    const cookieStore = cookies()
    const accessToken = cookieStore.get('instagram_token')?.value

    if (!accessToken) {
      return NextResponse.json(
        { error: 'Not authenticated' },
        { status: 401 }
      )
    }

    // First, get the user's media
    const mediaResponse = await fetch(
      `https://graph.instagram.com/me/media?fields=id,caption,media_type,media_url,thumbnail_url,permalink,timestamp&access_token=${accessToken}`
    )
    const mediaData = await mediaResponse.json()
    console.log('Media response:', mediaData)

    if (mediaData.error) {
      throw new Error(mediaData.error.message)
    }

    // Get basic account information
    const accountResponse = await fetch(
      `https://graph.instagram.com/me?fields=id,username,account_type,media_count,followers_count&access_token=${accessToken}`
    )
    const accountData = await accountResponse.json()
    console.log('Account response:', accountData)

    if (accountData.error) {
      throw new Error(accountData.error.message)
    }

    return NextResponse.json({
      account_insights: [{
        name: 'Followers',
        values: [{ value: accountData.followers_count || 0 }]
      }, {
        name: 'Media Count',
        values: [{ value: accountData.media_count || 0 }]
      }],
      media: mediaData.data || [],
      account: accountData
    })
  } catch (error) {
    console.error('Error fetching Instagram insights:', error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to fetch Instagram insights' },
      { status: 500 }
    )
  }
} 