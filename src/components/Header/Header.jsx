import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import LanguageSwitcher from '../LanguageSwitcher/LanguageSwitcher';
import ThemeSwitcher from '../ThemeSwitcher/ThemeSwitcher';
import './Header.scss';

import logoFull from '../../assets/images/UCHlogo.png';
import logoMark from '../../assets/images/UCHlogo.png'; 

const Header = () => {
  const { t } = useTranslation();
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobileOpen(false);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const closeMobile = () => setIsMobileOpen(false);
  const toggleMobile = () => setIsMobileOpen(!isMobileOpen);

  return (
    <header className="site-header">
      <div className="container header-inner">
        
        <div className="header-logo">
          <Link to="/" aria-label={t('misctext.return')} onClick={closeMobile}>
            <picture>
              <source media="(max-width: 768px)" srcSet={logoMark} />
              <img 
                src={logoFull} 
                alt="Uncanny Coffee Hour Logo" 
                className="logo-image"
                loading="eager" 
              />
            </picture>
          </Link>
        </div>
        
        {/* DESKTOP NAV */}
        <nav className="header-nav desktop-nav">
          <ul className="nav-list">
            <li><Link to="/episodes">{t('navtext.episodes')}</Link></li>
            <li><Link to="/coven">{t('navtext.coven')}</Link></li>
            <li><Link to="/about">{t('navtext.about')}</Link></li>
            <li><Link to="/shop">{t('navtext.shop')}</Link></li>
            <li><Link to="/submit" className="nav-cta">{t('navtext.submit_story')}</Link></li>
          </ul>
        </nav>

        {/* HAMBURGER */}
        <div className="header-controls">
          <LanguageSwitcher /> 
          <ThemeSwitcher />

          <button 
            className={`hamburger ${isMobileOpen ? 'active' : ''}`} 
            onClick={toggleMobile}
            aria-label="Menu"
          >
            <span className="bar"></span>
            <span className="bar"></span>
            <span className="bar"></span>
          </button>
        </div>
      </div>

      {/* MOBILE MENU */}
      <div className={`mobile-nav-overlay ${isMobileOpen ? 'open' : ''}`}>
        <nav className="mobile-links">
          <Link to="/" onClick={closeMobile}>{t('navtext.home') || 'Home'}</Link>
          <Link to="/episodes" onClick={closeMobile}>{t('navtext.episodes')}</Link>
          <Link to="/coven" onClick={closeMobile}>{t('navtext.coven')}</Link>
          <Link to="/about" onClick={closeMobile}>{t('navtext.about')}</Link>
          <Link to="/shop" onClick={closeMobile}>{t('navtext.shop')}</Link>
          <Link to="/submit" onClick={closeMobile}>{t('navtext.submit_story')}</Link>
          <Link to="/contact" onClick={closeMobile}>{t('navtext.contact') || 'Contact'}</Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;