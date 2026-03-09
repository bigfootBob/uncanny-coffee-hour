import React, { useEffect } from 'react';

const GoogleAnalytics = () => {
  useEffect(() => {
    const trackingId = import.meta.env?.VITE_GA_TRACKING_ID;

    if (!trackingId) {
      console.warn("GA Tracking ID not found in environment variables.");
      return;
    }

    const script = document.createElement('script');
    script.src = `https://www.googletagmanager.com/gtag/js?id=${trackingId}`;
    script.async = true;
    document.head.appendChild(script);

    window.dataLayer = window.dataLayer || [];
    function gtag() {
      window.dataLayer.push(arguments);
    }
    gtag('js', new Date());
    gtag('config', trackingId);
  }, []);

  return null;
};

export default GoogleAnalytics;