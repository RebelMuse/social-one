export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      posts: {
        Row: {
          id: string
          created_at: string
          user_id: string
          content: string
          media_urls: string[] | null
          platform: string
          status: 'draft' | 'scheduled' | 'published'
          scheduled_for: string | null
          published_at: string | null
          updated_at: string
        }
        Insert: {
          id?: string
          created_at?: string
          user_id: string
          content: string
          media_urls?: string[] | null
          platform: string
          status?: 'draft' | 'scheduled' | 'published'
          scheduled_for?: string | null
          published_at?: string | null
          updated_at?: string
        }
        Update: {
          id?: string
          created_at?: string
          user_id?: string
          content?: string
          media_urls?: string[] | null
          platform?: string
          status?: 'draft' | 'scheduled' | 'published'
          scheduled_for?: string | null
          published_at?: string | null
          updated_at?: string
        }
      }
      profiles: {
        Row: {
          id: string
          created_at: string
          updated_at: string
          username: string
          full_name: string | null
          avatar_url: string | null
        }
        Insert: {
          id: string
          created_at?: string
          updated_at?: string
          username: string
          full_name?: string | null
          avatar_url?: string | null
        }
        Update: {
          id?: string
          created_at?: string
          updated_at?: string
          username?: string
          full_name?: string | null
          avatar_url?: string | null
        }
      }
      connected_accounts: {
        Row: {
          id: string
          created_at: string
          user_id: string
          platform: string
          access_token: string
          refresh_token: string | null
          expires_at: string | null
          platform_user_id: string
          platform_username: string
        }
        Insert: {
          id?: string
          created_at?: string
          user_id: string
          platform: string
          access_token: string
          refresh_token?: string | null
          expires_at?: string | null
          platform_user_id: string
          platform_username: string
        }
        Update: {
          id?: string
          created_at?: string
          user_id?: string
          platform?: string
          access_token?: string
          refresh_token?: string | null
          expires_at?: string | null
          platform_user_id?: string
          platform_username?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
} 