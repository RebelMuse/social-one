'use client';
'use client'

import { useState, useRef, useEffect } from 'react'
import { Calendar as CalendarIcon, Clock, X } from 'lucide-react'
import { format } from 'date-fns'
import { DayPicker } from 'react-day-picker'
import 'react-day-picker/dist/style.css'

interface SchedulePostProps {
  isOpen: boolean
  onClose: () => void
  onSchedule: (date: Date) => void
}

export default function SchedulePost({ isOpen, onClose, onSchedule }: SchedulePostProps) {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date())
  const [selectedTime, setSelectedTime] = useState<string>(
    format(new Date(), 'HH:mm')
  )
  const [showCalendar, setShowCalendar] = useState(false)
  const calendarRef = useRef<HTMLDivElement>(null)
  const triggerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        calendarRef.current &&
        !calendarRef.current.contains(event.target as Node) &&
        triggerRef.current &&
        !triggerRef.current.contains(event.target as Node)
      ) {
        setShowCalendar(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleSchedule = () => {
    const [hours, minutes] = selectedTime.split(':').map(Number)
    const scheduleDate = new Date(selectedDate)
    scheduleDate.setHours(hours, minutes)
    onSchedule(scheduleDate)
    onClose()
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-gray-900">Schedule Post</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="space-y-6">
          {/* Date Picker */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Date
            </label>
            <div className="relative" ref={triggerRef}>
              <div 
                className="relative cursor-pointer"
                onClick={() => setShowCalendar(!showCalendar)}
              >
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <CalendarIcon className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  readOnly
                  value={format(selectedDate, 'PPP')}
                  className="block w-full pl-10 pr-3 py-2 border border-gray-100 rounded-lg focus:outline-none focus:border-[#4F46E5] text-gray-900 cursor-pointer"
                />
              </div>
              
              {showCalendar && (
                <div 
                  ref={calendarRef}
                  className="absolute z-10 mt-2 bg-white rounded-lg shadow-lg border border-gray-100 p-4"
                >
                  <DayPicker
                    mode="single"
                    selected={selectedDate}
                    onSelect={(date) => {
                      if (date) {
                        setSelectedDate(date)
                        setShowCalendar(false)
                      }
                    }}
                    modifiers={{
                      today: new Date(),
                    }}
                    modifiersStyles={{
                      today: {
                        fontWeight: 'bold',
                        color: '#4F46E5'
                      }
                    }}
                    styles={{
                      caption: { color: '#4F46E5' },
                      button: { borderRadius: '0.5rem' },
                      button_selected: { 
                        backgroundColor: '#4F46E5',
                        color: 'white'
                      }
                    }}
                  />
                </div>
              )}
            </div>
          </div>

          {/* Time Picker */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Time
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Clock className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="time"
                value={selectedTime}
                onChange={(e) => setSelectedTime(e.target.value)}
                className="block w-full pl-10 pr-3 py-2 border border-gray-100 rounded-lg focus:outline-none focus:border-[#4F46E5] text-gray-900"
              />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center space-x-4">
            <button
              onClick={handleSchedule}
              className="flex-1 bg-[#4F46E5] text-white px-4 py-2 rounded-lg hover:bg-[#4338CA] transition-colors"
            >
              Schedule
            </button>
            <button
              onClick={onClose}
              className="flex-1 border border-gray-100 text-gray-600 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  )
} 