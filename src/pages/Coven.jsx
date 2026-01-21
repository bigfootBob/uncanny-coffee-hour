import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Hero from '../components/Hero/Hero'; 
import './Coven.scss';
import { useTranslation } from 'react-i18next';

const Coven = () => {
  const { t } = useTranslation();
  const location = useLocation();

  useEffect(() => {
    // Tier Button click check
    if (location.state?.selectedTier) {
      const tierId = location.state.selectedTier;
      console.log(`User wants to see Tier ${tierId}`);
      
      // TODO: Scroll to that specific section automatically
      // const element = document.getElementById(`tier-${tierId}`);
      // if (element) element.scrollIntoView({ behavior: 'smooth' });
    }
  }, [location]);

  return (
      <>
      <Hero />
      
      <div className="episodes-page">
        <div className="episodes-header glass-panel">
          <h1>ONE OF US! ONE OF US!</h1>
          <p>Every strange tale and spilled cup, listed in chronological order.</p>
        </div>

        <div className="player-wrapper glass-panel">
          things to come
        </div>
      </div>
    </>
  );
};

export default Coven;