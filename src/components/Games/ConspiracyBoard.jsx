import React, { useState, useEffect } from 'react';
import './ConspiracyBoard.scss';

const DAILY_PUZZLE = [
  {
    category: "Coffee Roasts",
    items: ["Blonde", "City", "French", "Espresso"],
    difficulty: 1 // 1 = Easy (Green), 4 = Hard (Purple)
  },
  {
    category: "Cryptids with Wings",
    items: ["Mothman", "Jersey Devil", "Thunderbird", "Owlman"],
    difficulty: 2
  },
  {
    category: "Podcast Hosts",
    items: ["Odd Bob", "Dr. Kitsune", "Mitch", "Soercia"],
    difficulty: 3
  },
  {
    category: "Types of Yokai",
    items: ["Tengu", "Kappa", "Oni", "Tako Nyudo"],
    difficulty: 4
  }
];

const ConspiracyBoard = () => {
  const [gridItems, setGridItems] = useState([]);
  const [selected, setSelected] = useState([]);
  const [solvedGroups, setSolvedGroups] = useState([]);
  const [mistakes, setMistakes] = useState(4);
  const [gameStatus, setGameStatus] = useState('playing');

  useEffect(() => {
    let allItems = DAILY_PUZZLE.flatMap(group => 
      group.items.map(item => ({ word: item, group: group.category, diff: group.difficulty }))
    );
    for (let i = allItems.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [allItems[i], allItems[j]] = [allItems[j], allItems[i]];
    }
    setGridItems(allItems);
  }, []);

  const handleSelect = (item) => {
    if (gameStatus !== 'playing') return;
    
    if (selected.includes(item)) {
      setSelected(selected.filter(i => i !== item));
      return;
    }

    if (selected.length < 4) {
      setSelected([...selected, item]);
    }
  };

  const handleSubmit = () => {
    if (selected.length !== 4) return;

    const firstGroup = selected[0].group;
    const isMatch = selected.every(item => item.group === firstGroup);

    if (isMatch) {
      const newSolved = DAILY_PUZZLE.find(g => g.category === firstGroup);
      setSolvedGroups([...solvedGroups, newSolved]);

      setGridItems(gridItems.filter(item => !selected.includes(item)));
      setSelected([]);

      if (solvedGroups.length + 1 === DAILY_PUZZLE.length) {
        setGameStatus('won');
      }
    } else {
      setMistakes(prev => prev - 1);
      setSelected([]); // TODO add a "shake" animation
      
      if (mistakes - 1 === 0) {
        setGameStatus('lost');
      }
    }
  };

  return (
    <div className="conspiracy-board">
      <h2 className="game-title">The Conspiracy Board</h2>
      <p className="instructions">Group the 16 items into 4 categories.</p>

      <div className="solved-container">
        {solvedGroups.map((group, idx) => (
          <div key={idx} className={`solved-row difficulty-${group.difficulty}`}>
            <h3>{group.category}</h3>
            <p>{group.items.join(', ')}</p>
          </div>
        ))}
      </div>

      {gameStatus !== 'won' && (
        <div className="grid-container">
          {gridItems.map((item, idx) => (
            <button
              key={idx}
              className={`grid-card ${selected.includes(item) ? 'active' : ''}`}
              onClick={() => handleSelect(item)}
              disabled={gameStatus === 'lost'}
            >
              {item.word}
            </button>
          ))}
        </div>
      )}

      <div className="controls">
        <div className="lives">
          Mistakes Remaining: 
          {[...Array(mistakes)].map((_, i) => <span key={i} className="dot">●</span>)}
        </div>
        
        {gameStatus === 'playing' && (
          <div className="buttons">
            <button onClick={() => setSelected([])} disabled={selected.length === 0}>Deselect</button>
            <button onClick={handleSubmit} disabled={selected.length !== 4} className="submit-btn">Submit</button>
          </div>
        )}

        {gameStatus === 'lost' && <div className="result-msg lose">The Truth Escaped You.</div>}
        {gameStatus === 'won' && <div className="result-msg win">Case Closed. Excellent Work.</div>}
      </div>
    </div>
  );
};

export default ConspiracyBoard;