'use client'

import { useState } from 'react'
import { Plus } from 'lucide-react'
import Sidebar from '@/components/layout/Sidebar'
import ContentArea from '@/components/layout/ContentArea'
import SearchBar from '@/components/features/SearchBar'
import PromptTable from '@/components/features/PromptTable'

const samplePrompts = [
  {
    id: 1,
    title: 'Social Media Post Template',
    description: 'A versatile template for creating engaging social media posts',
    content: 'Hey [audience]! 🌟 Want to learn about [topic]? Here are [number] key tips that will help you [benefit]: 1. [tip1] 2. [tip2] 3. [tip3] Let me know which tip you found most helpful! #[industry] #[topic]',
    type: 'TEXT',
    createdAt: '2024-03-11T10:00:00Z'
  },
  {
    id: 2,
    title: 'Blog Introduction Generator',
    description: 'Creates compelling blog post introductions',
    content: 'Are you struggling with [problem]? You\'re not alone. In this post, we\'ll explore [solution] and show you how to [benefit]. By the end, you\'ll have a clear understanding of [outcome].',
    type: 'TEXT',
    createdAt: '2024-03-10T15:30:00Z'
  },
  {
    id: 3,
    title: 'Product Launch Announcement',
    description: 'Template for announcing new product launches',
    content: '🎉 Exciting news! We\'re thrilled to introduce [product_name] - the revolutionary [product_type] that helps you [main_benefit]. Learn more at [link] #ProductLaunch #[industry]',
    type: 'TEXT',
    createdAt: '2024-03-09T09:15:00Z'
  },
  {
    id: 4,
    title: 'Customer Success Story',
    description: 'Template for sharing customer testimonials',
    content: 'See how [customer_name] achieved [specific_result] using our [product/service]. "Quote from the customer about their experience." Read the full case study: [link]',
    type: 'TEXT',
    createdAt: '2024-03-08T14:20:00Z'
  },
  {
    id: 5,
    title: 'Weekly Newsletter Template',
    description: 'Structure for consistent newsletter content',
    content: '📫 This Week\'s Highlights:\n\n1. [Main Story]\n2. [Industry Updates]\n3. [Tips & Tricks]\n4. [Featured Content]\n\nDon\'t miss out on [upcoming_event]! [call_to_action]',
    type: 'TEXT',
    createdAt: '2024-03-07T11:45:00Z'
  }
]

export default function PromptsPage() {
  const [searchQuery, setSearchQuery] = useState('')

  const filteredPrompts = samplePrompts.filter(prompt =>
    prompt.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    prompt.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    prompt.content.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <>
      <Sidebar />
      <ContentArea showRightPanel={false}>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <h1 className="text-2xl font-semibold text-[#2D3436]">Prompts</h1>
              <p className="text-sm text-gray-500">
                Manage and organize your content generation prompts
              </p>
            </div>
            <button className="flex items-center space-x-2 rounded-lg bg-[#6C5CE7] px-4 py-2 text-sm font-medium text-white hover:bg-[#5B4ED1]">
              <Plus className="h-4 w-4" />
              <span>New Prompt</span>
            </button>
          </div>

          <div className="w-full">
            <SearchBar
              value={searchQuery}
              onChange={setSearchQuery}
              placeholder="Search prompts..."
            />
          </div>

          <PromptTable prompts={filteredPrompts} />
        </div>
      </ContentArea>
    </>
  )
} 