'use client'

import { Plus } from 'lucide-react'
import { useState } from 'react'
import PublishPostModal from './PublishPostModal'

interface Post {
  id: string
  content: string
  postUrl: string
  platform: string
  createdAt: string
}

interface PostsTableProps {
  posts: Post[]
  onPublish?: (data: { content: string; platform: string }) => void
}

export default function PostsTable({ posts, onPublish }: PostsTableProps) {
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handlePublish = (data: { content: string; platform: string }) => {
    onPublish?.(data)
  }

  return (
    <div className="space-y-4">
      {/* Header with Publish Post button */}
      <div className="flex justify-end">
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2"
        >
          <Plus className="h-4 w-4" />
          Publish Post
        </button>
      </div>

      {/* Table */}
      <div className="bg-white rounded-lg overflow-hidden border border-gray-200">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200 bg-gray-50">
              <th className="text-left py-4 px-6 text-sm font-medium text-gray-600">Content</th>
              <th className="text-left py-4 px-6 text-sm font-medium text-gray-600">Post URL</th>
              <th className="text-left py-4 px-6 text-sm font-medium text-gray-600">Platform</th>
              <th className="text-left py-4 px-6 text-sm font-medium text-gray-600">Created At</th>
            </tr>
          </thead>
          <tbody>
            {posts.length === 0 ? (
              <tr>
                <td className="py-8 px-6 text-center text-gray-500" colSpan={4}>
                  Nothing found
                </td>
              </tr>
            ) : (
              posts.map((post) => (
                <tr key={post.id} className="border-b border-gray-200 last:border-b-0 hover:bg-gray-50">
                  <td className="py-4 px-6 text-sm text-gray-900">{post.content}</td>
                  <td className="py-4 px-6 text-sm">
                    <a href={post.postUrl} className="text-purple-600 hover:text-purple-700 transition-colors" target="_blank" rel="noopener noreferrer">
                      {post.postUrl}
                    </a>
                  </td>
                  <td className="py-4 px-6 text-sm text-gray-900">{post.platform}</td>
                  <td className="py-4 px-6 text-sm text-gray-900">{post.createdAt}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Publish Post Modal */}
      <PublishPostModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onPublish={handlePublish}
      />
    </div>
  )
} 