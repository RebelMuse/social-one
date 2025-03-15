'use client'

import VideoSidebar from '@/components/layout/VideoSidebar'

export default function VideosLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex h-screen overflow-hidden">
      <VideoSidebar />
      <main className="flex-1 ml-[60px]">{children}</main>
    </div>
  )
} 