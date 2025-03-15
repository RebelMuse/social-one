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

    // Check if this is a password reset callback
    const hashParams = new URLSearchParams(window.location.hash.substring(1))
    const type = hashParams.get('type')

    if (type === 'recovery') {
      // If it's a password reset, redirect to update password page
      router.push('/auth/update-password')
      return
    }

    // For other auth callbacks, check session
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) {
        // If we have a session, redirect to the app
        router.push('/create')
      } else {
        // If we don't have a session, redirect to sign in
        router.push('/auth/signin')
      }
    })
  }, [router])

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <h2 className="text-xl font-semibold text-gray-900">
          Processing authentication...
        </h2>
        <p className="mt-2 text-gray-600">Please wait while we redirect you.</p>
      </div>
    </div>
  )
} 