'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Search, Trash2, Edit2 } from 'lucide-react'
import ContentArea from '@/components/layout/ContentArea'
import { getDrafts, deleteDraft, Post } from '@/lib/supabase'

export default function DraftsPage() {
  const router = useRouter()
  const [drafts, setDrafts] = useState<Post[]>([])
  const [searchQuery, setSearchQuery] = useState('')
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    loadDrafts()
  }, [])

  async function loadDrafts() {
    try {
      const data = await getDrafts()
      setDrafts(data)
    } catch (error) {
      console.error('Error loading drafts:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleDeleteDraft = async (id: string) => {
    try {
      await deleteDraft(id)
      setDrafts(drafts.filter(draft => draft.id !== id))
    } catch (error) {
      console.error('Error deleting draft:', error)
    }
  }

  const editDraft = (draft: Post) => {
    router.push(`/create?draft=${draft.id}`)
  }

  const filteredDrafts = drafts.filter(draft =>
    draft.content.toLowerCase().includes(searchQuery.toLowerCase())
  )

  if (isLoading) {
    return (
      <ContentArea showRightPanel={false}>
        <div className="flex items-center justify-center h-64">
          <div className="text-gray-500">Loading drafts...</div>
        </div>
      </ContentArea>
    )
  }

  return (
    <ContentArea showRightPanel={false}>
      <div className="space-y-6 p-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-semibold text-gray-900">Drafts</h1>
          <div className="relative w-64">
            <input
              type="text"
              placeholder="Search drafts..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-100 rounded-lg text-sm focus:outline-none focus:border-[#4F46E5]"
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          </div>
        </div>

        <div className="bg-white rounded-lg border border-gray-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-100">
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600">CONTENT</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600">PLATFORMS</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600">LAST MODIFIED</th>
                  <th className="px-6 py-4 text-right text-xs font-semibold text-gray-600">ACTIONS</th>
                </tr>
              </thead>
              <tbody>
                {filteredDrafts.map((draft) => (
                  <tr key={draft.id} className="border-b border-gray-100 last:border-0">
                    <td className="px-6 py-4">
                      <div className="max-w-md truncate text-gray-900">
                        {draft.content}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-wrap gap-2">
                        {draft.metadata.selectedPlatforms?.map((platform) => (
                          <span
                            key={platform}
                            className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800"
                          >
                            {platform}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      {new Date(draft.updated_at).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric',
                        hour: 'numeric',
                        minute: 'numeric'
                      })}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-end space-x-3">
                        <button
                          onClick={() => editDraft(draft)}
                          className="p-1 text-gray-400 hover:text-[#4F46E5] transition-colors"
                          title="Edit draft"
                        >
                          <Edit2 className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => handleDeleteDraft(draft.id)}
                          className="p-1 text-gray-400 hover:text-red-500 transition-colors"
                          title="Delete draft"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
                {filteredDrafts.length === 0 && (
                  <tr>
                    <td colSpan={4} className="px-6 py-8 text-center text-gray-500">
                      No drafts found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </ContentArea>
  )
} 