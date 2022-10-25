import React, { useContext } from 'react';
import MyContext from '../context/MyContext';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';

function Header() {
  const { hideSearch, headerTitle } = useContext(MyContext);
  return (
    <div className="header-container">
      <img
        src={ profileIcon }
        alt="Profile"
        data-testid="profile-top-btn"
      />
      { hideSearch
      && (
        <img
          src={ searchIcon }
          alt="Profile"
          data-testid="search-top-btn"
        />
      )}
      <br />
      <h1 data-testid="page-title">{ headerTitle }</h1>
    </div>
  );
}

export default Header;
