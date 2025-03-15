import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { createBrowserClient } from '@supabase/ssr'

export default function AuthCallbackPage() {
  const router = useRouter()
  
  useEffect(() => {
    const supabase = createBrowserClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    )

    const handleAuthCallback = async () => {
      const { error } = await supabase.auth.getSession()
      
      if (error) {
        console.error('Error during auth callback:', error)
        await router.push('/auth/signin?error=Unable to authenticate')
      } else {
        await router.push('/dashboard')
      }
    }

    handleAuthCallback()
  }, [router])

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h2 className="text-xl font-semibold mb-2">Authenticating...</h2>
        <p className="text-gray-500">Please wait while we complete the authentication process.</p>
      </div>
    </div>
  )
} 