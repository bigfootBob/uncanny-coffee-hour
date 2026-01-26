import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Hero from '../components/Hero/Hero';
import Team from '../components/Team/Team';
import './Home.scss';

// todo: get images
import coffeeIcon from '../assets/images/bmc-logo-no-background.png'; 
import mugProduct from '../assets/images/emporium-coffeemug.png';
// https://media.giphy.com/media/o7RZbs4KAA6tvM4H6j/giphy.gif

const Home = () => {
  const { t } = useTranslation();
  const [latestEpisode, setLatestEpisode] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null); // the hidden <audio> tag

  useEffect(() => {
    const FEED_URL = 'https://api.rss2json.com/v1/api.json?rss_url=https://feeds.buzzsprout.com/2450457.rss';
    fetch(FEED_URL)
      .then(r => r.json())
      .then(data => {
        const newest = data.items[0];
        setLatestEpisode({
          title: newest.title,
          coverArt: newest.thumbnail || '/default-cover.jpg',
          audioUrl: newest.enclosure.link,
          pubDate: new Date(newest.pubDate).toLocaleDateString()
        });
      })
      .catch(err => console.error("Error fetching RSS:", err));
  }, []);

  const toggleAudio = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <>
    <Hero />
    <div className="home-dashboard">
      <section className="hero-text-layer">
        <h1>{t('hero.title')}</h1>
        <p>
          {t('hero.subtext')}
        </p>
      </section>

      <section className="dashboard-row team-row">
        <Team />
      </section>

      <section className="dashboard-row player-row glass-panel">
        
        {latestEpisode && (
          <audio 
            ref={audioRef} 
            src={latestEpisode.audioUrl} 
            onEnded={() => setIsPlaying(false)} 
          />
        )}

        {latestEpisode && (
            <audio 
              ref={audioRef} 
              src={latestEpisode.audioUrl} 
              onEnded={() => setIsPlaying(false)} 
            />
          )}

          <div className="player-info">
             {latestEpisode ? (
              <img 
                src={latestEpisode.coverArt} 
                alt="Episode Art" 
                className="player-art"
              />
            ) : (
              <div style={{ width: 48, height: 48, background: 'rgba(255,255,255,0.1)', borderRadius: 4 }}></div>
            )}
            <div className="player-text">
              <span className="player-label">{t("homepage.latestbrew")} ({latestEpisode?.pubDate || '...'}) • <Link to="/episodes">{t("homepage.allep")}</Link></span>
              <span className="player-title">
                {latestEpisode ? latestEpisode.title : 'Loading latest episode...'}
              </span>
            </div>
          </div>

        <div className="player-controls">
          <button 
            className="play-btn" 
            onClick={toggleAudio}
            disabled={!latestEpisode}
            style={{ cursor: latestEpisode ? 'pointer' : 'wait' }}
            aria-label={isPlaying ? "Pause" : "Play"}
          >
            {isPlaying ? '⏸' : '▶'}
          </button>

          <div className="waveform-visualizer">
            {Array.from({ length: 40 }).map((_, i) => (
              <span 
                  key={i} 
                  className={isPlaying ? "bar active" : "bar"}
                  style={{ animationDelay: `${i * 0.05}s` }} 
              ></span>
            ))}
          </div>
        </div>

      </section>

      <section className="dashboard-row action-grid">
        <div className="action-card glass-panel patreon-card">
          <h3>{t("homepage.innercircle")}</h3>
          <span className="sub-label">{t("homepage.subpatreon")}</span>
          <div className="tier-list">
            <div className="tier-list">
              <Link 
                to="/coven" 
                state={{ selectedTier: '3' }} 
                className="tier-btn active"
              >
                {t("homepage.pata")}
              </Link>
              
              <Link 
                to="/coven" 
                state={{ selectedTier: '6' }} 
                className="tier-btn"
              >
                {t("homepage.patb")}
              </Link>
              
              <Link 
                to="/coven" 
                state={{ selectedTier: '18' }} 
                className="tier-btn"
              >
                {t("homepage.patc")}
              </Link>
            </div>
          </div>
        </div>

        <div className="action-card glass-panel coffee-card">
          <h3>{t("homepage.buycoffee")}</h3>
          <span className="sub-label">{t("homepage.buycoffeesub")}</span>
          <a 
            href="https://buymeacoffee.com/uncannycoffee" 
            target="_blank" 
            rel="noopener noreferrer"
            className="coffee-icon-container"
            aria-label={t("homepage.buycoffeesupport")}
          >
            <img src={coffeeIcon} alt="Coffee Cup" className="action-icon" />
          </a>
        </div>

        <div className="action-card glass-panel shop-card">
          <div className="shop-text">
            <h3>{t("homepage.emporium")}</h3>
            <p className="sub-label">{t("homepage.odditiesetc")}</p>
            <Link to="/shop" className="shop-btn">{t("homepage.shopnow")}</Link>
          </div>
          <img src={mugProduct} alt="Uncanny Mug" className="shop-image" />
        </div>
      </section>

      <section id="whispering-well" className="dashboard-row parchment-panel">
        <div className="panel-content">
          <h1>{t("homepage.whisperwellhead")}</h1>
          <h2>{t("homepage.whisperwellsubhead")}</h2>
          
          <Link to="/submit" className="parchment-btn">
            {t("homepage.whisperwellsubform")}
          </Link>
        </div>
      </section>

    </div>
    </>
  );
};

export default Home;