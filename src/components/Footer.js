import React from 'react';
import { Link } from 'react-router-dom';
import mealIcon from '../images/mealIcon.svg';
import drinkIcon from '../images/drinkIcon.svg';
import '../styles/Footer.css';

export default function Footer() {
  return (
    <footer data-testid="footer">
      <Link to="/meals">
        <img
          data-testid="meals-bottom-btn"
          alt="Ícone botão de refeições"
          src={ mealIcon }
        />
      </Link>
      <Link to="/drink">
        <img
          data-testid="drinks-bottom-btn"
          alt="Ícone botão de refeições"
          src={ drinkIcon }
        />
      </Link>
    </footer>
  );
}
