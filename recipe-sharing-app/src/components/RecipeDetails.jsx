import React from 'react';
import { useRecipeStore } from './recipeStore';
import EditRecipeForm from './EditRecipeForm';
import DeleteRecipeButton from './DeleteRecipeButton';

const RecipeDetails = ({ recipeId }) => {
  const recipe = useRecipeStore(state =>
    state.recipes.find(r => r.id === recipeId)
  );
  const favorites = useRecipeStore(state => state.favorites);
  const addFavorite = useRecipeStore(state => state.addFavorite);
  const removeFavorite = useRecipeStore(state => state.removeFavorite);

  if (!recipe) return <p>Recipe not found</p>;

  const isFavorited = favorites.includes(recipe.id);

  const handleFavoriteClick = () => {
    isFavorited ? removeFavorite(recipe.id) : addFavorite(recipe.id);
  };

  return (
    <div>
      <h1>{recipe.title}</h1>
      <p>{recipe.description}</p>

      <button onClick={handleFavoriteClick}>
        {isFavorited ? 'Unfavorite' : 'Favorite'}
      </button>

      <EditRecipeForm recipe={recipe} />
      <DeleteRecipeButton id={recipe.id} />
    </div>
  );
};

export default RecipeDetails;

