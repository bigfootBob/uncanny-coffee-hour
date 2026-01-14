import React from 'react';
import LanguageSwitcher from '../LanguageSwitcher/LanguageSwitcher';
import ThemeSwitcher from '../ThemeSwitcher/ThemeSwitcher';
import './Header.scss';

import logoFull from '../../assets/images/UCHlogo.gif';
import logoMark from '../../assets/images/UCHlogo.gif';

const Header = () => {
  return (
    <header className="site-header">
      <div className="container header-inner">
        <div className="header-logo">
          <a href="/" aria-label="Return to Homepage">
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
          </a>
        </div>

        <div className="header-controls">
          <ThemeSwitcher />
          <LanguageSwitcher />
        </div>
      </div>
    </header>
  );
};

export default Header;