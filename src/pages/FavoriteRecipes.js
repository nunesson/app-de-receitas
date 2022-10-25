import React, { useContext, useEffect } from 'react';
import Header from '../components/Header';
import MyContext from '../context/MyContext';

function FavoriteRecipes() {
  const { setHeaderTitle, setHideSearch } = useContext(MyContext);

  useEffect(() => {
    setHeaderTitle('Favorite Recipes');
    setHideSearch(false);
  });

  return (
    <div>
      <Header />
    </div>
  );
}

export default FavoriteRecipes;
