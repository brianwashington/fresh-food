import React, { Component } from "react";
import { Link } from "react-router-dom";
import Rating from "./Rating";

class RecipePreview extends Component {
  componentDidMount() {
    window.scrollTo(0, 0);
  }

  render() {
    const { recipe } = this.props;

    return (
      <Link to={`/recipes/${recipe.id}`} className="recipe-preview">
        <div className="recipe-preview-title">
          {recipe.name}{" "}
          <small style={{ fontFamily: "Dancing Script" }}>
            {recipe.headline}
          </small>
          <small className="rating">
            Rating: <Rating rating={recipe.averageRating || recipe.rating} />
          </small>
        </div>

        <img
          className="recipe-preview-image"
          src={recipe.imageLink || recipe.thumb}
          alt="recipe"
        />
      </Link>
    );
  }
}

export default RecipePreview;
