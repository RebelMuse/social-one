interface NavigationTabsProps {
  activeTab: 'upcoming' | 'schedule'
  onTabChange: (tab: 'upcoming' | 'schedule') => void
}

export default function NavigationTabs({ activeTab, onTabChange }: NavigationTabsProps) {
  return (
    <div className="flex space-x-4 border-b border-gray-200">
      <button
        onClick={() => onTabChange('upcoming')}
        className={`pb-4 text-sm font-medium ${
          activeTab === 'upcoming'
            ? 'border-b-2 border-[#6C5CE7] text-[#6C5CE7]'
            : 'text-gray-500 hover:text-gray-700'
        }`}
      >
        Upcoming posts
      </button>
      <button
        onClick={() => onTabChange('schedule')}
        className={`pb-4 text-sm font-medium ${
          activeTab === 'schedule'
            ? 'border-b-2 border-[#6C5CE7] text-[#6C5CE7]'
            : 'text-gray-500 hover:text-gray-700'
        }`}
      >
        Slot schedule
      </button>
    </div>
  )
} 