import { Suspense } from 'react'
import InsightsDashboard from '@/components/features/InsightsDashboard'

export default function DashboardPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Instagram Insights Dashboard</h1>
      <Suspense fallback={<div>Loading insights...</div>}>
        <InsightsDashboard />
      </Suspense>
    </div>
  )
} 