import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import React, { Component } from 'react';

class CardFood extends Component {
  render() {
    const {
      link,
      src,
      name,
      index } = this.props;
    return (
      <Link to={ link }>
        <div data-testid={ `${index}-recipe-card` }>
          <img data-testid={ `${index}-card-img` } src={ src } alt={ name } />
          <h5 data-testid={ `${index}-card-name` }>{ name }</h5>
        </div>
      </Link>
    );
  }
}
CardFood.propTypes = {
  index: PropTypes.number,
  src: PropTypes.string,
  name: PropTypes.string,
  link: PropTypes.string,
}.isRequired;

export default CardFood;
