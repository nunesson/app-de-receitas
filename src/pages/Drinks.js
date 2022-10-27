import React, { Component } from 'react';
import Recipes from '../components/Recipes';
import Header from '../components/Header';
// dagen ett

function Drinks() {
  const { setHeaderTitle,
    setHideSearch, setRecipeType, results } = useContext(MyContext);

  useEffect(() => {
    setHeaderTitle('Drinks');
    setRecipeType('thecocktaildb');
    setHideSearch(true);
  });

  const NUMBER_12 = 12;

  return (
    <div>
      <Header />
      {
        results && results.slice(0, NUMBER_12).map((element, index) => (
          <div key={ index } data-testid={ `${index}-recipe-card` }>
            <img
              src={ element.strDrinkThumb }
              alt={ element.strDrink }
              data-testid={ `${index}-card-img` }
            />
            <p data-testid={ `${index}-card-name` }>{element.strDrink}</p>
          </div>
        ))
      }
      <Footer />
    </div>
  );
}
export default Drinks;
