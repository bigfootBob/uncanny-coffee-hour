import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import OracleCup from '../Games/OracleCup';
import CryptidMatch from '../Games/CryptidMatch';
import GameModal from '../Games/GameModal';
import ConspiracyBoard from '../Games/ConspiracyBoard';
import { Link } from 'react-router-dom';
import humanAIimg from '../../assets/images/human_ai_assist.png';
import './Footer.scss';

const Footer = () => {
  const { t } = useTranslation();
  const currentYear = new Date().getFullYear();
  const [activeGame, setActiveGame] = useState(null);
  const closeGame = () => setActiveGame(null);

  return (
    <>
      <footer className="site-footer">
        <div className="container">
          
          <p className="footer-text">
            {t('footer.copyright', { year: currentYear })}
          </p>

          <div className="footer-games">
            <button 
              className="game-link" 
              onClick={() => setActiveGame('oracle')}
            >
              🔮 Consult the Oracle
            </button>
            <span className="separator">•</span>
            <button 
              className="game-link" 
              onClick={() => setActiveGame('match')}
            >
              👣 Cryptid Match
            </button>
            <span className="separator">•</span>
            <button 
              className="game-link" 
              onClick={() => setActiveGame('conspiracy')}
            >
              👣 Conspiracy Board
            </button>
          </div>

          <p className="footer-subtext">
            {t('footer.rights')}
          </p>
          
         <Link 
          to="/about" 
          state={{ selectedSection: 'ai' }} 
        >
          <img src={humanAIimg} alt="Human & AI co-created" className='human-ai-img' />
        </Link>
        </div>
      </footer>

      <GameModal isOpen={!!activeGame} onClose={closeGame}>
        {activeGame === 'oracle' && <OracleCup />}
        {activeGame === 'match' && <CryptidMatch />}
        {activeGame === 'conspiracy' && <ConspiracyBoard />}
      </GameModal>

    </>
  );
};

export default Footer;