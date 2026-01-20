import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import LanguageSwitcher from '../LanguageSwitcher/LanguageSwitcher';
import ThemeSwitcher from '../ThemeSwitcher/ThemeSwitcher';
import './Header.scss';

import logoFull from '../../assets/images/UCHlogo.png';
import logoMark from '../../assets/images/UCHlogo.png'; // todo: make a larger one

const Header = () => {
  const { t } = useTranslation();
  return (
    <header className="site-header">
      <div className="container header-inner">
        <div className="header-logo">
          <Link to="/" aria-label={t('misctext.return')}>
            <picture>
              <source 
                media="(max-width: 768px)" 
                srcSet={logoMark} 
              />

              <img 
                src={logoFull} 
                alt="Uncanny Coffee Hour Logo" 
                className="logo-image"
                loading="eager" 
              />
            </picture>
          </Link>
        </div>
        
        <nav className="header-nav">
          <ul className="nav-list">
            <li><Link to="/episodes">{t('navtext.episodes')}</Link></li>
            <li><Link to="/coven">{t('navtext.coven')}</Link></li>
            <li><Link to="/about">{t('navtext.about')}</Link></li>
            <li><Link to="/shop">{t('navtext.shop')}</Link></li>
            <li><Link to="/submit" className="nav-cta">{t('navtext.submit_story')}</Link></li>
          </ul>
        </nav>

        <div className="header-controls">
          <LanguageSwitcher />
          <ThemeSwitcher />
        </div>
      </div>
    </header>
  );
};

export default Header;