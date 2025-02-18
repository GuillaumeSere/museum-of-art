// src/pages/_app.js
import React from 'react';
import '../styles/globals.css';

function MyApp({ Component, pageProps }) {
  React.useEffect(() => {
    // Google Analytics
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', 'G-T85BSHFJLT');

    const script = document.createElement('script');
    script.src = "https://www.googletagmanager.com/gtag/js?id=G-T85BSHFJLT";
    script.async = true;
    document.head.appendChild(script);
  }, []);

  return <Component {...pageProps} />;
}

export default MyApp;