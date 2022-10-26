import React, { useContext, useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';
import MyContext from '../context/MyContext';

function Profile() {
  const { setHeaderTitle, setHideSearch } = useContext(MyContext);

  const [redirect, setRedirect] = useState({
    recipes: false,
    favoriteRecipes: false,
    logout: false,
  });

  useEffect(() => {
    setHeaderTitle('Profile');
    setHideSearch(false);
  });

  const buttonClick = ({ target }) => {
    const { name } = target;
    setRedirect((s) => ({
      ...s,
      [name]: true,
    }));
  };

  const buttonClickLogout = () => {
    setRedirect((s) => ({
      ...s,
      logout: true,
    }));
    localStorage.clear();
  };

  const { recipes, favoriteRecipes, logout } = redirect;

  return (
    <div>
      {recipes && <Redirect to="/done-recipes" />}
      {favoriteRecipes && <Redirect to="/favorite-recipes" />}
      {logout && <Redirect to="/" />}
      <Header />
      <p data-testid="profile-email">
        Email:
        <br />
        {JSON.parse(localStorage.getItem('user')) !== null
          && JSON.parse(localStorage.getItem('user')).email}
      </p>
      <button
        type="button"
        data-testid="profile-done-btn"
        name="recipes"
        onClick={ buttonClick }
      >
        Done Recipes
      </button>
      <button
        type="button"
        data-testid="profile-favorite-btn"
        name="favoriteRecipes"
        onClick={ buttonClick }
      >
        Favorite Recipes
      </button>
      <button
        type="button"
        data-testid="profile-logout-btn"
        name="logout"
        onClick={ buttonClickLogout }
      >
        Logout
      </button>
      <Footer />
    </div>
  );
}

export default Profile;
