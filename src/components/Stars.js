/* @flow */

import React from "react";
import StarRatings from "react-star-ratings";
import stars from "../constants/stars";

/**
 * This component acts as a wrapper around the external "react-star-ratings"
 * dependency. It renders the star graphics.
 */
class Star extends React.Component {

    props: {
        /**
         * The number of stars that will be filled in when rendered.
         *
         * @type {number}
         */
        rating: number,

        /**
         * The size of each star (px).
         *
         * @type {string}
         */
        starDimension: string,

        /**
         * The spacing between each star (px).
         *
         * @type {string}
         */
        starSpacing: string,

        /**
         * The function to be called when the star value is changed
         * (i.e someone clicks the star).
         *
         * @type {function}
         */
        changeRating: (number) => void
    }

    /**
     * @override
     */
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
