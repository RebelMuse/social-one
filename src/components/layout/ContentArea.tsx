'use client'

interface ContentAreaProps {
  children: React.ReactNode
  showRightPanel?: boolean
}

export default function ContentArea({
  children,
  showRightPanel = true
}: ContentAreaProps) {
  return (
    <main className="flex min-h-screen pl-[60px]">
      <div className={`flex-1 ${showRightPanel ? 'max-w-[800px]' : ''} p-6`}>
        {children}
      </div>
      {showRightPanel && (
        <div className="w-[300px] border-l bg-white p-6">
          <h2 className="font-semibold text-[#2D3436]">Tips & Help</h2>
          <p className="mt-4 text-sm text-gray-600">
            Use this panel for contextual help and tips related to your current task.
          </p>
        </div>
      )}
    </main>
  )
} 