import React, { useContext, useEffect, useState } from 'react';
import MyContext from '../context/MyContext';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';

function FavoriteButton() {
  const { recipeDetail, recipeType } = useContext(MyContext);
  const [buttonClick, setButtonClick] = useState(false);

  const initialFavorite = () => {
    const favoriteItems = JSON.parse(localStorage.getItem('favoriteRecipes'));
    const { idMeal, idDrink } = recipeDetail[0];
    if (recipeType === 'meal') {
      let a = false;
      favoriteItems.forEach((e) => {
        if (e.id === idMeal) {
          a = true;
        }
      });
      return a;
    }
    let b = false;
    favoriteItems.forEach((e) => {
      if (e.id === idDrink) {
        b = true;
      }
    });
    return b;
  };

  useEffect(() => {
    if (!localStorage.getItem('favoriteRecipes')) {
      console.log(localStorage.getItem('favoriteRecipes'));
      localStorage.setItem('favoriteRecipes', JSON.stringify([]));
    } else if (initialFavorite()) {
      setButtonClick(true);
    }
  }, []);

  const setButton = (id) => {
    if (buttonClick === false) {
      setButtonClick(true);
    } else {
      setButtonClick(false);
      const a = JSON.parse(localStorage.getItem('favoriteRecipes'));
      const b = a.filter((e) => e.id !== id);
      localStorage.setItem('favoriteRecipes', JSON.stringify(b));
    }
  };

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
      setButton(idMeal);
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
      setButton(idDrink);
    }
  };

  return (
    <button
      data-testid="favorite-btn"
      type="button"
      onClick={ handleClick }
      src={ buttonClick ? blackHeartIcon : whiteHeartIcon }
      alt={ buttonClick ? 'blackHeartIcon' : 'whiteHeartIcon' }
    >
      <img
        src={ buttonClick ? blackHeartIcon : whiteHeartIcon }
        alt={ buttonClick ? 'blackHeartIcon' : 'whiteHeartIcon' }
      />
    </button>
  );
}

export default FavoriteButton;
