import React, { useContext, useEffect } from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';
import Recipes from '../components/Recipes';
import MyContext from '../context/MyContext';

export default function Comidas() {
  const { setHeaderTitle,
    setHideSearch, setRecipeType, results, showRecipes } = useContext(MyContext);

  useEffect(() => {
    setHeaderTitle('Meals');
    setRecipeType('themealdb');
    setHideSearch(true);
  });

  const NUMBER_12 = 12;
  const foodTrue = true;

  return (
    <div>
      <Header />
      <title>Meals</title>
      {
        showRecipes
        && <Recipes show={ foodTrue } />
      }
      {
        results && results.slice(0, NUMBER_12).map((element, index) => (
          <div key={ index } data-testid={ `${index}-recipe-card` }>
            <img
              src={ element.strMealThumb }
              alt={ element.strMeal }
              data-testid={ `${index}-card-img` }
            />
            <p data-testid={ `${index}-card-name` }>{element.strMeal}</p>
          </div>
        ))
      }
      <Footer />
    </div>
  );
}
