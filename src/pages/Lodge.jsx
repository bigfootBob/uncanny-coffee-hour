import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Hero from '../components/Hero/Hero';
import { useTranslation } from 'react-i18next';
import PatreonData from '../data/patreon.json'; 
import SEO from '../components/SEO/SEO';
import './lodge.scss';

const lodge = () => {
  const { t } = useTranslation();
  const location = useLocation();

  useEffect(() => {
    // Handle deep linking - todo: look at refactor
    if (location.state?.selectedTier) {
      const tierId = location.state.selectedTier;
      const element = document.getElementById(`tier-${tierId}`);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }
  }, [location]);

  return (
    <>

      <SEO 
        title="Join the community!" 
        description="Join Odd Bob and Dr. Kitsune, the voices behind the madness."
      />

      <Hero />
      
      <div id="lodge-page" className="page-container">
        <div className="page-header glass-panel">
          <h1>{t('lodgepage.title')}</h1>
          <p>{t('lodgepage.subhead')}</p>
        </div>

        <div className="tiers-grid-wrapper">
          {PatreonData.map((tier) => (
            <div 
              key={tier.id} 
              id={`tier-${tier.id}`} 
              className="tier-card glass-panel"
            >
              <div className="tier-visual">
                <img 
                  src={`/assets/images/tiers/${tier.image}`} 
                  alt={t(`patreon.${tier.id}.title`)}
                  className="tier-image" 
                />
              </div>
              
              <div className="tier-content">
                <h3>{t(`patreon.${tier.id}.title`)}</h3>
                
                <div className="tier-price">
                    ${tier.price} <span className="period">{t('patreon.common.month')}</span>
                </div>
                
                <p className="tier-desc">{t(`patreon.${tier.id}.desc`)}</p>
                
                <a 
                  href={tier.link} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="tier-cta"
                >
                  {t('patreon.common.join')} 
                </a>
              </div>
            </div>
          ))}
        </div>

      </div>
    </>
  );
};

export default lodge;