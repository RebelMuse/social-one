'use client';
'use client'

import { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import PostEditor from '@/components/features/PostEditor'
import PlatformPreview from '@/components/features/PlatformPreview'
import { getDraftById, Post } from '@/lib/supabase'

export default function CreatePage() {
  const searchParams = useSearchParams()
  const draftId = searchParams.get('draft')
  
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>([])
  const [content, setContent] = useState('')
  const [mediaFiles, setMediaFiles] = useState<Array<{ preview: string; type: 'image' | 'video' }>>([])
  const [currentDraft, setCurrentDraft] = useState<Post | null>(null)
  const [isLoading, setIsLoading] = useState(!!draftId)

  useEffect(() => {
    async function loadDraft() {
      if (draftId) {
        try {
          const draft = await getDraftById(draftId)
          setContent(draft.content)
          setMediaFiles(draft.metadata.mediaFiles || [])
          setSelectedPlatforms(draft.metadata.selectedPlatforms || [])
          setCurrentDraft(draft)
        } catch (error) {
          console.error('Error loading draft:', error)
        } finally {
          setIsLoading(false)
        }
      }
    }

    loadDraft()
  }, [draftId])

  if (isLoading) {
    return (
      <div className="flex-1 h-screen overflow-y-auto bg-gray-50 p-6">
        <div className="flex items-center justify-center h-64">
          <div className="text-gray-500">Loading draft...</div>
        </div>
      </div>
    )
  }

  return (
    <div className="flex-1 h-screen overflow-y-auto bg-gray-50 p-6">
      <div className="max-w-[1200px] mx-auto space-y-6">
        {/* Post Editor */}
        <PostEditor
          selectedPlatforms={selectedPlatforms}
          initialContent={content}
          initialMediaFiles={mediaFiles}
          draftId={currentDraft?.id}
        />

        {/* Platform Previews */}
        {selectedPlatforms.length > 0 && (
          <div className="grid grid-cols-2 gap-6">
            {selectedPlatforms.map((platform) => (
              <div key={platform} className="bg-gray-50 p-4 rounded-lg">
                <h3 className="text-sm font-medium text-gray-900 mb-4">{platform} Preview</h3>
                <PlatformPreview
                  platform={platform}
                  content={content}
                  mediaFiles={mediaFiles}
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
} 