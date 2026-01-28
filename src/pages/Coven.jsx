import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Hero from '../components/Hero/Hero';
import { useTranslation } from 'react-i18next';
import PatreonData from '../data/patreon.json';
import SEO from '../components/SEO/SEO';
import './Coven.scss';

const Coven = () => {
  const { t } = useTranslation();
  const location = useLocation();

  useEffect(() => {
    // Handle deep linking to specific tiers
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
      
      <div id="coven-page" className="page-container">
        <div className="page-header glass-panel">
          <h1>{t('covenpage.title')}</h1>
          <p>{t('covenpage.subhead')}</p>
        </div>

        <div className="tiers-grid-wrapper">
          {PatreonData.map((tier) => (
            <div 
              key={tier.id} 
              id={`tier-${tier.id}`} 
              className={`tier-card glass-panel }`}
            >
              <div className="tier-visual">
                <img 
                  src={`/assets/images/tiers/${tier.image}`} 
                  alt={tier.name} 
                  className="tier-image" 
                />
              </div>
              
              <div className="tier-content">
                <h3>{tier.name}</h3>
                <div className="tier-price">{tier.price}</div>
                <p className="tier-desc">{tier.desc}</p>
                
                <a 
                  href={tier.link} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="tier-cta"
                >
                  {t('covenpage.btn')}
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Coven;