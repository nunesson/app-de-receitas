import PropTypes from 'prop-types';
import React, { useEffect, useContext, useState } from 'react';
import { useParams } from 'react-router-dom';
import fetchAPI from '../services/fetchAPI';
import MyContext from '../context/MyContext';

export default function RecipeDetails(props) {
  const {
    recipeDetail,
    setRecipeDetail,
    mealOrDrink,
    setMealOrDrink,
    measures,
    setMeasures,
    ingredients,
    setIngredients,
  } = useContext(MyContext);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  const { location: { pathname } } = props;

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
      const drinkAPI = await fetchAPI('thecocktaildb', 'search', 's', '');
      console.log(drinkAPI);
      setMealOrDrink('meals');
      const typeRecipe = 'themealdb';
      result = await fetchAPI(typeRecipe, 'lookup', 'i', id);
      result = result.meals;
      setIngredients(objectEntries(result, 'strIngredient'));
      setMeasures(objectEntries(result, 'strMeasure'));
    } else {
      const mealAPI = await fetchAPI('themealdb', 'search', 's', '');
      console.log(mealAPI);
      setMealOrDrink('drinks');
      result = await fetchAPI('thecocktaildb', 'lookup', 'i', id);
      result = result.drinks;
      setIngredients(objectEntries(result, 'strIngredient'));
      setMeasures(objectEntries(result, 'strMeasure'));
    }
    setRecipeDetail(result);
    setLoading(false);
  };

  useEffect(() => {
    apiData();
  }, []);

  return (
    <div>
      { !loading && (mealOrDrink === 'meals'
        ? (
          <div>
            <img
              src={ recipeDetail[0].strMealThumb }
              alt={ recipeDetail[0].strMeal }
              data-testid="recipe-photo"
            />
            <h1 data-testid="recipe-title">{ recipeDetail[0].strMeal }</h1>
            <h3 data-testid="recipe-category">{ recipeDetail[0].strCategory }</h3>
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
            <div data-testid="video">
              { recipeDetail[0].strYoutube }
            </div>
          </div>
        )
        : (
          <div>
            <img
              src={ recipeDetail[0].strDrinkThumb }
              alt={ recipeDetail[0].strDrink }
              data-testid="recipe-photo"
            />
            <h1 data-testid="recipe-title">{ recipeDetail[0].strDrink }</h1>
            <h3 data-testid="recipe-category">
              { `${recipeDetail[0].strCategory} ${recipeDetail[0].strAlcoholic}` }
            </h3>
            <ol>

              {
                ingredients.map((elem, index) => {
                  if (elem !== null) {
                    return (
                      <li
                        data-testid={ `${index}-ingredient-name-and-measure` }
                        key={ index }
                      >
                        { `${measures[index]} ${elem}` }
                      </li>
                    );
                  } return null;
                })
              }
            </ol>
            <p data-testid="instructions">{ recipeDetail[0].strInstructions }</p>
          </div>
        )
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
