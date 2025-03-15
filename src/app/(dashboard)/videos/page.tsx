'use client';
'use client'

import { useState } from 'react'
import { Wand2, Rocket } from 'lucide-react'
import ThemeCard from '@/components/features/ThemeCard'

const themes = [
  { name: 'Apocalyptic', image: '/themes/apocalyptic.jpg' },
  { name: 'Baroque', image: '/themes/baroque.jpg' },
  { name: 'Cinematic', image: '/themes/cinematic.jpg' },
  { name: 'Comicbook', image: '/themes/comicbook.jpg' },
  { name: 'Cyberpunk', image: '/themes/cyberpunk.jpg' },
  { name: 'Dystopian', image: '/themes/dystopian.jpg' },
  { name: 'Fantasy', image: '/themes/fantasy.jpg' },
  { name: 'Futuristic', image: '/themes/futuristic.jpg' },
  { name: 'Gothic', image: '/themes/gothic.jpg' },
  { name: 'Grunge', image: '/themes/grunge.jpg' },
  { name: 'Horror', image: '/themes/horror.jpg' },
  { name: 'Kawaii', image: '/themes/kawaii.jpg' },
  { name: 'Mystical', image: '/themes/mystical.jpg' },
  { name: 'Noir', image: '/themes/noir.jpg' },
  { name: 'Painterly', image: '/themes/painterly.jpg' },
  { name: 'Realistic', image: '/themes/realistic.jpg' },
  { name: 'Retro', image: '/themes/retro.jpg' },
  { name: 'Surreal', image: '/themes/surreal.jpg' },
  { name: 'Whimsical', image: '/themes/whimsical.jpg' }
].sort((a, b) => a.name.localeCompare(b.name))

export default function VideosPage() {
  const [script, setScript] = useState('')
  const [selectedTheme, setSelectedTheme] = useState<string | null>(null)

  return (
    <div className="flex-1 h-screen bg-white pl-24 overflow-hidden">
      <div className="h-full overflow-y-auto" style={{ scrollbarWidth: 'thin', scrollbarColor: '#E5E7EB transparent' }}>
        <div className="max-w-[800px] mx-auto">
          {/* Header */}
          <header className="flex justify-between items-center py-8 sticky top-0 bg-white z-10">
            <h1 className="text-3xl font-medium text-gray-900">Create Your Video</h1>
            <a href="#" className="text-gray-500 hover:text-gray-900 text-sm">
              View Latest Videos
            </a>
          </header>

          {/* Content */}
          <main className="space-y-12 pb-12">
            {/* Script Section */}
            <section className="space-y-4">
              <div>
                <h2 className="text-2xl font-medium text-gray-900 mb-2">1. Write Script</h2>
                <p className="text-gray-500">
                  Write your script in your target language. Biotato supports 30+ languages.
                </p>
              </div>

              <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
                <div className="flex items-center justify-between mb-4">
                  <p className="text-gray-600">Write your own script or generate with AI</p>
                  <button 
                    className="flex items-center gap-2 bg-purple-100 text-purple-600 px-4 py-2 rounded-lg text-sm font-medium hover:bg-purple-200 transition-colors"
                  >
                    <Wand2 className="h-4 w-4" />
                    Generate Script with AI
                  </button>
                </div>

                <textarea
                  value={script}
                  onChange={(e) => setScript(e.target.value)}
                  placeholder="Write the voiceover script here, line by line. Each sentence corresponds to a scene. You will be able to edit your scenes before the final video is generated. For example: 'Once upon a time in a galaxy far far away, there was a young Jedi named Luke Skywalker. He was on a mission to save Princess Leia from the evil Darth Vader.'"
                  className="w-full h-32 text-gray-800 placeholder-gray-400 resize-none focus:outline-none"
                />
              </div>
            </section>

            {/* Theme Section */}
            <section className="space-y-4">
              <h2 className="text-2xl font-medium text-gray-900">2. Choose Theme</h2>
              <div className="fixed-left-[96px] -mx-[calc(50vw-48px)] px-[calc(50vw-48px)] relative">
                <div className="overflow-x-auto pb-4" style={{ scrollbarWidth: 'thin', scrollbarColor: '#E5E7EB transparent' }}>
                  <div className="flex space-x-4 w-max">
                    {themes.map((theme) => (
                      <div key={theme.name} className="flex-none w-[160px] aspect-[3/4]">
                        <ThemeCard
                          name={theme.name}
                          imageSrc={theme.image}
                          isSelected={selectedTheme === theme.name}
                          onClick={() => setSelectedTheme(theme.name)}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </section>

            {/* Video Examples Section */}
            <section className="space-y-8">
              <div className="space-y-4">
                <h2 className="text-3xl font-medium text-gray-900">Ready to create quality faceless videos that stand out?</h2>
                <p className="text-gray-500 text-lg">
                  You're currently on a free trial. If you want to make videos like these, video generation is limited to paying users due to the costs involved. Your trial will end and become a paid subscription upon generating your first video.
                </p>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div className="aspect-[9/16] bg-gray-100 rounded-xl overflow-hidden">
                  <img src="/examples/video1.jpg" alt="Example 1" className="w-full h-full object-cover" />
                </div>
                <div className="aspect-[9/16] bg-gray-100 rounded-xl overflow-hidden">
                  <img src="/examples/video2.jpg" alt="Example 2" className="w-full h-full object-cover" />
                </div>
                <div className="aspect-[9/16] bg-gray-100 rounded-xl overflow-hidden">
                  <img src="/examples/video3.jpg" alt="Example 3" className="w-full h-full object-cover" />
                </div>
              </div>
            </section>

            {/* Generate Video Button Section */}
            <section className="flex flex-col items-center space-y-6 py-8 border-t border-gray-100">
              <h2 className="text-2xl font-medium text-gray-900">3. Generate Your Video</h2>
              <button 
                className="flex items-center gap-2 bg-red-600 text-white px-8 py-4 rounded-xl text-lg font-medium hover:bg-red-700 transition-colors shadow-sm"
                disabled={!script || !selectedTheme}
              >
                <Rocket className="h-5 w-5" />
                Generate Video
              </button>
              <p className="text-gray-500">
                {!script && !selectedTheme ? 'Please write a script and select a theme to continue' :
                 !script ? 'Please write a script to continue' :
                 !selectedTheme ? 'Please select a theme to continue' :
                 'Your video will be ready in a few minutes'}
              </p>
            </section>
          </main>
        </div>
      </div>
    </div>
  )
} 