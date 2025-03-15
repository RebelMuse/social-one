'use client';
'use client'

import { X } from 'lucide-react'
import { useState } from 'react'

interface PublishPostModalProps {
  isOpen: boolean
  onClose: () => void
  onPublish: (data: { content: string; platform: string }) => void
}

export default function PublishPostModal({ isOpen, onClose, onPublish }: PublishPostModalProps) {
  const [content, setContent] = useState('')
  const [platform, setPlatform] = useState('')

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-[#1C1C1E] rounded-lg w-full max-w-lg p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-white">Publish Post</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="space-y-4">
          {/* Platform Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-1">
              Platform
            </label>
            <select
              value={platform}
              onChange={(e) => setPlatform(e.target.value)}
              className="w-full bg-[#2C2C2E] text-white px-4 py-2 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              <option value="">Select Platform</option>
              <option value="twitter">Twitter</option>
              <option value="instagram">Instagram</option>
              <option value="linkedin">LinkedIn</option>
              <option value="facebook">Facebook</option>
              <option value="tiktok">TikTok</option>
            </select>
          </div>

          {/* Content Input */}
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-1">
              Content
            </label>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Write your post content..."
              rows={5}
              className="w-full bg-[#2C2C2E] text-white px-4 py-2 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none"
            />
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end gap-3 pt-4">
            <button
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-gray-400 hover:text-white transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={() => {
                onPublish({ content, platform })
                onClose()
                setContent('')
                setPlatform('')
              }}
              disabled={!content || !platform}
              className="bg-purple-600 hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
            >
              Publish
            </button>
          </div>
        </div>
      </div>
    </div>
  )
} 