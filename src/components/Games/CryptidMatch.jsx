import React, { useState, useEffect } from 'react';
import './CryptidMatch.scss';

// The items to match
const CARDS = [
  { id: 1, content: '👣', name: 'Bigfoot' },
  { id: 2, content: '🛸', name: 'UFO' },
  { id: 3, content: '☕', name: 'Coffee' },
  { id: 4, content: '👻', name: 'Ghost' },
  { id: 5, content: '🎙️', name: 'Mic' },
  { id: 6, content: '🌲', name: 'Pine' },
];

const CryptidMatch = () => {
  const [cards, setCards] = useState([]);
  const [flipped, setFlipped] = useState([]);
  const [solved, setSolved] = useState([]);
  const [disabled, setDisabled] = useState(false);

  // Initialize Game
  const shuffleCards = () => {
    // Duplicate cards to make pairs
    const deck = [...CARDS, ...CARDS]
      .sort(() => Math.random() - 0.5)
      .map((card) => ({ ...card, uniqueId: Math.random() }));
    
    setCards(deck);
    setFlipped([]);
    setSolved([]);
  };

  useEffect(() => {
    shuffleCards();
  }, []);

  // Handle Card Click
  const handleClick = (id) => {
    if (disabled || flipped.includes(id)) return;

    const newFlipped = [...flipped, id];
    setFlipped(newFlipped);

    // If 2 cards are flipped, check for match
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
      <h2>Cryptid Match</h2>
      <div className="game-grid">
        {cards.map((card) => (
          <div 
            key={card.uniqueId}
            className={`card ${flipped.includes(card.uniqueId) || solved.includes(card.id) ? 'active' : ''}`}
            onClick={() => !solved.includes(card.id) && handleClick(card.uniqueId)}
          >
            <div className="card-inner">
              <div className="card-front">?</div>
              <div className="card-back">{card.content}</div>
            </div>
          </div>
        ))}
      </div>
      
      {isWon && (
        <div className="winner-message">
          <h3>Uncanny Skill!</h3>
          <button onClick={shuffleCards}>Play Again</button>
        </div>
      )}
    </div>
  );
};

export default CryptidMatch;