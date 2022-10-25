import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import MyContext from '../context/MyContext';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';
import SearchBar from './SearchBar';

function Header() {
  const { hideSearch, headerTitle, searchBar, setSearchBar } = useContext(MyContext);

  return (
    <div className="header-container">
      <Link to="/profile">
        <img
          src={ profileIcon }
          alt="Profile"
          data-testid="profile-top-btn"
        />
      </Link>
      {
        hideSearch
        && (
          <button
            type="button"
            data-testid="search-btn"
            onClick={ () => setSearchBar(!searchBar) }
          >
            <img
              src={ searchIcon }
              alt="Profile"
              data-testid="search-top-btn"
            />
          </button>
        )
      }
      {
        searchBar && (<SearchBar />)
      }
      <br />
      <h1 data-testid="page-title">{headerTitle}</h1>
    </div>
  );
}

export default Header;
