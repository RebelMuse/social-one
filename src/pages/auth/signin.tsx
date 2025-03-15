import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { createBrowserClient } from '@supabase/ssr'
import { toast } from 'react-hot-toast'
import Link from 'next/link'
import Head from 'next/head'

declare global {
  interface Window {
    FB: any;
    checkLoginState: () => void;
    statusChangeCallback: (response: any) => void;
  }
}

export default function SignInPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [fbLoaded, setFbLoaded] = useState(false)

  // Create Supabase client with error handling
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  
  const supabase = createBrowserClient(
    supabaseUrl || '',
    supabaseAnonKey || ''
  )

  useEffect(() => {
    // Log environment variables for debugging (without exposing sensitive data)
    console.log('Supabase URL available:', !!supabaseUrl)
    console.log('Supabase Anon Key available:', !!supabaseAnonKey)
    console.log('App URL:', process.env.NEXT_PUBLIC_APP_URL)
    console.log('Instagram App ID:', process.env.NEXT_PUBLIC_INSTAGRAM_APP_ID)
    
    // Define the statusChangeCallback function
    window.statusChangeCallback = function(response: any) {
      console.log('statusChangeCallback');
      console.log(response);
      
      if (response.status === 'connected') {
        // The user is logged in and has authenticated your app
        console.log('User is logged in with Facebook');
        
        // Get the access token
        const accessToken = response.authResponse.accessToken;
        
        // Redirect to our callback handler with the token
        const redirectUri = `${process.env.NEXT_PUBLIC_APP_URL}/api/auth/instagram/callback`;
        window.location.href = `${redirectUri}?access_token=${accessToken}`;
      } else {
        // The person is not logged into your app or we are unable to tell
        console.log('Person is not logged in with Facebook');
      }
    }
    
    // Define the checkLoginState function
    window.checkLoginState = function() {
      window.FB.getLoginStatus(function(response: any) {
        window.statusChangeCallback(response);
      });
    }
    
    // Check if FB SDK is loaded
    const checkFBLoaded = setInterval(() => {
      if (window.FB) {
        setFbLoaded(true);
        clearInterval(checkFBLoaded);
        
        // Check login status once FB is loaded
        window.FB.getLoginStatus(function(response: any) {
          window.statusChangeCallback(response);
        });
      }
    }, 100);

    return () => clearInterval(checkFBLoaded);
  }, [supabaseUrl, supabaseAnonKey]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      // Check if Supabase credentials are available
      if (!supabaseUrl || !supabaseAnonKey) {
        throw new Error('Supabase credentials are not available')
      }
      
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (error) throw error

      toast.success('Logged in successfully')
      router.push('/create')
    } catch (error: any) {
      console.error('Error logging in:', error)
      
      // Provide more specific error messages
      if (error.message.includes('Invalid API key')) {
        toast.error('Authentication service unavailable. Please try again later.')
      } else if (error.message.includes('Invalid login credentials')) {
        toast.error('Invalid email or password')
      } else {
        toast.error(`Login failed: ${error.message}`)
      }
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <>
      <Head>
        <title>Sign in to SocialOne</title>
      </Head>
      <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div>
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
              Sign in to SocialOne
            </h2>
            <p className="mt-2 text-center text-sm text-gray-600">
              Connect your Instagram Business account to manage content and insights
            </p>
          </div>
          <form className="mt-8 space-y-6" onSubmit={handleLogin}>
            <div className="rounded-md shadow-sm -space-y-px">
              <div>
                <label htmlFor="email-address" className="sr-only">
                  Email address
                </label>
                <input
                  id="email-address"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Email address"
                />
              </div>
              <div>
                <label htmlFor="password" className="sr-only">
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Password"
                />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="text-sm">
                <Link
                  href="/auth/reset-password"
                  className="font-medium text-[#4F46E5] hover:text-[#4338CA]"
                >
                  Forgot your password?
                </Link>
              </div>
            </div>

            <div className="space-y-4">
              <button
                type="submit"
                disabled={isLoading}
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-[#4F46E5] hover:bg-[#4338CA] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? 'Signing in...' : 'Sign in'}
              </button>

              {/* Facebook Login Button from the quickstart */}
              <div className="flex justify-center">
                <div 
                  className="fb-login-button" 
                  data-width="" 
                  data-size="large" 
                  data-button-type="continue_with" 
                  data-layout="default" 
                  data-auto-logout-link="false" 
                  data-use-continue-as="false"
                  data-scope="public_profile,email,pages_show_list,instagram_basic"
                  data-onlogin="checkLoginState();">
                </div>
              </div>
            </div>
          </form>

          <div className="text-center">
            <p className="text-sm text-gray-600">
              Don't have an account?{' '}
              <Link
                href="/auth/signup"
                className="font-medium text-[#4F46E5] hover:text-[#4338CA]"
              >
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  )
} 