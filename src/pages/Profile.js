import React, { useContext, useEffect } from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';
import MyContext from '../context/MyContext';

function Profile() {
  const { setHeaderTitle, setHideSearch } = useContext(MyContext);

  useEffect(() => {
    setHeaderTitle('Profile');
    setHideSearch(false);
  });

  const { email } = JSON.parse(localStorage.getItem('user'));

  return (
    <div>
      <Header />
      <Footer />
      <p data-testid="profile-email">
        Email:
        <br />
        {email}
      </p>
      <button type="button" data-testid="profile-done-btn">Done Recipes</button>
      <button type="button" data-testid="profile-favorite-btn">Favorite Recipes</button>
      <button type="button" data-testid="profile-logout-btn">Logout</button>
    </div>
  );
}

export default Profile;
