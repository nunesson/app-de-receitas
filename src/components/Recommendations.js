import React from 'react';
import PropTypes from 'prop-types';
import Carousel from 'react-bootstrap/Carousel';
import '../styles/Recommendations.css';

export default function Recommendations({ typeAPI }) {
  const NUMBER_5 = 5;
  return (
    <Carousel>
      { typeAPI
        && typeAPI.map((e, i) => i <= NUMBER_5 && (
          <Carousel.Item
            key={ i }
            data-testid={ `${i}-recommendation-card` }
            className="carousel"
          >
            <h1
              data-testid={ `${i}-recommendation-title` }
            >
              { e.strDrink || e.strMeal }
            </h1>
          </Carousel.Item>
        ))}
    </Carousel>
  );
}

Recommendations.propTypes = {
  embedId: PropTypes.string,
}.isRequired;
