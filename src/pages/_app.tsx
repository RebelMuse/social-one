import '@/app/globals.css'
import type { AppProps } from 'next/app'
import { Toaster } from 'react-hot-toast'

declare global {
  interface Window {
    fbAsyncInit: () => void;
    FB: any;
  }
}

function MyApp({ Component, pageProps }: AppProps): React.ReactElement {
  return (
    <>
      <Component {...pageProps} />
      <Toaster />
    </>
  )
}

export default MyApp 