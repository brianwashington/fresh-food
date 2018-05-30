import React, { Component } from "react";
import recipesDataFile from "../recipes";
import Rating from "./Rating";
import properties from "../Properties";

class Recipe extends Component {
  componentDidMount() {
    window.scrollTo(0, 0);

    fetch(properties.authorizationUrl)
      .then(response => response.text())
      .then(token => {
        return fetch(properties.apiUrl)
          .then(response => {
            return response.json();
          })
          .then(recipes => {
            const recipe = recipes.find(
              rec => rec.id === this.props.match.params.id
            );

            this.setState({ recipe });
            return recipe;
          });
      })
      .catch(exception => {
        console.log(exception);
        console.log("Falling back to file data.");
        const recipe = recipesDataFile.find(
          rec => rec.id === this.props.match.params.id
        );

        this.setState({ recipe });
      });
  }

  constructor() {
    super();
    this.parseTime = this.parseTime.bind(this);

    this.state = {
      recipe: ""
    };
  }

  parseTime(time) {
    if (!time) return;

    let result = "";

    if (time.match(/PT\d\d[A-Z]/, "g")) {
      const timeType = time.slice(0, 2);
      const length = time.slice(2, 4);
      const duration = time.slice(4);

      if (timeType === "PT") {
        result += "Prep Time: ";
      }

      result += length;

      if (duration === "M") {
        result += " minutes";
      } else if (duration === "H") {
        result += " hours";
      }
    }

    return result;
  }

  render() {
    if (this.state.recipe.length === 0) {
      return <div className="recipe-list-wrapper">Loading...</div>;
    }

    const {
      calories,
      carbos,
      country,
      deliverable_ingredients,
      description,
      difficulty,
      fats,
      favorites,
      fibers,
      headline,
      highlighted,
      id,
      imageLink,
      incompatibilities,
      keywords,
      name,
      products,
      proteins,
      rating,
      ratings,
      thumb,
      time,
      undeliverable_ingredients,
      user,
      weeks,
      nutrition,
      ingredients,
      image,
      favoritesCount,
      prepTime,
      averageRating
    } =
      this.state.recipe || null;

    return (
      <div className="recipe-list-wrapper">
        <li className="recipe" key={name}>
          <div className="recipe-title">
            <h1 style={{ display: "inline-block" }}>{name}&nbsp;</h1>
            <h2
              style={{
                display: "inline-block",
                fontWeight: 400,
                fontFamily: "Dancing Script"
              }}
            >
              <em>{headline}</em>
            </h2>
          </div>

          <div className="recipe-info">
            <h5>
              {prepTime ? this.parseTime(prepTime) : this.parseTime(time)}
            </h5>
            <h5>Favorites: {favoritesCount || favorites || 0}</h5>
            <h5>Difficulty: {difficulty}</h5>
            <h5 className="rating">
              Rating: <Rating rating={averageRating || rating} />
            </h5>
          </div>

          <img
            className="recipe-image"
            src={imageLink || image}
            alt={"Image of " + name}
          />

          <div className="recipe-description">
            <h3>{description}</h3>
          </div>

          <div className="recipe-details">
            <div className="ingredients">
              <h3>Ingredients</h3>
              <ul>
                {ingredients.map((ingredient, index) => {
                  return (
                    <li key={index}>
                      <span key={ingredient.id} className="ingredient-name">
                        {ingredient.name || ingredient}
                      </span>
                    </li>
                  );
                })}
              </ul>
            </div>

            <div className="ingredients">
              <h3 />
              <ul>
                {ingredients.map((ingredient, index) => {
                  return (
                    <li key={index}>
                      <span key={ingredient.name} className="ingredient-image">
                        <img src={ingredient.imageLink || ""} alt="" />
                      </span>
                    </li>
                  );
                })}
              </ul>
            </div>

            <div className="nutrition-facts">
              <h3>Nutrition</h3>
              <ul>
                {nutrition ? (
                  nutrition.map(nutrient => {
                    return (
                      <li key={nutrient.type}>
                        {nutrient.name}: {nutrient.amount}
                        {nutrient.unit}
                      </li>
                    );
                  })
                ) : (
                  <div>
                    <li>Protein: {proteins}</li>
                    <li>Carbs: {carbos}</li>
                    <li>Fat: {fats}</li>
                    {fibers ? <li>Fiber: {fibers}</li> : ""}
                  </div>
                )}
              </ul>
            </div>
          </div>
        </li>
      </div>
    );
  }
}

export default Recipe;
