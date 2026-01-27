import React, { useState } from 'react';
import './OracleCup.scss';

const ANSWERS = [
  "The Puca nods yes.",
  "Bigfoot believes.",
  "This makes Bigfoot sad.",
  "Off with ya.",
  "Unclear... try tea.",
  "Ask Dr. Kitsune.",
  "Stars align.",
  "Don't bet on it.",
  "A dark omen.",
  "Mists are thick.",
  "Uncanny!",
  "Fae fear no...",
  "Gnomes point to yes!",
  "Mitch says no."
];

const OracleCup = () => {
const [answer, setAnswer] = useState(null);
const [status, setStatus] = useState('idle');

const handleConsult = () => {
  if (status !== 'idle') return;

  const random = Math.floor(Math.random() * ANSWERS.length);
  setAnswer(ANSWERS[random]);
  setStatus('consulting');

  setTimeout(() => {
    setStatus('resetting');
  }, 4000);

  setTimeout(() => {
    setStatus('idle');
    setAnswer(null);
  }, 6000); 
};

const bubbles = Array.from({ length: 40 }, (_, i) => {
  const num = i < 10 ? `0${i}` : i;
  return <div key={i} className={`bubble bubble-${num}`}></div>;
});

return (
  <div className="oracle-wrapper">
    <h2 className="oracle-title">The Oracle Cup</h2>
    <p className="oracle-instructions">
      {status === 'idle' 
        ? "Tap the cup to reveal your fate..." 
        : "Consulting the spirits..."}
    </p>

    <div className="art-scale-container">
      <article 
        className="oracle-css-art" 
        role="img" 
        aria-label="Oracle Cup"
        onClick={handleConsult}
      >
        {/* THE STAIN */}
        <section className="stain">
          <div className="main-stain"></div>
          <div className="splash-stain"></div>
          <div className={`oracle-msg ${status !== 'idle' ? 'visible' : ''}`}>
              {answer}
          </div>
        </section>

        {/* THE CUP */}
        <section className={`coffee-cup ${status === 'consulting' ? 'moved-out' : ''}`}>
          <div className="handle"></div>
          <div className="cup">
            <div className="coffee">
              <div className="foam"></div>
              <div className="bubbles">
                {bubbles}
              </div>
              {status === 'consulting' && (
                <div className="ripples">
                  <div className="ripple r1"></div>
                  <div className="ripple r2"></div>
                  <div className="ripple r3"></div>
                </div>
              )}
            </div>
          </div>
        </section>
      </article>
    </div>
  </div>
);
};

export default OracleCup;