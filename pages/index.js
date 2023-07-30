import Script from 'next/script';

function Home() {
  return (
    <div className="container">
      <Script src="https://www.googletagmanager.com/gtag/js?id=G-JV7QK17XSB" />
      <Script id="google-analytics">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
 
          gtag('config', 'G-JV7QK17XSB');
        `}
      </Script>
    </div>
  );
}

export default Home;
