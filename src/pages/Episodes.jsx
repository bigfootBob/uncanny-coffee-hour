import React, { useState } from 'react';
import Hero from '../components/Hero/Hero'; 
import { useTranslation } from 'react-i18next';
import episodesData from '../data/episodes.json';
import SEO from '../components/SEO/SEO';
import './Episodes.scss';

const EpisodePage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedId, setExpandedId] = useState(null);
  const { t } = useTranslation('translation');

  // Seconds to MM:SS
  const formatDuration = (sec) => {
    const mins = Math.floor(sec / 60);
    const remainingSecs = sec % 60;
    return `${mins}:${remainingSecs.toString().padStart(2, '0')}`;
  };

  // Format Date
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  // Filter & Sort 
  const filteredEpisodes = episodesData
    .filter(ep => 
      ep.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
      ep.description.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => new Date(b.published_at) - new Date(a.published_at));

  return (
    <>
    <SEO
      title="Uncanny Coffee Hour Archives"
      description={t('eppage.seo')}
    />

    <main className="uncanny-archives">

      <Hero />

      <header className="archives-header page-header">
        <h1>{t('eppage.title')}</h1>
        <div className="search-wrapper">
          <input 
            type="text" 
            placeholder={t('eppage.search')}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
          {searchTerm && <p className="search-results-count"> {filteredEpisodes.length} {t('eppage.found')}</p>}
        </div>
      </header>

      <div className="episode-list">
        {filteredEpisodes.length > 0 ? (
          filteredEpisodes.map((ep) => (
            <section key={ep.id} className="episode-card">
              <div className="episode-main">
                <img 
                  src={ep.artwork_url} 
                  alt={ep.title} 
                  className="episode-art" 
                />
                
                <div className="episode-details">
                  <div className="episode-meta">
                    <span className="ep-tag">S{ep.season_number} : E{ep.episode_number}</span>
                    <span className="ep-duration"> 🕒 {formatDuration(ep.duration)}</span>
                  </div>
                  
                  <h2>{ep.title}</h2>
                  <p className="publish-date">{formatDate(ep.published_at)}</p>

                  <div className="audio-section">
                    <audio controls src={ep.audio_url} className="custom-player" />
                  </div>
                </div>
              </div>

              <div className="description-wrapper">
                <div 
                  className={`episode-description ${expandedId === ep.id ? 'expanded' : 'collapsed'}`}
                  dangerouslySetInnerHTML={{ __html: ep.description }} 
                />
                <button 
                  className="toggle-desc-btn" 
                  onClick={() => setExpandedId(expandedId === ep.id ? null : ep.id)}
                >
                  {expandedId === ep.id ? t('eppage.less') : t('eppage.readfull')}
                </button>
              </div>
            </section>
          ))
        ) : (
          <div className="no-results">
            <p>{t('eppage.foundnone')}</p>
          </div>
        )}
      </div>
    </main>
    </>
  );
};

export default EpisodePage;