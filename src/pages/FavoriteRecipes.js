// current

import React, { useContext, useEffect, useState } from 'react';
import copy from 'clipboard-copy';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import MyContext from '../context/MyContext';
import shareIcon from '../images/shareIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';

function FavoriteRecipes() {
  const [favoriteRecipes, setFavoriteRecipes] = useState([]);
  const { setHeaderTitle,
    setHideSearch,
    recipesFilter,
    setRecipesFilter,
    isAlertVisible,
    setIsAlertVisible } = useContext(MyContext);

  useEffect(() => {
    setHeaderTitle('Favorite Recipes');
    setHideSearch(false);
    const storageFavoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
    setFavoriteRecipes(storageFavoriteRecipes);
  }, []);

  const defineRightText = (recipe, index) => {
    if (recipe.type === 'meal') {
      return (
        <p
          data-testid={ `${index}-horizontal-top-text` }
        >
          {`${recipe.nationality} - ${recipe.category}`}
        </p>
      );
    }
    return (
      <p
        data-testid={ `${index}-horizontal-top-text` }
      >
        {recipe.alcoholicOrNot}
      </p>
    );
  };

  const redirectPage = (type, id) => `/${type}s/${id}`;

  const handleShareBtn = (type, id) => {
    const THREE_SECONDS = 3000;
    copy(`http://localhost:3000/${type}s/${id}`);
    setIsAlertVisible(true);
    setTimeout(() => {
      setIsAlertVisible(false);
    }, THREE_SECONDS);
  };

  const handleDislikeBtn = (id) => {
    const newFavorites = favoriteRecipes.filter((recipe) => recipe.id !== id);
    setFavoriteRecipes(newFavorites);
    localStorage.setItem('favoriteRecipes', JSON.stringify(newFavorites));
  };

  const recipeCard = (recipes) => (recipes.map((recipe, index) => {
    const { id, type, image, name } = recipe;
    return (
      <div key={ id }>
        <Link to={ redirectPage(type, id) }>
          <img
            src={ image }
            alt={ name }
            data-testid={ `${index}-horizontal-image` }
          />
        </Link>
        <Link to={ redirectPage(type, id) }>
          <p
            data-testid={ `${index}-horizontal-name` }
          >
            {name}
          </p>
        </Link>
        {defineRightText(recipe, index)}
        <button
          type="button"
          data-testid={ `${index}-horizontal-share-btn` }
          src={ shareIcon }
          onClick={ () => handleShareBtn(type, id) }
        >
          <img src={ shareIcon } alt="Share Icon" />
        </button>
        <button
          type="button"
          data-testid={ `${index}-horizontal-favorite-btn` }
          src={ blackHeartIcon }
          onClick={ () => handleDislikeBtn(id) }
        >
          <img src={ blackHeartIcon } alt="Dislike Icon" />
        </button>
      </div>
    );
  }));

  const showAll = () => {
    if (favoriteRecipes !== null && favoriteRecipes.length !== 0) {
      return recipeCard(favoriteRecipes);
    }
    return <div><h3>No favorite recipe</h3></div>;
  };

  const showMeals = () => {
    if (favoriteRecipes !== null && favoriteRecipes.some(({ type }) => type === 'meal')) {
      const favoriteMeals = favoriteRecipes.filter(({ type }) => type === 'meal');
      return recipeCard(favoriteMeals);
    }
    return <div><h3>No favorite meal recipe</h3></div>;
  };

  const showDrinks = () => {
    if (favoriteRecipes !== null
      && favoriteRecipes.some(({ type }) => type === 'drink')) {
      const favoriteDrinks = favoriteRecipes.filter(({ type }) => type === 'drink');
      return recipeCard(favoriteDrinks);
    }
    return <div><h3>No favorite drink recipe</h3></div>;
  };

  return (
    <div>
      <Header />

      <div>
        <button
          type="button"
          data-testid="filter-by-all-btn"
          onClick={ () => setRecipesFilter({ all: true, meals: false, drinks: false }) }
        >
          All
        </button>
        <button
          type="button"
          data-testid="filter-by-meal-btn"
          onClick={ () => setRecipesFilter({ all: false, meals: true, drinks: false }) }
        >
          Meals
        </button>
        <button
          type="button"
          data-testid="filter-by-drink-btn"
          onClick={ () => setRecipesFilter({ all: false, meals: false, drinks: true }) }
        >
          Drinks
        </button>
      </div>

      <div>
        {isAlertVisible && <div>Link copied!</div>}
        {recipesFilter.all && showAll()}
        {recipesFilter.meals && showMeals()}
        {recipesFilter.drinks && showDrinks()}
      </div>

      <Footer />
    </div>
  );
}

export default FavoriteRecipes;
