import React, { Component } from 'react';
import PropTypes from 'prop-types';
import CardFood from './CardFood';
import FoodFilters from './FoodFilters';

// erste tag
const endPt1 = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
const endPt2 = 'https://www.themealdb.com/api/json/v1/1/list.php?c=list';
const endPt3 = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
const endPt4 = 'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list';

class Recipes extends Component {
  state = {
    meals: [],
    drinks: [],
    filteredMeal: [],
    filteredDrinks: [],
    loading: true,
    show: this.props,
  };

  componentDidMount() {
    this.mealsFtch(); this.drinkFtch(); this.filterMealsFtch(); this.filterDrinkFtch();
  }

  mealsFtch = async () => {
    const itemsLength = 11;
    const require = await fetch(endPt1);
    const { meals } = await require.json();

    const resMeals = meals.filter((meal, i) => i <= itemsLength);
    this.setState({
      meals: resMeals,
      loading: false,
    });
  };

  filterMealsFtch = async () => {
    const filteredItemsLength = 4;
    const require = await fetch(endPt2);
    const { meals } = await require.json();
    const filteredMeals = meals.filter((meal, i) => i <= filteredItemsLength);
    this.setState({
      filteredMeal: filteredMeals,
      loading: false,
    });
  };

  drinkFtch = async () => {
    const cockTailsLength = 11;
    const require = await fetch(endPt3);
    const { drinks } = await require.json();

    if (drinks === undefined) {
      this.setState({ loading: true });
    } else {
      const drinkRes = drinks.filter((drink, i) => i <= cockTailsLength);
      this.setState({
        drinks: drinkRes,
        loading: false,
      });
    }
  };

  filterDrinkFtch = async () => {
    const filteredDrinkLength = 4;
    const require = await fetch(endPt4);
    const { drinks } = await require.json();

    if (drinks === undefined) {
      this.setState({ loading: true });
    } else {
      const filteredDrink = drinks
        .filter((meal, i) => i <= filteredDrinkLength);
      this.setState({
        filteredDrinks: filteredDrink,
        loading: false,
      });
    }
  };

  filtCategoria = async (name) => {
    const renderingMeals = 11;
    const tipeCat = name;
    const { show: { show } } = this.state;

    if (show) {
      const endPt = `https://www.themealdb.com/api/json/v1/1/filter.php?c=${tipeCat}`;
      const require = await fetch(endPt);
      const { meals } = await require.json();
      const resMeals = meals.filter((drink, i) => i <= renderingMeals);
      this.setState({
        meals: resMeals,
        loading: false,
      });
    } else if (!show) {
      const endPt = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${tipeCat}`;
      const require = await fetch(endPt);
      const { drinks } = await require.json();
      const drinkRes = drinks.filter((drink, i) => i <= renderingMeals);
      this.setState({
        drinks: drinkRes,
        loading: false,
      });
    }
  };

  render() {
    const { meals, drinks, filteredMeal, filteredDrinks, loading } = this.state;
    const { show } = this.props;

    return (
      <div>

        <h2>Filters</h2>
        { !loading && (show ? filteredMeal : filteredDrinks).map(({ strCategory }) => (
          <FoodFilters
            name={ strCategory }
            key={ strCategory }
            recipeRestore={ show ? this.mealsFtch : this.drinkFtch }
            filtCategoria={ this.filtCategoria }
          />))}

        <button
          type="button"
          data-testid="All-category-filter"
          onClick={ () => (show ? this.mealsFtch() : this.drinkFtch()) }
        >
          All
        </button>

        <h2>Recipes</h2>
        { !loading && (show && (
          meals.map(({ strMealThumb, strMeal, idMeal }, i) => (<CardFood
            name={ strMeal }
            index={ i }
            src={ strMealThumb }
            key={ i }
            link={ `/meals/${idMeal}` }
          />))
        ))}

        {!loading && (!show && (
          drinks.map(({ strDrinkThumb, strDrink, idDrink }, i) => (<CardFood
            key={ i }
            index={ i }
            src={ strDrinkThumb }
            name={ strDrink }
            link={ `/drinks/${idDrink}` }
          />))
        ))}

      </div>
    );
  }
}

Recipes.propTypes = {
  show: PropTypes.bool,
}.isRequired;

export default Recipes;
