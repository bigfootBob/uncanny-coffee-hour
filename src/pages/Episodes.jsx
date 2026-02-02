import React, { useEffect } from 'react';
import Hero from '../components/Hero/Hero'; 
import { useTranslation } from 'react-i18next';
import SEO from '../components/SEO/SEO';
import './Episodes.scss';

const Episodes = () => {
  const { t } = useTranslation();
  useEffect(() => {
    if (document.getElementById('buzzsprout-script')) return;

    const script = document.createElement('script');
    script.id = 'buzzsprout-script';
    script.src = 'https://www.buzzsprout.com/2450457.js?container_id=buzzsprout-large-player&player=large';
    script.type = 'text/javascript';
    script.charset = 'utf-8';
    script.async = true;

    const container = document.getElementById('buzzsprout-script-container');
    if (container) {
      container.appendChild(script);
    }

    return () => {
      if (container) {
        const existingScript = document.getElementById('buzzsprout-script');
        if (existingScript) existingScript.remove();
      }
    };
  }, []);

  return (
    <>

      <SEO 
        title="Uncanny Coffee Hour Past Episodes" 
        description="Listen to Odd Bob, Dr. Kitsune & Soercia, the voices behind the madness."
      />

      <Hero />
      
      <div className="episodes-page">
        <div className="page-header glass-panel">
          <h1>{t('eppage.title')}</h1>
          <p>{t('eppage.subhead')}</p>
        </div>

        <div className="player-wrapper glass-panel">
          {/* Buzzsprout looks for */}
          <div id='buzzsprout-large-player'></div>
          <div id='buzzsprout-script-container' style={{ display: 'none' }}></div>
        </div>

        <a href="https://uncannycoffeehour.buzzsprout.com/2450457/episodes" target="_blank" rel="noopener noreferrer" className="transcript-link">
          <div>
            <u>Transcripts</u> are available on buzzsprout (look for the transcript link on the episode).
          </div>
        </a>
      </div>
    </>
  );
};

export default Episodes;