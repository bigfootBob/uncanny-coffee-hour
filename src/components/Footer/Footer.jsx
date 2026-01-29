import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import humanAIimg from '../../assets/images/human_ai_assist.png';
import './Footer.scss';

const Footer = () => {
  const { t } = useTranslation();
  const currentYear = new Date().getFullYear();

  return (
    <>
      <footer className="site-footer">
        <div className="container">
          
          <p className="footer-text">
            {t('footer.copyright', { year: currentYear })}
          </p>

          <p className="footer-subtext">
            {t('footer.rights')}
          </p>
{/*     
        </div>
        <div className='aiandhuman'> */}
          <Link 
            to="/about" 
            state={{ selectedSection: 'ai' }} 
          >
            <img src={humanAIimg} alt="Human & AI co-created" className='human-ai-img' />
          </Link>
        </div>
      </footer>
    </>
  );
};

export default Footer;