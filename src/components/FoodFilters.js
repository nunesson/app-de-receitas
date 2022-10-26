import PropTypes from 'prop-types';
import React, { Component } from 'react';
// dagen ett

class FoodFilters extends Component {
  state = { trueFilter: false };

  renderReceitas = (name) => {
    const { trueFilter } = this.state;
    const { filtCategoria, recipeRestore } = this.props;
    if (!trueFilter) {
      this.setState({ trueFilter: true });
      return filtCategoria(name);
    }
    this.setState({ trueFilter: false });
    return recipeRestore();
  };

  render() {
    const { name } = this.props;
    return (
      <div>
        <button
          data-testid={ `${name}-category-filter` }
          type="button"
          onClick={ () => this.renderReceitas(name) }
        >
          { name }
        </button>
      </div>
    );
  }
}
FoodFilters.propTypes = {
  name: PropTypes.string,
  filtCategoria: PropTypes.funcstring,
  recipeRestore: PropTypes.funcstring,
}.isRequired;

export default FoodFilters;
