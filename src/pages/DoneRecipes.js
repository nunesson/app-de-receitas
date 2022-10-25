import React, { useContext, useEffect } from 'react';
import Header from '../components/Header';
import MyContext from '../context/MyContext';

function DoneRecipes() {
  const { setHeaderTitle, setHideSearch } = useContext(MyContext);

  useEffect(() => {
    setHeaderTitle('Done Recipes');
    setHideSearch(false);
  });

  return (
    <div>
      <Header />
    </div>
  );
}

export default DoneRecipes;
