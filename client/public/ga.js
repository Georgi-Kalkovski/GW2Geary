export function loadGoogleTagManager() {
    var script = document.createElement('script');
    script.src = `https://www.googletagmanager.com/gtag/js?id=${process.env.REACT_APP_GA_TRACKING_ID}`;
    script.async = true;
    document.head.appendChild(script);
  }
  
  export function initializeGoogleTag() {
    window.dataLayer = window.dataLayer || [];
    function gtag() { dataLayer.push(arguments); }
    gtag('js', new Date());
    gtag('config', `${process.env.REACT_APP_GA_TRACKING_ID}`);
  }