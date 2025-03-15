import { createBrowserClient } from '@supabase/ssr'

export interface InstagramProfile {
  id: string
  username: string
  account_type: string
  media_count: number
}

export interface InstagramMedia {
  id: string
  media_type: 'IMAGE' | 'VIDEO' | 'CAROUSEL_ALBUM'
  media_url: string
  thumbnail_url?: string
  permalink: string
  caption?: string
  timestamp: string
}

export interface InstagramTokens {
  access_token: string
  user_id: string
  expires_in: number
}

export class InstagramService {
  private supabase
  private userId: string | undefined
  private baseUrl = 'https://graph.instagram.com'

  constructor(userId?: string) {
    this.supabase = createBrowserClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    )
    this.userId = userId
  }

  async getStoredTokens(): Promise<InstagramTokens | null> {
    if (!this.userId) return null

    const { data, error } = await this.supabase
      .from('connected_accounts')
      .select('access_token, user_id, expires_at')
      .eq('user_id', this.userId)
      .eq('platform', 'instagram')
      .single()

    if (error || !data) return null

    return {
      access_token: data.access_token,
      user_id: data.user_id,
      expires_in: new Date(data.expires_at).getTime() - Date.now()
    }
  }

  async storeTokens(tokens: InstagramTokens): Promise<void> {
    if (!this.userId) throw new Error('User not authenticated')

    const expiresAt = new Date(Date.now() + tokens.expires_in * 1000)

    const { error } = await this.supabase.from('connected_accounts').upsert({
      user_id: this.userId,
      platform: 'instagram',
      access_token: tokens.access_token,
      platform_user_id: tokens.user_id,
      expires_at: expiresAt.toISOString()
    })

    if (error) throw error
  }

  async getProfile(accessToken: string): Promise<InstagramProfile> {
    const response = await fetch(
      `${this.baseUrl}/me?fields=id,username,account_type,media_count&access_token=${accessToken}`
    )

    if (!response.ok) {
      throw new Error('Failed to fetch Instagram profile')
    }

    return response.json()
  }

  async getMedia(accessToken: string, limit: number = 25): Promise<InstagramMedia[]> {
    const response = await fetch(
      `${this.baseUrl}/me/media?fields=id,media_type,media_url,thumbnail_url,permalink,caption,timestamp&limit=${limit}&access_token=${accessToken}`
    )

    if (!response.ok) {
      throw new Error('Failed to fetch Instagram media')
    }

    const data = await response.json()
    return data.data
  }

  async createPost(accessToken: string, mediaUrl: string, caption?: string): Promise<string> {
    // First, create a container
    const containerResponse = await fetch(
      `${this.baseUrl}/me/media?image_url=${encodeURIComponent(mediaUrl)}${
        caption ? `&caption=${encodeURIComponent(caption)}` : ''
      }&access_token=${accessToken}`,
      {
        method: 'POST'
      }
    )

    if (!containerResponse.ok) {
      throw new Error('Failed to create Instagram media container')
    }

    const { id: containerId } = await containerResponse.json()

    // Then publish it
    const publishResponse = await fetch(
      `${this.baseUrl}/me/media_publish?creation_id=${containerId}&access_token=${accessToken}`,
      {
        method: 'POST'
      }
    )

    if (!publishResponse.ok) {
      throw new Error('Failed to publish Instagram post')
    }

    const { id: mediaId } = await publishResponse.json()
    return mediaId
  }
} 