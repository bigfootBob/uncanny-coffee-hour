import React, { useState, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import './OracleCup.scss';

const OracleCup = () => {
  const { t } = useTranslation('games');
  const pullAnswers = t('oracle.answers', { returnObjects: true });
  const ANSWERS = Array.isArray(pullAnswers) ? pullAnswers : [];
  const [answer, setAnswer] = useState(null);
  const [status, setStatus] = useState('idle');
  const lastIndex = useRef(null);

  const handleConsult = () => {
    if (status === 'consulting') {
      setStatus('idle');
      setTimeout(() => setAnswer(null), 500); 
      return;
    }

    if (ANSWERS.length === 0) return;

    let newIndex = Math.floor(Math.random() * ANSWERS.length);

    if (newIndex === lastIndex.current) {
      newIndex = (newIndex + 1) % ANSWERS.length;
    }

    lastIndex.current = newIndex;

    setAnswer(ANSWERS[newIndex]);
    setStatus('consulting');
  };

  const bubbles = Array.from({ length: 40 }, (_, i) => {
    const num = i < 10 ? `0${i}` : i;
    return <div key={i} className={`bubble bubble-${num}`}></div>;
  });

  return (
    <div className="oracle-wrapper">
      <h2 className="oracle-title">{t('oracle.title')}</h2>
      <p className="oracle-instructions">
        {status === 'idle' 
          ? t('oracle.idle-new')
          : t('oracle.idle-reset')}
      </p>

      <div className="art-scale-container">
        <article 
          className="oracle-css-art" 
          role="img" 
          aria-label="Oracle Cup"
          onClick={handleConsult}
        >

          <section className="stain">
            <div className="main-stain"></div>
            <div className="splash-stain"></div>
            <div className={`oracle-msg ${status === 'consulting' ? 'visible' : ''}`}>
                {answer}
            </div>
          </section>

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