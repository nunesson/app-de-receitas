import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Route, Switch } from 'react-router-dom';
import Login from './pages/Login';
import Meals from './pages/Meals';
import Drinks from './pages/Drinks';
import Profile from './pages/Profile';
import DoneRecipes from './pages/DoneRecipes';
import FavoriteRecipes from './pages/FavoriteRecipes';
import RecipeDetails from './pages/RecipeDetails';
import Provider from './context/Provider';
import RecipeInProgress from './pages/recipeInProgress/RecipeInProgress';

function App() {
  return (
    <div>
      <Provider>
        <Switch>
          <Route exact path="/" component={ Login } />
          <Route exact path="/meals" component={ Meals } />
          <Route exact path="/drinks" component={ Drinks } />
          <Route exact path="/:meals/:id/in-progress" component={ RecipeInProgress } />
          <Route exact path="/:drinks/:id/in-progress" component={ RecipeInProgress } />
          <Route exact path="/done-recipes" component={ DoneRecipes } />
          <Route path="/profile" component={ Profile } />
          <Route path="/favorite-recipes" component={ FavoriteRecipes } />
          <Route path="/:meals/:id" component={ RecipeDetails } />
          <Route path="/:drinks/:id" component={ RecipeDetails } />
        </Switch>
      </Provider>
    </div>
  );
}

export default App;
