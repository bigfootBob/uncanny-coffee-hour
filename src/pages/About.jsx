import React from 'react';
import './About.scss';
import Hero from '../components/Hero/Hero'; 
import { useTranslation } from 'react-i18next';

const About = () => {
  const { t } = useTranslation();
  return (
      <>
      <Hero />
      
      <div className="episodes-page">
        <div className="episodes-header glass-panel">
          <h1>About The Show</h1>
          <p>Every strange tale and spilled cup, listed in chronological order.</p>
        </div>

        <div className="player-wrapper glass-panel">
          things to come
        </div>
      </div>
    </>
  );
};

export default About;