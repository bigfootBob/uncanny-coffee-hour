import React, { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import Hero from '../components/Hero/Hero';
import SEO from '../components/SEO/SEO';
import GameModal from '../components/Games/GameModal';
import OracleCup from '../components/Games/OracleCup';
import LoreMasterTrivia from '../components/Games/LoreMasterTrivia';
import CryptidMatch from '../components/Games/CryptidMatch';
import ConspiracyBoard from '../components/Games/ConspiracyBoard';
import CryptidEvolution from '../components/Games/CryptidEvolution';
import SaucerGame from '../components/Games/SaucerGame';
import Announcement from '../components/Announcement/Announcement';
import './Games.scss';

const Games = () => {
  const { t } = useTranslation('games');
  const [activeGame, setActiveGame] = useState(null);
  const [instructionData, setInstructionData] = useState(null);
  const instructionCloseRef = useRef(null);

  // Instruction dialog: focus the close button on open, Escape closes, focus returns on close
  useEffect(() => {
    if (!instructionData) return;
    const previouslyFocused = document.activeElement;
    instructionCloseRef.current?.focus();
    const handleEsc = (e) => { if (e.key === 'Escape') setInstructionData(null); };
    window.addEventListener('keydown', handleEsc);
    return () => {
      window.removeEventListener('keydown', handleEsc);
      if (previouslyFocused instanceof HTMLElement) previouslyFocused.focus();
    };
  }, [instructionData]);

  const games = [
    {
      id: 'oracle',
      status: 'active',
      icon: '☕',
      image: '/assets/images/games/oracle.jpg'
    },
    {
      id: 'conspiracy',
      status: 'active',
      icon: '📌',
      image: '/assets/images/games/conspiracy.jpg'
    },
    {
      id: 'evolution',
      status: 'active',
      icon: '🧬',
      image: '/assets/images/games/evolution.jpg'
    },
    {
      id: 'trivia',
      status: 'active',
      icon: '❓',
      image: '/assets/images/games/trivia.jpg'
    },
    {
      id: 'match',
      status: 'active',
      icon: '🌲',
      image: '/assets/images/games/match.jpg'
    },
    {
      id: 'saucer',
      status: 'active',
      icon: '🛸',
      image: '/assets/images/games/saucer.jpg'
    }
  ];

  const handleOpenGame = (game) => {
    if (game.status === 'active') {
      setActiveGame(game);
    }
  };

  const closeGame = () => {
    setActiveGame(null);
  };

  const handleOpenInstructions = (e, game) => {
    e.stopPropagation(); // no start bitte
    setInstructionData(game);
  };

  return (
    <>

      <SEO
        title="Games"
        description="Listen to Odd Bob, Dr. Kitsune & Saoirse, the voices behind the madness."
      />

      <Hero />
      
      <div className="games-page container">

        <Announcement 
          icon="🐘" 
          message="Need to clear your mind? Feed your nightmares to the Baku."
          linkText="Visit the Worry Eater"
          linkUrl="https://silvanian.art/"
        />

        <div className="games-header">
          <h1 className="page-title">{t(`page.title`)}</h1>
          <p className="page-subtitle">{t(`page.subtitle`)}</p>
        </div>

        <div className="games-grid">
          {games.map((game) => (
            // Whole tile is clickable for mouse users; keyboard users use the title button
            // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions
            <div
              key={game.id}
              className={`game-tile ${game.status}`}
              onClick={() => handleOpenGame(game)}
            >
              <div className="tile-icon">
                <img
                  src={game.image}
                  alt=""
                  className="game-icon-img"
                />
              </div>

              <div className="tile-content">
                <h3>
                  {game.status === 'active' ? (
                    <button
                      type="button"
                      className="tile-title-btn"
                      onClick={(e) => { e.stopPropagation(); handleOpenGame(game); }}
                    >
                      {t(`${game.id}.title`)}
                    </button>
                  ) : t(`${game.id}.title`)}
                </h3>
                <p>{t(`${game.id}.description`)}</p>
                {game.status === 'coming-soon' && <span className="badge">{t('status.comingSoon')}</span>}
                {game.status === 'active' && (
                  <button
                    type="button"
                    className='instruction-link'
                    onClick={(e) => handleOpenInstructions(e, game)}
                  >
                    {t('page.instructionsLabel')}
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>

        {activeGame && (
          <GameModal isOpen={!!activeGame} onClose={closeGame} title={t(`${activeGame.id}.title`)}>
            {activeGame.id === 'conspiracy' && <ConspiracyBoard />}
            {activeGame.id === 'evolution' && <CryptidEvolution />}
            {activeGame.id === 'match' && <CryptidMatch />}
            {activeGame.id === 'oracle' && <OracleCup />}
            {activeGame.id === 'saucer' && <SaucerGame />}
            {activeGame.id === 'trivia' && <LoreMasterTrivia />}
          </GameModal>
        )}

        {instructionData && (
          // Backdrop click closes; keyboard users close with Escape or the close button
          // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions
          <div
            className="instruction-modal-overlay"
            onClick={() => setInstructionData(null)}
          >
            {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-noninteractive-element-interactions */}
            <div
              className="instruction-modal"
              onClick={(e) => e.stopPropagation()}
              role="dialog"
              aria-modal="true"
              aria-labelledby="modal-title"
            >
              <h2 id="modal-title">{t(`${instructionData.id}.title`)}</h2>
              <div className="instruction-body">
                <p>{t(`${instructionData.id}.instructions`)}</p>
              </div>
              <button ref={instructionCloseRef} className="close-btn" onClick={() => setInstructionData(null)}>
                {t('status.close')}
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Games;