'use client'

import { useState } from 'react'
import { Copy, Trash2, ChevronUp, ChevronDown } from 'lucide-react'

interface Prompt {
  id: number
  title: string
  description: string
  content: string
  type: string
  createdAt: string
}

interface PromptTableProps {
  prompts: Prompt[]
}

type SortField = 'title' | 'type' | 'createdAt'
type SortDirection = 'asc' | 'desc'

export default function PromptTable({ prompts }: PromptTableProps) {
  const [sortField, setSortField] = useState<SortField>('createdAt')
  const [sortDirection, setSortDirection] = useState<SortDirection>('desc')

  const handleSort = (field: SortField) => {
    if (field === sortField) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc')
    } else {
      setSortField(field)
      setSortDirection('asc')
    }
  }

  const sortedPrompts = [...prompts].sort((a, b) => {
    const direction = sortDirection === 'asc' ? 1 : -1
    if (sortField === 'createdAt') {
      return (new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()) * direction
    }
    return (a[sortField] > b[sortField] ? 1 : -1) * direction
  })

  const SortIcon = ({ field }: { field: SortField }) => {
    if (field !== sortField) return null
    return sortDirection === 'asc' ? (
      <ChevronUp className="h-4 w-4" />
    ) : (
      <ChevronDown className="h-4 w-4" />
    )
  }

  return (
    <div className="overflow-x-auto rounded-lg border border-gray-100 bg-white">
      <table className="w-full border-collapse">
        <thead>
          <tr className="border-b border-gray-100 bg-gray-50">
            <th
              className="w-[20%] cursor-pointer px-6 py-4 text-left text-xs font-semibold text-gray-600"
              onClick={() => handleSort('title')}
            >
              <div className="flex items-center space-x-1">
                <span>TITLE</span>
                <SortIcon field="title" />
              </div>
            </th>
            <th className="w-[20%] px-6 py-4 text-left text-xs font-semibold text-gray-600">
              DESCRIPTION
            </th>
            <th className="w-[35%] px-6 py-4 text-left text-xs font-semibold text-gray-600">
              CONTENT
            </th>
            <th
              className="w-[10%] cursor-pointer px-6 py-4 text-left text-xs font-semibold text-gray-600"
              onClick={() => handleSort('type')}
            >
              <div className="flex items-center space-x-1">
                <span>TYPE</span>
                <SortIcon field="type" />
              </div>
            </th>
            <th
              className="w-[10%] cursor-pointer px-6 py-4 text-left text-xs font-semibold text-gray-600"
              onClick={() => handleSort('createdAt')}
            >
              <div className="flex items-center space-x-1">
                <span>CREATED AT</span>
                <SortIcon field="createdAt" />
              </div>
            </th>
            <th className="w-[5%] px-6 py-4 text-right text-xs font-semibold text-gray-600">
              ACTIONS
            </th>
          </tr>
        </thead>
        <tbody>
          {sortedPrompts.map((prompt, index) => (
            <tr
              key={prompt.id}
              className={`border-b border-gray-100 transition-colors hover:bg-gray-50 ${
                index % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'
              }`}
            >
              <td className="px-6 py-4">
                <div className="font-medium text-[#2D3436]">{prompt.title}</div>
              </td>
              <td className="px-6 py-4">
                <div className="text-sm text-gray-600">{prompt.description}</div>
              </td>
              <td className="px-6 py-4">
                <div className="max-w-md truncate text-sm text-gray-600">
                  {prompt.content}
                </div>
              </td>
              <td className="px-6 py-4">
                <span className="inline-flex rounded-full bg-gray-100 px-2.5 py-1 text-xs font-medium text-gray-800">
                  {prompt.type}
                </span>
              </td>
              <td className="whitespace-nowrap px-6 py-4">
                <div className="text-sm text-gray-600">
                  {new Date(prompt.createdAt).toLocaleDateString('en-US', {
                    month: 'short',
                    day: 'numeric',
                    year: 'numeric'
                  })}
                </div>
              </td>
              <td className="px-6 py-4">
                <div className="flex justify-end space-x-2">
                  <button
                    className="rounded p-1 text-gray-400 hover:bg-gray-100 hover:text-[#6C5CE7]"
                    title="Copy prompt"
                  >
                    <Copy className="h-4 w-4" />
                  </button>
                  <button
                    className="rounded p-1 text-gray-400 hover:bg-red-50 hover:text-red-500"
                    title="Delete prompt"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
} 