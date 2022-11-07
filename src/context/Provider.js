import React, { useCallback, useEffect, useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import MyContext from './MyContext';
import fetchAPI from '../services/fetchAPI';

function Provider({ children }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [btnDisable, setBtnDisable] = useState(true);
  const [headerTitle, setHeaderTitle] = useState('');
  const [hideSearch, setHideSearch] = useState(true);
  const [searchBar, setSearchBar] = useState(false);
  const [searchInput, setSearchInput] = useState('');
  const [radioInput, setRadioInput] = useState('');
  const [results, setResults] = useState([]);
  const [recipeType, setRecipeType] = useState('');
  const [recipeDetail, setRecipeDetail] = useState();
  const [mealOrDrink, setMealOrDrink] = useState('');
  const [ingredients, setIngredients] = useState([]);
  const [measures, setMeasures] = useState([]);
  const [ingredientsDrink, setIngredientsDrink] = useState([]);
  const [showRecipes, setShowRecipes] = useState(true);
  const [mealAPI, setMealAPI] = useState();
  const [drinkAPI, setDrinkAPI] = useState();
  const [recipeStatus, setRecipeStatus] = useState([]);
  const [inProgress, setInProgress] = useState([]);
  const [checkbox, setCheckbox] = useState();
  const [recipesFilter, setRecipesFilter] = useState({
    all: true,
    meals: false,
    drinks: false,
  });
  const [isAlertVisible, setIsAlertVisible] = useState(false);

  const history = useHistory();

  const pageTitle = headerTitle.toLowerCase();

  const errorAlert = 'Sorry, we haven\'t found any recipes for these filters.';

  const setResultsFunc = useCallback((resultAPI) => { // Verifica se nenhuma receita foi encontrada
    if (resultAPI[pageTitle] === null) {
      global.alert(errorAlert);
    } else {
      setResults(resultAPI[pageTitle]);
    }
  }, [pageTitle]);

  const apiSearch = useCallback(async () => { // Realiza a busca na api
    if (radioInput === 'ingredient') {
      const apiResult = (await fetchAPI(recipeType, 'filter', 'i', searchInput));
      setResultsFunc(apiResult);
    } else if (radioInput === 'name') {
      const apiResult = await fetchAPI(recipeType, 'search', 's', searchInput);
      setResultsFunc(apiResult);
    } else if (radioInput === 'first') {
      if (searchInput.length > 1) {
        return global.alert('Your search must have only 1 (one) character');
      }
      const apiResult = await fetchAPI(recipeType, 'search', 'f', searchInput);
      setResultsFunc(apiResult);
    }
  }, [radioInput, recipeType, searchInput, setResultsFunc]);

  // const verifyRecipeStatus = () => {
  //   if (localStorage.getItem('doneRecipes')) {
  //     const done = Object.values(JSON.parse(localStorage.getItem('doneRecipes')));
  //     const recipeInProgress = Object.values(JSON
  //       .parse(localStorage.getItem('inProgressRecipes')));
  //     // if (done
  //     //   .filter((e) => e.id === id)) {
  //     //   setRecipeStatus('done');
  //     // }
  //     console.log(done);
  //     if (recipeInProgress !== null && recipeInProgress
  //       .filter((e) => e.id === drinks || meals)) {
  //       setRecipeStatus('inProgress');
  //     } else {
  //       setRecipeStatus('new');
  //     }
  //   }
  // };

  const handleFinish = useCallback(async (pathname, id) => {
    let result = '';
    const dateNow = new Date();
    const getLocalStorage = JSON.parse(localStorage.getItem('doneRecipes'));
    if (pathname.includes('meals')) {
      result = await fetchAPI('themealdb', 'lookup', 'i', id);
      const recipeFinished = {
        id,
        type: 'meal',
        nationality: result.meals[0].strArea,
        category: result.meals[0].strCategory,
        alcoholicOrNot: '',
        name: result.meals[0].strMeal,
        image: result.meals[0].strMealThumb,
        doneDate: dateNow.toISOString(),
        tags: result.meals[0].strTags !== null ? result.meals[0].strTags.split(',') : '',
      };
      if (getLocalStorage === null) {
        localStorage.setItem('doneRecipes', JSON.stringify([recipeFinished]));
      } else {
        localStorage.setItem('doneRecipes', JSON.stringify([
          ...getLocalStorage,
          recipeFinished,
        ]));
      }
      history.push('/done-recipes');
    } else {
      result = await fetchAPI('thecocktaildb', 'lookup', 'i', id);
      const recipeFinished = {
        id,
        type: 'drink',
        nationality: '',
        category: result.drinks[0].strCategory,
        alcoholicOrNot: result.drinks[0].strAlcoholic,
        name: result.drinks[0].strDrink,
        image: result.drinks[0].strDrinkThumb,
        doneDate: dateNow.toISOString(),
        tags: [],
      };
      console.log(recipeFinished);
      console.log(getLocalStorage);
      if (getLocalStorage === null) {
        localStorage.setItem('doneRecipes', JSON.stringify([recipeFinished]));
      } else {
        localStorage.setItem('doneRecipes', JSON.stringify([
          ...getLocalStorage,
          recipeFinished,
        ]));
      }
      history.push('/done-recipes');
    }
  }, [history]);

  useEffect(() => {
    if (results.length === 1 && pageTitle === 'meals') {
      history.push(`/meals/${results[0].idMeal}`);
    } else if (results.length === 1 && pageTitle === 'drinks') {
      history.push(`/drinks/${results[0].idDrink}`);
    }
  }, [history, pageTitle, results]);

  const data = useMemo(
    () => ({
      email,
      password,
      btnDisable,
      headerTitle,
      hideSearch,
      searchBar,
      searchInput,
      radioInput,
      results,
      recipeType,
      recipeDetail,
      showRecipes,
      inProgress,
      checkbox,
      recipesFilter,
      isAlertVisible,
      setEmail,
      setPassword,
      setBtnDisable,
      setHeaderTitle,
      setHideSearch,
      setSearchBar,
      setSearchInput,
      setRadioInput,
      setResults,
      setRecipeType,
      setRecipeDetail,
      mealOrDrink,
      setMealOrDrink,
      ingredients,
      setIngredients,
      measures,
      setMeasures,
      ingredientsDrink,
      setIngredientsDrink,
      setShowRecipes,
      drinkAPI,
      setDrinkAPI,
      mealAPI,
      setMealAPI,
      recipeStatus,
      setRecipeStatus,
      setInProgress,
      setCheckbox,
      setResultsFunc,
      apiSearch,
      setRecipesFilter,
      setIsAlertVisible,
      handleFinish,
      // verifyRecipeStatus,
    }),
    [btnDisable,
      email,
      headerTitle,
      hideSearch,
      password,
      radioInput,
      results,
      searchBar,
      searchInput,
      recipeType,
      showRecipes,
      recipeDetail,
      ingredients,
      ingredientsDrink,
      mealOrDrink,
      measures,
      mealAPI,
      drinkAPI,
      recipeStatus,
      inProgress,
      checkbox,
      setResultsFunc,
      apiSearch,
      recipesFilter,
      isAlertVisible,
      handleFinish,
    ],
  );

  return (
    <MyContext.Provider value={ data }>
      { children }
    </MyContext.Provider>
  );
}

Provider.propTypes = {
  children: PropTypes.func,
}.isRequired;

export default Provider;
