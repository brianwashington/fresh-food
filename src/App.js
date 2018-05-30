import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";

import "./css/styles.css";

import Header from "./components/Header";
import Login from "./components/Login";
import RecipeList from "./components/RecipeList";
import Recipe from "./components/Recipe";
import NotFound from "./components/NotFound";

class App extends Component {
  render() {
    return (
      <div>
        <Header />
        <div>
          <Switch>
            <Route exact path="/" component={Login} />
            <Route exact path="/recipes" component={RecipeList} />
            <Route exact path="/recipes/:id" component={Recipe} />
            <Route component={NotFound} />
          </Switch>
        </div>
      </div>
    );
  }
}

export default App;
