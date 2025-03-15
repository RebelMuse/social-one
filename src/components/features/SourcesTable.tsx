interface Source {
  id: number
  title: string
  description: string
  content: string
  type: string
  createdAt: string
}

interface SourcesTableProps {
  sources: Source[]
}

export default function SourcesTable({ sources }: SourcesTableProps) {
  return (
    <div className="mt-4 rounded-lg border border-gray-200">
      <div className="flex items-center border-b border-gray-200 bg-white text-sm font-medium text-gray-500">
        <div className="w-[30%] p-4">Name</div>
        <div className="w-[15%] p-4">Type</div>
        <div className="w-[25%] p-4">Tags</div>
        <div className="w-[20%] p-4 flex items-center">
          Created At
          <svg className="ml-1 h-4 w-4" viewBox="0 0 24 24" fill="none">
            <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
        <div className="w-[10%] p-4">Actions</div>
      </div>
      {sources.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
          <p className="text-gray-500 mb-2">No sources added yet</p>
          <a href="#" className="text-[#6C5CE7] hover:underline">
            Go to the Remix screen
          </a>
        </div>
      ) : (
        <div className="divide-y divide-gray-200">
          {sources.map((source) => (
            <div
              key={source.id}
              className="flex items-center hover:bg-gray-50"
            >
              <div className="w-[20%] p-4 truncate">{source.title}</div>
              <div className="w-[20%] p-4 truncate">{source.description}</div>
              <div className="flex-1 p-4 truncate">{source.content}</div>
              <div className="w-[10%] p-4">{source.type}</div>
              <div className="w-[15%] p-4">
                {new Date(source.createdAt).toLocaleDateString()}
              </div>
              <div className="w-[10%] p-4">•••</div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
} 