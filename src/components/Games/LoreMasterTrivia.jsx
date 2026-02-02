import React, { useState, useEffect } from 'react';
import './LoreMasterTrivia.scss';

const QUESTIONS = [
  {
    question: "Which Japanese Yokai appears as a bald, octopus-headed monk?",
    options: ["Kappa", "Tako Nyūdō", "Tengu", "Tanuki"],
    answer: "Tako Nyūdō",
    lore: "The Tako Nyūdō is an octopus yōkai that takes a vaguely humanoid form. Despite looking like a priest, it is actually a giant mollusk in disguise."
  },
  {
    question: "What specific physical trait distinguishes the Ahuizotl?",
    options: ["It has wings made of shadows", "It has a hand at the end of its tail", "It has no face", "It walks backward"],
    answer: "It has a hand at the end of its tail",
    lore: "The Ahuizotl uses the hand on its tail to snatch prey from the water's edge. It resembles a dog or beaver but is far more menacing."
  },
  {
    question: "According to Uncanny Coffee Hour lore, why doesn't Mitch drink the coffee?",
    options: ["He is a ghost", "He prefers tea", "He is allergic", "He spills it every time"],
    answer: "He is allergic",
    lore: "Despite co-hosting a coffee podcast, poor Mitch is allergic to the bean itself. A tragic irony."
  },
  {
    question: "In Irish folklore, what type of creature is 'Saoirse' (the AI character)?",
    options: ["A Banshee", "A Púca", "A Leprechaun", "A Selkie"],
    answer: "A Púca",
    lore: "A Púca is a shape-shifter from Celtic folklore, known for being a trickster spirit that can bring both good and bad fortune."
  },
  {
    question: "What is the best way to ward off a standard malevolent spirit?",
    options: ["Offer it espresso", "Iron and Salt", "Loud Techno Music", "A polite request"],
    answer: "Iron and Salt",
    lore: "Iron represents the strength of the earth, and salt is a purifier. Most entities find this combination quite distasteful."
  }
];

const LoreMasterTrivia = () => {
  const [currentQ, setCurrentQ] = useState(0);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const [isAnswered, setIsAnswered] = useState(false);

  const handleAnswer = (option) => {
    if (isAnswered) return; // no double clicks!

    setSelectedOption(option);
    setIsAnswered(true);

    if (option === QUESTIONS[currentQ].answer) {
      setScore(score + 1);
    }
  };

  const handleNext = () => {
    const nextQ = currentQ + 1;
    if (nextQ < QUESTIONS.length) {
      setCurrentQ(nextQ);
      setIsAnswered(false);
      setSelectedOption(null);
    } else {
      setShowScore(true);
    }
  };

  const resetGame = () => {
    setScore(0);
    setCurrentQ(0);
    setShowScore(false);
    setIsAnswered(false);
    setSelectedOption(null);
  };

  const getRank = () => {
    if (score === 5) return "Rank: Grand Archivist";
    if (score >= 3) return "Rank: Field Researcher";
    return "Rank: Casual Sipper";
  };

  return (
    <div className="trivia-game">
      {showScore ? (
        <div className="score-section">
          <h2>Assessment Complete</h2>
          <div className="final-score">You scored {score} out of {QUESTIONS.length}</div>
          <div className="rank-badge">{getRank()}</div>
          <p className="closing-statement">
            {score === 5 ? "The Lodge welcomes your expertise." : "Consult the archives and return when ready."}
          </p>
          <button className="reset-btn" onClick={resetGame}>Retake Assessment</button>
        </div>
      ) : (
        <div className="question-section">
          <div className="question-header">
            <span className="q-count">Query {currentQ + 1}/{QUESTIONS.length}</span>
            <span className="q-score">Score: {score}</span>
          </div>
          
          <h3 className="question-text">{QUESTIONS[currentQ].question}</h3>

          <div className="options-grid">
            {QUESTIONS[currentQ].options.map((option, index) => {
              let btnClass = "option-btn";
              if (isAnswered) {
                if (option === QUESTIONS[currentQ].answer) btnClass += " correct";
                else if (option === selectedOption) btnClass += " wrong";
                else btnClass += " dimmed";
              }

              return (
                <button 
                  key={index} 
                  className={btnClass} 
                  onClick={() => handleAnswer(option)}
                  disabled={isAnswered}
                >
                  {option}
                </button>
              );
            })}
          </div>

          {isAnswered && (
            <div className="lore-reveal">
              <h4>Archivist Note:</h4>
              <p>{QUESTIONS[currentQ].lore}</p>
              <button className="next-btn" onClick={handleNext}>
                {currentQ + 1 === QUESTIONS.length ? "Finish Assessment" : "Next Query"}
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default LoreMasterTrivia;