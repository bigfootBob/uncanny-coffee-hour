import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import './LoreMasterTrivia.scss';

const LoreMasterTrivia = () => {
  const { t } = useTranslation('trivia');
  
  const [activeQuestions, setActiveQuestions] = useState([]);
  const [currentQ, setCurrentQ] = useState(0);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [selectedOptionIndex, setSelectedOptionIndex] = useState(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    initGame();
  }, [t]);

  const initGame = () => {
    const sessions = t('sessions', { returnObjects: true });
    
    if (sessions && sessions.length > 0) {
      const randomSession = sessions[Math.floor(Math.random() * sessions.length)];
      setActiveQuestions(randomSession.questions);
    }
    
    setScore(0);
    setCurrentQ(0);
    setShowScore(false);
    setIsAnswered(false);
    setSelectedOptionIndex(null);
    setIsLoading(false);
  };

  const handleAnswer = (index) => {
    if (isAnswered) return;

    setSelectedOptionIndex(index);
    setIsAnswered(true);

    if (index === activeQuestions[currentQ].answerIndex) {
      setScore(score + 1);
    }
  };

  const handleNext = () => {
    const nextQ = currentQ + 1;
    if (nextQ < activeQuestions.length) {
      setCurrentQ(nextQ);
      setIsAnswered(false);
      setSelectedOptionIndex(null);
    } else {
      setShowScore(true);
    }
  };

  const getRank = () => {
    if (score === activeQuestions.length) return t('ranks.grand');
    if (score >= Math.floor(activeQuestions.length / 2)) return t('ranks.field');
    return t('ranks.casual');
  };

  if (isLoading || activeQuestions.length === 0) return <div>Loading Archives...</div>;

  const currentQuestionData = activeQuestions[currentQ];

  return (
    <div className="trivia-game">
      {showScore ? (
        <div className="score-section">
          <h2>{t('ui.complete')}</h2>
          <div className="final-score">
            {t('ui.score', { score: score, total: activeQuestions.length })}
          </div>
          <div className="rank-badge">{getRank()}</div>
          <p className="closing-statement">
            {score === activeQuestions.length ? t('ranks.winMsg') : t('ranks.loseMsg')}
          </p>
          <button className="reset-btn" onClick={initGame}>{t('ui.retake')}</button>
        </div>
      ) : (
        <div className="question-section">
          <div className="question-header">
            <span className="q-count">{t('ui.query')} {currentQ + 1}/{activeQuestions.length}</span>
            <span className="q-score">Score: {score}</span>
          </div>
          
          <h3 className="question-text">{currentQuestionData.question}</h3>

          <div className="options-grid">
            {currentQuestionData.options.map((option, index) => {
              let btnClass = "option-btn";
              if (isAnswered) {
                if (index === currentQuestionData.answerIndex) btnClass += " correct";
                else if (index === selectedOptionIndex) btnClass += " wrong";
                else btnClass += " dimmed";
              }

              return (
                <button 
                  key={index} 
                  className={btnClass} 
                  onClick={() => handleAnswer(index)} // Pass da index
                  disabled={isAnswered}
                >
                  {option}
                </button>
              );
            })}
          </div>

          {isAnswered && (
            <div className="lore-reveal">
              <h4>{t('ui.note')}</h4>
              <p>{currentQuestionData.lore}</p>
              <button className="next-btn" onClick={handleNext}>
                {currentQ + 1 === activeQuestions.length ? t('ui.finish') : t('ui.next')}
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default LoreMasterTrivia;