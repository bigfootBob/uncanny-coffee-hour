import React from 'react';
import { useTranslation } from 'react-i18next';
import './Footer.scss';

const Footer = () => {
  const { t } = useTranslation();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="site-footer">
      <div className="container">
        <p className="footer-text">
          {/* We pass the variable 'year' into the translation string */}
          {t('footer.copyright', { year: currentYear })}
        </p>
        <p className="footer-subtext">
          {t('footer.rights')}
        </p>
      </div>
    </footer>
  );
};

export default Footer;