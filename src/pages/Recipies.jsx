import React, { useState } from 'react';
import Hero from '../components/Hero/Hero';
import { useTranslation } from 'react-i18next';
import RecipieData from '../data/recipies.json';
import SEO from '../components/SEO/SEO';
import RecipeCard from '../components/Recipies/RecipieCard';
import GameModal from '../components/Games/GameModal';
import './Recipies.scss';

const Recipies = () => {
  const { t } = useTranslation();
  const [selectedRecipe, setSelectedRecipe] = useState(null);

  return (
    <>

      <SEO
        title="Uncanny Coffee Hour Recipies!"
        description="Browse through Saoirse, Odd Bob, and Dr. Kitsune's recipies from the Uncanny Coffee Podcast show."
      />

      <Hero />

      <div id="recipie-page" className="page-container">
        <div className="page-header glass-panel">
          <h1>{t('recipiepage.title')}</h1>
          <p>{t('recipiepage.subhead')}</p>
        </div>

        <div className="tiers-grid-wrapper">
          <div className="games-page container">
            <div className="games-grid">
              {RecipieData.map(recipe => (
                <RecipeCard 
                  key={recipe.id} 
                  recipe={recipe} 
                  onClick={setSelectedRecipe} 
                />
              ))}
            </div>

            {selectedRecipe && (
              <GameModal isOpen={!!selectedRecipe} onClose={() => setSelectedRecipe(null)} showPrint={true}>
                <div className="recipe-modal-content">
                  <h2>{selectedRecipe.name}</h2>
                  <p className="vibe-text">"{selectedRecipe.vibe}"</p>
                  
                  <h4>Ingredients</h4>
                  <ul>
                    {selectedRecipe.ingredients.map((ing, i) => <li key={i}>{ing}</li>)}
                  </ul>

                  <h4>Instructions</h4>
                  <ol>
                    {selectedRecipe.instructions.map((step, i) => <li key={i}>{step}</li>)}
                  </ol>
                </div>
              </GameModal>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Recipies;