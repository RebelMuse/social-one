'use client'

import { useState, useEffect } from 'react'
import { LogOut, Rocket, Eye, CreditCard } from 'lucide-react'
import { createBrowserClient } from '@supabase/ssr'
import { useRouter } from 'next/navigation'

export default function SettingsPage() {
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [language, setLanguage] = useState('English')
  const [disableMarkdown, setDisableMarkdown] = useState(false)
  const [connectedAccounts, setConnectedAccounts] = useState<{
    platform: string;
    connected: boolean;
  }[]>([
    { platform: 'linkedin', connected: false }
  ])
  const [elevenlabsApiKey, setElevenlabsApiKey] = useState('')
  const [showApiKey, setShowApiKey] = useState(false)
  const [loading, setLoading] = useState(false)
  const [saveLoading, setSaveLoading] = useState(false)
  const [saveMessage, setSaveMessage] = useState('')
  const router = useRouter()

  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        // Get user session
        const { data: { user } } = await supabase.auth.getUser()
        
        if (user) {
          // Set email from auth
          setEmail(user.email || '')
          
          // Get user profile from profiles table
          const { data: profile, error } = await supabase
            .from('profiles')
            .select('first_name, last_name, preferred_language, disable_markdown, elevenlabs_api_key, ai_credits')
            .eq('id', user.id)
            .single()
          
          if (error) throw error
          
          if (profile) {
            setFirstName(profile.first_name || '')
            setLastName(profile.last_name || '')
            setLanguage(profile.preferred_language || 'English')
            setDisableMarkdown(profile.disable_markdown || false)
            setElevenlabsApiKey(profile.elevenlabs_api_key || '')
          }

          // Get connected accounts
          const { data: accounts, error: accountsError } = await supabase
            .from('connected_accounts')
            .select('platform')
            .eq('user_id', user.id)

          if (accountsError) throw accountsError

          setConnectedAccounts(prev => prev.map(acc => ({
            ...acc,
            connected: accounts?.some(a => a.platform === acc.platform) || false
          })))
        }
      } catch (error) {
        console.error('Error fetching user data:', error)
      }
    }

    fetchUserData()
  }, [])

  const handleLogout = async () => {
    setLoading(true)
    try {
      const { error } = await supabase.auth.signOut()
      if (error) {
        throw error
      }
      router.push('/auth/signin')
    } catch (error) {
      console.error('Error logging out:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleSave = async () => {
    setSaveLoading(true)
    setSaveMessage('')
    try {
      const { data: { user } } = await supabase.auth.getUser()
      
      if (!user) throw new Error('No user found')
      
      const { error } = await supabase
        .from('profiles')
        .update({
          first_name: firstName,
          last_name: lastName,
          preferred_language: language,
          disable_markdown: disableMarkdown,
          elevenlabs_api_key: elevenlabsApiKey,
          updated_at: new Date().toISOString()
        })
        .eq('id', user.id)

      if (error) throw error
      
      setSaveMessage('Profile updated successfully!')
    } catch (error) {
      console.error('Error updating profile:', error)
      setSaveMessage('Failed to update profile. Please try again.')
    } finally {
      setSaveLoading(false)
      // Clear success message after 3 seconds
      setTimeout(() => setSaveMessage(''), 3000)
    }
  }

  return (
    <div className="flex-1 h-screen bg-white overflow-y-auto">
      <div className="max-w-2xl mx-auto py-8 px-4">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">Settings</h1>
        
        {/* General Section */}
        <div className="space-y-8">
          <h2 className="text-2xl font-semibold text-gray-900">General</h2>
          
          {/* Form Fields */}
          <div className="space-y-6">
            {/* First Name */}
            <div className="space-y-1">
              <label className="block text-sm font-medium text-gray-900">
                First Name
              </label>
              <input
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="w-full p-3 rounded-2xl border border-gray-200 text-sm text-gray-500"
                placeholder="Enter your first name"
              />
            </div>

            {/* Last Name */}
            <div className="space-y-1">
              <label className="block text-sm font-medium text-gray-900">
                Last Name
              </label>
              <input
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className="w-full p-3 rounded-2xl border border-gray-200 text-sm text-gray-500"
                placeholder="Enter your last name"
              />
            </div>

            {/* Email */}
            <div className="space-y-1">
              <label className="block text-sm font-medium text-gray-900">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-3 rounded-2xl border border-gray-200 text-sm text-gray-500"
                placeholder="Enter your email"
                disabled
              />
            </div>

            {/* Default Language */}
            <div className="space-y-1">
              <label className="block text-sm font-medium text-gray-900">
                Default language
              </label>
              <p className="text-sm text-gray-500 mb-2">
                Generated posts will be automatically translated to your default language
              </p>
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                className="w-full p-3 rounded-2xl border border-gray-200 text-sm text-gray-500"
              >
                <option value="English">English</option>
                <option value="Spanish">Spanish</option>
                <option value="French">French</option>
                <option value="German">German</option>
                <option value="Italian">Italian</option>
                {/* Add more languages as needed */}
              </select>
            </div>

            {/* Disable Markdown */}
            <div className="flex items-center justify-between">
              <div>
                <label className="block text-sm font-medium text-gray-900">
                  Disable markdown
                </label>
                <p className="text-sm text-gray-500">
                  Generated posts will be plain text without any formatting
                </p>
              </div>
              <button
                onClick={() => setDisableMarkdown(!disableMarkdown)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none ${
                  disableMarkdown ? 'bg-purple-600' : 'bg-gray-200'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    disableMarkdown ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>

            {/* Save Message */}
            {saveMessage && (
              <div className={`p-4 rounded-lg text-sm ${
                saveMessage.includes('successfully') 
                  ? 'bg-green-50 text-green-600 border border-green-200'
                  : 'bg-red-50 text-red-600 border border-red-200'
              }`}>
                {saveMessage}
              </div>
            )}

            {/* Save Button */}
            <button 
              onClick={handleSave}
              disabled={saveLoading}
              className="px-4 py-2 bg-gray-100 text-gray-900 rounded-lg hover:bg-gray-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {saveLoading ? 'Saving...' : 'Save'}
            </button>
          </div>

          {/* Log Out Button */}
          <button 
            onClick={handleLogout}
            disabled={loading}
            className="mt-8 px-4 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors flex items-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <LogOut className="h-4 w-4" />
            <span>{loading ? 'Logging out...' : 'Log out'}</span>
          </button>

          {/* Social Accounts Section */}
          <div className="mt-12 space-y-6">
            <h2 className="text-2xl font-semibold text-gray-900">Add a new account</h2>
            <p className="text-sm text-gray-500">Connect your social media accounts to manage content and insights</p>
            
            <div className="space-y-4">
              <div className="bg-[#FFF8F2] p-4 rounded-lg space-y-4">
                <h3 className="text-sm font-medium text-orange-600">Important</h3>
                <ul className="list-disc pl-5 space-y-2 text-sm text-gray-900">
                  <li>Log into your social account <strong>BEFORE</strong> connecting</li>
                  <li>Facebook: select each Page individually, <strong>do not</strong> select "connect all pages"</li>
                </ul>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <a href="/api/auth/twitter" className="flex items-center justify-center space-x-2 p-3 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors">
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                  </svg>
                  <span>Login with Twitter</span>
                </a>
                
                <a href="/api/auth/linkedin" className="flex items-center justify-center space-x-2 p-3 bg-[#0A66C2] text-white rounded-lg hover:opacity-90 transition-colors">
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                  </svg>
                  <span>Login with LinkedIn</span>
                </a>
                
                <a href="/api/auth/facebook" className="flex items-center justify-center space-x-2 p-3 bg-[#1877F2] text-white rounded-lg hover:opacity-90 transition-colors">
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                  </svg>
                  <span>Login with Facebook</span>
                </a>
                
                <a href="/api/auth/instagram" className="flex items-center justify-center space-x-2 p-3 bg-gradient-to-r from-[#833AB4] via-[#FD1D1D] to-[#FCAF45] text-white rounded-lg hover:opacity-90 transition-colors">
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                  </svg>
                  <span>Login with Instagram</span>
                </a>
                
                <a href="/api/auth/tiktok" className="flex items-center justify-center space-x-2 p-3 bg-black text-white rounded-lg hover:opacity-90 transition-colors">
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z" />
                  </svg>
                  <span>Login with TikTok</span>
                </a>
                
                <a href="/api/auth/threads" className="flex items-center justify-center space-x-2 p-3 bg-black text-white rounded-lg hover:opacity-90 transition-colors">
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12.186 24h-.007c-3.581-.024-6.334-1.205-8.184-3.509C2.35 18.44 1.5 15.586 1.5 12.186c0-3.397.851-6.25 2.495-8.303C5.845 1.578 8.600.398 12.18.375h.014c3.58.023 6.334 1.203 8.184 3.506 1.645 2.05 2.495 4.904 2.495 8.305 0 3.398-.852 6.25-2.495 8.304-1.852 2.303-4.608 3.483-8.186 3.509h-.006zm-.01-22.5h-.011c-3.095.022-5.444.99-6.981 2.884-1.355 1.676-2.059 4.056-2.059 6.901 0 2.846.706 5.226 2.06 6.903 1.535 1.893 3.882 2.86 6.975 2.882h.011c3.094-.022 5.443-.99 6.981-2.883 1.355-1.676 2.059-4.057 2.059-6.901 0-2.846-.706-5.226-2.06-6.903-1.535-1.893-3.882-2.86-6.975-2.883zm5.881 9.344l-.436-.318c-.447-.323-.822-.595-1.103-.595-.161 0-.28.084-.437.244-.43.438-.843.71-1.218.802-.463.11-.96.05-1.482-.18a5.672 5.672 0 01-1.96-1.207 5.648 5.648 0 01-1.554-2.275c-.138-.405-.161-.778-.07-1.11.08-.292.24-.55.469-.764.13-.122.28-.186.437-.186.175 0 .356.08.536.238l.435.318c.32.232.587.428.784.654.197.227.292.437.292.646 0 .139-.05.279-.147.419-.097.14-.194.279-.291.418-.097.14-.194.279-.292.419a.544.544 0 00-.146.419c.037.244.146.5.324.764.178.265.387.5.627.705.24.205.485.39.736.55.251.162.47.265.657.31a.626.626 0 00.438-.087 9.067 9.067 0 00.397-.283c.13-.093.259-.186.388-.279a.662.662 0 01.388-.14c.194 0 .388.07.583.209.194.14.405.302.631.488l.436.318c.32.232.536.428.648.587.113.16.169.32.169.48 0 .16-.056.32-.169.48-.112.16-.329.355-.648.587l-.436.318c-.226.186-.437.348-.631.488a1.013 1.013 0 01-.583.209c-.34 0-.656-.14-.947-.419-.13-.14-.266-.283-.407-.427a5.19 5.19 0 00-.438-.427c-.227-.187-.486-.267-.775-.244-.289.023-.583.093-.882.209-.298.116-.59.25-.872.4a7.005 7.005 0 00-.775.47 3.012 3.012 0 01-.583.14c-.34.045-.688.022-1.045-.07a5.7 5.7 0 01-1.08-.435 8.283 8.283 0 01-1.022-.63 9.441 9.441 0 01-.948-.753 8.99 8.99 0 01-.852-.845 8.237 8.237 0 01-.737-.94 6.921 6.921 0 01-.583-1 5.57 5.57 0 01-.388-1.067 3.133 3.133 0 01-.097-.939c.016-.302.08-.58.194-.832.113-.25.242-.465.388-.645.146-.18.307-.355.485-.523.178-.17.34-.313.485-.432.146-.12.275-.18.388-.18.13 0 .259.045.388.134.13.09.26.19.388.302.13.11.26.21.389.3.129.09.258.135.388.135.161 0 .307-.06.437-.18.129-.12.258-.25.388-.39.13-.14.259-.27.388-.39.13-.12.275-.18.437-.18.178 0 .372.075.583.226.21.15.42.312.63.488l.437.318c.32.232.536.428.648.587.113.16.169.32.169.48 0 .16-.056.32-.169.48-.112.16-.329.355-.648.587z" />
                  </svg>
                  <span>Login with Threads</span>
                </a>
                
                <a href="/api/auth/pinterest" className="flex items-center justify-center space-x-2 p-3 bg-[#E60023] text-white rounded-lg hover:opacity-90 transition-colors">
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 0C5.373 0 0 5.372 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738a.36.36 0 01.083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.631-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12 24c6.627 0 12-5.373 12-12 0-6.628-5.373-12-12-12z" />
                  </svg>
                  <span>Login with Pinterest</span>
                </a>
                
                <a href="/api/auth/youtube" className="flex items-center justify-center space-x-2 p-3 bg-[#FF0000] text-white rounded-lg hover:opacity-90 transition-colors">
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                  </svg>
                  <span>Login with YouTube</span>
                </a>
              </div>
            </div>
          </div>

          {/* Accounts Section */}
          <div className="mt-12 space-y-6">
            <h2 className="text-2xl font-semibold text-gray-900">Connected Accounts</h2>
            
            <div className="space-y-4">
              {connectedAccounts.map(({ platform, connected }) => (
                <div key={platform} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <img 
                      src={`/icons/${platform}.svg`} 
                      alt={platform} 
                      className="w-6 h-6"
                    />
                    <span className="text-sm font-medium capitalize">{platform}</span>
                  </div>
                  
                  {connected ? (
                    <button
                      onClick={async () => {
                        try {
                          const { error } = await supabase
                            .from('connected_accounts')
                            .delete()
                            .eq('platform', platform)
                          
                          if (error) throw error
                          
                          setConnectedAccounts(prev => prev.map(acc => 
                            acc.platform === platform ? { ...acc, connected: false } : acc
                          ))
                        } catch (error) {
                          console.error(`Error disconnecting ${platform}:`, error)
                        }
                      }}
                      className="px-3 py-1 text-sm text-red-600 bg-red-50 rounded-lg hover:bg-red-100"
                    >
                      Disconnect
                    </button>
                  ) : (
                    <a
                      href={`/api/auth/${platform}`}
                      className="px-3 py-1 text-sm text-purple-600 bg-purple-50 rounded-lg hover:bg-purple-100"
                    >
                      Connect
                    </a>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* AI Credits and Usage Section */}
          <div className="mt-12 space-y-6">
            <h2 className="text-2xl font-semibold text-gray-900">AI Credits and Usage</h2>
            <div className="space-y-4">
              <p className="text-sm text-gray-500">
                Your monthly AI credits and usage. AI credits are used for AI images, AI videos, and AI voices. Every 30 days from the start of your subscription, you will receive monthly credits according to your pricing plan.
              </p>
              
              <div className="space-y-2">
                <p className="text-lg font-medium text-green-600">50 AI credits remaining</p>
                <p className="text-sm text-gray-500">
                  Bought credits but don't see them? Try refreshing the page in a few minutes when the payment is fully processed.
                </p>
              </div>

              <div className="flex items-center space-x-4">
                <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div className="w-1/3 h-full bg-purple-600 rounded-full"></div>
                </div>
                <button className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors flex items-center space-x-2">
                  <span className="text-lg font-medium">$</span>
                  <span>Buy 1000 More Credits</span>
                </button>
              </div>
            </div>
          </div>

          {/* API Access Section */}
          <div className="mt-12 space-y-6">
            <h2 className="text-2xl font-semibold text-gray-900">API Access</h2>
            <button className="px-4 py-2 bg-[#0EA5E9] text-white rounded-lg hover:opacity-90 transition-colors flex items-center space-x-2">
              <Rocket className="h-4 w-4" />
              <span>Generate API Key</span>
            </button>
          </div>

          {/* External API Keys Section */}
          <div className="mt-12 space-y-6">
            <h2 className="text-2xl font-semibold text-gray-900">External API Keys</h2>
            
            <div className="space-y-4">
              <div className="space-y-2">
                <h3 className="text-lg font-semibold text-gray-900">Elevenlabs</h3>
                <p className="text-sm text-gray-500">
                  You must provide an API key if you want to use custom voices.
                </p>
              </div>

              <div className="flex space-x-2">
                <div className="relative flex-1">
                  <input
                    type={showApiKey ? "text" : "password"}
                    value={elevenlabsApiKey}
                    onChange={(e) => setElevenlabsApiKey(e.target.value)}
                    className="w-full p-3 pr-10 rounded-2xl border border-gray-200 text-sm text-gray-500"
                    placeholder="Enter your Elevenlabs API key"
                  />
                  <button
                    onClick={() => setShowApiKey(!showApiKey)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    <Eye className="h-4 w-4" />
                  </button>
                </div>
                <button className="px-4 py-2 bg-gray-100 text-gray-900 rounded-lg hover:bg-gray-200 transition-colors">
                  Save
                </button>
              </div>
            </div>
          </div>

          {/* Billing Section */}
          <div className="mt-12 space-y-6">
            <h2 className="text-2xl font-semibold text-gray-900">Billing</h2>
            
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <span className="text-sm font-medium text-gray-900">Subscription status:</span>
                <span className="px-2 py-1 text-xs font-medium bg-gray-100 text-gray-600 rounded">TRIALING</span>
              </div>

              <div className="space-y-3">
                <button className="w-full px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors">
                  Activate Subscription
                </button>
                
                <button className="w-full px-4 py-2 border border-gray-200 text-gray-600 rounded-lg hover:bg-gray-50 transition-colors flex items-center justify-center space-x-2">
                  <CreditCard className="h-4 w-4" />
                  <span>Open Billing Portal</span>
                </button>
              </div>
            </div>
          </div>

          {/* Reset Settings Section */}
          <div className="mt-12 space-y-6">
            <h2 className="text-2xl font-semibold text-gray-900">Reset settings</h2>
            
            <div className="bg-red-50 p-4 rounded-lg space-y-4">
              <h3 className="text-sm font-medium text-red-600">Reset all settings</h3>
              <p className="text-sm text-gray-900">
                Reset all local settings. This will remove all your drafts and sources stored locally.
              </p>
              <button className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors">
                Reset
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 