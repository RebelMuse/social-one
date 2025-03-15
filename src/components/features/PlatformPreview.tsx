'use client'

import Image from 'next/image'
import { formatDistanceToNow } from 'date-fns'

interface PlatformPreviewProps {
  platform: string
  content: string
  mediaFiles: Array<{
    preview: string
    type: 'image' | 'video'
  }>
}

export default function PlatformPreview({ platform, content, mediaFiles }: PlatformPreviewProps) {
  const renderTwitterPreview = () => (
    <div className="max-w-[598px] bg-white rounded-xl border border-gray-100 p-4">
      <div className="flex items-start space-x-3">
        <div className="w-12 h-12 rounded-full bg-gray-200" />
        <div className="flex-1">
          <div className="flex items-center space-x-2">
            <span className="font-bold text-gray-900">Display Name</span>
            <span className="text-gray-500">@username</span>
            <span className="text-gray-500">·</span>
            <span className="text-gray-500">Just now</span>
          </div>
          <div className="mt-1 text-gray-900">{content}</div>
          {mediaFiles.length > 0 && (
            <div className={`mt-3 grid gap-2 ${mediaFiles.length > 1 ? 'grid-cols-2' : 'grid-cols-1'}`}>
              {mediaFiles.map((media, index) => (
                <div key={index} className="rounded-xl overflow-hidden">
                  {media.type === 'image' ? (
                    <Image
                      src={media.preview}
                      alt=""
                      width={300}
                      height={300}
                      className="w-full h-48 object-cover"
                    />
                  ) : (
                    <video src={media.preview} className="w-full h-48 object-cover" />
                  )}
                </div>
              ))}
            </div>
          )}
          <div className="mt-3 flex items-center justify-between text-gray-500">
            <button className="hover:text-blue-500">
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
            </button>
            <button className="hover:text-green-500">
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
            </button>
            <button className="hover:text-red-500">
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </button>
            <button className="hover:text-blue-500">
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  )

  const renderLinkedInPreview = () => (
    <div className="max-w-[552px] bg-white rounded-xl border border-gray-100 p-4">
      <div className="flex items-start space-x-3">
        <div className="w-12 h-12 rounded-full bg-gray-200" />
        <div className="flex-1">
          <div className="flex items-center space-x-2">
            <span className="font-semibold text-gray-900">Display Name</span>
            <span className="text-gray-500">· 1st</span>
          </div>
          <div className="text-gray-500 text-sm">Job Title</div>
          <div className="text-gray-500 text-sm">Just now</div>
          <div className="mt-2 text-gray-900">{content}</div>
          {mediaFiles.length > 0 && (
            <div className="mt-3">
              {mediaFiles.map((media, index) => (
                <div key={index} className="rounded-lg overflow-hidden">
                  {media.type === 'image' ? (
                    <Image
                      src={media.preview}
                      alt=""
                      width={500}
                      height={300}
                      className="w-full object-cover"
                    />
                  ) : (
                    <video src={media.preview} className="w-full" controls />
                  )}
                </div>
              ))}
            </div>
          )}
          <div className="mt-3 flex items-center space-x-4 text-gray-500">
            <button className="flex items-center space-x-1 hover:text-blue-600">
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
              </svg>
              <span>Like</span>
            </button>
            <button className="flex items-center space-x-1 hover:text-blue-600">
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
              </svg>
              <span>Comment</span>
            </button>
            <button className="flex items-center space-x-1 hover:text-blue-600">
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
              </svg>
              <span>Share</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  )

  switch (platform) {
    case 'Twitter':
      return renderTwitterPreview()
    case 'LinkedIn':
      return renderLinkedInPreview()
    default:
      return null
  }
} 