import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import MyContext from '../context/MyContext';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';

function FavoriteButtonInProgress() {
  const { recipeType, inProgress } = useContext(MyContext);
  const [buttonClick, setButtonClick] = useState(false);
  const { id } = useParams();
  const params = useParams();

  const initialFavorite = () => {
    const favoriteItems = JSON.parse(localStorage.getItem('favoriteRecipes'));
    if (favoriteItems) {
      const { idMeal, idDrink } = inProgress[0];
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
    }
  };

  const verifyFavoriteRecipes = () => {
    const favorites = JSON.parse(localStorage.getItem('favoriteRecipes'));
    if (favorites) {
      favorites.forEach((e) => {
        if (e.id === id) {
          setButtonClick(true);
        }
      });
    }
  };

  useEffect(() => {
    verifyFavoriteRecipes();
    if (!localStorage.getItem('favoriteRecipes')) {
      console.log(localStorage.getItem('favoriteRecipes'));
      localStorage.setItem('favoriteRecipes', JSON.stringify([]));
    } else if (initialFavorite()) {
      setButtonClick(true);
    }
  }, []);

  const setButton = (idd) => {
    if (buttonClick === false) {
      setButtonClick(true);
    } else {
      setButtonClick(false);
      const a = JSON.parse(localStorage.getItem('favoriteRecipes'));
      const b = a.filter((e) => e.idd !== idd);
      localStorage.setItem('favoriteRecipes', JSON.stringify(b));
    }
  };

  const handleClick = () => {
    const mealOrDrink = params.meals || params.drinks;
    const a = JSON.parse(localStorage.getItem('favoriteRecipes'));
    if (mealOrDrink === 'meals') {
      const {
        idMeal,
        strArea, strCategory, strMeal, strMealThumb } = inProgress[0];
      localStorage.setItem('favoriteRecipes', JSON.stringify([
        {
          id: idMeal,
          type: 'meal',
          nationality: strArea,
          category: strCategory,
          alcoholicOrNot: '',
          name: strMeal,
          image: strMealThumb,
        }]));
      setButton(idMeal);
    } else {
      const {
        idDrink,
        strCategory, strDrink, strDrinkThumb, strAlcoholic } = inProgress[0];
      localStorage.setItem('favoriteRecipes', JSON.stringify([
        {
          alcoholicOrNot: strAlcoholic,
          category: strCategory,
          id: idDrink,
          image: strDrinkThumb,
          name: strDrink,
          nationality: '',
          type: 'drink',
        }]));
      setButton(idDrink);
    }
    console.log(a);
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

export default FavoriteButtonInProgress;
