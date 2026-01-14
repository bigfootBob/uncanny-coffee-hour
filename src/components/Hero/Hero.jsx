import React from 'react';
import { useTranslation } from 'react-i18next';
import './Hero.scss';

// responsive heros
import heroDesktopWebP from '../../assets/images/hero-desktop.webp';
import heroDesktopJpg from '../../assets/images/hero-desktop.jpg';
import heroTabletWebP from '../../assets/images/hero-tablet.webp';
import heroTabletJpg from '../../assets/images/hero-tablet.jpg';
import heroMobileWebP from '../../assets/images/hero-mobile.webp';
import heroMobileJpg from '../../assets/images/hero-mobile.jpg';

const Hero = () => {
  const { t } = useTranslation();

  return (
    <section className="hero-section" aria-labelledby="hero-title">
      <div className="hero-background">
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
            alt="Foggy morning in the Valley, East of Springfield, with a steaming cup of coffee"
            className="hero-image"
            loading="eager"
            fetchPriority="high"
          />
        </picture>
        
        <div className="hero-overlay"></div>
      </div>

      <div className="container hero-content">
        <h1 id="hero-title" className="hero-title">
          {t('app.title')}
        </h1>
        <p className="hero-tagline">
          {t('app.tagline')}
        </p>
      </div>

    </section>
  );
};

export default Hero;