import React, { useContext, useEffect } from 'react';
import MyContext from '../context/MyContext';

function FavoriteButton() {
  const { recipeDetail, recipeType } = useContext(MyContext);

  useEffect(() => {
    localStorage.setItem('favoriteRecipes', JSON.stringify([]));
  }, []);

  const handleClick = () => {
    const a = JSON.parse(localStorage.getItem('favoriteRecipes'));
    if (recipeType === 'meal') {
      const {
        idMeal,
        strArea, strCategory, strMeal, strMealThumb } = recipeDetail[0];
      localStorage.setItem('favoriteRecipes', JSON.stringify([
        ...a,
        {
          alcoholicOrNot: '',
          category: strCategory,
          id: idMeal,
          image: strMealThumb,
          name: strMeal,
          nationality: strArea,
          type: recipeType,
        }]));
    } else {
      const {
        idDrink,
        strCategory, strDrink, strDrinkThumb, strAlcoholic } = recipeDetail[0];
      localStorage.setItem('favoriteRecipes', JSON.stringify([
        ...a,
        {
          alcoholicOrNot: strAlcoholic,
          category: strCategory,
          id: idDrink,
          image: strDrinkThumb,
          name: strDrink,
          nationality: '',
          type: recipeType,
        }]));
    }
  };

  return (
    <button
      data-testid="favorite-btn"
      type="button"
      onClick={ handleClick }
    >
      Favoritar
    </button>
  );
}

export default FavoriteButton;
