'use client';
import { useState } from 'react'
import { X, ChevronUp, ChevronDown } from 'lucide-react'

interface CreateSlotModalProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (time: string, days: string[]) => void
}

export default function CreateSlotModal({ isOpen, onClose, onSubmit }: CreateSlotModalProps) {
  if (!isOpen) return null

  const [hours, setHours] = useState(10)
  const [minutes, setMinutes] = useState(0)
  const [period, setPeriod] = useState<'AM' | 'PM'>('AM')
  const [selectedDays, setSelectedDays] = useState<string[]>([])
  const days = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT']

  const incrementHours = () => {
    setHours((prev) => (prev === 12 ? 1 : prev + 1))
  }

  const decrementHours = () => {
    setHours((prev) => (prev === 1 ? 12 : prev - 1))
  }

  const incrementMinutes = () => {
    setMinutes((prev) => (prev === 59 ? 0 : prev + 1))
  }

  const decrementMinutes = () => {
    setMinutes((prev) => (prev === 0 ? 59 : prev - 1))
  }

  const togglePeriod = () => {
    setPeriod((prev) => (prev === 'AM' ? 'PM' : 'AM'))
  }

  const toggleDay = (day: string) => {
    setSelectedDays((prev) =>
      prev.includes(day) ? prev.filter((d) => d !== day) : [...prev, day]
    )
  }

  const formatTime = () => {
    const formattedHours = hours.toString().padStart(2, '0')
    const formattedMinutes = minutes.toString().padStart(2, '0')
    return `${formattedHours}:${formattedMinutes} ${period}`
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="w-[400px] rounded-2xl bg-[#0F1115] p-6 text-white">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-normal">Create slot</h2>
          <button onClick={onClose} className="text-white/60 hover:text-white">
            <X className="h-6 w-6" />
          </button>
        </div>

        <div className="mt-8 space-y-6">
          <div className="space-y-2">
            <label className="block text-xl font-normal">Time</label>
            <p className="text-base text-white/60">What time of the day should the slot be run?</p>
            <div className="mt-2 flex items-center gap-2">
              {/* Hours */}
              <div className="relative flex flex-col items-center">
                <button
                  onClick={incrementHours}
                  className="absolute -top-7 text-white/60 hover:text-white"
                >
                  <ChevronUp className="h-5 w-5" />
                </button>
                <input
                  type="text"
                  value={hours.toString().padStart(2, '0')}
                  readOnly
                  className="w-14 rounded-lg border border-white/10 bg-transparent px-2 py-3 text-center text-white"
                />
                <button
                  onClick={decrementHours}
                  className="absolute -bottom-7 text-white/60 hover:text-white"
                >
                  <ChevronDown className="h-5 w-5" />
                </button>
              </div>

              <span className="text-xl">:</span>

              {/* Minutes */}
              <div className="relative flex flex-col items-center">
                <button
                  onClick={incrementMinutes}
                  className="absolute -top-7 text-white/60 hover:text-white"
                >
                  <ChevronUp className="h-5 w-5" />
                </button>
                <input
                  type="text"
                  value={minutes.toString().padStart(2, '0')}
                  readOnly
                  className="w-14 rounded-lg border border-white/10 bg-transparent px-2 py-3 text-center text-white"
                />
                <button
                  onClick={decrementMinutes}
                  className="absolute -bottom-7 text-white/60 hover:text-white"
                >
                  <ChevronDown className="h-5 w-5" />
                </button>
              </div>

              {/* AM/PM */}
              <button
                onClick={togglePeriod}
                className="ml-2 rounded-lg border border-white/10 px-4 py-3 text-white hover:bg-white/10"
              >
                {period}
              </button>
            </div>
          </div>

          <div className="space-y-2">
            <label className="block text-xl font-normal">Days</label>
            <p className="text-base text-white/60">On what days?</p>
            <div className="mt-2 flex gap-2">
              {days.map((day) => (
                <button
                  key={day}
                  onClick={() => toggleDay(day)}
                  className={`flex h-12 w-12 items-center justify-center rounded-full border text-sm font-medium transition-all duration-200 ease-in-out
                    ${
                      selectedDays.includes(day)
                        ? 'border-[#6C5CE7] bg-[#6C5CE7] text-white scale-105'
                        : 'border-white/10 text-white hover:bg-white/10'
                    }`}
                >
                  {day}
                </button>
              ))}
            </div>
          </div>
        </div>

        <button 
          onClick={() => onSubmit(formatTime(), selectedDays)}
          className="mt-8 w-full rounded-lg bg-[#6C5CE7] py-4 text-center text-base font-medium text-white hover:bg-[#5B4ED1]"
        >
          Create
        </button>
      </div>
    </div>
  )
} 