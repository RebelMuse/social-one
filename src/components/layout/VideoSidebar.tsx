'use client'

import { Plus, Lightbulb, Film, Calendar, FolderOpen, AlertTriangle, Video } from 'lucide-react'
import Image from 'next/image'

export default function VideoSidebar() {
  const navItems = [
    { icon: <Plus className="h-5 w-5" />, label: 'New', href: '#' },
    { icon: <Lightbulb className="h-5 w-5" />, label: 'Ideas', href: '#' },
    { icon: <Film className="h-5 w-5" />, label: 'Projects', href: '#' },
    { icon: <Calendar className="h-5 w-5" />, label: 'Calendar', href: '#' },
    { icon: <FolderOpen className="h-5 w-5" />, label: 'Files', href: '#' },
    { icon: <AlertTriangle className="h-5 w-5" />, label: 'Reports', href: '#' },
    { icon: <Video className="h-5 w-5" />, label: 'Videos', href: '#' },
  ]

  return (
    <div className="fixed left-0 top-0 bottom-0 w-[60px] bg-[#1C1C1E] flex flex-col items-center py-4">
      {/* Logo */}
      <div className="mb-8">
        <Image
          src="/logo.png"
          alt="Logo"
          width={32}
          height={32}
          className="rounded-full"
        />
      </div>

      {/* Navigation */}
      <nav className="flex-1 w-full">
        <ul className="space-y-4">
          {navItems.map((item) => (
            <li key={item.label}>
              <a
                href={item.href}
                className="flex justify-center p-3 text-gray-400 hover:text-white transition-colors"
                title={item.label}
              >
                {item.icon}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      {/* Settings at bottom */}
      <div className="mt-auto">
        <button className="p-3 text-gray-400 hover:text-white transition-colors">
          <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M12 15a3 3 0 100-6 3 3 0 000 6z" />
            <path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-2 2 2 2 0 01-2-2v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83 0 2 2 0 010-2.83l.06-.06a1.65 1.65 0 00.33-1.82 1.65 1.65 0 00-1.51-1H3a2 2 0 01-2-2 2 2 0 012-2h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 010-2.83 2 2 0 012.83 0l.06.06a1.65 1.65 0 001.82.33H9a1.65 1.65 0 001-1.51V3a2 2 0 012-2 2 2 0 012 2v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 0 2 2 0 010 2.83l-.06.06a1.65 1.65 0 00-.33 1.82V9a1.65 1.65 0 001.51 1H21a2 2 0 012 2 2 2 0 01-2 2h-.09a1.65 1.65 0 00-1.51 1z" />
          </svg>
        </button>
      </div>
    </div>
  )
} 