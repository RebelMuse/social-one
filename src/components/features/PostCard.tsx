'use client'

import Image from 'next/image'
import { Heart, MessageCircle, Share2, Bookmark } from 'lucide-react'

interface PostCardProps {
  post: {
    id: number
    username: string
    avatar: string
    platform: string
    content: string
    image?: string
    likes: number
    comments: number
    shares: number
    timestamp: string
  }
}

export default function PostCard({ post }: PostCardProps) {
  return (
    <div className="overflow-hidden rounded-lg border bg-white shadow-sm">
      <div className="p-4">
        <div className="flex items-center space-x-3">
          <Image
            src={post.avatar}
            alt={post.username}
            width={40}
            height={40}
            className="rounded-full"
          />
          <div>
            <h3 className="font-medium text-[#2D3436]">{post.username}</h3>
            <p className="text-xs text-gray-500">
              {post.platform} • {post.timestamp}
            </p>
          </div>
        </div>

        <p className="mt-3 text-[#2D3436]">{post.content}</p>

        {post.image && (
          <div className="mt-3">
            <Image
              src={post.image}
              alt="Post content"
              width={600}
              height={400}
              className="rounded-lg object-cover"
            />
          </div>
        )}

        <div className="mt-4 flex items-center justify-between border-t pt-3">
          <div className="flex space-x-6">
            <button className="flex items-center space-x-1 text-gray-500 hover:text-[#6C5CE7]">
              <Heart className="h-5 w-5" />
              <span className="text-sm">{post.likes}</span>
            </button>
            <button className="flex items-center space-x-1 text-gray-500 hover:text-[#6C5CE7]">
              <MessageCircle className="h-5 w-5" />
              <span className="text-sm">{post.comments}</span>
            </button>
            <button className="flex items-center space-x-1 text-gray-500 hover:text-[#6C5CE7]">
              <Share2 className="h-5 w-5" />
              <span className="text-sm">{post.shares}</span>
            </button>
          </div>
          <button className="rounded-full p-2 text-gray-500 hover:bg-gray-100 hover:text-[#6C5CE7]">
            <Bookmark className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  )
} 