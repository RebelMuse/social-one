'use client';
'use client'

import { useState, useCallback, useEffect } from 'react'
import { ImagePlus, Video, Link, Calendar, X } from 'lucide-react'
import Image from 'next/image'
import SchedulePost from './SchedulePost'
import { useRouter } from 'next/navigation'
import { saveDraft, uploadMedia } from '@/lib/supabase'
import { useAuth } from '@/components/providers/AuthProvider'
import { toast } from 'react-hot-toast'

interface PostEditorProps {
  selectedPlatforms: string[]
  initialContent?: string
  initialMediaFiles?: Array<{
    url: string
    type: 'image' | 'video'
  }>
  draftId?: string
}

interface MediaFile {
  url: string
  type: 'image' | 'video'
  file?: File
  isUploading?: boolean
}

export default function PostEditor({ 
  selectedPlatforms, 
  initialContent = '', 
  initialMediaFiles = [],
  draftId
}: PostEditorProps) {
  const router = useRouter()
  const { user, loading } = useAuth()
  const [content, setContent] = useState(initialContent)
  const [mediaFiles, setMediaFiles] = useState<MediaFile[]>(initialMediaFiles)
  const [scheduledDate, setScheduledDate] = useState<Date | null>(null)
  const [isScheduleModalOpen, setIsScheduleModalOpen] = useState(false)
  const [isSaving, setIsSaving] = useState(false)

  useEffect(() => {
    // Redirect to login if not authenticated
    if (!loading && !user) {
      router.push('/login')
    }
  }, [user, loading, router])

  const handleMediaUpload = useCallback(async (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!user) {
      toast.error('Please log in to upload media')
      return
    }

    const files = event.target.files
    if (!files) return

    const newMediaFiles: MediaFile[] = Array.from(files).map(file => ({
      url: URL.createObjectURL(file),
      type: file.type.startsWith('image/') ? 'image' : 'video',
      file,
      isUploading: true
    }))

    setMediaFiles(prev => [...prev, ...newMediaFiles])

    // Upload each file to Supabase storage
    try {
      const uploadedFiles = await Promise.all(
        newMediaFiles.map(async (mediaFile, index) => {
          if (!mediaFile.file) return mediaFile
          const url = await uploadMedia(mediaFile.file)
          return {
            url,
            type: mediaFile.type,
            isUploading: false
          }
        })
      )

      setMediaFiles(prev => {
        const updatedFiles = [...prev]
        uploadedFiles.forEach((file, index) => {
          const currentIndex = prev.length - newMediaFiles.length + index
          if (currentIndex >= 0 && currentIndex < prev.length) {
            updatedFiles[currentIndex] = file
          }
        })
        return updatedFiles
      })
    } catch (error) {
      console.error('Error uploading media:', error)
      toast.error('Failed to upload media')
      // Remove failed uploads
      setMediaFiles(prev => prev.filter(file => !file.isUploading))
    }
  }, [user])

  const removeMedia = (index: number) => {
    setMediaFiles(prev => {
      const newFiles = [...prev]
      const file = newFiles[index]
      if (file.file) {
        URL.revokeObjectURL(file.url)
      }
      newFiles.splice(index, 1)
      return newFiles
    })
  }

  const getCharacterLimit = () => {
    if (selectedPlatforms.includes('Twitter')) return 280
    if (selectedPlatforms.includes('LinkedIn')) return 3000
    return Infinity
  }

  const handleSaveDraft = async () => {
    if (!user) {
      toast.error('Please log in to save drafts')
      return
    }

    try {
      setIsSaving(true)
      await saveDraft({
        id: draftId,
        content,
        platform: selectedPlatforms[0], // Store primary platform
        metadata: {
          mediaFiles: mediaFiles.map(({ url, type }) => ({ url, type })),
          selectedPlatforms // Store all platforms in metadata
        }
      })
      toast.success(draftId ? 'Draft updated' : 'Draft saved')
      router.push('/drafts')
    } catch (error) {
      console.error('Error saving draft:', error)
      toast.error('Failed to save draft')
    } finally {
      setIsSaving(false)
    }
  }

  const handleSchedule = async (date: Date) => {
    if (!user) {
      toast.error('Please log in to schedule posts')
      return
    }

    setScheduledDate(date)
    try {
      await saveDraft({
        id: draftId,
        content,
        platform: selectedPlatforms[0], // Store primary platform
        status: 'scheduled',
        scheduled_at: date.toISOString(),
        metadata: {
          mediaFiles: mediaFiles.map(({ url, type }) => ({ url, type })),
          selectedPlatforms // Store all platforms in metadata
        }
      })
      toast.success('Post scheduled')
      router.push('/calendar')
    } catch (error) {
      console.error('Error scheduling post:', error)
      toast.error('Failed to schedule post')
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-gray-500">Loading...</div>
      </div>
    )
  }

  if (!user) {
    return null // The useEffect will handle the redirect
  }

  const characterLimit = getCharacterLimit()
  const remainingCharacters = characterLimit - content.length

  return (
    <div className="space-y-4 p-6 bg-white rounded-lg border border-gray-100">
      {/* Text Editor */}
      <div className="space-y-2">
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="What's on your mind?"
          className="w-full h-32 p-4 text-gray-900 placeholder-gray-400 border border-gray-100 rounded-lg resize-none focus:outline-none focus:border-[#4F46E5]"
          maxLength={characterLimit}
        />
        {characterLimit !== Infinity && (
          <div className="text-sm text-gray-500 text-right">
            {remainingCharacters} characters remaining
          </div>
        )}
      </div>

      {/* Media Preview */}
      {mediaFiles.length > 0 && (
        <div className="grid grid-cols-2 gap-4">
          {mediaFiles.map((media, index) => (
            <div key={index} className="relative rounded-lg overflow-hidden">
              {media.type === 'image' ? (
                <Image
                  src={media.url}
                  alt="Preview"
                  width={300}
                  height={300}
                  className="object-cover w-full h-48"
                />
              ) : (
                <video
                  src={media.url}
                  className="w-full h-48 object-cover"
                  controls
                />
              )}
              <button
                onClick={() => removeMedia(index)}
                className="absolute top-2 right-2 p-1 bg-white rounded-full shadow-sm hover:bg-gray-100"
              >
                <X className="h-4 w-4 text-gray-600" />
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Action Buttons */}
      <div className="flex items-center justify-between pt-4 border-t border-gray-100">
        <div className="flex items-center space-x-4">
          <label className="cursor-pointer">
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleMediaUpload}
              multiple
            />
            <div className="flex items-center space-x-2 text-gray-600 hover:text-[#4F46E5]">
              <ImagePlus className="h-5 w-5" />
              <span className="text-sm">Image</span>
            </div>
          </label>

          <label className="cursor-pointer">
            <input
              type="file"
              accept="video/*"
              className="hidden"
              onChange={handleMediaUpload}
            />
            <div className="flex items-center space-x-2 text-gray-600 hover:text-[#4F46E5]">
              <Video className="h-5 w-5" />
              <span className="text-sm">Video</span>
            </div>
          </label>

          <button className="flex items-center space-x-2 text-gray-600 hover:text-[#4F46E5]">
            <Link className="h-5 w-5" />
            <span className="text-sm">Link</span>
          </button>

          <button 
            onClick={() => setIsScheduleModalOpen(true)}
            className="flex items-center space-x-2 text-gray-600 hover:text-[#4F46E5]"
          >
            <Calendar className="h-5 w-5" />
            <span className="text-sm">Schedule</span>
          </button>
        </div>

        <div className="flex items-center space-x-4">
          <button 
            onClick={handleSaveDraft}
            disabled={isSaving}
            className="px-4 py-2 text-gray-600 border border-gray-100 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSaving ? 'Saving...' : (draftId ? 'Update Draft' : 'Save as Draft')}
          </button>
          <button className="px-6 py-2 bg-[#4F46E5] text-white rounded-lg hover:bg-[#4338CA] transition-colors">
            {scheduledDate ? 'Schedule Post' : 'Post Now'}
          </button>
        </div>
      </div>

      <SchedulePost
        isOpen={isScheduleModalOpen}
        onClose={() => setIsScheduleModalOpen(false)}
        onSchedule={handleSchedule}
      />
    </div>
  )
} 