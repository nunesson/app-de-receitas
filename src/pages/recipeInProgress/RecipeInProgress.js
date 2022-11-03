import PropTypes from 'prop-types';
import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import MyContext from '../../context/MyContext';
import fetchAPI from '../../services/fetchAPI';
import './recipeInProgress.css';

export default function RecipeInProgress(props) {
  const {
    setInProgress,
    inProgress,
    ingredients,
    setIngredients,
  } = useContext(MyContext);

  const [loading, setLoading] = useState(true);

  const [isChecked, setIsChecked] = useState();

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
      result = await fetchAPI('themealdb', 'lookup', 'i', id);
      result = result.meals;
      setIngredients(objectEntries(result, 'strIngredient'));
    } else {
      result = await fetchAPI('thecocktaildb', 'lookup', 'i', id);
      result = result.drinks;
      setIngredients(objectEntries(result, 'strIngredient'));
    }
    setInProgress(result);
    setLoading(false);
  };

  // const checkEvery = () => {
  //   const check = Array.from(document.querySelectorAll('.check-ingredient'));
  //   const isTrue = check.every(({ checked }) => checked === true);
  //   setIsChecked(isTrue);
  // };

  useEffect(() => {
    apiData();
  }, []);

  const checkEvery = async () => {
    await apiData();
    if (apiData === undefined) {
      setLoading(true);
    } else {
      setLoading(false);
      const check = Array.from(document.querySelectorAll('.check-ingredient'));
      const checkBoxess = check.map((el) => console.log(el.checked));
      console.log(checkBoxess);
    }
  };

  useEffect(() => {
    checkEvery();
  }, []);

  const checkStyle = async ({ target }) => {
    setIsChecked(true);
    const { checked, name } = target;
    if (checked) {
      const checkedBox = document.getElementById(name);
      checkedBox.classList.add('strikethrough');
    }
    if (!checked) {
      const checkedBox = document.getElementById(name);
      checkedBox.classList.remove('strikethrough');
    }
  };

  // const handleCheck = async (elem) => { // ==> TENTATIVA DE FAZER O ARRAY DE OBJETOS
  //   const getLocalStorage = JSON.parse(localStorage.getItem('inProgressRecipes'));
  //   const { meals } = getLocalStorage;
  //   console.log(meals);
  //   const objInProgress = {
  //     drinks: {
  //     },
  //     meals: {
  //     },
  //   };
  //   objInProgress.meals[id] = [...meals[id], elem];
  //   localStorage.setItem('inProgressRecipes', JSON.stringify(objInProgress));
  // };

  return (
    <div>
      {/* { !loading && console.log(recipe.inProgressRecipes.meals[id])} */}
      {
        !loading && (
          <div className="in-progess-container">
            <p>{inProgress[0].idMeal || inProgress[0].idDrink }</p>
            <img
              data-testid="recipe-photo"
              src={ inProgress[0].strMealThumb || inProgress[0].strDrinkThumb }
              alt={ inProgress[0].strMeal || inProgress[0].strDrink }
            />
            <h3 data-testid="recipe-title">
              { inProgress[0].strMeal || inProgress[0].strDrink }
            </h3>
            <button
              type="button"
              data-testid="share-btn"
            >
              Compartilhar
            </button>
            <button
              type="button"
              data-testid="favorite-btn"
            >
              Favoritar
            </button>
            <h4 data-testid="recipe-category">{inProgress[0].strCategory }</h4>
            <div>
              {
                ingredients.map((element, index) => {
                  if (element) {
                    return (
                      <div key={ index }>
                        <label
                          data-testid={ `${index}-ingredient-step` }
                          htmlFor={ element }
                          id={ element }
                          // className="label-ingredient"
                        >
                          <input
                            className="check-ingredient"
                            name={ element }
                            type="checkbox"
                            id={ element }
                            onChange={ checkStyle }
                          />
                          {element}
                        </label>
                      </div>
                    );
                  } return null;
                })
              }
            </div>
            <p data-testid="instructions">{inProgress[0].strInstructions }</p>
            <button
              type="button"
              data-testid="finish-recipe-btn"
            >
              Finalizar receita
            </button>
          </div>
        )
      }
    </div>

  );
}

RecipeInProgress.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.shape({
      substring: PropTypes.func,
    }),
  }),
}.isRequired;
