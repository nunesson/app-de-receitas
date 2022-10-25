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

  return (
    <div>
      <Header />
      <Footer />
    </div>
  );
}

export default Profile;
