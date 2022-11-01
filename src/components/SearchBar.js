import React, { useContext } from 'react';
import MyContext from '../context/MyContext';

export default function SearchBar() {
  const { searchInput,
    setSearchInput,
    setRadioInput,
    setShowRecipes,
    apiSearch } = useContext(MyContext);

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
