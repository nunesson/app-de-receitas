import React, { useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import MyContext from './MyContext';

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
    }),
    [btnDisable,
      email,
      headerTitle,
      hideSearch,
      password,
      radioInput,
      results, searchBar, searchInput, recipeType],
  );

  return (
    <MyContext.Provider value={ data }>
      {children}
    </MyContext.Provider>
  );
}

Provider.propTypes = {
  children: PropTypes.func,
}.isRequired;

export default Provider;
