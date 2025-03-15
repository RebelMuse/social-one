'use client';
'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  PenSquare,
  Lightbulb,
  MessageSquareText,
  Database,
  Calendar,
  FileCheck,
  Video,
  HelpCircle,
  Settings,
  Moon,
  FileText
} from 'lucide-react'
import { useState } from 'react'

const navItems = [
  { href: '/create', icon: PenSquare, label: 'Create Post' },
  { href: '/drafts', icon: FileText, label: 'Drafts' },
  { href: '/find-inspiration', icon: Lightbulb, label: 'Find Inspiration' },
  { href: '/prompts', icon: MessageSquareText, label: 'Chat' },
  { href: '/sources', icon: Database, label: 'Sources' },
  { href: '/calendar', icon: Calendar, label: 'Calendar' },
  { href: '/published-posts', icon: FileCheck, label: 'Published Posts' },
  { href: '/videos', icon: Video, label: 'Videos' }
]

export default function Sidebar() {
  const pathname = usePathname()
  const [isDarkMode, setIsDarkMode] = useState(false)

  return (
    <aside className="fixed left-0 top-0 z-20 h-screen w-[60px] bg-white shadow-sm">
      <nav className="flex h-full flex-col items-center py-6">
        {/* Navigation Links */}
        <div className="flex flex-col items-center space-y-4">
          {navItems.map((item) => {
            const Icon = item.icon
            const isActive = pathname === item.href
            
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex h-10 w-10 items-center justify-center rounded-lg transition-colors
                  ${isActive 
                    ? 'bg-[#6C5CE7] text-white' 
                    : 'text-gray-600 hover:bg-gray-100'
                  }`}
                title={item.label}
              >
                <Icon className="h-5 w-5" />
              </Link>
            )
          })}
        </div>

        {/* Utility Buttons */}
        <div className="mt-auto flex flex-col items-center space-y-4 mb-6">
          <button 
            className="flex h-10 w-10 items-center justify-center rounded-lg text-gray-600 hover:bg-gray-100 transition-colors"
            title="Help"
          >
            <HelpCircle className="h-5 w-5" />
          </button>
          <Link
            href="/settings"
            className={`flex h-10 w-10 items-center justify-center rounded-lg text-gray-600 hover:bg-gray-100 transition-colors ${pathname === '/settings' ? 'bg-[#6C5CE7] text-white' : ''}`}
            title="Settings"
          >
            <Settings className="h-5 w-5" />
          </Link>
          <button 
            onClick={() => setIsDarkMode(!isDarkMode)}
            className="flex h-10 w-10 items-center justify-center rounded-lg text-gray-600 hover:bg-gray-100 transition-colors"
            title="Dark Mode"
          >
            <Moon className="h-5 w-5" />
          </button>
        </div>
      </nav>
    </aside>
  )
} 