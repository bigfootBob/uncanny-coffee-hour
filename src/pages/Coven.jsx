import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Hero from '../components/Hero/Hero'; 
import './Coven.scss';

const Coven = () => {
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
      
     <div className="container page-content">
      <h1>Submit Your Paranormal Tale</h1>
      <p>Have you seen the Puca? Did your coffee taste like ectoplasm? Tell us.</p>
      
        </div>
    </>
  );
};

export default Coven;