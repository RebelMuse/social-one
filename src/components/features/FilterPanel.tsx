'use client';
'use client'

import { useState } from 'react'
import { ChevronDown, ChevronUp } from 'lucide-react'

type FilterSection = {
  title: string
  options: { id: string; label: string }[]
}

const filterSections: FilterSection[] = [
  {
    title: 'Content Type',
    options: [
      { id: 'text', label: 'Text Posts' },
      { id: 'image', label: 'Images' },
      { id: 'video', label: 'Videos' },
      { id: 'link', label: 'Links' }
    ]
  },
  {
    title: 'Platform',
    options: [
      { id: 'twitter', label: 'Twitter' },
      { id: 'facebook', label: 'Facebook' },
      { id: 'instagram', label: 'Instagram' },
      { id: 'linkedin', label: 'LinkedIn' }
    ]
  },
  {
    title: 'Engagement',
    options: [
      { id: 'high-engagement', label: 'High Engagement' },
      { id: 'trending', label: 'Trending' },
      { id: 'recent', label: 'Most Recent' }
    ]
  }
]

export default function FilterPanel() {
  const [expandedSections, setExpandedSections] = useState<string[]>(
    filterSections.map(section => section.title)
  )
  const [selectedFilters, setSelectedFilters] = useState<string[]>([])

  const toggleSection = (title: string) => {
    setExpandedSections(prev =>
      prev.includes(title)
        ? prev.filter(t => t !== title)
        : [...prev, title]
    )
  }

  const toggleFilter = (id: string) => {
    setSelectedFilters(prev =>
      prev.includes(id)
        ? prev.filter(f => f !== id)
        : [...prev, id]
    )
  }

  return (
    <div className="w-64 space-y-4 rounded-lg border bg-white p-4">
      <div className="flex items-center justify-between border-b pb-2">
        <h2 className="font-semibold text-[#2D3436]">Filters</h2>
        <button
          className="text-sm text-[#6C5CE7] hover:underline"
          onClick={() => setSelectedFilters([])}
        >
          Clear All
        </button>
      </div>

      {filterSections.map((section) => (
        <div key={section.title} className="border-b pb-2 last:border-0">
          <button
            className="flex w-full items-center justify-between py-2 text-sm font-medium text-[#2D3436]"
            onClick={() => toggleSection(section.title)}
          >
            {section.title}
            {expandedSections.includes(section.title) ? (
              <ChevronUp className="h-4 w-4" />
            ) : (
              <ChevronDown className="h-4 w-4" />
            )}
          </button>

          {expandedSections.includes(section.title) && (
            <div className="space-y-2 pt-1">
              {section.options.map((option) => (
                <label
                  key={option.id}
                  className="flex items-center space-x-2 text-sm text-gray-600"
                >
                  <input
                    type="checkbox"
                    checked={selectedFilters.includes(option.id)}
                    onChange={() => toggleFilter(option.id)}
                    className="rounded border-gray-300 text-[#6C5CE7] focus:ring-[#6C5CE7]"
                  />
                  <span>{option.label}</span>
                </label>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  )
} 