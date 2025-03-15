'use client';
'use client'

import SourceSidebar from '@/components/layout/SourceSidebar'
import Header from '@/components/layout/Header'
import { useState } from 'react'

export default function CreateLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)

  return (
    <div className="relative h-full">
      <SourceSidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
      <Header />
      <div className={`transition-all duration-300 pt-16 ${isSidebarOpen ? 'ml-[300px]' : 'ml-[24px]'}`}>
        {children}
      </div>
    </div>
  )
} 