import React, { Component } from 'react';
import Recipes from '../components/Recipes';
import Header from '../components/Header';
// dagen ett

class Drinks extends Component {
  state = {
    foodTrue: false,
  };

  render() {
    const { foodTrue } = this.state;
    return (
      <div>
        <Header title="Drinks" />
        <Recipes show={ foodTrue } />
      </div>
    );
  }
}
export default Drinks;
