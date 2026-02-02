import React, { useState } from 'react';
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
import './Games.scss';

const Games = () => {
  const { t } = useTranslation('games'); 
  const [activeGame, setActiveGame] = useState(null);
  const [instructionData, setInstructionData] = useState(null);

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
      title="Uncanny Coffee Hour Past Episodes" 
      description="Listen to Odd Bob, Dr. Kitsune & Soercia, the voices behind the madness."
    />

    <Hero />

    <div className="games-page container">
      <div className="games-header">
        <h1 className="page-title">{t(`page.title`)}</h1>
        <p className="page-subtitle">{t(`page.subtitle`)}</p>
      </div>
      
      <div className="games-grid">
        {games.map((game) => (
          <div 
            key={game.id} 
            className={`game-tile ${game.status}`}
            onClick={() => handleOpenGame(game)}
            role="button"
            tabIndex={game.status === 'active' ? 0 : -1}
          >
            <div className="tile-icon">
              <img 
                src={game.image} 
                alt={t(`${game.id}.title`)} 
                className="game-icon-img" 
              />
              </div>

            <div className="tile-content">
              <h3>{t(`${game.id}.title`)}</h3>
              <p>{t(`${game.id}.description`)}</p>
              {game.status === 'coming-soon' && <span className="badge">Coming Soon</span>}
              {game.status === 'active' && (
                    <button 
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
        <GameModal isOpen={!!activeGame} onClose={closeGame}>
          {activeGame.id === 'conspiracy' && <ConspiracyBoard />}
          {activeGame.id === 'evolution' && <CryptidEvolution />}
          {activeGame.id === 'match' && <CryptidMatch />}
          {activeGame.id === 'oracle' && <OracleCup />}
          {activeGame.id === 'saucer' && <SaucerGame />}
          {activeGame.id === 'trivia' && <LoreMasterTrivia />}
        </GameModal>
      )}

      {instructionData && (
        <div className="instruction-modal-overlay" onClick={() => setInstructionData(null)}>
            <div className="instruction-modal" onClick={(e) => e.stopPropagation()}>
                <h2>{t(`${instructionData.id}.title`)}</h2>
                <div className="instruction-body">
                    <p>{t(`${instructionData.id}.instructions`)}</p>
                </div>
                <button className="close-btn" onClick={() => setInstructionData(null)}>
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