/* @flow */

import React from "react";
import StarRatings from "react-star-ratings";
import stars from "../constants/stars";

class Star extends React.Component {

    // TODO: code here can be improved
    render() {
        const svgStar = stars.FILLED_1;
        const ratedColor = "rgb(237, 138, 25)";
        const emptyColor = "grey";
        const numberOfStars = 3;

        return (
            <StarRatings
                rating={this.props.rating}
                starRatedColor={ratedColor}
                starEmptyColor={emptyColor}
                starDimension={this.props.starDimension}
                starSpacing={this.props.starSpacing}
                numberOfStars={numberOfStars}
                svgIconPath={svgStar.path}
                svgIconViewBox={svgStar.viewBox}
                changeRating={this.props.changeRating}
            />
        );
    }
}

export default Star;
