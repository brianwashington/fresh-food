import React, { Component } from 'react';

class Rating extends Component {
  
  render() {
    let { rating } = this.props;
  
    if (!this.props.rating) {
      rating = 0;  
    }

    let starArr = [];
    let iterator;
    
    const fullStarTotal = rating ? parseInt(rating, 10) : 0;
    let halfStarTotalStr = rating.toString().split(".");
    let halfStarTotal = 0;
    
    starArr[0] = 0;
    for(iterator=0; iterator<fullStarTotal; iterator++) {
      starArr[iterator] = 1;
    }

    if(halfStarTotalStr[1]) {
      halfStarTotal = parseInt(halfStarTotalStr[1], 10);
      
      if (halfStarTotal <= 2) {
        starArr[iterator] = 0;
      } else if (halfStarTotal <= 5) {
        starArr[iterator] = 0.5;
      } else if (halfStarTotal < 8) {
        starArr[iterator] = 0.5;
      } else {
        starArr[iterator] = 1;
      }
      iterator++;
    }

    for(; iterator < 5; iterator++) {
      starArr[iterator] = 0;
    }
    
    return <span>
      {starArr.map((num, index) => {
        if(num === 1) {
          return <span key={index}><i className="fa fa-star" aria-hidden="true"></i></span>
        } else if(num === 0) {
          return <span key={index}><i className="fa fa-star-o" aria-hidden="true"></i></span>
        } else {
          return <span key={index}><i className="fa fa-star-half-o" aria-hidden="true"></i></span>
        }
      })}
    </span>;
  }
}

export default Rating;
