import './RecipieCard.scss';

const RecipeCard = ({ recipe, onClick }) => {
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
    <div 
      className={`game-tile recipe-tile ${recipe.category.toLowerCase()}`} 
      onClick={() => onClick(recipe)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onClick(recipe);
        }
      }}
    >
      <div className="recipe-icon-wrapper">
        <span className="recipe-emoji">{getEmoji(recipe.category)}</span>
      </div>

      <div className="tile-content">
        <span className="category-badge">{recipe.category}</span>
        <h3>{recipe.name}</h3>
        <p>{recipe.description}</p>
        <button type="button" className="instruction-link">View Brew Guide</button>
      </div>
    </div>
  );
};
export default RecipeCard;