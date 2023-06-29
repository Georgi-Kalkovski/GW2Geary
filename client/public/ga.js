// ga.js
(function (window, document, scriptSrc, gaTrackingID) {
    window.dataLayer = window.dataLayer || [];
    function gtag() { dataLayer.push(arguments); }
    gtag('js', new Date());
  
    gtag('config', gaTrackingID);
  })(window, document, 'https://www.googletagmanager.com/gtag/js', `${process.env.REACT_APP_GA_TRACKING_ID}`);
  