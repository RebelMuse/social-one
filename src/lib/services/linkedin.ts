import { createBrowserClient } from '@supabase/ssr'

export interface LinkedInProfile {
  id: string
  localizedFirstName: string
  localizedLastName: string
  profilePicture?: {
    displayImage: string
  }
}

export interface LinkedInTokens {
  access_token: string
  expires_in: number
  refresh_token?: string
  scope: string
}

export class LinkedInService {
  private supabase
  private userId: string | undefined

  constructor(userId?: string) {
    this.supabase = createBrowserClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    )
    this.userId = userId
  }

  async getStoredTokens(): Promise<LinkedInTokens | null> {
    if (!this.userId) return null

    const { data, error } = await this.supabase
      .from('connected_accounts')
      .select('access_token, refresh_token, expires_at')
      .eq('user_id', this.userId)
      .eq('platform', 'linkedin')
      .single()

    if (error || !data) return null

    return {
      access_token: data.access_token,
      expires_in: new Date(data.expires_at).getTime() - Date.now(),
      refresh_token: data.refresh_token,
      scope: 'r_liteprofile w_member_social'
    }
  }

  async storeTokens(tokens: LinkedInTokens): Promise<void> {
    if (!this.userId) throw new Error('User not authenticated')

    const expiresAt = new Date(Date.now() + tokens.expires_in * 1000)

    const { error } = await this.supabase.from('connected_accounts').upsert({
      user_id: this.userId,
      platform: 'linkedin',
      access_token: tokens.access_token,
      refresh_token: tokens.refresh_token,
      expires_at: expiresAt.toISOString()
    })

    if (error) throw error
  }

  async refreshTokens(refreshToken: string): Promise<LinkedInTokens> {
    const response = await fetch('https://www.linkedin.com/oauth/v2/accessToken', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: new URLSearchParams({
        grant_type: 'refresh_token',
        refresh_token: refreshToken,
        client_id: process.env.LINKEDIN_CLIENT_ID!,
        client_secret: process.env.LINKEDIN_CLIENT_SECRET!
      })
    })

    if (!response.ok) {
      throw new Error('Failed to refresh LinkedIn tokens')
    }

    const tokens = await response.json()
    await this.storeTokens(tokens)
    return tokens
  }

  async getProfile(accessToken: string): Promise<LinkedInProfile> {
    const response = await fetch(
      'https://api.linkedin.com/v2/me?projection=(id,localizedFirstName,localizedLastName,profilePicture(displayImage~:playableStreams))',
      {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      }
    )

    if (!response.ok) {
      throw new Error('Failed to fetch LinkedIn profile')
    }

    return response.json()
  }

  async createPost(accessToken: string, text: string, mediaUrls?: string[]): Promise<string> {
    const author = `urn:li:person:${(await this.getProfile(accessToken)).id}`
    
    const postData: any = {
      author,
      lifecycleState: 'PUBLISHED',
      specificContent: {
        'com.linkedin.ugc.ShareContent': {
          shareCommentary: {
            text
          },
          shareMediaCategory: mediaUrls ? 'IMAGE' : 'NONE'
        }
      },
      visibility: {
        'com.linkedin.ugc.MemberNetworkVisibility': 'PUBLIC'
      }
    }

    if (mediaUrls && mediaUrls.length > 0) {
      postData.specificContent['com.linkedin.ugc.ShareContent'].media = mediaUrls.map(url => ({
        status: 'READY',
        media: url,
        title: {
          text: 'Image'
        }
      }))
    }

    const response = await fetch('https://api.linkedin.com/v2/ugcPosts', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
        'X-Restli-Protocol-Version': '2.0.0'
      },
      body: JSON.stringify(postData)
    })

    if (!response.ok) {
      const error = await response.json()
      throw new Error(`Failed to create LinkedIn post: ${error.message}`)
    }

    const result = await response.json()
    return result.id
  }
} 