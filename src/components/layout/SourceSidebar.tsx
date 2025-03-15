'use client'

import { Plus } from 'lucide-react'
import { useState } from 'react'

interface SourceSidebarProps {
  isOpen: boolean
  setIsOpen: (isOpen: boolean) => void
}

export default function SourceSidebar({ isOpen, setIsOpen }: SourceSidebarProps) {
  const [includeReferences, setIncludeReferences] = useState(false)

  return (
    <div 
      className={`fixed top-0 bg-[#F9FAFB] border-r border-gray-200 transition-all duration-300 h-screen overflow-y-auto flex flex-col ${
        isOpen ? 'w-[300px] left-[60px]' : 'w-[24px] left-[60px]'
      }`}
    >
      <div className="flex-1">
        {isOpen && (
          <div className="p-6 space-y-4">
            <button className="w-full flex items-center justify-center space-x-2 py-3 px-4 bg-[#10B981] rounded-lg text-white hover:bg-[#059669] transition-colors">
              <Plus className="h-5 w-5" />
              <span className="text-base">Add Source</span>
            </button>

            <div className="flex items-center space-x-2">
              <div className="relative flex items-center">
                <input
                  type="checkbox"
                  id="references"
                  checked={includeReferences}
                  onChange={(e) => setIncludeReferences(e.target.checked)}
                  className="w-5 h-5 border-2 border-gray-200 rounded appearance-none cursor-pointer checked:bg-[#4F46E5] checked:border-[#4F46E5] focus:outline-none focus:ring-2 focus:ring-[#4F46E5] focus:ring-offset-2"
                />
                <svg
                  className={`absolute w-4 h-4 pointer-events-none ${
                    includeReferences ? 'opacity-100' : 'opacity-0'
                  } transition-opacity left-0.5 top-0.5`}
                  viewBox="0 0 17 12"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M1 4.5L6 9.5L15.5 1"
                    stroke="white"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <label htmlFor="references" className="text-gray-600 text-base cursor-pointer">
                Include References?
              </label>
            </div>
          </div>
        )}
      </div>
      <div className="flex justify-center pb-4">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-6 h-6 bg-white border border-gray-200 rounded-full flex items-center justify-center cursor-pointer shadow-sm hover:bg-gray-50"
        >
          <div className={`transform transition-transform duration-300 text-gray-600 ${isOpen ? 'rotate-0' : 'rotate-180'}`}>
            ❯
          </div>
        </button>
      </div>
    </div>
  )
} 