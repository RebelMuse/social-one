import { useEffect, useState } from 'react'
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts'

interface InsightsData {
  account_insights: Array<{
    name: string
    values: Array<{ value: number }>
  }>
  media: Array<{
    id: string
    caption?: string
    media_type: string
    media_url: string
    thumbnail_url?: string
    permalink: string
    timestamp: string
  }>
  account: {
    id: string
    username: string
    account_type: string
    media_count: number
    followers_count: number
  }
}

export default function InsightsDashboard() {
  const [data, setData] = useState<InsightsData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchInsights = async () => {
      try {
        const response = await fetch('/api/instagram/insights', {
          headers: {
            'ngrok-skip-browser-warning': 'true'
          }
        })
        const data = await response.json()
        
        if (!response.ok) {
          throw new Error(data.error || 'Failed to fetch insights')
        }
        
        setData(data)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred')
      } finally {
        setLoading(false)
      }
    }

    fetchInsights()
  }, [])

  if (loading) return <div>Loading insights...</div>
  if (error) return <div className="text-red-500">Error: {error}</div>
  if (!data) return <div>No data available</div>

  return (
    <div className="space-y-8">
      {/* Account Overview */}
      <section className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold mb-4">Account Overview</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {data.account_insights.map((insight) => (
            <div key={insight.name} className="bg-gray-50 p-4 rounded-lg">
              <h3 className="text-sm text-gray-500">{insight.name}</h3>
              <p className="text-2xl font-bold">{insight.values[0].value}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Recent Posts */}
      <section className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold mb-4">Recent Posts</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {data.media.map((post) => (
            <div key={post.id} className="bg-gray-50 rounded-lg overflow-hidden">
              <a href={post.permalink} target="_blank" rel="noopener noreferrer">
                <img
                  src={post.media_url || post.thumbnail_url}
                  alt={post.caption?.slice(0, 100) || 'Instagram post'}
                  className="w-full h-64 object-cover"
                />
              </a>
              <div className="p-4">
                <p className="text-sm text-gray-600 mb-2">
                  {new Date(post.timestamp).toLocaleDateString()}
                </p>
                <p className="text-sm line-clamp-3">{post.caption}</p>
                <div className="flex justify-between mt-4">
                  <a
                    href={post.permalink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 hover:text-blue-600 text-sm"
                  >
                    View on Instagram →
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Account Information */}
      <section className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold mb-4">Account Information</h2>
        <div className="space-y-2">
          <p><span className="font-medium">Username:</span> {data.account.username}</p>
          <p><span className="font-medium">Account Type:</span> {data.account.account_type}</p>
          <p><span className="font-medium">Total Posts:</span> {data.account.media_count}</p>
          <p><span className="font-medium">Followers:</span> {data.account.followers_count}</p>
        </div>
      </section>
    </div>
  )
} 