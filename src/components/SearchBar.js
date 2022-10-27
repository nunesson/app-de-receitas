import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import MyContext from '../context/MyContext';
import fetchAPI from '../services/fetchAPI';

export default function SearchBar() {
  const { searchInput,
    setSearchInput,
    setRadioInput,
    setResults, radioInput, recipeType, headerTitle } = useContext(MyContext);

  const pageTitle = headerTitle.toLowerCase();

  const history = useHistory();

  const verifyOneRecipe = (resultAPI) => {
    if (resultAPI[pageTitle].length === 1 && pageTitle === 'meals') {
      history.push(`/meals/${resultAPI[pageTitle][0].idMeal}`);
      console.log(resultAPI[pageTitle][0].idMeal);
    } else if (resultAPI[pageTitle].length === 1 && pageTitle === 'drinks') {
      console.log(resultAPI[pageTitle][0].idDrink);
      history.push(`/drinks/${resultAPI[pageTitle][0].idDrink}`);
    }
  };

  const handleClick = async () => {
    if (radioInput === 'ingredient') {
      const apiResult = (await fetchAPI(recipeType, 'filter', 'i', searchInput));
      setResults(apiResult[pageTitle]);
      verifyOneRecipe(apiResult);
    } else if (radioInput === 'name') {
      const apiResult = await fetchAPI(recipeType, 'search', 's', searchInput);
      console.log(apiResult[pageTitle].length);
      console.log(apiResult);
      setResults(apiResult[pageTitle]);
      verifyOneRecipe(apiResult);
    } else if (radioInput === 'first' && searchInput.length > 1) {
      global.alert('Your search must have only 1 (one) character');
    } else {
      const apiResult = await fetchAPI(recipeType, 'search', 'f', searchInput);
      setResults(apiResult[pageTitle]);
      verifyOneRecipe(apiResult);
    }
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
