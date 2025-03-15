import React, { useEffect } from 'react'
import type { AppProps } from 'next/app'
import '../app/globals.css'

declare global {
  interface Window {
    fbAsyncInit: () => void;
    FB: any;
  }
}

function MyApp({ Component, pageProps }: AppProps): React.ReactElement {
  useEffect(() => {
    // Load the Facebook SDK
    window.fbAsyncInit = function() {
      window.FB.init({
        appId      : '1832637899202873',
        cookie     : true,
        xfbml      : true,
        version    : 'v19.0'
      });
        
      window.FB.AppEvents.logPageView();   
    };

    (function(d, s, id){
       var js, fjs = d.getElementsByTagName(s)[0];
       if (d.getElementById(id)) {return;}
       js = d.createElement(s); js.id = id;
       js.src = "https://connect.facebook.net/en_US/sdk.js";
       fjs.parentNode.insertBefore(js, fjs);
     }(document, 'script', 'facebook-jssdk'));
  }, []);

  return <Component {...pageProps} />
}

export default MyApp 