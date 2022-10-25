import React, { useContext, useEffect } from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';
import MyContext from '../context/MyContext';

export default function Comidas() {
  const { setHeaderTitle, setHideSearch } = useContext(MyContext);

  useEffect(() => {
    setHeaderTitle('Meals');
    setHideSearch(true);
  });

  return (
    <div>
      <Header />
      <Footer />
    </div>
  );
}
