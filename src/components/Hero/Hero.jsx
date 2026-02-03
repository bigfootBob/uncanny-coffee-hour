import React, { useState, useEffect } from 'react';
import './Hero.scss';

import heroDesktopWebP from '../../assets/images/hero-desktop.webp';
import heroDesktopJpg from '../../assets/images/hero-desktop.jpg';
import heroTabletWebP from '../../assets/images/hero-tablet.webp';
import heroTabletJpg from '../../assets/images/hero-tablet.jpg';
import heroMobileWebP from '../../assets/images/hero-mobile.webp';
import heroMobileJpg from '../../assets/images/hero-mobile.jpg';
// light version 
import heroDesktopLtWebP from '../../assets/images/hero-desktop-lt.webp';
import heroDesktopLtJpg from '../../assets/images/hero-desktop-lt.jpg';
import heroTabletLtWebP from '../../assets/images/hero-tablet-lt.webp';
import heroTabletLtJpg from '../../assets/images/hero-tablet-lt.jpg';
import heroMobileLtWebP from '../../assets/images/hero-mobile-lt.webp';
import heroMobileLtJpg from '../../assets/images/hero-mobile-lt.jpg';

const Hero = () => {
  const [theme, setTheme] = useState(
    document.documentElement.getAttribute('data-theme') || 'dark'
  );

  useEffect(() => {
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.attributeName === 'data-theme') {
          setTheme(document.documentElement.getAttribute('data-theme'));
        }
      });
    });

    observer.observe(document.documentElement, { attributes: true });
    return () => observer.disconnect();
  }, []);

  const isLight = theme === 'light';
  const activeImages = {
    desktop: {
      webp: isLight ? heroDesktopLtWebP : heroDesktopWebP,
      jpg:  isLight ? heroDesktopLtJpg  : heroDesktopJpg
    },
    tablet: {
      webp: isLight ? heroTabletLtWebP : heroTabletWebP,
      jpg:  isLight ? heroTabletLtJpg  : heroTabletJpg
    },
    mobile: {
      webp: isLight ? heroMobileLtWebP : heroMobileWebP,
      jpg:  isLight ? heroMobileLtJpg  : heroMobileJpg
    }
  };

return (
    <div className="hero-background-layer">
      <picture>
          {/* =========================================
              MOBILE (Max-width: 767px)
          ========================================= */}
          <source 
            media="(max-width: 767px)" 
            srcSet={activeImages.mobile.webp} 
            type="image/webp" 
          />
          <source 
            media="(max-width: 767px)" 
            srcSet={activeImages.mobile.jpg} 
          />

          {/* =========================================
              TABLET (Max-width: 1024px)
          ========================================= */}
          <source 
            media="(max-width: 1024px)" 
            srcSet={activeImages.tablet.webp} 
            type="image/webp" 
          />
          <source 
            media="(max-width: 1024px)" 
            srcSet={activeImages.tablet.jpg} 
          />

          {/* =========================================
              DESKTOP (Default)
          ========================================= */}
          <source 
            srcSet={activeImages.desktop.webp} 
            type="image/webp" 
          />
          
        <img 
          src={activeImages.desktop.jpg} 
          alt="" 
          className="hero-image"
          loading="eager"
        />
      </picture>
      
      <div className="hero-overlay"></div>
    </div>
  );
};

export default Hero;