import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import './CryptidMatch.scss';

const CARDS = [
  { id: 1, content: '👣', name: 'Bigfoot' },
  { id: 2, content: '🛸', name: 'UFO' },
  { id: 3, content: '☕', name: 'Coffee' },
  { id: 4, content: '👻', name: 'Ghost' },
  { id: 5, content: '🎙️', name: 'Mic' },
  { id: 6, content: '🌲', name: 'Pine' },
];

const CryptidMatch = () => {
  const { t } = useTranslation('games');
  const [cards, setCards] = useState(() => {
    return [...CARDS, ...CARDS]
      .sort(() => Math.random() - 0.5)
      .map((card) => ({ ...card, uniqueId: Math.random() }));
  });
  const [flipped, setFlipped] = useState([]);
  const [solved, setSolved] = useState([]);
  const [disabled, setDisabled] = useState(false);

  const shuffleCards = () => {
    const deck = [...CARDS, ...CARDS]
      .sort(() => Math.random() - 0.5)
      .map((card) => ({ ...card, uniqueId: Math.random() }));
    
    setCards(deck);
    setFlipped([]);
    setSolved([]);
  };


  const handleClick = (id) => {
    if (disabled || flipped.includes(id)) return;

    const newFlipped = [...flipped, id];
    setFlipped(newFlipped);

    if (newFlipped.length === 2) {
      setDisabled(true);
      const [firstId, secondId] = newFlipped;
      
      const card1 = cards.find(c => c.uniqueId === firstId);
      const card2 = cards.find(c => c.uniqueId === secondId);

      if (card1.id === card2.id) {
        setSolved([...solved, card1.id]);
        setFlipped([]);
        setDisabled(false);
      } else {
        setTimeout(() => {
          setFlipped([]);
          setDisabled(false);
        }, 1000);
      }
    }
  };

  const isWon = solved.length === CARDS.length;

  return (
    <div className="memory-game glass-panel">
      <h2>{t('match.title')}</h2>
      <div className="game-grid">
        {cards.map((card) => {
          const isFlipped = flipped.includes(card.uniqueId);
          const isSolved = solved.includes(card.id);

          return (
            <div 
              key={card.uniqueId}
              className={`card ${isFlipped ? 'flipped' : ''} ${isSolved ? 'solved' : ''}`}
              role="button"
              tabIndex={0}
              onClick={() => !isSolved && handleClick(card.uniqueId)}
              onKeyDown={(e) => {
                if (!isSolved && (e.key === 'Enter' || e.key === ' ')) {
                  e.preventDefault();
                  handleClick(card.uniqueId);
                }
              }}
            >
              <div className="card-inner">
                <div className="card-front">?</div>
                <div className="card-back">{card.content}</div>
              </div>
            </div>
          );
        })}
      </div>
      
      {isWon && (
        <div className="winner-message">
          <h3>{t('match.uncanny')}</h3>
          <button onClick={shuffleCards}>{t('common.playagain')}</button>
        </div>
      )}
    </div>
  );
};

export default CryptidMatch;