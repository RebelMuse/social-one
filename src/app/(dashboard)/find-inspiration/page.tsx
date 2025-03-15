'use client';
'use client'

import { useState } from 'react'
import { Search, ChevronDown, Menu } from 'lucide-react'

interface Post {
  id: number
  author: {
    name: string
    image: string
    handle?: string
  }
  content: string
  engagement: {
    likes: number
    comments: number
    shares: number
  }
  media?: {
    type: 'image' | 'video'
    url: string
  }
}

export default function FindInspirationPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [timeRange, setTimeRange] = useState('All Time')
  const [mediaType, setMediaType] = useState<('Text' | 'Image' | 'Video')[]>([])
  const [sortBy, setSortBy] = useState('Random')
  const [isSortOpen, setIsSortOpen] = useState(false)
  const [excludeKeywords, setExcludeKeywords] = useState('')
  const [creatorSearch, setCreatorSearch] = useState('')
  const [followersMin, setFollowersMin] = useState('')
  const [followersMax, setFollowersMax] = useState('')
  const [isFiltersVisible, setIsFiltersVisible] = useState(true)
  const [likesMin, setLikesMin] = useState('')
  const [likesMax, setLikesMax] = useState('')
  const [commentsMin, setCommentsMin] = useState('')
  const [commentsMax, setCommentsMax] = useState('')
  const [sharesMin, setSharesMin] = useState('')
  const [sharesMax, setSharesMax] = useState('')
  
  const sortOptions = ['Likes', 'Comments', 'Random', 'Newest', 'Oldest']

  const resetFilters = () => {
    setSearchQuery('')
    setTimeRange('All Time')
    setMediaType([])
    setSortBy('Random')
    setExcludeKeywords('')
    setCreatorSearch('')
    setFollowersMin('')
    setFollowersMax('')
    setLikesMin('')
    setLikesMax('')
    setCommentsMin('')
    setCommentsMax('')
    setSharesMin('')
    setSharesMax('')
    setIsSortOpen(false)
  }

  // Helper component for range inputs
  const RangeInput = ({ title, minValue, maxValue, onMinChange, onMaxChange }) => (
    <div className="space-y-2">
      <span className="text-sm font-medium text-gray-900">{title}</span>
      <div className="flex items-center space-x-2">
        <input
          type="number"
          placeholder="Min"
          value={minValue}
          onChange={(e) => onMinChange(e.target.value)}
          className="w-1/2 p-3 rounded-2xl border border-gray-100 text-sm text-gray-500 placeholder-gray-400"
        />
        <input
          type="number"
          placeholder="Max"
          value={maxValue}
          onChange={(e) => onMaxChange(e.target.value)}
          className="w-1/2 p-3 rounded-2xl border border-gray-100 text-sm text-gray-500 placeholder-gray-400"
        />
      </div>
    </div>
  )

  return (
    <div className="flex-1 h-screen bg-white overflow-hidden pl-[60px]">
      {/* Main Content */}
      <div className="h-full flex">
        {/* Filters Toggle Button (visible when filters are hidden) */}
        {!isFiltersVisible && (
          <button
            onClick={() => setIsFiltersVisible(true)}
            className="p-4 hover:bg-gray-50 border-r border-gray-100"
          >
            <Menu className="h-5 w-5 text-gray-600" />
          </button>
        )}

        {/* Filters Sidebar */}
        {isFiltersVisible && (
          <div className="w-[300px] border-r border-gray-100 p-6 overflow-y-auto" style={{ scrollbarWidth: 'thin', scrollbarColor: '#E5E7EB transparent' }}>
            <div className="space-y-6">
              {/* Filters Header */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-bold text-gray-900">Filters</h2>
                  <button
                    onClick={resetFilters}
                    className="text-purple-600 hover:text-purple-700 text-sm font-medium"
                  >
                    Reset
                  </button>
                </div>
                <button
                  onClick={() => setIsFiltersVisible(false)}
                  className="w-full py-2 px-4 bg-white rounded-xl border border-gray-200 text-sm font-medium text-gray-900 text-center hover:bg-gray-50 shadow-sm"
                >
                  Hide Filters
                </button>
              </div>

              {/* Search */}
            <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                  placeholder="Search posts..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-100 text-sm focus:outline-none focus:border-[#4F46E5]"
                />
              </div>

              {/* Creator Search */}
              <div className="space-y-2">
                <span className="text-sm font-medium text-gray-900">Creator Search</span>
                <input
                  type="text"
                  placeholder="Search by creator..."
                  value={creatorSearch}
                  onChange={(e) => setCreatorSearch(e.target.value)}
                  className="w-full p-3 rounded-2xl border border-gray-100 text-sm text-gray-500 placeholder-gray-400"
                />
              </div>

              {/* Followers Range */}
              <RangeInput
                title="Followers Range"
                minValue={followersMin}
                maxValue={followersMax}
                onMinChange={setFollowersMin}
                onMaxChange={setFollowersMax}
              />

              {/* Exclude Keywords */}
              <div className="space-y-2">
                <span className="text-sm font-medium text-gray-900">Exclude Keywords</span>
                <input
                  type="text"
                  placeholder="Enter keywords to exclude..."
                  value={excludeKeywords}
                  onChange={(e) => setExcludeKeywords(e.target.value)}
                  className="w-full p-3 rounded-2xl border border-gray-100 text-sm text-gray-500 placeholder-gray-400"
                />
              </div>

              {/* Engagement Ranges */}
              <RangeInput
                title="Likes Range"
                minValue={likesMin}
                maxValue={likesMax}
                onMinChange={setLikesMin}
                onMaxChange={setLikesMax}
              />

              <RangeInput
                title="Comments Range"
                minValue={commentsMin}
                maxValue={commentsMax}
                onMinChange={setCommentsMin}
                onMaxChange={setCommentsMax}
              />

              <RangeInput
                title="Shares Range"
                minValue={sharesMin}
                maxValue={sharesMax}
                onMinChange={setSharesMin}
                onMaxChange={setSharesMax}
              />

              {/* Sort By */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-900">Sort By</span>
                  <ChevronDown className="h-4 w-4 text-gray-400" />
                </div>
                <div className="relative">
                  <button
                    onClick={() => setIsSortOpen(!isSortOpen)}
                    className="w-full p-3 rounded-2xl border border-gray-200 text-sm text-left bg-white flex items-center justify-between text-gray-500"
                  >
                    <span>{sortBy}</span>
                    <ChevronDown className={`h-4 w-4 text-gray-400 transition-transform ${isSortOpen ? 'rotate-180' : ''}`} />
                  </button>
                  
                  {isSortOpen && (
                    <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
                      <div className="py-1">
                        {sortOptions.map((option) => (
                          <button
                            key={option}
                            onClick={() => {
                              setSortBy(option)
                              setIsSortOpen(false)
                            }}
                            className="w-full px-4 py-2 text-sm text-left hover:bg-gray-50 flex items-center text-gray-500"
                          >
                            <span>{option}</span>
                            {sortBy === option && (
                              <svg className="ml-auto h-4 w-4 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                              </svg>
                            )}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Time Range */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-900">Time Range</span>
                  <ChevronDown className="h-4 w-4 text-gray-400" />
                </div>
                <select 
                  value={timeRange}
                  onChange={(e) => setTimeRange(e.target.value)}
                  className="w-full p-3 rounded-2xl border border-gray-100 text-sm text-gray-500"
                >
                  <option>All Time</option>
                  <option>Last 24 Hours</option>
                  <option>Last 7 Days</option>
                  <option>Last 30 Days</option>
                </select>
            </div>

              {/* Media Type */}
              <div className="space-y-2">
                <span className="text-sm font-medium text-gray-900">Media Type</span>
                <div className="space-y-2">
                  {['Text', 'Image', 'Video'].map((type) => (
                    <label key={type} className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        checked={mediaType.includes(type as any)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setMediaType([...mediaType, type as any])
                          } else {
                            setMediaType(mediaType.filter(t => t !== type))
                          }
                        }}
                        className="rounded border-gray-300 text-purple-600 focus:ring-purple-500"
                      />
                      <span className="text-sm text-gray-500">{type}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Content Area */}
        <div className="flex-1 p-6 overflow-y-auto">
          {/* Content goes here */}
        </div>
      </div>
    </div>
  )
} 