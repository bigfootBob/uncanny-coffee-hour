import React, { useState, useEffect } from 'react';
import { useSwipeable } from 'react-swipeable';
import './CryptidEvolution.scss';

const SIZE = 4;
const TIERS = [
  { val: 2, name: "Ectoplasm", icon: "💧", color: "#a5d6a7" },
  { val: 4, name: "Spirit Orb", icon: "⚪", color: "#81c784" },
  { val: 8, name: "Jackalope", icon: "🐇", color: "#66bb6a" },
  { val: 16, name: "Chupacabra", icon: "🐕", color: "#4caf50" },
  { val: 32, name: "Mothman", icon: "🦋", color: "#43a047" },
  { val: 64, name: "Jersey Devil", icon: "🐴", color: "#2e7d32" },
  { val: 128, name: "Yeti", icon: "❄️", color: "#00acc1" },
  { val: 256, name: "Sasquatch", icon: "👣", color: "#00838f" },
  { val: 512, name: "Ahuizotl", icon: "🐾", color: "#5e35b1" }, 
  { val: 1024, name: "Tako Nyūdō", icon: "🐙", color: "#4527a0" },
  { val: 2048, name: "The Púca", icon: "👺", color: "#d84315" }
];

const CryptidEvolution = () => {
  const [board, setBoard] = useState(
    Array(SIZE).fill().map(() => Array(SIZE).fill(0))
  );
  
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [won, setWon] = useState(false);

  useEffect(() => {
    initGame();
  }, []);

  const initGame = () => {
    const newBoard = Array(SIZE).fill().map(() => Array(SIZE).fill(0));
    addRandomTile(newBoard);
    addRandomTile(newBoard);
    setBoard(newBoard);
    setScore(0);
    setGameOver(false);
    setWon(false);
  };

  const addRandomTile = (currentBoard) => {
    const emptyTiles = [];
    currentBoard.forEach((row, r) => {
      row.forEach((val, c) => {
        if (val === 0) emptyTiles.push({ r, c });
      });
    });

    if (emptyTiles.length === 0) return;
    const { r, c } = emptyTiles[Math.floor(Math.random() * emptyTiles.length)];
    currentBoard[r][c] = Math.random() < 0.9 ? 2 : 4;
  };

  const move = (direction) => {
    if (!board || board.length !== SIZE) return;

    let newBoard = JSON.parse(JSON.stringify(board));
    let moved = false;
    let addedScore = 0;

    const slide = (row) => {
      let arr = row.filter(val => val);
      for (let i = 0; i < arr.length - 1; i++) {
        if (arr[i] === arr[i + 1]) {
          arr[i] *= 2;
          addedScore += arr[i];
          if (arr[i] === 2048) setWon(true);
          arr.splice(i + 1, 1);
        }
      }
      while (arr.length < SIZE) arr.push(0);
      return arr;
    };

    if (direction === "left") {
      for (let r = 0; r < SIZE; r++) {
        const newRow = slide(newBoard[r]);
        if (JSON.stringify(newBoard[r]) !== JSON.stringify(newRow)) moved = true;
        newBoard[r] = newRow;
      }
    } else if (direction === "right") {
      for (let r = 0; r < SIZE; r++) {
        let newRow = newBoard[r].reverse();
        newRow = slide(newRow);
        newRow.reverse();
        if (JSON.stringify(newBoard[r]) !== JSON.stringify(newRow)) moved = true;
        newBoard[r] = newRow;
      }
    } else if (direction === "up") {
      for (let c = 0; c < SIZE; c++) {
        let col = [newBoard[0][c], newBoard[1][c], newBoard[2][c], newBoard[3][c]];
        let newCol = slide(col);
        for (let r = 0; r < SIZE; r++) {
          if (newBoard[r][c] !== newCol[r]) moved = true;
          newBoard[r][c] = newCol[r];
        }
      }
    } else if (direction === "down") {
      for (let c = 0; c < SIZE; c++) {
        let col = [newBoard[0][c], newBoard[1][c], newBoard[2][c], newBoard[3][c]].reverse();
        let newCol = slide(col);
        newCol.reverse();
        for (let r = 0; r < SIZE; r++) {
          if (newBoard[r][c] !== newCol[r]) moved = true;
          newBoard[r][c] = newCol[r];
        }
      }
    }

    if (moved) {
      addRandomTile(newBoard);
      setBoard(newBoard);
      setScore(score + addedScore);
      checkGameOver(newBoard);
    }
  };

  const checkGameOver = (currentBoard) => {
    if (!currentBoard || currentBoard.length !== SIZE) return; 

    for (let r = 0; r < SIZE; r++) {
      for (let c = 0; c < SIZE; c++) {
        if (currentBoard[r][c] === 0) return;
      }
    }
    for (let r = 0; r < SIZE; r++) {
      for (let c = 0; c < SIZE - 1; c++) {
        if (currentBoard[r][c] === currentBoard[r][c + 1]) return;
      }
    }
    for (let c = 0; c < SIZE; c++) {
      for (let r = 0; r < SIZE - 1; r++) {
        if (currentBoard[r][c] === currentBoard[r + 1][c]) return;
      }
    }
    setGameOver(true);
  };

  const getTileData = (val) => TIERS.find(t => t.val === val) || {};

  const handlers = useSwipeable({
    onSwipedLeft: () => move('left'),
    onSwipedRight: () => move('right'),
    onSwipedUp: () => move('up'),
    onSwipedDown: () => move('down'),
    preventDefaultTouchmoveEvent: true,
    trackMouse: true 
  });

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (gameOver || won) return;
      // Prevent default scrolling for arrow keys
      if (["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].includes(e.key)) {
        e.preventDefault();
      }
      switch (e.key) {
        case "ArrowLeft": move("left"); break;
        case "ArrowRight": move("right"); break;
        case "ArrowUp": move("up"); break;
        case "ArrowDown": move("down"); break;
        default: return;
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [board, gameOver, won]); 

  return (
    <div className="cryptid-evolution" {...handlers}>
      <div className="game-header">
        <div className="score-box">
          <span>Containment Level</span>
          <strong>{score}</strong>
        </div>
        <button className="reset-btn" onClick={initGame}>Reset</button>
      </div>

      <div className="game-grid">
        {gameOver && <div className="overlay lose"><h3>Grid Overrun</h3><p>The cryptids have escaped.</p></div>}
        {won && <div className="overlay win"><h3>Containment Achieved!</h3><p>You summoned The Púca!</p></div>}
        
        {board && board.map((row, r) => (
          <div key={r} className="grid-row">
            {row.map((val, c) => {
              const data = getTileData(val);
              return (
                <div 
                  key={c} 
                  className={`grid-cell tier-${val}`} 
                  style={val ? { backgroundColor: data.color } : {}}
                >
                  {val > 0 && (
                    <div className="tile-content">
                      <span className="icon">{data.icon}</span>
                      <span className="name">{data.name}</span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        ))}
      </div>
      <p className="controls-hint">Use Arrow Keys or Swipe to Merge</p>
    </div>
  );
};

export default CryptidEvolution;