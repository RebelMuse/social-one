'use client';
'use client'

import { Plus, X, ChevronDown } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

const postTypes = [
  { 
    name: 'Twitter', 
    icon: <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>,
    color: 'bg-black'
  },
  { 
    name: 'LinkedIn', 
    icon: <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>,
    color: 'bg-[#0A66C2]'
  },
  { 
    name: 'Facebook', 
    icon: <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>,
    color: 'bg-[#1877F2]'
  },
  { 
    name: 'TikTok', 
    icon: <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor"><path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/></svg>,
    color: 'bg-black'
  },
  { 
    name: 'Instagram', 
    icon: <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>,
    color: 'bg-gradient-to-r from-[#833AB4] via-[#FD1D1D] to-[#F77737]'
  },
  { 
    name: 'Threads', 
    icon: <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor"><path d="M12.186 24h-.007c-3.581-.024-6.334-1.205-8.184-3.509C2.35 18.44 1.5 15.586 1.5 12.068V12c.013-5.392 2.866-8.863 7.828-9.497C10.029 2.379 10.693 2.3 11.364 2.3c2.498-.038 4.39.926 5.628 2.87.5.784.876 1.677 1.172 2.516a.598.598 0 0 1-.755.817c-.213-.055-.415-.124-.602-.208-1.482-.666-3.07-.398-4.31.725-1.08.976-1.675 2.29-1.82 4.033-.108 1.292.096 2.551.617 3.777.925 2.167 2.268 3.412 4.288 3.965 1.62.44 3.127.196 4.444-.725a5.674 5.674 0 0 0 2.337-3.997c.088-.873.095-1.762.096-2.647V2.3h4.05v11.206c-.001.917-.026 1.841-.118 2.751-.293 2.896-1.512 5.294-3.617 7.165-1.648 1.466-3.63 2.286-5.85 2.51-.57.058-1.145.076-1.718.068z"/></svg>,
    color: 'bg-black'
  },
  { 
    name: 'Pinterest', 
    icon: <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor"><path d="M12 0c-6.627 0-12 5.372-12 12 0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738.098.119.112.224.083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.631-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146 1.124.347 2.317.535 3.554.535 6.627 0 12-5.373 12-12 0-6.628-5.373-12-12-12z"/></svg>,
    color: 'bg-[#E60023]'
  },
  { 
    name: 'YouTube', 
    icon: <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>,
    color: 'bg-[#FF0000]'
  },
  { 
    name: 'Blog', 
    icon: <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor"><path d="M14.722 14.677c-.4.554-.592 1.151-.592 1.82 0 1.243.452 2.309 1.355 3.196.903.887 1.993 1.33 3.27 1.33 1.279 0 2.369-.443 3.272-1.33.903-.887 1.354-1.953 1.354-3.196 0-1.242-.451-2.308-1.354-3.195-.903-.887-1.993-1.33-3.272-1.33-1.277 0-2.367.443-3.27 1.33z"/></svg>,
    color: 'bg-gray-800'
  }
]

export default function Header() {
  const router = useRouter()
  const [isPostMenuOpen, setIsPostMenuOpen] = useState(false)
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>([])

  const handlePlatformSelect = (platform: string) => {
    if (!selectedPlatforms.includes(platform)) {
      setSelectedPlatforms([...selectedPlatforms, platform])
    }
    setIsPostMenuOpen(false)
  }

  const handleRemovePlatform = (platform: string) => {
    setSelectedPlatforms(selectedPlatforms.filter(p => p !== platform))
  }

  const handleCloseAll = () => {
    setSelectedPlatforms([])
  }

  return (
    <header className="fixed left-[360px] right-0 top-0 z-10 flex h-16 items-center justify-between border-b border-gray-200 bg-white px-6">
      <div className="flex items-center space-x-2 overflow-x-auto">
        {selectedPlatforms.map((platform) => (
          <div
            key={platform}
            className="flex items-center space-x-2 px-3 py-1.5 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-700"
          >
            <span>{platform}</span>
            <button
              onClick={() => handleRemovePlatform(platform)}
              className="text-gray-400 hover:text-gray-600"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          </div>
        ))}
      </div>

      <div className="flex items-center space-x-4">
        <div className="relative">
          <button
            onClick={() => setIsPostMenuOpen(!isPostMenuOpen)}
            className="flex items-center space-x-1 rounded-lg bg-[#4F46E5] px-4 py-2 text-sm text-white hover:bg-[#4338CA] transition-colors"
          >
            <Plus className="h-4 w-4" />
            <span>Add Post</span>
          </button>

          {isPostMenuOpen && (
            <div className="absolute right-0 mt-2 w-64 rounded-lg bg-white shadow-sm border border-gray-200">
              <div className="py-2">
                <div className="px-4 py-2 text-sm font-medium text-gray-900 border-b border-gray-100">
                  Post Types
                </div>
                {postTypes.map((type) => (
                  <button
                    key={type.name}
                    onClick={() => handlePlatformSelect(type.name)}
                    className="w-full flex items-center px-4 py-3 text-sm text-gray-700 hover:bg-gray-50"
                  >
                    <span className={`mr-3 flex h-8 w-8 items-center justify-center rounded-full ${type.color} text-white`}>
                      {type.icon}
                    </span>
                    <span>{type.name}</span>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
        <button 
          onClick={handleCloseAll}
          className="flex items-center space-x-1 text-sm border border-gray-200 rounded-lg px-3 py-2 text-gray-600 hover:bg-gray-50 transition-colors"
        >
          <X className="h-4 w-4" />
          <span>Close All</span>
        </button>
      </div>
    </header>
  )
} 