import React, { Component } from 'react';
import Recipes from '../components/Recipes';
import Header from '../components/Header';

class Meals extends Component {
  state = {
    foodTrue: true,
  };

  // dagen ett

  render() {
    const { foodTrue } = this.state;
    return (
      <div>
        <Header title="Meals" />
        <Recipes show={ foodTrue } />
      </div>
    );
  }
}
export default Meals;
