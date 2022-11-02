import PropTypes from 'prop-types';
import React, { useEffect, useContext, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import fetchAPI from '../services/fetchAPI';
import MyContext from '../context/MyContext';
import YoutubeEmbed from '../components/YoutubeEmbed';
import Recommendations from '../components/Recommendations';
import '../styles/RecipeDetails.css';
import ButtonShare from '../components/ButtonShare';
import FavoriteButton from '../components/FavoriteButton';

export default function RecipeDetails(props) {
  const {
    recipeDetail,
    setRecipeDetail,
    mealOrDrink,
    setMealOrDrink,
    setRecipeType,
    measures,
    setMeasures,
    ingredients,
    setIngredients,
    drinkAPI,
    setDrinkAPI,
    mealAPI,
    setMealAPI,
    recipeStatus,
    verifyRecipeStatus,
  } = useContext(MyContext);

  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  const { location: { pathname } } = props;
  const history = useHistory();

  const objectEntries = (result, str) => {
    const elementValues = [];
    Object.entries(result[0]).forEach((element) => {
      if (element[0].includes(str) && element[1]) {
        elementValues.push(element[1]);
      }
    });
    return elementValues;
  };
  const apiData = async () => {
    setLoading(true);
    let result = '';
    if (pathname.includes('meals')) {
      const getDrinkAPI = await fetchAPI('thecocktaildb', 'search', 's', '');
      setRecipeType('meal');
      setDrinkAPI(getDrinkAPI.drinks);
      setMealOrDrink('meals');
      const typeRecipe = 'themealdb';
      result = await fetchAPI(typeRecipe, 'lookup', 'i', id);
      result = result.meals;
      setIngredients(objectEntries(result, 'strIngredient'));
      setMeasures(objectEntries(result, 'strMeasure'));
    } else {
      const getMealAPI = await fetchAPI('themealdb', 'search', 's', '');
      setRecipeType('drink');
      setMealAPI(getMealAPI.meals);
      setMealOrDrink('drinks');
      result = await fetchAPI('thecocktaildb', 'lookup', 'i', id);
      result = result.drinks;
      setIngredients(objectEntries(result, 'strIngredient'));
      setMeasures(objectEntries(result, 'strMeasure'));
    }
    setRecipeDetail(result);
    setLoading(false);
  };

  // const verifyRecipeStatus = () => {
  //   if (localStorage.getItem('doneRecipes')) {
  //     const done = Object.values(JSON.parse(localStorage.getItem('doneRecipes', '[]')));
  //     const inProgress = Object.values(JSON
  //       .parse(localStorage.getItem('inProgressRecipes')));
  //     if (done
  //       .filter((e) => e.id === recipeDetail[0].idMeal || recipeDetail[0].idDrink)) {
  //       setRecipeStatus('done');
  //     }
  //     if (inProgress
  //       .filter((e) => e.id === recipeDetail[0].idMeal || recipeDetail[0].idDrink)) {
  //       setRecipeStatus('inProgress');
  //     } else {
  //       setRecipeStatus('new');
  //     }
  //   }
  // };

  const sendToInProgress = () => {
    history.push(`/${mealOrDrink}/${recipeDetail[0].idMeal
      || recipeDetail[0].idDrink}/in-progress`);
  };

  useEffect(() => {
    apiData();
    // setRecipeStatus('new');
    verifyRecipeStatus();
  }, []);

  return (
    <div>
      {/* { !loading && console.log(mealOrDrink) } */ }
      { !loading && (
        <div>
          <img
            src={ recipeDetail[0].strMealThumb || recipeDetail[0].strDrinkThumb }
            alt={ recipeDetail[0].strMeal || recipeDetail[0].strDrink }
            data-testid="recipe-photo"
          />
          <h1
            data-testid="recipe-title"
          >
            { recipeDetail[0].strMeal || recipeDetail[0].strDrink }
          </h1>
          <h3
            data-testid="recipe-category"
          >
            { recipeDetail[0].strCategory }
            { ' ' }
            { mealOrDrink === 'drinks' && recipeDetail[0].strAlcoholic }
          </h3>
          <ol>
            {
              ingredients.map((element, index) => {
                if (element) {
                  return (
                    <li
                      data-testid={ `${index}-ingredient-name-and-measure` }
                      key={ index }
                    >
                      { `${measures[index]} ${element}` }
                    </li>
                  );
                } return null;
              })
            }
          </ol>
          <p data-testid="instructions">{ recipeDetail[0].strInstructions }</p>
          { mealOrDrink === 'meals'
            && (
              <div data-testid="video">
                <YoutubeEmbed url={ recipeDetail[0].strYoutube } />
              </div>
            ) }
          <Recommendations typeAPI={ drinkAPI || mealAPI } />
          <ButtonShare />
          <FavoriteButton />
          {
            recipeStatus !== 'done'
            && (
              <button
                data-testid="start-recipe-btn"
                type="button"
                className="startButton"
                onClick={ sendToInProgress }
              >
                { recipeStatus === 'new' ? 'Start Recipe' : 'Continue Recipe' }
              </button>
            )
          }
        </div>
      ) }
    </div>
  );
}

RecipeDetails.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.shape({
      substring: PropTypes.func,
    }),
  }),
}.isRequired;
