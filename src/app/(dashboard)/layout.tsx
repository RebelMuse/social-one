'use client'

import Sidebar from '@/components/layout/Sidebar'

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex h-screen overflow-hidden bg-white">
      <Sidebar />
      <div className="flex-1">
        <main className="bg-white transition-all duration-300">{children}</main>
      </div>
    </div>
  )
} 