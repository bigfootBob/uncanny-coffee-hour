import { useTranslation } from 'react-i18next';
import './RecipieCard.scss';

const RecipeCard = ({ recipe, onClick }) => {
  const { t } = useTranslation();

  // Helper to pick the right emoji
  const getEmoji = (cat) => {
    switch(cat.toLowerCase()) {
      case 'coffee': return '☕';
      case 'tea': return '🍵';
      case 'cocktail': return '🍸';
      case 'spirit-free': return '🍯';
      default: return '✨';
    }
  };

  return (
    // Whole card is clickable for mouse users; keyboard users use the button below
    // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions
    <div 
      className={`game-tile recipe-tile ${recipe.category.toLowerCase()}`} 
      onClick={() => onClick(recipe)}
    >
      <div className="recipe-icon-wrapper" aria-hidden="true">
        <span className="recipe-emoji">{getEmoji(recipe.category)}</span>
      </div>

      <div className="tile-content">
        <span className="category-badge">{recipe.category}</span>
        <h3>{recipe.name}</h3>
        <p>{recipe.description}</p>
        <button
          type="button"
          className="instruction-link"
          onClick={(e) => { e.stopPropagation(); onClick(recipe); }}
          aria-label={`${t('recipiepage.view_guide')}: ${recipe.name}`}
        >
          {t('recipiepage.view_guide')}
        </button>
      </div>
    </div>
  );
};
export default RecipeCard;