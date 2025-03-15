import { createBrowserClient } from '@supabase/ssr'
import { Database } from '@/types/supabase'

export const createClient = () => {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  
  if (!supabaseUrl || !supabaseAnonKey) {
    console.error('Supabase credentials missing:', {
      urlAvailable: !!supabaseUrl,
      keyAvailable: !!supabaseAnonKey
    })
  }
  
  return createBrowserClient<Database>(
    supabaseUrl || '',
    supabaseAnonKey || ''
  )
}

export const supabase = createClient()

export type { Database }

export type Tables<T extends keyof Database['public']['Tables']> = Database['public']['Tables'][T]['Row']
export type Enums<T extends keyof Database['public']['Enums']> = Database['public']['Enums'][T]

export interface Post {
  id: string
  user_id: string
  title: string
  content: string
  platform: string | null
  status: 'draft' | 'scheduled' | 'published'
  scheduled_at: string | null
  metadata: {
    mediaFiles?: Array<{
      url: string
      type: 'image' | 'video'
    }>
    selectedPlatforms?: string[]
  }
  created_at: string
  updated_at: string
}

export async function getCurrentUser() {
  const { data: { user } } = await supabase.auth.getUser()
  return user
}

export async function getDrafts() {
  const user = await getCurrentUser()
  if (!user) throw new Error('Not authenticated')

  const { data, error } = await supabase
    .from('posts')
    .select('*')
    .eq('user_id', user.id)
    .eq('status', 'draft')
    .order('updated_at', { ascending: false })

  if (error) throw error
  return data as Post[]
}

export async function getDraftById(id: string) {
  const user = await getCurrentUser()
  if (!user) throw new Error('Not authenticated')

  const { data, error } = await supabase
    .from('posts')
    .select('*')
    .eq('id', id)
    .eq('user_id', user.id)
    .eq('status', 'draft')
    .single()

  if (error) throw error
  return data as Post
}

export async function saveDraft(draft: Partial<Post>) {
  const user = await getCurrentUser()
  if (!user) throw new Error('Not authenticated')

  const now = new Date().toISOString()

  if (draft.id) {
    // Update existing draft
    const { data, error } = await supabase
      .from('posts')
      .update({
        title: draft.title || 'Untitled Draft',
        content: draft.content,
        platform: draft.platform,
        status: draft.status || 'draft',
        scheduled_at: draft.scheduled_at,
        metadata: draft.metadata,
        updated_at: now
      })
      .eq('id', draft.id)
      .eq('user_id', user.id)
      .select()
      .single()

    if (error) throw error
    return data as Post
  } else {
    // Create new draft
    const { data, error } = await supabase
      .from('posts')
      .insert([{
        user_id: user.id,
        title: draft.title || 'Untitled Draft',
        content: draft.content,
        platform: draft.platform,
        status: 'draft',
        metadata: draft.metadata,
        created_at: now,
        updated_at: now
      }])
      .select()
      .single()

    if (error) throw error
    return data as Post
  }
}

export async function deleteDraft(id: string) {
  const user = await getCurrentUser()
  if (!user) throw new Error('Not authenticated')

  const { error } = await supabase
    .from('posts')
    .delete()
    .eq('id', id)
    .eq('user_id', user.id)
    .eq('status', 'draft')

  if (error) throw error
}

export async function uploadMedia(file: File) {
  const user = await getCurrentUser()
  if (!user) throw new Error('Not authenticated')

  const fileExt = file.name.split('.').pop()
  const fileName = `${user.id}/${Date.now()}.${fileExt}`
  const { error: uploadError } = await supabase.storage
    .from('media')
    .upload(fileName, file)

  if (uploadError) throw uploadError

  const { data: { publicUrl } } = supabase.storage
    .from('media')
    .getPublicUrl(fileName)

  return publicUrl
} 