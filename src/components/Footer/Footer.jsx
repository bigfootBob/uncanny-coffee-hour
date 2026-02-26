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
      <footer className="site-footer">
        <div className="collaboration-stamp">
          <img src={badgeImage} alt={t('footer.humanai_alt')} className="human-ai-img logo-for-dark" />
          <img src={badgeImageBlk} alt={t('footer.humanai_alt')} className="human-ai-img logo-for-light" />

          <span className="stamp-label">{t('footer.humanai')}</span>
          <span className="stamp-label">{t('footer.collaboration')}</span>
        </div>

        <div className="footer-content">

          <div className="footer-main">
            <span className="hosted-by">{t('footer.hosted')}</span>
            <div className="hosts">
              <span className="host-name">Odd Bob</span>
              <span className="separator">•</span>
              <span className="host-name">Dr Kitsuné</span>
              <span className="separator">•</span>
              <span className="host-name">Saoirse</span>
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