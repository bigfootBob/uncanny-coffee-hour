import React from 'react';
import './Hero.scss';

// responsive heros
import heroDesktopWebP from '../../assets/images/hero-desktop.webp';
import heroDesktopJpg from '../../assets/images/hero-desktop.jpg';
import heroTabletWebP from '../../assets/images/hero-tablet.webp';
import heroTabletJpg from '../../assets/images/hero-tablet.jpg';
import heroMobileWebP from '../../assets/images/hero-mobile.webp';
import heroMobileJpg from '../../assets/images/hero-mobile.jpg';

const Hero = () => {
  return (
    <div className="hero-background-layer">
      <picture>
          {/* =========================================
              MOBILE (Max-width: 767px)
          ========================================= */}
          {/* Try WebP first */}
          <source 
            media="(max-width: 767px)" 
            srcSet={heroMobileWebP} 
            type="image/webp" 
          />
          {/* Fallback to JPG if browser doesn't support WebP */}
          <source 
            media="(max-width: 767px)" 
            srcSet={heroMobileJpg} 
          />

          {/* =========================================
              TABLET (Max-width: 1024px)
          ========================================= */}
          <source 
            media="(max-width: 1024px)" 
            srcSet={heroTabletWebP} 
            type="image/webp" 
          />
          <source 
            media="(max-width: 1024px)" 
            srcSet={heroTabletJpg} 
          />

          {/* =========================================
              DESKTOP (Default / No Media Query)
          ========================================= */}
          <source 
            srcSet={heroDesktopWebP} 
            type="image/webp" 
          />
          
        <img 
          src={heroDesktopJpg} 
          alt="" // Empty alt - decorative
          className="hero-image"
          loading="eager"
        />
      </picture>
      
      <div className="hero-overlay"></div>
    </div>
  );
};

export default Hero;