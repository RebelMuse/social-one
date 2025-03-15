'use client'

import { Search } from 'lucide-react'
import { useState } from 'react'
import PostsTable from '@/components/features/PostsTable'
import ContentArea from '@/components/layout/ContentArea'

type SearchMode = 'text' | 'rag'

interface Post {
  id: string
  content: string
  postUrl: string
  platform: string
  createdAt: string
}

export default function PublishedPostsPage() {
  const [searchMode, setSearchMode] = useState<SearchMode>('text')
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedPlatform, setSelectedPlatform] = useState('')
  const [posts, setPosts] = useState<Post[]>([])

  const handlePublish = (data: { content: string; platform: string }) => {
    const newPost: Post = {
      id: Math.random().toString(36).substr(2, 9),
      content: data.content,
      postUrl: '#',
      platform: data.platform,
      createdAt: new Date().toISOString(),
    }
    setPosts((prevPosts) => [newPost, ...prevPosts])
  }

  return (
    <ContentArea showRightPanel={false}>
      <div className="flex flex-col h-full">
        <div className="flex-none p-8 pb-6">
          <h1 className="text-2xl font-semibold text-gray-900">Published Posts</h1>
        </div>
        
        <div className="flex-none px-8 pb-6">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1 bg-gray-100 rounded-lg p-1">
              <button 
                onClick={() => setSearchMode('text')}
                className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
                  searchMode === 'text' ? 'bg-purple-600 text-white' : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Text
              </button>
              <button 
                onClick={() => setSearchMode('rag')}
                className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
                  searchMode === 'rag' ? 'bg-purple-600 text-white' : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                RAG
              </button>
            </div>

            <div className="relative">
              <select 
                value={selectedPlatform}
                onChange={(e) => setSelectedPlatform(e.target.value)}
                className="appearance-none bg-gray-100 text-gray-600 px-4 py-2 pr-8 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
              >
                <option value="">Filter by Platform</option>
                <option value="twitter">Twitter</option>
                <option value="instagram">Instagram</option>
                <option value="linkedin">LinkedIn</option>
                <option value="facebook">Facebook</option>
                <option value="tiktok">TikTok</option>
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                <svg className="h-4 w-4 text-gray-600" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </div>
            </div>

            <div className="flex-1 relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search posts"
                className="w-full bg-gray-100 text-gray-900 placeholder-gray-500 px-4 py-2 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>

            <button 
              onClick={() => {
                console.log('Search:', { searchMode, searchQuery, selectedPlatform })
              }}
              className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2"
            >
              <Search className="h-4 w-4" />
              Search
            </button>
          </div>
        </div>

        <div className="flex-1 px-8 pb-8 overflow-y-auto">
          <PostsTable posts={posts} onPublish={handlePublish} />
        </div>
      </div>
    </ContentArea>
  )
} 