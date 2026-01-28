import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import Hero from '../components/Hero/Hero'; 
import SEO from '../components/SEO/SEO';
import GameModal from '../components/Games/GameModal'; 
import OracleCup from '../components/Games/OracleCup';
import CryptidMatch from '../components/Games/CryptidMatch';
import ConspiracyBoard from '../components/Games/ConspiracyBoard';
import './Games.scss';

const Games = () => {
  const [activeGame, setActiveGame] = useState(null);

  const games = [
    {
      id: 'oracle',
      title: 'The Oracle Cup',
      description: 'Gaze into the coffee grounds. Let the dregs reveal your fortune.',
      component: <OracleCup />,
      status: 'active', 
      icon: '☕'
    },
    {
      id: 'conspiracy',
      title: 'Conspiracy Board',
      description: 'Connect the clues. Group the cryptids. Uncover the truth.',
      component: <ConspiracyBoard />,
      status: 'active',
      icon: '📌'
    },
    {
      id: 'snap',
      title: 'Cryptid Snap',
      description: 'Capture photographic evidence of the paranormal before it vanishes.',
      component: null,
      status: 'coming-soon',
      icon: '📸'
    },
    {
      id: 'trivia',
      title: 'Lore Master Trivia',
      description: 'Test your knowledge of the Uncanny Coffee Hour deep lore.',
      component: null,
      status: 'coming-soon',
      icon: '❓'
    },
     {
      id: 'run',
      title: 'Cryptid Match',
      description: 'Escape the Pacific Northwest forest before your coffee spills.',
      component: <CryptidMatch />,
      status: 'active',
      icon: '🌲'
    },
    {
      id: 'tycoon',
      title: 'Cafe Tycoon',
      description: 'Manage a haunted coffee shop. Serve ghouls, earn souls.',
      component: null,
      status: 'coming-soon',
      icon: '💰'
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

  return (
    <>

    <SEO 
      title="Uncanny Coffee Hour Past Episodes" 
      description="Listen to Odd Bob, Dr. Kitsune & Soercia, the voices behind the madness."
    />

    <Hero />

    <div className="games-page container">
      <div className="games-header">
        <h1 className="page-title">The Arcade</h1>
        <p className="page-subtitle">Pass the time while your coffee brews.</p>
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
            <div className="tile-icon">{game.icon}</div>
            <div className="tile-content">
              <h3>{game.title}</h3>
              <p>{game.description}</p>
              {game.status === 'coming-soon' && <span className="badge">Coming Soon</span>}
            </div>
          </div>
        ))}
      </div>

      {activeGame && (
        <GameModal isOpen={!!activeGame} onClose={closeGame}>
          {activeGame.component}
        </GameModal>
      )}
    </div>
    </>
  );
};

export default Games;