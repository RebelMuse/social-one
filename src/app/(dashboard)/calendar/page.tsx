'use client';
'use client'

import { useState, useEffect } from 'react'
import { HelpCircle } from 'lucide-react'
import Sidebar from '@/components/layout/Sidebar'
import ContentArea from '@/components/layout/ContentArea'
import NavigationTabs from '@/components/features/NavigationTabs'
import DaySection from '@/components/features/DaySection'
import CreateSlotModal from '@/components/features/CreateSlotModal'
import { format, parseISO } from 'date-fns'

const DAYS_OF_WEEK = [
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
  'Sunday'
]

// Map short day names to full day names
const DAY_MAP: Record<string, string> = {
  'MON': 'Monday',
  'TUE': 'Tuesday',
  'WED': 'Wednesday',
  'THU': 'Thursday',
  'FRI': 'Friday',
  'SAT': 'Saturday',
  'SUN': 'Sunday'
}

interface ScheduledPost {
  id: string
  title: string
  content: string
  start: string
  end: string
  platforms: string[]
}

interface Slot {
  id: number
  time: string
}

export default function CalendarPage() {
  const [activeTab, setActiveTab] = useState<'upcoming' | 'schedule'>('schedule')
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [scheduledPosts, setScheduledPosts] = useState<ScheduledPost[]>([])
  const [slots, setSlots] = useState<Record<string, Slot[]>>({
    Monday: [],
    Tuesday: [],
    Wednesday: [],
    Thursday: [],
    Friday: [],
    Saturday: [],
    Sunday: []
  })

  // Load scheduled posts from localStorage
  useEffect(() => {
    const storedPosts = localStorage.getItem('calendarEvents')
    if (storedPosts) {
      setScheduledPosts(JSON.parse(storedPosts))
    }
  }, [])

  const handleCreateSlot = (time: string, selectedDays: string[]) => {
    const newSlotId = Math.floor(Math.random() * 1000000) // Generate a random ID
    
    setSlots(prevSlots => {
      const newSlots = { ...prevSlots }
      
      // Add the slot to each selected day
      selectedDays.forEach(shortDay => {
        const fullDay = DAY_MAP[shortDay]
        if (fullDay) {
          // Sort slots by time
          const updatedDaySlots = [
            ...newSlots[fullDay],
            { id: newSlotId, time }
          ].sort((a, b) => {
            // Convert times to comparable format (24 hour)
            const timeA = convertTo24Hour(a.time)
            const timeB = convertTo24Hour(b.time)
            return timeA.localeCompare(timeB)
          })
          
          newSlots[fullDay] = updatedDaySlots
        }
      })
      
      return newSlots
    })
    
    setIsModalOpen(false)
  }

  // Helper function to convert 12-hour time to 24-hour time for sorting
  const convertTo24Hour = (time12h: string) => {
    const [time, period] = time12h.split(' ')
    let [hours, minutes] = time.split(':')
    
    if (period === 'PM' && hours !== '12') {
      hours = String(Number(hours) + 12)
    } else if (period === 'AM' && hours === '12') {
      hours = '00'
    }
    
    return `${hours.padStart(2, '0')}:${minutes}`
  }

  const handleDeleteSlot = (slotId: number) => {
    setSlots(prevSlots => {
      const newSlots = { ...prevSlots }
      
      // Remove the slot from all days
      Object.keys(newSlots).forEach(day => {
        newSlots[day] = newSlots[day].filter(slot => slot.id !== slotId)
      })
      
      return newSlots
    })
  }

  return (
    <>
      <Sidebar />
      <ContentArea showRightPanel={false}>
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <h1 className="text-2xl font-semibold text-[#2D3436]">Calendar</h1>
              <a href="#" className="text-sm text-[#6C5CE7] hover:underline flex items-center space-x-1">
                <HelpCircle className="h-4 w-4" />
                <span>How do I setup my schedule?</span>
              </a>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <NavigationTabs activeTab={activeTab} onTabChange={setActiveTab} />
            {activeTab === 'schedule' && (
              <button
                onClick={() => setIsModalOpen(true)}
                className="flex items-center space-x-2 rounded-lg bg-[#6C5CE7] px-4 py-2 text-sm font-medium text-white hover:bg-[#5B4ED1]"
              >
                Add Slot
              </button>
            )}
          </div>

          {activeTab === 'schedule' && (
            <div className="mt-6">
              {DAYS_OF_WEEK.map((day) => (
                <DaySection
                  key={day}
                  day={day}
                  slots={slots[day]}
                  onDeleteSlot={handleDeleteSlot}
                />
              ))}
            </div>
          )}

          {activeTab === 'upcoming' && (
            <div className="mt-6 space-y-4">
              {scheduledPosts.length > 0 ? (
                scheduledPosts.map((post) => (
                  <div
                    key={post.id}
                    className="bg-white rounded-lg border border-gray-100 p-4 space-y-2"
                  >
                    <div className="flex items-center justify-between">
                      <h3 className="font-medium text-gray-900">{post.title}</h3>
                      <div className="flex items-center space-x-2">
                        {post.platforms.map((platform) => (
                          <span
                            key={platform}
                            className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800"
                          >
                            {platform}
                          </span>
                        ))}
                      </div>
                    </div>
                    <p className="text-sm text-gray-500">
                      {format(parseISO(post.start), 'PPP p')}
                    </p>
                    <p className="text-sm text-gray-600 line-clamp-2">{post.content}</p>
                  </div>
                ))
              ) : (
                <p className="text-gray-500 text-center py-8">No scheduled posts yet</p>
              )}
            </div>
          )}
        </div>
      </ContentArea>

      <CreateSlotModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleCreateSlot}
      />
    </>
  )
} 