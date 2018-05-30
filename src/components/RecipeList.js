import React, { Component } from "react";

import RecipePreview from "./RecipePreview";

import recipesDataFile from "../recipes";
import properties from "../Properties";

class RecipeList extends Component {
  constructor() {
    super();

    this.state = {
      recipes: []
    };
  }

  componentDidMount() {
    window.scrollTo(0, 0);

    fetch(properties.authorizationUrl)
      .then(response => response.text())
      .then(token => {
        return fetch(properties.apiUrl)
          .then(response => response.json())
          .then(recipes => {
            this.setState({ recipes });
            return recipes;
          });
      })
      .catch(exception => {
        console.log(exception);
        console.log("Falling back to file data.");
        this.setState({ recipes: recipesDataFile });
      });
  }

  render() {
    const { recipes } = this.state;

    return (
      <div>
        <h1 style={{ paddingTop: "100px", textAlign: "center" }}>Recipes</h1>
        <div className="recipe-preview-wrapper">
          {recipes.length > 0
            ? recipes.map(recipe => {
                return <RecipePreview recipe={recipe} key={recipe.id} />;
              })
            : "Loading..."}
        </div>
      </div>
    );
  }
}

export default RecipeList;
