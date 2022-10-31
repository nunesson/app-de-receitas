import React, { useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import MyContext from '../context/MyContext';
import fetchAPI from '../services/fetchAPI';

export default function SearchBar() {
  const { searchInput,
    setSearchInput,
    setRadioInput,
    setResults,
    radioInput,
    recipeType, headerTitle, setShowRecipes, results } = useContext(MyContext);

  const pageTitle = headerTitle.toLowerCase();

  const history = useHistory();

  const errorAlert = 'Sorry, we haven\'t found any recipes for these filters.';

  const verifyOneRecipe = () => { // Verifica se encontrou apenas uma receita
    if (results.length === 1 && pageTitle === 'meals') {
      history.push(`/meals/${results[0].idMeal}`);
    } else if (results.length === 1 && pageTitle === 'drinks') {
      history.push(`/drinks/${results[0].idDrink}`);
    }
  };

  const setResultsFunc = (resultAPI) => { // Verifica se nenhuma receita foi encontrada
    if (resultAPI[pageTitle] === null) {
      global.alert(errorAlert);
    } else {
      setResults(resultAPI[pageTitle]);
      verifyOneRecipe();
    }
  };

  const apiSearch = async () => { // Realiza a busca na api
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
  };

  useEffect(() => {
    verifyOneRecipe();
  });

  const handleClick = async () => {
    setShowRecipes(false);
    apiSearch();
  };

  return (
    <div>
      <input
        type="text"
        data-testid="search-input"
        value={ searchInput }
        onChange={ (({ target }) => setSearchInput(target.value)) }
      />
      <br />
      <span>
        <input
          data-testid="ingredient-search-radio"
          type="radio"
          value="search-ingredient"
          name="search-radio"
          onClick={ () => setRadioInput('ingredient') }
        />
        Ingredient
        <input
          data-testid="name-search-radio"
          type="radio"
          value="search-name"
          name="search-radio"
          onClick={ () => setRadioInput('name') }
        />
        Name
        <input
          data-testid="first-letter-search-radio"
          type="radio"
          value="search-first-letter"
          name="search-radio"
          onClick={ () => setRadioInput('first') }
        />
        First Letter
      </span>
      <br />
      <button
        type="button"
        data-testid="exec-search-btn"
        onClick={ handleClick }
      >
        Busca
      </button>
    </div>
  );
}
