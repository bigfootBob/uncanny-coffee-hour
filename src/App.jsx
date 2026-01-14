// src/App.jsx
import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import episodeData from './data/episodes.json';
import Header from './components/Header/Header'; 
import Footer from './components/Footer/Footer'; 
import Hero from './components/Hero/Hero';
import EpisodeCard from './components/EpisodeCard/EpisodeCard';
import Team from './components/Team/Team';
import './App.scss';

function App() {
  const { t } = useTranslation();

  return (
    <div className="app-container">
      <a href="#main-content" className="skip-link">{t('app.skip_link')}</a>

      <Header />

      <main id="main-content">
        <Hero />

        <section aria-label="Latest Episodes" className="container" style={{ marginTop: '2rem' }}>
          {episodeData.map(episode => (
             <EpisodeCard key={episode.id} episode={episode} />
          ))}
        </section>

        <Team />
      </main>

      <Footer />
    </div>
  );
}

export default App;