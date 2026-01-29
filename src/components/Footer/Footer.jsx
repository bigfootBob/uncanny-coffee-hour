import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import badgeImage from '../../assets/images/HIxAI-collab-wht.png'; 
import badgeImageBlk from '../../assets/images/HIxAI-collab-blk.png'; 
import './Footer.scss'; 

const Footer = () => {
  const { t } = useTranslation();
  const currentYear = new Date().getFullYear();
  
  return (
    <>
      <div className="collaboration-stamp">
        <Link 
          to="/about" 
          state={{ selectedSection: 'ai' }} 
        >
          <img src={badgeImage} alt="Human & AI co-created" className="human-ai-img logo-for-dark" />
          <img src={badgeImageBlk} alt="Human & AI co-created" className="human-ai-img logo-for-light" />
        </Link>
        
        <span className="stamp-label">{t('footer.humanai')}</span>
        <span className="stamp-label">{t('footer.collaboration')}</span>
      </div>

      <footer className="site-footer">
        <div className="footer-content">
          
          <div className="footer-main">
            <span className="hosted-by">{t('footer.hosted')}</span>
            <div className="hosts">
              <span className="host-name">Odd Bob</span>
              <span className="separator">•</span>
              <span className="host-name">Dr Kitsuné</span>
              <span className="separator">•</span>
              <span className="host-name">Soercia</span>
            </div>
          </div>

          <div className="footer-legal">
            <p>&copy; {currentYear} {t('footer.copyright')}</p>
            <p>{t('footer.rights')}</p>
          </div>
          
        </div>
      </footer>
    </>
  );
};

export default Footer;