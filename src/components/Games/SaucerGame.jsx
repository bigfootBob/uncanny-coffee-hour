import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import './SaucerGame.scss';

const AUDIO_SRC = {
  hover: '/assets/sounds/saucer-hover.mp3',
  beam: '/assets/sounds/tractor-beam.mp3',
  moo: '/assets/sounds/cow-moo.mp3',
  crash: '/assets/sounds/crash.mp3',
  splat: '/assets/sounds/splat.mp3',
  gunshot: '/assets/sounds/gunshot.mp3',
  scream: '/assets/sounds/scream.mp3'
};

const GAME_WIDTH = 800;
const GAME_HEIGHT = 500;
const GROUND_LEVEL = GAME_HEIGHT - 60;
const SAUCER_SPEED = 5;
const BEAM_POWER = 3; 
const GRAVITY = 2;
const FARMER_VARIANTS = ['👨‍🌾', '👩‍🌾', '👨🏻‍🌾', '👩🏿‍🌾', '👨🏾‍🌾', '👩🏻‍🌾', '👴', '👵'];

const LEVELS = [
  { level: 1, target: 500, drainRate: 0.05, spawnRate: 1 },    
  { level: 2, target: 1500, drainRate: 0.08, spawnRate: 2 },   
  { level: 3, target: 3000, drainRate: 0.12, spawnRate: 3 }    
];

const SaucerGame = () => {
  const { t } = useTranslation('games');
  const [gameState, setGameState] = useState('start'); 
  const [score, setScore] = useState(0);
  const [health, setHealth] = useState(100);
  const [fuel, setFuel] = useState(100);
  const [level, setLevel] = useState(1);
  const [crashed, setCrashed] = useState(false);
  const [, setTick] = useState(0);

  // Scaling
  const [scale, setScale] = useState(1);
  const [isPortrait, setIsPortrait] = useState(false);

  const saucerRef = useRef({ x: 350, y: 100, width: 80, height: 40 });
  const cowsRef = useRef([]);
  const farmersRef = useRef([]);
  const bulletsRef = useRef([]);
  const keysPressed = useRef({});
  const isBeamingRef = useRef(false);
  
  const healthRef = useRef(100); 
  const scoreRef = useRef(0);
  const fuelRef = useRef(100);
  const levelRef = useRef(1); 
  const gameLoopRef = useRef();

  // --- AUDIO REFS ---
  const hoverAudio = useRef(new Audio(AUDIO_SRC.hover));
  const beamAudio = useRef(new Audio(AUDIO_SRC.beam));
  const mooAudio = useRef(new Audio(AUDIO_SRC.moo));
  const crashAudio = useRef(new Audio(AUDIO_SRC.crash));
  const splatAudio = useRef(new Audio(AUDIO_SRC.splat));
  const gunshotAudio = useRef(new Audio(AUDIO_SRC.gunshot));
  const screamAudio = useRef(new Audio(AUDIO_SRC.scream));

  useEffect(() => {
    hoverAudio.current.loop = true;
    hoverAudio.current.volume = 0.3;
    beamAudio.current.loop = true;
    beamAudio.current.volume = 0.5;

    // Cleanup
    return () => {
      hoverAudio.current.pause();
      hoverAudio.current.currentTime = 0; 
      beamAudio.current.pause();
      beamAudio.current.currentTime = 0; 
      crashAudio.current.pause();
      crashAudio.current.currentTime = 0; 
      gunshotAudio.current.pause();
      gunshotAudio.current.currentTime = 0;
      splatAudio.current.pause();
      splatAudio.current.currentTime = 0;
      mooAudio.current.pause();
      mooAudio.current.currentTime = 0;
      screamAudio.current.pause();
      screamAudio.current.currentTime = 0;
    };
  }, []);

  useEffect(() => {
    const handleResize = () => {
      const winW = window.innerWidth;
      const winH = window.innerHeight;
      const isVert = winH > winW;
      
      setIsPortrait(isVert);

      const availableWidth = isVert ? winH : winW;
      const availableHeight = isVert ? winW : winH;

      const scaleX = availableWidth / GAME_WIDTH;
      const scaleY = availableHeight / GAME_HEIGHT;
      const newScale = Math.min(scaleX, scaleY) * 0.95;

      setScale(newScale);
    };

    window.addEventListener('resize', handleResize);
    handleResize(); // Init
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleTouchStart = (key) => {
    if (e.cancelable) e.preventDefault();
    keysPressed.current[key] = true;

    if (key === 'Space') {
      isBeamingRef.current = true;
      if (beamAudio.current.paused && gameState === 'playing') {
        beamAudio.current.play().catch(e => {});
      }
    }
  };

  const handleTouchEnd = (key) => {
    keysPressed.current[key] = false;
    if (key === 'Space') {
      isBeamingRef.current = false;
      beamAudio.current.pause();
      beamAudio.current.currentTime = 0;
      beamAudio.current.playbackRate = 1.0; 
    }
  };

  // --- INIT ---
  const startGame = () => {
    setGameState('playing');
    setScore(0);
    setHealth(100);
    setFuel(100);
    setLevel(1);
    setCrashed(false);
   
    healthRef.current = 100;
    scoreRef.current = 0;
    fuelRef.current = 100;
    levelRef.current = 1;
    
    saucerRef.current = { x: GAME_WIDTH / 2 - 40, y: 100, width: 80, height: 40 };
    cowsRef.current = [];
    farmersRef.current = [];
    bulletsRef.current = [];
    
    spawnCow(); spawnCow(); spawnCow();
    spawnFarmer();

    hoverAudio.current.currentTime = 0;
    hoverAudio.current.play().catch(e => console.log("Audio play failed (interact first):", e));

    if (gameLoopRef.current) clearInterval(gameLoopRef.current);
    gameLoopRef.current = setInterval(gameLoop, 1000 / 60); 
  };

  const stopGame = useCallback((result = 'gameover') => {
    if (gameLoopRef.current) {
      clearInterval(gameLoopRef.current);
    }
    
    hoverAudio.current.pause();
    hoverAudio.current.currentTime = 0; 
    
    beamAudio.current.pause();
    beamAudio.current.currentTime = 0; 
    
    crashAudio.current.pause();
    crashAudio.current.currentTime = 0; 
    
    gunshotAudio.current.pause();
    gunshotAudio.current.currentTime = 0;
    
    splatAudio.current.pause();
    splatAudio.current.currentTime = 0;
    
    mooAudio.current.pause();
    mooAudio.current.currentTime = 0;
    
    screamAudio.current.pause();
    screamAudio.current.currentTime = 0;

    if (result === 'gameover') {
      crashAudio.current.play();
    }

    setGameState(result);
  }, []);

  const triggerCrash = () => {
    clearInterval(gameLoopRef.current);
    setCrashed(true);
    
    hoverAudio.current.pause();
    beamAudio.current.pause();
    crashAudio.current.play();

    setTimeout(() => {
      setGameState('gameover');
    }, 1500);
  };

  // --- INPUT ---
  useEffect(() => {
    const handleKeyDown = (e) => {
      // Prevent scrolling for game keys
      if(['ArrowUp','ArrowDown','ArrowLeft','ArrowRight','Space'].includes(e.code)) {
        e.preventDefault();
      }
      keysPressed.current[e.code] = true;
      
      if (e.code === 'Space') {
          isBeamingRef.current = true;
          // Play beam sound if not already playing
          if (beamAudio.current.paused && gameState === 'playing') {
              beamAudio.current.play().catch(e => {});
          }
      }
    };
    
    const handleKeyUp = (e) => {
      keysPressed.current[e.code] = false;
      
      if (e.code === 'Space') {
          isBeamingRef.current = false;
          beamAudio.current.pause();
          beamAudio.current.currentTime = 0;
          beamAudio.current.playbackRate = 1.0; 
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    // CLEANUP
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [gameState]);

  const spawnCow = () => {
    const livingCows = cowsRef.current.filter(c => c.state !== 'splat').length;
    if (livingCows < 5) {
        cowsRef.current.push({
            id: Date.now() + Math.random(),
            x: Math.random() * (GAME_WIDTH - 50),
            y: GROUND_LEVEL - 30,
            width: 50, height: 30,
            state: 'grazing'
          });
    }
  };

  const spawnFarmer = () => {
      if(farmersRef.current.length < LEVELS[levelRef.current - 1].spawnRate) {
        const randomLook = FARMER_VARIANTS[Math.floor(Math.random() * FARMER_VARIANTS.length)];
        farmersRef.current.push({
            id: Date.now() + Math.random(),
            x: Math.random() > 0.5 ? 50 : GAME_WIDTH - 100,
            y: GROUND_LEVEL - 40,
            width: 30, height: 40,
            lastShot: 0,
            direction: Math.random() > 0.5 ? 1 : -1,
            speed: 2 + Math.random(),
            skin: randomLook
          });
      }
  };

  const checkCollision = (rect1, rect2) => {
    return (
      rect1.x < rect2.x + rect2.width &&
      rect1.x + rect1.width > rect2.x &&
      rect1.y < rect2.y + rect2.height &&
      rect1.y + rect1.height > rect2.y
    );
  };

  // --- MAIN GAME LOOP -------
  const gameLoop = () => {
    if (healthRef.current <= 0 || fuelRef.current <= 0) { 
        triggerCrash();
        return; 
    }

    const currentLevelConfig = LEVELS[levelRef.current - 1];
    fuelRef.current -= currentLevelConfig.drainRate;
    setFuel(fuelRef.current); 

    const saucer = saucerRef.current;
    const cows = cowsRef.current;
    const farmers = farmersRef.current;
    const bullets = bulletsRef.current;

    if (keysPressed.current['ArrowLeft']) saucer.x = Math.max(0, saucer.x - SAUCER_SPEED);
    if (keysPressed.current['ArrowRight']) saucer.x = Math.min(GAME_WIDTH - saucer.width, saucer.x + SAUCER_SPEED);
    if (keysPressed.current['ArrowUp']) saucer.y = Math.max(0, saucer.y - SAUCER_SPEED);
    if (keysPressed.current['ArrowDown']) saucer.y = Math.min(GROUND_LEVEL - saucer.height - 50, saucer.y + SAUCER_SPEED);

    const beamRect = {
        x: saucer.x + saucer.width / 4,
        y: saucer.y + saucer.height,
        width: saucer.width / 2,
        height: GAME_HEIGHT - saucer.y
    };

    const isLiftingSomething = cows.some(c => c.state === 'beaming');
    
    if (isBeamingRef.current && !beamAudio.current.paused) {
        if (isLiftingSomething) {
            // Labored Sound
            beamAudio.current.playbackRate = 0.6; 
        } else {
            // Normal Sound
            beamAudio.current.playbackRate = 1.0;
        }
    }

    cows.forEach((cow, index) => {
      if (isBeamingRef.current && checkCollision(cow, beamRect) && cow.state !== 'splat') {
          // --- BEAMING UP LOGIC ---
          cow.state = 'beaming';
          cow.y -= BEAM_POWER;
          if (checkCollision(cow, saucer)) {
            scoreRef.current += 100;
            setScore(scoreRef.current);
            
            mooAudio.current.currentTime = 0;
            mooAudio.current.volume = 0.3; 
            mooAudio.current.play();

            fuelRef.current = Math.min(100, fuelRef.current + 20);

            if (scoreRef.current >= currentLevelConfig.target) {
              if (levelRef.current < 3) {
                  levelRef.current += 1;
                  setLevel(levelRef.current);
                  spawnFarmer();
              } else {
                  stopGame('win');
                  return;
              }
            }

            cows.splice(index, 1); 
            spawnCow(); 
            spawnFarmer();
          }
      } else {
          // --- FALLING / GRAZING LOGIC ---
          if (cow.y < GAME_HEIGHT / 2 && cow.state !== 'splat') cow.state = 'falling-death';
          if (cow.state !== 'falling-death' && cow.state !== 'splat') cow.state = 'grazing';
          
          // Check for Cow Bombing (While in air)
          if (cow.y < GROUND_LEVEL - 30) {
            for (let f = farmers.length - 1; f >= 0; f--) {
              if (checkCollision(cow, farmers[f])) {
                // CRUSH THE FARMER
                farmers.splice(f, 1); 
                
                scoreRef.current += 50; 
                setScore(scoreRef.current);
                
                screamAudio.current.currentTime = 0;
                screamAudio.current.volume = 0.5; 
                screamAudio.current.play().catch(e => {});

                splatAudio.current.currentTime = 0;
                splatAudio.current.volume = 0.4; 
                splatAudio.current.play().catch(e => {});

                cow.state = 'falling-death';
              }
            }
          }

          if (cow.y < GROUND_LEVEL - 30) {
            const fallSpeed = cow.state === 'falling-death' ? GRAVITY * 1.5 : GRAVITY;
            cow.y = Math.min(GROUND_LEVEL - 30, cow.y + fallSpeed);
          } else {
            if (cow.state === 'falling-death') {
              cow.state = 'splat';

              splatAudio.current.currentTime = 0; 
              splatAudio.current.volume = 0.6; 
              splatAudio.current.play().catch(e => {});

              spawnCow();
            }
          }
      }
    });

    const playSound = (audioRef) => {
      if (audioRef.current) {
        const clone = audioRef.current.cloneNode();
        clone.volume = audioRef.current.volume;
        clone.play().catch(e => {}); 
      }
    };

    const now = Date.now();
    farmers.forEach(farmer => {
        farmer.x += farmer.speed * farmer.direction;
        if (farmer.x <= 0) farmer.direction = 1;
        else if (farmer.x + farmer.width >= GAME_WIDTH) farmer.direction = -1;

        if (now - farmer.lastShot > 2000) {
            bullets.push({ x: farmer.x + farmer.width/2, y: farmer.y, speed: 8 });
            farmer.lastShot = now;

            gunshotAudio.current.currentTime = 0;
            gunshotAudio.current.volume = 0.6; 
            // gunshotAudio.current.play().catch(e => {});
            playSound(gunshotAudio);
        }
    });

    for (let i = bullets.length - 1; i >= 0; i--) {
        bullets[i].y -= bullets[i].speed;
        if (checkCollision({x: bullets[i].x, y: bullets[i].y, width: 5, height: 10}, saucer)) {
            healthRef.current -= 20;
            setHealth(healthRef.current);
            bullets.splice(i, 1);
            continue;
        }
        if (bullets[i].y < 0) bullets.splice(i, 1);
    }

    setTick(t => t + 1); 
  };

  return (
    <div className="saucer-game-container" style={{ width: GAME_WIDTH, height: GAME_HEIGHT }}>
      {gameState === 'start' && (
        <div className="screen start-screen">
          <h1>Midnight Harvest</h1>
          <p>Collect Cow Juice to stay airborne.</p>
          <button onClick={startGame}>Start Level 1</button>
        </div>
      )}

      {gameState === 'gameover' && (
        <div className="screen end-screen">
          <h1 style={{color: '#ff4444'}}>Mission Failed</h1>
          <p>{health <= 0 ? "Hull Destroyed" : "Out of Fuel"}</p>
          <p>Score: {score}</p>
          <button onClick={startGame}>Retry Level {level}</button>
        </div>
      )}

      {gameState === 'win' && (
        <div className="screen end-screen">
          <h1 style={{color: '#ff00ff'}}>Harvest Complete!</h1>
          <p>You have conquered the valley.</p>
          <p>Final Score: {score}</p>
          <button onClick={startGame}>Play Again</button>
        </div>
      )}
      
      <div className="game-world">
        <div className="scenery">
            <div className="mountain range-left"></div>
            <div className="mountain range-right"></div>
            <div className="barn" style={{ left: 50, bottom: 60 }}>
                <div className="roof"></div>
                <div className="body"><div className="door"></div></div>
            </div>
            <div className="tree" style={{ left: 200 }}>🌲</div>
            <div className="tree" style={{ left: 250, transform: 'scale(0.8)' }}>🌲</div>
            <div className="tree" style={{ right: 100 }}>🌲</div>
            <div className="tree" style={{ right: 50, transform: 'scale(1.2)' }}>🌲</div>
            <div className="tree" style={{ right: 300, }}>🌳</div>
        </div>

        <div className="stars"></div>

        <div className="ui-bar">
            <div className="stat-row">
                <div className="bar-container">
                    <span>HULL</span>
                    <div className="bar-track">
                        <div className="bar-fill hull" style={{width: `${Math.max(0, health)}%`}}></div>
                    </div>
                </div>
                <div className="score">Level {level} | Score: {score}</div>
            </div>
            <div className="stat-row">
                <div className="bar-container">
                    <span>FUEL</span>
                    <div className="bar-track">
                        <div className="bar-fill fuel" style={{width: `${Math.max(0, fuel)}%`}}></div>
                    </div>
                </div>
                <div className="score" style={{fontSize: '0.8rem', color: '#aaa'}}>Target: {LEVELS[level-1].target}</div>
            </div>
        </div>

        <div 
             className={`entity saucer ${isBeamingRef.current ? 'shaking' : ''} ${crashed ? 'crashed' : ''}`}
             style={{ 
               left: saucerRef.current.x, 
               top: crashed ? undefined : saucerRef.current.y, 
               width: saucerRef.current.width, 
               height: saucerRef.current.height,
               '--crash-start-y': `${saucerRef.current.y}px`
             }}
        >
             🛸
             {isBeamingRef.current && !crashed && <div className="tractor-beam"></div>}
        </div>

        {cowsRef.current.map(cow => (
            <div key={cow.id} className={`entity cow ${cow.state}`}
                 style={{ left: cow.x, top: cow.y, width: cow.width, height: cow.height }}>
                 🐄
            </div>
        ))}

        {farmersRef.current.map(farmer => (
          <div key={farmer.id} className="entity farmer"
              style={{ 
                left: farmer.x, top: farmer.y, width: farmer.width, height: farmer.height,
                transform: farmer.direction === -1 ? 'scaleX(-1)' : 'scaleX(1)' 
              }}>
              {farmer.skin}
          </div>
        ))}
         
        {bulletsRef.current.map((bullet, i) => (
          <div key={i} className="entity bullet" style={{ left: bullet.x, top: bullet.y }}></div>
        ))}

        <div className="ground" style={{ top: GROUND_LEVEL, height: GAME_HEIGHT - GROUND_LEVEL }}></div>

        <div className="mobile-controls">
          <div className="d-pad">
            <button 
              onTouchStart={(e) => handleTouchStart(e, 'ArrowUp')} 
              onTouchEnd={(e) => handleTouchEnd(e, 'ArrowUp')}
            >⬆️</button>
            <div className="horizontal">
              <button onTouchStart={() => handleTouchStart('ArrowLeft')} onTouchEnd={() => handleTouchEnd('ArrowLeft')}>⬅️</button>
              <button onTouchStart={() => handleTouchStart('ArrowRight')} onTouchEnd={() => handleTouchEnd('ArrowRight')}>➡️</button>
            </div>
            <button onTouchStart={() => handleTouchStart('ArrowDown')} onTouchEnd={() => handleTouchEnd('ArrowDown')}>⬇️</button>
          </div>
          <div className="action-btn">
            <button 
              className={isBeamingRef.current ? 'active' : ''}
              onTouchStart={() => handleTouchStart('Space')} 
              onTouchEnd={() => handleTouchEnd('Space')}
            >
              {t('saucer.beam')}
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};

export default SaucerGame;