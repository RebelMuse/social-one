'use client'

import { useState } from 'react'
import { Plus, HelpCircle } from 'lucide-react'
import Sidebar from '@/components/layout/Sidebar'
import ContentArea from '@/components/layout/ContentArea'
import SearchBar from '@/components/features/SearchBar'
import SourcesTable from '@/components/features/SourcesTable'

const sampleSources: Array<{
  id: number
  title: string
  description: string
  content: string
  type: string
  createdAt: string
}> = []

export default function SourcesPage() {
  const [searchQuery, setSearchQuery] = useState('')

  const filteredSources = sampleSources.filter(source =>
    source.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    source.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    source.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
    source.type.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <>
      <Sidebar />
      <ContentArea showRightPanel={false}>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <h1 className="text-2xl font-semibold text-[#2D3436]">Saved Sources</h1>
              <a href="#" className="text-sm text-[#6C5CE7] hover:underline flex items-center space-x-1">
                <HelpCircle className="h-4 w-4" />
                <span>How do sources work?</span>
              </a>
            </div>
            <button className="flex items-center space-x-2 rounded-lg bg-[#6C5CE7] px-4 py-2 text-sm font-medium text-white hover:bg-[#5B4ED1]">
              <Plus className="h-4 w-4" />
              <span>Add Source</span>
            </button>
          </div>

          <div className="flex gap-4">
            <div className="w-[240px]">
              <input
                type="text"
                placeholder="Filter by tags"
                className="w-full rounded-lg border border-gray-100 px-4 py-2 text-sm focus:border-[#4F46E5] focus:outline-none"
              />
            </div>
            <div className="flex-1">
              <SearchBar
                value={searchQuery}
                onChange={setSearchQuery}
                placeholder="Search sources"
              />
            </div>
            <button className="rounded-lg bg-[#6C5CE7] px-6 py-2 text-sm font-medium text-white hover:bg-[#5B4ED1]">
              Search
            </button>
          </div>

          <SourcesTable sources={filteredSources} />
        </div>
      </ContentArea>
    </>
  )
} 