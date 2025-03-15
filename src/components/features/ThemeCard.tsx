'use client'

interface ThemeCardProps {
  name: string
  imageSrc: string
  isSelected?: boolean
  onClick?: () => void
}

export default function ThemeCard({ name, imageSrc, isSelected, onClick }: ThemeCardProps) {
  return (
    <div 
      className={`
        relative group cursor-pointer rounded-lg overflow-hidden
        ${isSelected ? 'ring-2 ring-purple-500' : ''}
      `}
      onClick={onClick}
    >
      {/* Theme Image */}
      <div className="aspect-[3/4] bg-[#1C1C1E]">
        <img
          src={imageSrc}
          alt={name}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>

      {/* Overlay Gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/0 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

      {/* Theme Name */}
      <div className="absolute inset-x-0 bottom-0 p-3">
        <p className="text-sm font-medium text-center text-white uppercase tracking-wide">
          {name}
        </p>
      </div>

      {/* Selection Indicator */}
      {isSelected && (
        <div className="absolute inset-0 bg-purple-500/20 pointer-events-none" />
      )}
    </div>
  )
} 