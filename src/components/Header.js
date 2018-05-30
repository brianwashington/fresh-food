import React from "react";
import { Link } from "react-router-dom";

const Header = props => {
  return (
    <div>
      <nav className="header">
        <Link to="/">
          <span className="header-text">
            <div className="hello-text">Fresh</div> FOOD
          </span>
        </Link>
        <Link to="/" className="log-in">
          Log In
        </Link>
      </nav>
    </div>
  );
};

export default Header;
