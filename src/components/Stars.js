/* @flow */

import React from "react";
import StarRatings from "react-star-ratings";

class Star extends React.Component {

    // TODO: code here can be improved
    render() {
        if (this.props.changeRating != null) {
            return (
                <StarRatings
                    rating={this.props.rating}
                    starRatedColor="rgb(237, 138, 25)"
                    starEmptyColor="grey"
                    starDimension={this.props.starDimension}
                    starSpacing={this.props.starSpacing}
                    numberOfStars={3}
                    changeRating={this.props.changeRating}
                />
            );

        } else {
            return (
                <StarRatings
                    rating={this.props.rating}
                    starRatedColor="rgb(237, 138, 25)"
                    starEmptyColor="grey"
                    starDimension={this.props.starDimension}
                    starSpacing={this.props.starSpacing}
                    numberOfStars={3}
                />
            );
        }
    }
}

export default Star;
