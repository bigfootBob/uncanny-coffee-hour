import React from 'react';
import Hero from '../components/Hero/Hero';
import Team from '../components/Team/Team';
import { useTranslation } from 'react-i18next';
import './About.scss';

const About = () => {
  const { t } = useTranslation();
  return (
      <>
      <Hero />
      
      <div id="about-page" className="page-container">
        <div className="page-header glass-panel">
          <h1>About The Show</h1>
          <p>Every strange tale and spilled cup, listed in chronological order.</p>
        </div>

        <div className="team-section-wrapper">
          <Team limit={3} />
        </div>
    
      </div>
    </>
  );
};

export default About;